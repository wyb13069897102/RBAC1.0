module.exports = app =>{
    const {router , controller} =app
    //登录
    router.get('/',controller.client.index.welcome)
    router.get('/admin',controller.admin.index.home)
    router.get('/admin/welcome',controller.admin.index.welcome)
    router.get('/admin/login',controller.admin.login.login)
    router.get('/admin/drop',controller.admin.login.drop)
    router.get('/admin/veriy',controller.admin.login.veriy)
    router.post('/admin/dologin',controller.admin.login.dologin)
    //staff
    router.get('/admin/staff/list',controller.admin.staff.list)
    router.get('/admin/staff/add',controller.admin.staff.add)
    router.get('/admin/staff/edit',controller.admin.staff.edit)
    router.get('/admin/staff/delete',controller.admin.staff.delete)
    router.post('/admin/staff/doadd',controller.admin.staff.doadd)
    router.post('/admin/staff/doedit',controller.admin.staff.doedit)
    //role
    router.get('/admin/role/add',controller.admin.role.add)
    router.get('/admin/role/list',controller.admin.role.list)
    router.get('/admin/role/edit',controller.admin.role.edit)
    router.post('/admin/role/doadd',controller.admin.role.doadd)
    router.post('/admin/role/doedit',controller.admin.role.doedit)
    router.post('/admin/role/doauth',controller.admin.role.doauth)
    router.get('/admin/role/delete',controller.admin.role.delete)
    router.get('/admin/role/auth',controller.admin.role.auth)
    //access
    router.get('/admin/access/add',controller.admin.access.add);
    router.get('/admin/access/list',controller.admin.access.list);
    router.get('/admin/access/edit',controller.admin.access.edit);
    router.get('/admin/access/delete',controller.admin.access.delete);
    router.post('/admin/access/doadd',controller.admin.access.doadd);
    router.post('/admin/access/doedit',controller.admin.access.doedit);
}

