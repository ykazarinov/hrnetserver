import StateModel from '../models/State.js'

export const getAll = async (req, res) => {
    try{
        const state = await StateModel.find().populate('user').exec()
        res.json(state)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve state',
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const stateId = req.params.id
       
        StateModel.findOneAndUpdate({
            
            _id: stateId
            
        },
        (err, doc) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    message: 'Unable to return state',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'State not found'
                })
            }
            res.json(doc)
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve states',
        })
    }
}
//====================

export const remove = async (req, res) => {
    try{
        const stateId = req.params.id
        StateModel.findOneAndDelete({
            _id: stateId
        },
        (err,doc)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Failed to delete state',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'State not found'
                })
            }
            res.json({
                success: true
            })
        })
       
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve states',
        })
    }
}

//====================
export const create = async (req, res) => {
    try {
        const doc = new StateModel({
            stateName: req.body.stateName,
            user: req.userId,
        })

        const state = await doc.save()

        res.json(state)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to create state',
        })
    }
}

export const update = async (req, res) => {
    try{
        const stateId = req.params.id
        await StateModel.updateOne({
            _id: stateId
        },{
            stateName: req.body.stateName,
            user: req.userId,
            
        })
        res.json({
            success: true 
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to update state',
        })
    }
}