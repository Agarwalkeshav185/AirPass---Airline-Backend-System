

const validateUserAuth = async (req, res, next) => {
    if(!req.body.email || 
        !req.body.password
    ){
        return res.status(400).json({
            data: {},
            success:false,
            err : 'Something went wrong',
            message:'Email or password missing in the request'
        });
    }

    next();
}

const validateIsAdminRequest = async (req, res, next) =>{
    if(!req.body.id){
        return res.status(400).json({
            data: {},
            success:false,
            err: 'User id not given',
            message:'Something went wrong'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}