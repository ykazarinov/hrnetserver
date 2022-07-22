import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,

    },
    
},{ timestamps: true})

export default mongoose.model('User', UserSchema)