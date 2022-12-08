const Joi = require('joi');
const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
const { loginServices } = require('../services/lohin.services');

const userLogin = async(req, res) => {
    
    const dataValidation = Joi.object({
        email: Joi.string().email().required(),
        Password: Joi.string().regex(RegExp(passRegex)).min(8).max(20).required()
    });
    let dataValidationWithJoi = dataValidation.validate(req.body);
    if(dataValidationWithJoi.error){
        return res.status(400).send({
            status: 400,
            error: dataValidationWithJoi.error
        });
    } else{
        dataValidationWithJoi = dataValidationWithJoi.value;
    };

    const login = await loginServices(dataValidationWithJoi)

    if (login === 'email or password not exists') {
        return res.status(400).send({
            status: 400,
            message: 'email or password not exists',
        });
    } else {

        return res.status(200).send({
            status: 200,
            login
        });
    }

};


module.exports = {
    userLogin
};