import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Email format is incorrect').isEmail(),
    body('password', 'Password must have minimum 5 symbols').isLength({min: 5 }),
    
]

export const registerValidation = [
    body('email', 'Email format is incorrect').isEmail(),
    body('password', 'Password must have minimum 5 symbols').isLength({min: 5 }),
   
]

export const employeeCreateValidation = [
    body('photo', 'Incorrect format of URL').optional().isString(),
    body('firstName', 'Minimal amount of symbols is 3').isLength({min: 3}).isString(),
    body('lastName', 'Minimal amount of symbols is 3').isLength({min: 3 }).isString(),
    body('email', 'Email format is incorrect').isEmail(),
    body('phone', 'Phone format is incorrect').optional({checkFalsy: true}).isMobilePhone(),
    body('birthday', 'Date format is incorrect').isDate(),
    body('startday', 'Date format is incorrect').isDate(),
    body('street', 'Minimal amount of symbols is 3').optional({checkFalsy: true}).isLength({min: 3}),
    body('city', 'Minimal amount of symbols is 3').optional({checkFalsy: true}).isLength({min: 3}),
    body('state', 'Minimal amount of symbols is 3').optional({checkFalsy: true}).isLength({min: 3}),
    body('zipcode', 'Minimal contity of symbols is 4').optional({checkFalsy: true}).isLength({min: 4}),
    body('department', 'Minimal amount of symbols is 3').optional({checkFalsy: true}).isLength({min: 3}),
    
]

export const stateCreateValidation = [
    body('stateName', 'Minimal amount of symbols is 3').isLength({min: 3}).isString(),
]

export const departmentCreateValidation = [
    body('departmentName', 'Minimal amount of symbols is 3').isLength({min: 3}).isString(),
]