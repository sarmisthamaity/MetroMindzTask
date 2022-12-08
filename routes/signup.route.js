const router = require('express').Router();
// const {userController} = require('../controller/index');
const {signupController} = require('../controller/index');
// const upload = require('../middleware/uplo');
const upload = require('../middlware/upload');

router.post('/signup', upload.single('image'), signupController.userSignUp); //upload.any(),

module.exports = router;