import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true
       
    },
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   
    
},{ timestamps: true})

export default mongoose.model('Department', DepartmentSchema)