const express = require('express');
const path = require('path');
const homeController = require('../controller/home');
const userController = require('../controller/userController');
const dashboardController = require('../controller/dashboard');
const router = express.Router();

router.get('/', userController.user_login);
router.post('/login/submit', userController.user_login_post);
router.get('/signup', userController.user_signup);
router.post('/signup/submit', userController.user_create);
router.get('/dashboard',dashboardController.dashboard);
router.get('/logout', userController.user_logout);

module.exports = router;