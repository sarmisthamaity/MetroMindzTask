const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const Auth = require('../middlware/token');

const loginServices = async(dataValidationWithJoi) => {
    console.log('dataValidationWithJoi', dataValidationWithJoi)

    try{
        const existUser = await userModel.findOne({email: dataValidationWithJoi.email});
        const checkPassword = await bcrypt.compare(dataValidationWithJoi.Password, existUser.Password);
        dataValidationWithJoi.userId = existUser._id
        const token = await Auth.createToken(dataValidationWithJoi);
        const resData = {
            message: 'login succesfull',
            token
        }
        if(checkPassword){
            return resData;

            // return res.status(200).send({
            //     status: 200,
            //     message: 'login succesfull',
            //     token
            // });
        } else {
            return 'email or password not exists'
            // return res.status(303).send({
            //     status: 303,
            //     message: 'email or password not exists'
            // });
        };
    } catch(err){
        console.log(err);
        return err;
        // return res.status(500).send({
        //     status: 500,
        //     error: err
        // });
    };
}

module.exports = {
    loginServices
}