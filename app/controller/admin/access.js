const md5 = require('md5')
const BaseController = require('./base.js');
class AccessController extends BaseController {
    // 显示增加权限页面
    async add(){
        let modules = await this.ctx.service.access.findModules()
        // console.log(modules);
        if(modules){
            let accessmoudles = modules.data;
            await this.ctx.render('admin/access/add.html',{accessmoudles});
        }else{
            this.ctx.body = '没有查询到模块'
        }
    }

    // 增加权限操作
    async doadd(){
        let {
            access_type,
            access_module,
            access_url,
            access_action,
            access_desc,
            access_module_id,
            data_sort
        } = this.ctx.request.body;

        //console.log('this.ctx.request.body:',this.ctx.request.body);
        if(access_module_id !== '0'){
            // 说明此时不是顶级模块 也就意味着添加的是 菜单 或 操作
            access_module_id = this.app.mongoose.Types.ObjectId(access_module_id);
        }

        let body = {
            access_type,
            access_module,
            access_url,
            access_action,
            access_desc,
            access_module_id,
            data_sort
        };
        let result = await this.ctx.service.access.add(body);
        if( result.flag ){
            await this.success('/admin/access/list',result.msg);
        }else{
            await this.fail('/admin/access/add',result.msg);
        }
    }

    // 显示权限列表
    async list(){
        let result = await this.ctx.service.access.findAll();
        if(result.flag){
            let accessAll = result.data;
            // console.log('subAccess------',accessAll[0].subAccess);
            await this.ctx.render('admin/access/list',{accessAll});
        }else{
            await this.fail('/admin/access/add',result.msg);
        }
    }    

    // 显示修改界面
    async edit(){
        let id = this.ctx.request.query.id;
        // console.log('id-------------',id);
        // 获取所有顶级模块，方便在权限所属模块中显示
        let ModulesResult = await this.ctx.service.access.findModules();
        // 获取被修改的权限类型
        let accessResult = await this.ctx.service.access.findById(id);
        if(ModulesResult.flag && accessResult.flag){
            let modules = ModulesResult.data;
            // console.log('modules-------------',modules);
            let access = accessResult.data;
            // console.log('access--------------',access);
            await this.ctx.render('admin/access/edit',{modules,access});
        }
        else{
            await this.fail('/admin/access/list',{msg:accessResult.msg});
        }
    }

    // 修改权限操作
    async doedit(){
        let  {
            _id,
            access_type,
            access_module,
            access_url,
            access_action,
            access_desc,
            access_module_id,
            data_sort,
            data_status
        } = this.ctx.request.body;

        if(access_module_id !== '0'){
            access_module_id = this.app.mongoose.Types.ObjectId(access_module_id);
        }

        let accessbody = {
            access_type,
            access_module,
            access_url,
            access_action,
            access_desc,
            access_module_id,
            data_sort,
            data_status
        };

        let result = await this.ctx.service.access.update(_id,accessbody);
        // console.log(result);
        if(result.flag){
            await this.success('/admin/access/list',result.msg);
        }else{
            await this.fail('/admin/access/list',result.msg);
        }
    }

    // 删除权限操作
    async delete(){
        let _id = this.ctx.query.id;
        let type = this.ctx.query.type;
        let deleteRes = await this.ctx.service.access.delete(_id,type);
        // console.log('deleteRes:',deleteRes);
        if(deleteRes.flag){
            await this.success('/admin/access/list',deleteRes.msg);
        }else{
            await this.fail('/admin/access/list',deleteRes.msg);
        }
    }

}

module.exports =  AccessController 
