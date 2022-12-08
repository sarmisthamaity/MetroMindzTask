const userService = require('../services/user.services')
const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
const userModel = require('../models/users.model');
const Joi = require('joi');

const passwordReset = async(req, res, next) => {
    try {
        const userPassword = req.body;
        const userData = req.tokenData;
        if(userPassword.currentPassword) {
          if(userPassword.currentPassword === userPassword.newPassword) {
            return res.status(300).send({ message: 'samePassword' });
          }
        }
    
        if (userPassword.newPassword == undefined || userPassword.newPassword == '') {
          return res.status(300).send({ message: 'newPassword' });

        }
    
        if (userPassword.confirmPassword == undefined || userPassword.confirmPassword == '') {
          return res.status(300).send({ message: 'cPassword' });

        }
        
        if (!(userPassword.newPassword.match(passRegex)) && !(userPassword.confirmPassword.match(passRegex))) {
          return res.status(401).send({ message: 'password should contain capital letter, small letter, one digit, one special character and must be 8 character' });
        }

        if (userPassword.newPassword != userPassword.confirmPassword) {
          return res.status(401).send({ message: 'notMatchNewPasswordAndCpassword' });
        }
        
        const passwordSet =  await userService.resetPassword(userData, userPassword);
        console.log('passwordSet', passwordSet);
        if(passwordSet === 'both password are same, enter new password') {
          return res.status(200).json({ message: 'both password are same, enter new password' });
        } else { 
          return res.status(200).json({ message: 'password set successully' });

        }
      } catch (error) {
        next(error);
      }
}

const editUserProfile = async (req, res, next) => {

    try {
        if (req.file) {
          req.file.path = 'localhost:3000/' + req.file.path;
        }
    
        if (!req.file) {
            req.file.path = null;
        }

        let existingData = await userModel.findOne({ email: { $regex: req.tokenData.email, $options: 'i' } })
        existingData.profilePicture = req.file
        const updateData = await userModel.findOneAndUpdate({ userId: req.tokenData.userId }, existingData, { new: true });

        return res.status(202).send({
          status: 202,
          updateData
        });

    } catch (err) {
        console.log(err);
        return res.status(300).send({
            status: 300,
            error: err
        });
    };
};

const editUserData = async (req, res, next) => {

  const userSchema = Joi.object({
    userName: Joi.string().min(3).max(20),
    email: Joi.string(),
    gender: Joi.string(),
    role: Joi.string(),
    status: Joi.string(),
    phone: Joi.number()
  });

  const data = {
    userName: req.body.userName,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
    role: req.body.role,
    phone: req.body.phone
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

  try {

      let existingData = await userModel.findOne({ email: { $regex: req.tokenData.email, $options: 'i' } });

      if (req.body.status || req.body.userName || req.body.phone || req.body.gender || req.body.role) {
        existingData.status = req.body.status
        existingData.role = req.body.role
        existingData.userName =  req.body.userName
        existingData.phone =  req.body.phone
        existingData.gender =  req.body.gender
      }

      const updateData = await userModel.findOneAndUpdate({ userId: req.tokenData.userId }, existingData, { new: true });

      return res.status(202).send({
        status: 202,
        updateData
      });

  } catch (err) {
      console.log(err);
      return res.status(300).send({
        status: 300,
        error: err
      });
  };
};

const userList = async(req, res, next) => {

  try {
    const lists = await userModel.find({}).sort({ userName: 1});
    return res.staus(200).json({
      mesage: lists
    })

  } catch(err) {
    console.log(err);
    return res.staus(400).json({
      error: err
    })
  }
}

const deletUser = async(req, res, next) => {
  try{

    const deleteUser = await userModel.findAndDelete({ email: req.tokenData.email});
    return res.status(200).json({ message: 'data deleted successfully'})
  } catch(err) {
    console.log(err);
    return res.status(400).json({ mesage: 'user Deleted'})
  }
}


module.exports = {
  passwordReset,
  editUserProfile,
  editUserData,
  userList,
  deletUser
}
