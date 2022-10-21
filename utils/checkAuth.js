import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Авторизован я или нет

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (req.Headers.AllKeys.Contains("Origin") && req.HttpMethod == "OPTIONS")
    {
        res.Flush();
    }

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.TOKEN_CODE)
            req.userId = decoded._id
            next()
        }
        catch(err){
            return res.status(403).json({
                message: 'No access'
            })
        }
    } else{
        return res.status(403).json({
            message: 'No access'
        })
    }

   
}