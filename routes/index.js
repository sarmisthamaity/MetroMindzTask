const router = require('express').Router();
const signupRoute = require('./signup.route');
const loginRoute = require('./login.route');
const userRoute = require('./user.routes');
// const itemRoute = require('./items.route');
// const itemlistRoute = require('./itemlist.route');
// const itemdelRoute = require('./itemdel.route');


router.use('/', signupRoute);
router.use('/', loginRoute);
router.use('/', userRoute);
// router.use('/edit', itemRoute);
// router.use('/', itemlistRoute);
// router.use('/', itemdelRoute);


module.exports = router;