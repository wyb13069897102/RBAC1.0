// const {Controller} = require('egg');
const BaseController = require('./base.js');

class RoleController extends BaseController {
    // 显示添加界面
    async add() {
        // console.log('渲染了add.html页面');
        await this.ctx.render('/admin/role/add.html')
    }

    // 添加操作
    async doadd() {
        // console.log('进入了role的doadd方法');
        let { role_name, role_desc } = this.ctx.request.body;
        let role = { role_name, role_desc };
        // console.log('role:',role);
        let result = await this.ctx.service.role.add(role);
        if (result.flag) {
            // console.log(result.msg);
            await this.success('/admin/role/list', result.msg);
        } else {
            await this.success('/admin/role/add', result.msg);
        }
    }

    // 显示角色列表
    async list() {
        // console.log('进入了role的list界面');
        // this.ctx.body = 'role list';
        let result = await this.ctx.service.role.findAll();
        if (result.flag) {
            await this.ctx.render('admin/role/list.html', { roles: result.data });
        } else {
            this.ctx.body = result.msg;
        }
    }

    // 显示修改
    async edit() {
        let id = this.ctx.request.query.id;
        let result = await this.ctx.service.role.findById(id);
        if (result.flag) {
            let role = result.data;
            await this.ctx.render('admin/role/edit', { role });
        } else {
            this.ctx.body = result.msg;
        }
    }

    // 修改操作
    async doedit() {
        let { _id, role_name, role_desc, data_status } = this.ctx.request.body;
        data_status = data_status == 'on' ? 1 : 0;
        let updateBody = { role_name, role_desc, data_status };

        let result = await this.ctx.service.role.update(_id, updateBody);
        if (result.flag) {
            await this.success('/admin/role/list', result.msg);
        } else {
            await this.fail('/admin/role/list', result.msg);
        }
    }
    // 删除操作
    async delete() {
        let id = this.ctx.request.query.id;
        let result = await this.ctx.service.role.delete(id);
        if (result.flag) {
            // console.log(result.msg);
            await this.success('/admin/role/list', result.msg);
        } else {
            await this.fail('/admin/role/list', result.msg);
        }
    }

    // 显示授权
    async auth() {
        let role_id = this.ctx.query.id;
        // console.log('role_id:', role_id);
        let accessRes = await this.ctx.service.access.findAllWithChecked(role_id);
        // console.log('accessRes:', accessRes);
        if (role_id && accessRes.flag) {
            let accessAll = accessRes.data;
            await this.ctx.render('admin/role/auth', { role_id, accessAll})
        } else {
            await this.ctx.render('admin/role/list', accessRes.msg);
        }
    }

    // 角色授权操作
    async doauth() {
        let body = this.ctx.request.body;
        // console.log(body);
        /*{
        role_id: '5fb9d5c63e984a3844e0a225',
        access_checked: [
            '5fc7763ceea14d2c6c76a17a',
            '5fc8eb5223a30e22043cab14',
            '5fc9dee06d95991794f7f190',
            '5fc8eb1b23a30e22043cab12',
            '5fc8ee07dc400841ac65c33a'
        ],
        _csrf: 'IYGRE4iC-92ig8VwZMM9i3tOBYaN-w1l_lwM'
        }*/
        let {role_id,access_checked} = body;
        let access_checked_array = [];
        access_checked.forEach(access_id => {
            var role_access = {
                role_id,
                access_id
            }
            access_checked_array.push(role_access);
        });
        let saveRes = await this.ctx.service.role.addRoleAccess(role_id,access_checked_array);
        // console.log('saveRes: ',saveRes);
        if(saveRes.flag){
            await this.success('/admin/role/list',saveRes.msg);
        }else{
            await this.fail('/admin/role/list',saveRes.msg);
        }
    }



}

module.exports = RoleController;