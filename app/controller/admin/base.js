const {Controller} = require('egg');

class BaseController extends Controller{
    // 显示操作成功的界面
    async success(url,msg){
        var msg = msg || '操作成功';
        // console.log('success中的url：',url);
        await this.ctx.render('admin/common/success.html',{url,msg})
    }
    // 显示操作失败的界面
    async fail(url,msg){
        var msg = msg || '操作失败'
        await this.ctx.render('admin/common/fail.html',{url,msg})
    }

}

module.exports = BaseController