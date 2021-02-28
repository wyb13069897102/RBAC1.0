const {Controller} = require('egg')
const md5 = require('md5')
class LoginController extends Controller {
    // 登录界面展示
    async login(){
        await this.ctx.render('admin/login.html');
    }
    // 退出当前用户
    async drop(){
        this.ctx.session = null;
        await this.ctx.render('admin/login');
    }
    // 登录操作
    async dologin(){
        let staff = this.ctx.request.body;
        let username = staff.username;
        let password = md5(staff.password);
        let codeA = staff.code;
        // console.log('codeA',codeA);
        // console.log(staff);
        let result = await this.ctx.service.login.dologin(username , password , codeA)

        // console.log('controller result',result);

        if(result.flag){
            // this.ctx.body = 'login ok'
            this.ctx.response.redirect('/admin')
        }
        else{
            this.ctx.body = result.msg;
        }

    }

    // 验证码
    async veriy(){
        let result = this.ctx.service.tool.getCaptcha()
        // console.log(result);
        this.ctx.response.type = "image/svg+xml"
        this.ctx.body = result
    }
}

module.exports = LoginController