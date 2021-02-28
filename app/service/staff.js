const {Service} = require('egg')

class StaffService extends Service{
    // 根据用户名和密码查找
    async find(username,password){
        let staff1 = await this.ctx.model.Staff.findOne({username  , password});
        // console.log('staff1 : ',staff1);
        if(staff1){
            return {
                flag:true,
                msg:'查找成功',
                data:staff1
            }
        }else{
            return {
                flag:false,
                msg:'查找失败'
            }
        }
    }
    // 根据用户名查找
    async find(username){
        let staff2 = await this.ctx.model.Staff.findOne({username });
        // console.log('staff2 : ',staff2);
        if(staff2){
            return {
                flag:true,
                msg:'查找成功',
                data:staff2
            }
        }else{
            return {
                flag:false,
                msg:'查找失败'
            }
        }
    }
    // 根据id查找用户
    async findById(staff_id){
        let staff = await this.ctx.model.Staff.findById(staff_id);
        if(staff){
            return{
                flag : true,
                msg : '查找staff成功~',
                data : staff
            }
        }else{
            return {
                flag : false,
                msg : '查找staff失败',
            }
        }
    }
    // 添加用户
    async add(staff){
        // 先查找数据库, 看是否当前用户名已经存在, 若存在 返回通知'用户名已存在' , 若不存在 则进行添加
        let {username , password} = staff;
        let result1 = await this.find(username);
        // console.log('service staff result1: ',result1);
        if(result1.flag){
            return{
                flag:false,
                msg:'用户名已存在'
            }
        }else{
            let stafModel = await this.ctx.model.Staff(staff);
            // 要先将model创建出来, 去使用mongodb中的语法
            let saveRes = stafModel.save(staff) ;
            // 例如 <集合名>.save 保存一条数据 , <集合名>.find()查找集合中的数据
            if(saveRes){
                return{
                    flag:true,
                    msg:'添加用户成功',
                    data:saveRes
                }
            }else{
                return{
                    flag:false,
                    msg:'添加用户失败',
                }
            }
        }
    }
    // 查找所有 
    async findAll(){
        let staffs = await this.ctx.model.Staff.aggregate([
            {
                $lookup:{
                    from:'roles',   // 要连接的表明
                    localField:'role_id',   // 当前集合要连接的字段 
                    foreignField:'_id',     // 外键 被连接的表的字段
                    as:'role'       // 查询后的结果以名为role的字段保存到Staff表中
                                    // 此时role是一个数组，数组里面是一个对象，对象内容就是
                                    // 关联查询到的 角色。
                }
            }
        ])
        if(staffs){
            return{
                flag:true,
                msg:'查询所有成功',
                data:staffs
            }
        }else{
            return {
                flag:false,
                msg:'查询失败'
            }
        }
    }
    
    // 更新用户
    async update(staff_id,body){
        let username = body.username;
        // 根据id取出username
        let staff = await this.ctx.model.Staff.findById(staff_id);
        let ousername =  staff.username;
        // 判断修改
        if(ousername !== username){
            // 说明username被修改过 所以要判断是否和数据库中其他数据的username重复
            let result = await this.ctx.service.staff.find(username);
            if(result.flag){ // 如果找到了，说明存在相同的username
                return {
                    flag : false,
                    msg : '此用户名已经存在，请换一个'
                }
            }
        }else{
            // 账号未被修改
            let UpdateResult = await this.ctx.model.Staff.updateOne({_id:staff_id},body);
            if(UpdateResult.nModified > 0){
                return {
                    flag : true,
                    msg : '修改成功'
                }
            }else if(UpdateResult.nModified == 0 && UpdateResult.n > 0) {
                 // 数据没有被修改过 （匹配1条 ， 修改0条）
                return {
                    flag : false,
                    msg : '信息没有被修改！请检查修改的信息'
                }
            }else {
                return {
                    flag : false,
                    msg : '修改用户失败~'
                }
            }
        }
    }

    // 删除用户
    async delete(id){
        let deleteRes = await this.ctx.model.Staff.deleteOne({_id:id});
        // console.log(deleteRes);
        if(deleteRes.deletedCount > 0 && deleteRes.ok == 1){
            return{
                flag : true,
                msg : "删除角色成功~"
            }
        }else{
            return {
                flag : false,
                msg : "删除角色失败~"
            }
        }
    }
}

module.exports = StaffService