const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const ClientError = require('../utils/Client-error');


class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    create = async (data) =>{
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError") {
                throw error;
            }
            console.log('Something went wrong in the service layer');
            throw {error};
        }
    }

    #createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn : '1h'});
            return result;
        } catch (error) {
            console.log('Something went wrong in token generation');
            throw{error};
        }

    }

    async signIn(email, plainPassword){
        try {
            const user = await this.UserRepository.getByEmail(email);

            const passwordMatch = this.#checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log('Password does not match');
                throw new ClientError(
                    'AuthenticationError',
                    'Invalid Credentials',
                    'Password does not match',
                    StatusCodes.BAD_REQUEST
                );
            }
            const newJWT = this.#createToken({email : user.email, id : user.id});
            return newJWT;
        } catch (error) {
            if(error.name == 'AttributeNotFound') throw error;
            console.log('Something went wrong in the signin process');
            throw error;
        }
    }

    #verifyToken(token){
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log('Something went wrong in token verification', error);
            throw{error};
        }
    }

    #checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('Something went wromg in the checking the password');
            throw {error};
        }
    }

    isAuthenticated = async (token) => {
        try {
            const response = this.#verifyToken(token);

            if(!response){
                throw {error:'Invalid token'};
            }
            const user = await this.UserRepository.getById(response.id);
            if(!user){
                throw {err:'No user with the corresponding exist'};
            }
            return user.id;
        } catch (error) {
            console.log('Something went wrong in the auth process');
            throw {err};
        }
    }

    async isAdmin(userId){
        try {
            return this.UserRepository.isAdmin(userId);
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async getUser(userId){
        try {
            const user = await this.UserRepository.getById(userId);
            return user;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

module.exports = UserService;