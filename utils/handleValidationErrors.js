import {validationResult} from 'express-validator'


export default (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    next()
}

export const isFileCorrect = async(req, res, next) => {
    
    // console.log(req.file)
   
  
        // if (type != 'image/jpeg' && type != 'image/png') {
        //   document.querySelector(`input[data-testid="file"]`).value = ''
        //    console.log("invalid Image")
       
        // }else{
       
        //   console.log('good')
        // }
      
    next()
}