module.exports = (app)=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const roleSechma = new Schema({
        role_name:{type:String , requried:true},   // 角色名称
        role_desc:{type:String , default:''},   // 角色描述
        time_create:{type:Number ,default: Date.now()},   // 创建时间
        data_status:{type:Number , default:1}   // 角色状态
    })
    return mongoose.model('Role',roleSechma,'roles');
}