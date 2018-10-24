var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController.js');

router.get('/',(req,res)=>{res.status(200).send('ok')})

router.post('/register',UserController.register);
router.post('/login',UserController.login);

router.use('/users',require('./UserRoutes.js'));
router.use('/threads',require('./ThreadRoutes.js'));
router.use('/comments',require('./CommentRoutes.js'));
router.use('/subComments',require('./SubCommentRoutes.js'));

module.exports = router;
