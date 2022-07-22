import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema({
    imageUrl: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },

    phone:  String,
        
    birthday: {
        type: String,
        required: true,
    },
    startday: {
        type: String,
        required: true,
    },
    street: String,
    city: String,
    // state: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'State',
    // },
    zipcode: Number,
    // department: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Department',
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
},{
    timestamps: true
})

export default mongoose.model('Employee', EmployeeSchema)