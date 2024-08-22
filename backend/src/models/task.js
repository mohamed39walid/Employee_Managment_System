const mongoose = require("mongoose")


const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    files:{
        filename:{
            type:String,
            required:false
        },
        path:{
            type:String,
            required:false
        }
    },
    status:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required: false
    },
    employee_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    }
},{timestamps:true})


const Task = mongoose.model("Task",taskSchema)


module.exports = Task