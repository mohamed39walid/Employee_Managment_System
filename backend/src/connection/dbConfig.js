const mongoose = require('mongoose')


const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://crud_operation_mern:Mern123@merncrud.rgveawz.mongodb.net/employee_system?retryWrites=true&w=majority&appName=merncrud')
        console.log("connected to the db successfully!")
        } catch (error) {
        console.log("error in db connection: ",error.message)
    }
}

module.exports = connectDB