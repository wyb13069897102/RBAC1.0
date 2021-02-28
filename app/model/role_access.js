module.exports  = (app)=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const RoleAccessSchema = new Schema({
       role_id : {type : mongoose.ObjectId , reqiure : true}, 
       access_id : {type : mongoose.ObjectId , reqiure : true}
    })

    return mongoose.model('RoleAccess',RoleAccessSchema,'RoleAccess')
}


