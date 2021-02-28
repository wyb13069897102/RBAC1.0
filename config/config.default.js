var config = {}
config.keys = '123456'

config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.html': 'nunjucks',
    },
}

config.mongoose = {
    client:{
        url: 'mongodb://127.0.0.1:27017/rbac202011',
        options: {useUnifiedTopology: true},
    }
};

config.session = {
    key: 'EGG_SESS',
    maxAge:  24 * 3600 * 1000, 
    httpOnly: true,
    encrypt: true,
};


config.middleware= [ 'adminAuth' ],
  
    // 配置 gzip 中间件的配置
config.adminAuth= {
      enable:true,
      match:'/admin'
    },

module.exports = config