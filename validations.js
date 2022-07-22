import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Email format is incorrect').isEmail(),
    body('password', 'Password must have minimum 5 symbols').isLength({min: 5 }),
    
]

export const registerValidation = [
    body('email', 'Email format is incorrect').isEmail(),
    body('password', 'Password must have minimum 5 symbols').isLength({min: 5 }),
    body('fullName', 'Name must have minimum 3 symbols').isLength({min: 3}),
    body('avatarUrl', 'Incorrect format of URL').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({min: 10 }).isString(),
    body('tags', 'Invalid tag format (Specify an array).').optional().isString(),
    body('imageUrl', 'Incorrect format of URL').optional().isString(),
]