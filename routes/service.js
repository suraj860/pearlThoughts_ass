let express = require('express');
let router = express.Router();
let emailController = require('../controller/emailController')

// send email
router.get('/send/email', emailController.emailNotification);

module.exports = router;
