import mongoose from "mongoose";

const StateSchema = mongoose.Schema({
    stateName: {
        type: String,
        required: true,
   
   
    },
    stateAbbreviation: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   
    
},{ timestamps: true})

export default mongoose.model('State', StateSchema)