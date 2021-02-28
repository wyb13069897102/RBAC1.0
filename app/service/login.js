const { Service } = require('egg')

class LoginService extends Service {
    async dologin(username, password, codeA) {
        const { ctx } = this;
        // console.log(ctx.session);
        let codeB = ctx.session.codeB

        // console.log(codeA,codeB);
        // 验证码输入是否正确判断
        if (codeA.toLowerCase() == codeB.toLowerCase()) {
            let result = await this.ctx.service.staff.find(username);
            // console.log('Service result:',result);
            if (result.flag) {
                let {name , role_id , is_super} = result.data;
                ctx.session.userinfo = {name , role_id , is_super};
                // console.log('ctx.session.userinfo:',ctx.session.userinfo);
                return {
                    flag: true,
                    msg: '查找成功',
                    data: result
                }
            } else {
                return {
                    flag: false,
                    msg: '用户名或密码错误'
                }
            }
        } else {
            return{
                flag:false,
                msg:'验证码错误'
            }
        }
    }
}

module.exports = LoginService