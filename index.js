import express from 'express';
// библиотека генерации токена
import mongoose from 'mongoose'
import multer from 'multer'
import {registerValidation, loginValidation, postCreateValidation} from './validations.js'

import {UserController, PostController} from './controllers/index.js'

import {handleValidationErrors, checkAuth} from './utils/index.js'

mongoose.connect(
    'mongodb+srv://admin:GyccV8HSloqpIU3z@cluster0.hgxapfo.mongodb.net/hrnet?retryWrites=true&w=majority',
).then(()=>{console.log('DB ok')})
.catch((err)=>{console.log('DB error: ', err)})

// экспресс приложение
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename(_, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

// чтобы экспресс понимал запросы в формате json
app.use(express.json())
// экспресс ищет в папке картинок загруженную картинку и создает роут
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', handleValidationErrors, registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(4444, (err)=>{
    if(err){
        console.log(err)
    }
    console.log('Server OK')
})