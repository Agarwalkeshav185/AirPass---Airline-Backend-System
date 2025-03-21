'use strict';
const {
  Model
} = require('sequelize');

const {SALT} = require('../config/serverConfig');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {
        through : 'User_Roles'
      });
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate :{
        isEmail:true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,100]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // Using Bcrypt to Encrypt the password send by the user before storing it into 
  // database because developers have all the access to the database then this will 
  // comes under the privacy breach if password is not encypted.
  User.beforeCreate((user)=>{
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  });
  return User;
};