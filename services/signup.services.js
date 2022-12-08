const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
const salt = process.env.ROUNDSALT;

const signUpServices = async(SchemaValidation, phoneNumber, files) => {
    console.log(files, 'SchemaValidation')

    try{
        const existinguser = await userModel.findOne({$or: [{email: SchemaValidation.email}, {phonenumber: SchemaValidation.phonenumber}]});
        console.log('existinguser', existinguser);
        
        if(existinguser){
            return 'email or phone number exists';
            // return res.status(202).send({
            //     status: 202,
            //     message: 'email or phone number exists'
            // });
        }
        const hashpassword = await bcrypt.hash(SchemaValidation.Password, Number(salt)); //12
        
        const userData = {
            userName: SchemaValidation.userName,
            email: SchemaValidation.email,
            Password: hashpassword,
            gender: SchemaValidation.gender,
            role: SchemaValidation.role,
            status: SchemaValidation.status,
            phone: phoneNumber,
            profilePicture: files //datas.profilePicture,
            // image: datas.image
        };

        const saveUserData = await userModel.create(userData);
        return saveUserData;
        // return res.status(200).send({
        //     status: 200,
        //     message: 'data saved',
        //     saveUserData
        // });
    } catch(err){
        console.log(err);
        return err;
        // return res.status(500).send({
        //     status: 500,
        //     message: 'server error , enternal error'
        // });
    }
}

module.exports = {
    signUpServices
}