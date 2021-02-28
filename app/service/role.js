const {Service} = require('egg');
const Role = require('../model/Role');

class RoleService extends Service {
    // 添加角色
    async add(role){
        // console.log('进入了service的add方法');
        if(role){
            let roleModel = await this.ctx.model.Role(role) 
            roleModel.save(role)          
            return{
                flag:true,
                msg:'添加成功',
            }
        }else{
            return{
                flag:false,
                msg:'添加失败'
            }
        }
    }
    // 查询所有角色
    async findAll(){
        let roles = await this.ctx.model.Role.find({});
        if(roles.length != 0){
            return {
                flag:true,
                msg:"查询全部角色成功",
                data:roles
            }
        }else{
            return {
                flag:false,
                msg:"当前并没有角色,请先添加角色！"
            }
        }
    }
    // 根据id查询角色
    async findById(id){
        let role = await this.ctx.model.Role.findById(id);
        if(role){
            return{
                flag:true,
                data:role
            }
        }else{
            return{
                flag:false,
                msg:"没有找到当前id的角色信息"
            }
        }
    }

    async update(_id,updateBody){
        let updateRes = await this.ctx.model.Role.updateOne({_id:_id},updateBody);
        // console.log(updateRes);
        if(updateRes.nModified > 0 && updateRes.ok == 1){
            return {
                flag : true,
                msg : "角色修改成功~"
            }
        }else{
            return {
                flag: false,
                msg: "角色修改失败~"
            }
        }
    }

    // 删除角色
    async delete(id){
        let deleteRes = await this.ctx.model.Role.deleteOne({_id:id});
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

    // 将某个角色的权限添加到RoleAccess表中
    async addRoleAccess(role_id,array){
        let DeleteRes = await this.ctx.model.RoleAccess.deleteMany({role_id});
        let RoleAccessRes = await this.ctx.model.RoleAccess.insertMany(array);
        // console.log(RoleAccessRes);  
        if(RoleAccessRes.length > 0){
            return {
                flag : true,
                msg : '授权成功',
                data : RoleAccessRes
            }
        }else{
            return {
                flag : false,
                msg : '授权失败'
            }
        }   
    }
    
}

module.exports = RoleService;