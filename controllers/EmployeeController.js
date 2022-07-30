import EmployeeModel from '../models/Employee.js'

export const getAll = async (req, res) => {
    try{
        const employees = await EmployeeModel.find().populate('user').populate('state').populate('department').exec()
        res.json(employees)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve articles',
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const employeeId = req.params.id
       
        EmployeeModel.findOneAndUpdate({
            
            _id: employeeId
            
        },
        (err, doc) =>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    message: 'Unable to return article',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
            res.json(doc)
        }
        )
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to retrieve articles',
        })
    }
}
//====================

export const remove = async (req, res) => {
    try{
        const employeeId = req.params.id
        EmployeeModel.findOneAndDelete({
            _id: employeeId
        },
        (err,doc)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Failed to delete article',
                })
            }
            if(!doc){
                return res.status(404).json({
                    message: 'Article not found'
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
            message: 'Failed to retrieve articles',
        })
    }
}

//====================
export const create = async (req, res) => {
    try {
        const doc = new EmployeeModel({
            photo: req.body.photo,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
            startday: req.body.startday,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            department: req.body.department,
            user: req.userId,
        })

        const employee = await doc.save()

        res.json(employee)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to create employee',
        })
    }
}

export const update = async (req, res) => {
    try{
        const employeeId = req.params.id
        await EmployeeModel.updateOne({
            _id: employeeId
        },{
            photo: req.body.photo,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
            startday: req.body.startday,
            street: req.body.street,
            city: req.body.city,
            state: req.stateId,
            zipcode: req.body.zipcode,
            user: req.userId,
            department: req.body.department,
            
        })
        res.json({
            success: true 
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to update article',
        })
    }
}