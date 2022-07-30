import mongoose from "mongoose";

const StateSchema = mongoose.Schema({
    stateName: {
        type: String,
        required: true,
   
    },
   
    
},{ timestamps: true})

export default mongoose.model('State', StateSchema)