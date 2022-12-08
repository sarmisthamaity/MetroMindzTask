const router = require('express').Router();
const { userController } = require('../controller/index');
const Auth = require('../middlware/checkAuth');
const upload = require('../middlware/upload');

router.post('/resetPassword', Auth, userController.passwordReset);

router.post('/profileimg', upload.single('image'), Auth, userController.editUserProfile);

router.put('/editData', Auth, userController.editUserData);

router.get('/lists', Auth, userController.userList);

router.delete('/user', Auth, userController.deletUser);


module.exports = router;
