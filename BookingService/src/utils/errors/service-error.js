const {StatusCodes} = require('http-status-codes');



class ServiceError extends Error {
    constructor(
        message = 'Something went wrong', 
        explaantion = 'Service Layer Error', 
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = "ServiceError",
        this.message = message,
        this.explaantion = explaantion
    }
}

module.exports = ServiceError;