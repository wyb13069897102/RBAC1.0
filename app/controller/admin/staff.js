// const {Controller} = require('egg')
const md5 = require('md5')
const BaseController = require('./base.js');
class LoginController extends BaseController {
    // 显示用户列表
    async list() {
        // this.ctx.body = 'staffs list'
        let result = await this.ctx.service.staff.findAll();
        if (result.flag) {
            let staffs = result.data;
            // console.log('staffs:', staffs);
            await this.ctx.render('admin/staff/list', { staffs });
        } else {
            this.ctx.body = 'no list exits'
        }

    }
    // 显示用户添加
    async add() {
        let result = await this.ctx.service.role.findAll();
        if (result.flag) {
            let roles = result.data;
            await this.ctx.render('admin/staff/add.html', { roles });
        } else {
            await this.fail('/admin/staff/add', result.msg);
        }
    }
    // 添加用户操作
    async doadd() {
        let { username, password, name, no, phone, role_id } = this.ctx.request.body;
        let staff = {
            username,
            password: md5(password),
            name,
            no,
            phone,
            role_id
        }
        let result = await this.ctx.service.staff.add(staff);
        if (result.flag) {
            await this.success('/admin/staff/list', result.msg);
            // await this.success('list',result.msg);
        } else {
            await this.fail('/admin/staff/add', result.msg);
        }

    }
    // 显示用户修改
    async edit() {
        let staff_id = this.ctx.request.query.id;
        let staffResult = await this.ctx.service.staff.findById(staff_id);
        let roleResult = await this.ctx.service.role.findAll();
        if (staffResult.flag && roleResult.flag) {
            let staff = staffResult.data;
            let roles = roleResult.data;
            await this.ctx.render('admin/staff/edit', { staff, roles });
        } else {
            await this.fail('/admin/staff/edit', '显示修改界面失败~');
        }


    }
    // 修改用户
    async doedit() {
        // 1. 修改密码 加密
        // 2. 未修改密码 不做提交
        // 3. username修改 username不能重复
        let { username, password, name, no, phone, role_id, status, staff_id } = this.ctx.request.body; // 获取staff_id 通过id进行修改
        var staff;
        console.log('this.ctx.request.body : ',this.ctx.request.body);
        // 判断密码是否被修改
        if (password) {
            staff = {
                username, password: await this.ctx.service.tool.md5(password), name, no, phone, status, role_id
            }
        } else {
            staff = {
                username, password, name, no, phone, status, role_id
            }
        }

        let result = await this.ctx.service.staff.update(staff_id,staff);
        if(result.flag){
            await this.success('/admin/staff/list',result.msg);
        }else{
            await this.fail('/admin/staff/list',result.msg);
        }
    }

    // 删除用户
    async delete(){
        let id = this.ctx.request.query.id;
        let result = await this.ctx.service.staff.delete(id);
        if(result.flag){
            // console.log(result.msg);
            await this.success('/admin/staff/list',result.msg);
        }else{
            await this.fail('/admin/staff/list',result.msg);
        }
    }

}

module.exports = LoginController