const { Service } = require('egg');

class AccessService extends Service {
    // 添加权限
    async add(body) {

        if (body) {
            let accessModel = await this.ctx.model.Access(body)
            accessModel.save(body)
            return {
                flag: true,
                msg: '权限添加成功',
            }
        } else {
            return {
                flag: false,
                msg: '权限添加失败'
            }
        }
    }

    // 查找所有顶级模块
    async findModules() {
        let result = await this.ctx.model.Access.find({ access_module_id: '0' });
        if (result) {
            return {
                flag: true,
                data: result
            }
        } else {
            return {
                flag: false,
                msg: '暂时没有模块'
            }
        }
    }

    // 查询所有顶级模块access
    async findAll() {
        let accessAll = await this.ctx.model.Access.aggregate([
            {
                $match: { access_module_id: '0' }
            },
            {
                $lookup: {
                    from: 'accesss',
                    localField: '_id',
                    foreignField: 'access_module_id',
                    as: 'subAccess'
                }
            }
        ]);
        // console.log(accessAll);
        if (accessAll) {
            return {
                flag: true,
                msg: '查找成功',
                data: accessAll
            }
        } else {
            return {
                flag: false,
                msg: '查找失败'
            }
        }

    }

    // 查询所有非顶级模块（菜单、操作）权限
    async findAllCDCZ() {
        // 查找到的顶级模块权限 他们可能会含有子权限
        let accessAllRes = await this.findAll();
        // console.log(accessAll);
        let access_array = accessAllRes.data;
        let subaccess_arr = [];
        for (let i = 0; i < access_array.length; i++) {
            subaccess_arr.push(...access_array[i].subAccess);
        }
        // console.log('subaccess_arr长度',subaccess_arr.length);
        if (subaccess_arr.length > 0) {
            return {
                flag: true,
                msg: '查找成功',
                data: subaccess_arr
            }
        } else {
            return {
                flag: false,
                msg: '查找菜单、操作失败,没有菜单、操作'
            }
        }

    }

    // 根据id查找权限模块
    async findById(id) {
        let access = await this.ctx.model.Access.findById({ _id: id });
        if (access) {
            return {
                flag: true,
                data: access
            }
        } else {
            return {
                flag: false,
                msg: '未查找到对应id的数据'
            }
        }
    }

    // 更新权限信息
    async update(access_id, updatebody) {
        let updateRes = await this.ctx.model.Access.update({ _id: access_id }, updatebody);
        if (updateRes.nModified > 0 && updateRes.ok == 1) {
            return {
                flag: true,
                msg: '权限修改成功'
            }
        } else if (updateRes.nModified == 0 && updateRes.n > 0) {
            return {
                flag: false,
                msg: '权限信息没有修改，请检查'
            }
        } else {
            return {
                flag: false,
                msg: '权限修改失败'
            }
        }
    }

    // 删除权限操作
    async delete(id, type) {
        // console.log(typeof this.app.mongoose.Types.ObjectId(id));
        // console.log(id);
        id = this.app.mongoose.Types.ObjectId(id);
        // 删除的是模块
        if (type == '1') {
            // 先删除该模块下的子模块
            let subAccesses = await this.ctx.model.Access.find({ access_module_id: id });
            // console.log('subAccesses.length:',subAccesses.length);
            for (let i = 0; i < subAccesses.length; i++) {
                await this.ctx.model.Access.deleteOne({ access_module_id: id });
            }
        }
        // // 删除该行
        let deleteres = await this.ctx.model.Access.deleteOne({ _id: id });
        // console.log('deleteres:',deleteres);
        // { n: 1, ok: 1, deletedCount: 1 }
        if (deleteres.deletedCount > 0 && deleteres.ok == 1) {
            return {
                flag: true,
                msg: '删除权限成功'
            }
        } else {
            return {
                flag: false,
                msg: '删除权限失败'
            }
        }
    }

    // 查找已经被某个角色选中的所有权限
    async findAllWithChecked(role_id) {
        // 所有顶级模块
        let result1 = await this.findAll();
        // 被该角色选中的权限
        let result2 = await this.findRoleAccessByRoleId(role_id);
        if (result1.flag && result2.flag) {
            let accessAll = result1.data;
            let accessChecked = result2.data;
            // console.log('accessAll:',accessAll);
            // console.log('accessChecked:',accessChecked);
            for (const access of accessAll) {
                if (accessChecked.indexOf(access._id.toString()) !== -1) {
                    access.checked = true;
                }
                for (const subaccess of access.subAccess) {
                    if (accessChecked.indexOf(subaccess._id.toString()) !== -1) {
                        subaccess.checked = true;
                    }
                }
            }
            return {
                flag: true,
                msg: '查找成功',
                data: accessAll,
            }
        } else {
            let accessAll = result1.data;
            return {
                flag: true,
                msg: '查找失败',
                data: accessAll,
            }
        }
    }

    //根据URL查询角色被选中权限
    async findCheckedAccessByURL(role_id, url) {
        let result1 = await this.findRoleAccessByRoleId(role_id);
        let result2 = await this.findAccessByURL(url);
        if (result1.flag && result2.flag) {
            let role_access_array = result1.data;
            let access = result2.data;
            console.log(role_access_array);
            console.log(access);
            if (role_access_array.indexOf(access._id.toString()) !== -1) {
                return {
                    flag : true,
                    msg : 'access ok' 
                }
            } else {
                return {
                    flag: false,
                    msg: 'access not ok'
                }
            }

        } else {
            return {
                flag: false,
                msg: 'access not ok'
            }
        }
    }

    async findAccessByURL(access_url) {
        let access = await this.ctx.model.Access.find({ access_url });
        if (access.length > 0) {
            return {
                flag: true,
                data: access[0]
            }
        } else {
            return {
                flag: false,
                msg: '没找到'
            }
        }
    }

    // 根据 role_id 查找它拥有权限
    async findRoleAccessByRoleId(role_id) {
        let RoleAccessRes = await this.ctx.model.RoleAccess.find({ role_id });
        // console.log('RoleAccessRes: ',RoleAccessRes);
        let accessChecked = [];
        RoleAccessRes.forEach(item => {
            accessChecked.push(item.access_id.toString());
        });
        if (accessChecked.length > 0) {
            return {
                flag: true,
                msg: '查询该角色权限成功',
                data: accessChecked
            }
        } else {
            return {
                flag: true,
                msg: '该角色暂时没有权限',
                data: []
            }
        }
    }

}

module.exports = AccessService;