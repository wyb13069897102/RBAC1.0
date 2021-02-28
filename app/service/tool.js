const {Controller} = require('egg')
const md5 = require('md5')
const svgCaptcha = require('svg-captcha')

class ToolService extends Controller {
    // md5加密
    md5(content){
        return md5(content)
    }
    // 获取验证码
    getCaptcha(){
        var captcha = svgCaptcha.create()
        // console.log(captcha);
        let codeB = captcha.text;
        this.ctx.session.codeB = codeB;
        return captcha.data
    }

}

module.exports = ToolService