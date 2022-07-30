import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
       
    },
   
    
},{ timestamps: true})

export default mongoose.model('Department', DepartmentSchema)