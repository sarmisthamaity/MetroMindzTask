// const userController = require('../controller/users.controller');
const userModel = require('../models/users.model')
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;

const resetPassword = async(userData, userPassword) => {
    
    try {
        const existsUserData = await userModel.findOne({ email: { $regex: userData.email, $options: 'i' } });
        const checkPassword = await bcrypt.compare(userPassword.confirmPassword, existsUserData.Password);
        // console.log('hello password', checkPassword);
        let updateUserByEmail;
        if(checkPassword == false) {
            existsUserData.Password = userPassword.confirmPassword
            updateUserByEmail = await userModel.findOneAndUpdate(
                { email: { $regex: userData.email, $options: 'i' } },
                { $set: existsUserData },
                { returnOriginal: false, runValidators: true },
              );
            return updateUserByEmail;
        } else { 
            return 'both password are same, enter new password'
        }

    } catch (err) {
        console.log(err)
        return err;
    }
}

const decodeToken = (token) => {
    // const secretKey = SECRET_KEY;

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded._id;
    return userId;
  }

module.exports = {
    resetPassword,
    decodeToken
}
