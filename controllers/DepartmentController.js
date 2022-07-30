import DepartmentModel from '../models/Department.js'

export const getAll = async (req, res) => {
    try{
        const department = await DepartmentModel.find().populate('user').exec()
        res.json(department)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve department',
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const departmentId = req.params.id
       
        DepartmentModel.findOneAndUpdate({
            
            _id: departmentId
            
        },
        (err, doc) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    message: 'Unable to return department',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'Department not found'
                })
            }
            res.json(doc)
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve departmentss',
        })
    }
}
//====================

export const remove = async (req, res) => {
    try{
        const departmentId = req.params.id
        DepartmentModel.findOneAndDelete({
            _id: departmentId
        },
        (err,doc)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Failed to delete department',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'Department not found'
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
            message: 'Failed to retrieve departments',
        })
    }
}

//====================
export const create = async (req, res) => {
    try {
        const doc = new DepartmentModel({
            departmentName: req.body.departmentName,
            user: req.userId,
        })

        const department = await doc.save()

        res.json(department)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to create department',
        })
    }
}

export const update = async (req, res) => {
    try{
        const departmentId = req.params.id
        await DepartmentModel.updateOne({
            _id: departmentId
        },{
            departmentName: req.body.departmentName,
            user: req.userId,
            
        })
        res.json({
            success: true 
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to update department',
        })
    }
}