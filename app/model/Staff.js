module.exports  = (app)=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const staffSchema = new Schema({
        role_id:{type:mongoose.ObjectId,requried:true},  // 用户对应的角色（通过id）
        username:{type:String , requried:true},   // 用户账号
        password:{type:String , requried:true},   // 用户密码
        name:{type:String ,default:''},           // 用户名字
        no:{type:String ,default:''},             // 用户编号
        phone:{type:String , default:''},         // 用户手机号
        status:{type:Number , default:1},         // 用户转态
        time_create:{type:Number ,default: Date.now()},  // 创建时间
        time_last:{type:Number , default:Date.now()},    // 上一次登录时间
        ip_last:{type:String , default:''},         // 上一次登录ip
        is_super:{type:Boolean ,default:0},     // 超级管理员 1为超级管理员 0不是
    })

    return mongoose.model('Staff',staffSchema,'staffs')
}


