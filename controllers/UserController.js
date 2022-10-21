import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import UserModel from '../models/User.js'

export const register = async (req, res) => {

    try{
        
        const password = req.body.password  
        const salt = await bcrypt.genSalt(10) // алгоритм шифрования 
        const hash = await bcrypt.hash(password, salt) // зашифрованный пароль
        
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash
        })

        
        
        const user = await doc.save() // сохраненный юзер в базе

        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_CODE, {
            expiresIn: '30d'
        })

        const {passwordHash, ...userData} = user._doc
        
            res.json({
                ...userData,
                token,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'There is a problem with registration new user',
        })
    }
    
}

export const login = async (req, res) => {
    try{

        if (req.Headers.AllKeys.Contains("Origin") && req.HttpMethod == "OPTIONS")
        {
            res.Flush();
        }
        const user = await UserModel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({message: 'User does not exist'})
        }
        const isValidPass  = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json({message: 'Wrong login or password'})
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_CODE, {
            expiresIn: '30d'
        })

        const {passwordHash, ...userData} = user._doc
        
        res.json({
            ...userData,
            token,
})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'There is a problem with authorisation',
        })
    }
}

export const getMe = async (req, res) => {

    try{
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(404).json({
                message: 'User not find'
            })
        }
        const {passwordHash, ...userData} = user._doc
        
            res.json(userData)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'No access',
        })
    }
}