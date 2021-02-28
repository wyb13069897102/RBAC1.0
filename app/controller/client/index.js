const {Controller} = require('egg')

class IndexController extends Controller {
    // 显示客户端界面
    async welcome(){
        this.ctx.body = 'client page'
    }
}

module.exports = IndexController