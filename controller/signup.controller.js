require('dotenv').config();
const Joi = require('joi');
const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

const mobileNumber = require('../helper/phone');
const { signUpServices } = require('../services/signup.services');

const userSignUp = async(req, res) => {
    const datas = req.body;

    if (req.file) {
        req.file.path = 'localhost:3000/' + req.file.path;
    }

    if (!req.file) {
        req.file.path = null;
    }
    
    let files = req.file;
    
    const userSchema = Joi.object({
        userName: Joi.string().required().min(3).max(20),
        email: Joi.string().required(),
        Password: Joi.string().regex(RegExp(passRegex)).min(8).max(20).required(),
        gender: Joi.string().required(),
        role: Joi.string().required(),
        status: Joi.string().required(),
    });

    const validatedmobileNumber = await mobileNumber.regexPhoneNumber(req.body.phone);

    if(validatedmobileNumber == "invalid"){
        return res.status(300).send({
            status: 300,
            message: 'invalid mobile number'
        });
    }

    const data = {
        userName: datas.userName,
        email: datas.email,
        Password: datas.Password,
        gender: datas.gender,
        status: datas.status,
        role: datas.role,
    };
    let SchemaValidation = userSchema.validate(data);
    if(SchemaValidation.error){
        return res.status(400).send({
            status: 400,
            error: SchemaValidation.error.details[0].message
        });
    } else{
        SchemaValidation = SchemaValidation.value;
    };

    const register = await signUpServices(SchemaValidation, validatedmobileNumber, files);
    if (register === 'email or phone number exists') {
        return res.status(400).send({
            status: 400,
            message: 'user Already Exists',
        });
    } else {

        return res.status(200).send({
            status: 200,
            message: 'data saved',
            register
        });

    }

};


module.exports = { 
    userSignUp
};