// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.getRegister);
router.post('/register', authController.register);

router.get('/login', authController.getLogin);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/change-password', authController.getChangePassword);
router.post('/change-password', authController.changePassword);

router.get('/forgot-password', authController.getForgotPassword);
router.post('/forgot-password', authController.forgotPassword);

router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
