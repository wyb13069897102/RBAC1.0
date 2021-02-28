const {Controller} = require('egg')

class IndexController extends Controller {
    // 展示admin界面
    async home(){
        const userinfo = this.ctx.session.userinfo;
        if(userinfo){
            let name = userinfo.name;
            let accessRes = await this.ctx.service.access.findAllWithChecked(userinfo.role_id);
            // console.log(accessRes);
            if(accessRes.flag){
                let accessAll = accessRes.data;
                console.log(accessAll);
                await this.ctx.render('admin/home.html',{name,accessAll});
            }else{
                this.ctx.body = accessRes.msg;
            }
        }else{
            this.ctx.response.redirect('admin/login');
        }
    }
    // 展示默认界面
    async welcome(){
        await this.ctx.render('admin/welcome.html')
    }
}

module.exports = IndexController