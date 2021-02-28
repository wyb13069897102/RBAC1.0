const AdminMiddleware = (options, app) => {
    return async (ctx, next)=>{
        const userinfo = ctx.session.userinfo
        const pathname = ctx.request.path;
        console.log('AdminMiddleware------');
        if(userinfo){
            // console.log(userinfo);
            ctx.locals.userinfo = userinfo;
            let result1 = await ctx.service.access.findAllWithChecked(userinfo.role_id);
            // console.log(result);
            let result2 = await ctx.service.access.findCheckedAccessByURL(userinfo.role_id,pathname);
            if(result2.flag){
                if(result1.flag){
                    let staffAccess = result1.data;
                    ctx.locals.staffAccess = staffAccess;
                }else{
                    ctx.body = result1.msg;
                }
                await next();
            }else{
                ctx.body = result2.msg;
            }
        }else{
            if(pathname == '/admin/login' || pathname == '/admin/veriy' || pathname == '/admin/dologin' ){
                await next()
            }else{
            ctx.response.redirect('/admin/login')
            }
        }
    }
}

module.exports = AdminMiddleware

