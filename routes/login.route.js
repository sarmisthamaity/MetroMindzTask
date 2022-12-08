const router = require('express').Router();
const { loginController } = require('../controller/index');

router.post('/login', loginController.userLogin);

module.exports = router;