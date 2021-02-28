module.exports  = (app)=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const accessSchema = new Schema({
       access_type:{type:Number , reqiure:true}, // 权限类型 1 2 3
       access_module:{type:String , default:''}, // 权限模块
       access_action:{type:String , default:''}, // 权限操作 2 3
       access_url:{type:String , default:''}, // 权限资源 
       access_desc :{type:String , default:''}, // 权限描述
       access_module_id:{type:mongoose.Mixed , default:''}, // 所属模块 顶级模块：'0', 具体某个模块：ObjectId
       data_sort:{type:Number , default:100}, // 数据排序用
       time_create:{type:Number , default:Date.now()}, // 数据创建时间
       data_status:{type:Number , default:1} // 1 有效 2 无效 
    })

    return mongoose.model('Access',accessSchema,'accesss')
}


