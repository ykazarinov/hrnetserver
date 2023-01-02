import express from 'express';
// import 'dotenv/config'
// библиотека генерации токена
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'
import {registerValidation, loginValidation, employeeCreateValidation, stateCreateValidation, departmentCreateValidation} from './validations.js'

import {UserController, EmployeeController, StateController, DepartmentController, ImagesController} from './controllers/index.js'

import {handleValidationErrors, checkAuth, cacheCreator} from './utils/index.js'

import {isFileCorrect} from './utils/index.js'

// require('dotenv').config()
mongoose.connect(
    //test
    // process.env.DB_ACCESS
    'mongodb+srv://admin:GyccV8HSloqpIU3z@cluster0.hgxapfo.mongodb.net/hrnet?retryWrites=true&w=majority'
).then(()=>{console.log('DB ok')})
.catch((err)=>{console.log('DB error: ', err)})

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        if(!fs.existsSync('uploads')){
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads');
    },
    filename(_, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.set('environment', 'development'); 

// чтобы экспресс понимал запросы в формате json
app.use(express.json())
app.use(cors())
// экспресс ищет в папке картинок загруженную картинку и создает роут
app.use('/uploads', express.static('uploads'))

app.use(cacheCreator)

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', handleValidationErrors, registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth,  upload.single('image'), isFileCorrect, (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/employees', EmployeeController.getAll)
app.get('/employees/:id', EmployeeController.getOne)
app.post('/employees', checkAuth, employeeCreateValidation, handleValidationErrors, EmployeeController.create)
app.delete('/employees/:id', checkAuth, EmployeeController.remove)
app.patch('/employees/:id', checkAuth, employeeCreateValidation, handleValidationErrors, EmployeeController.update)

app.get('/states', StateController.getAll)
app.get('/states/:id', StateController.getOne)
app.post('/states', checkAuth, stateCreateValidation, handleValidationErrors, StateController.create)
app.delete('/states/:id', checkAuth, StateController.remove)
app.patch('/states/:id', checkAuth, stateCreateValidation, handleValidationErrors, StateController.update)

app.get('/departments', DepartmentController.getAll)
app.get('/departments/:id', DepartmentController.getOne)
app.post('/departments', checkAuth, departmentCreateValidation, handleValidationErrors, DepartmentController.create)
app.delete('/departments/:id', checkAuth, DepartmentController.remove)
app.patch('/departments/:id', checkAuth, departmentCreateValidation, handleValidationErrors, DepartmentController.update)

app.delete('/uploads/:imageName', checkAuth, ImagesController.remove)

app.listen(4000 , (err)=>{
    if(err){
        console.log(err)
    }
    console.log('Server OK')
})