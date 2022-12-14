const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (error,req,res,next) => {
    if(error instanceof CustomAPIError){
        return res.status(error.statusCode).json({msg:error.message})
    }
    
    return res.status(500).json({msg:'Internal server error , please try again'})
}

module.exports = errorHandlerMiddleware