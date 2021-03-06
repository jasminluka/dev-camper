const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../../../controllers/auth');

const { protect } = require('../../../middlewares/auth');

router
  .route('/register')
  .post(register);

router
  .route('/login')
  .post(login);

router
  .route('/me')
  .get(protect, getMe);

router
  .route('/logout')
  .get(logout);

router
  .route('/updatedetails')
  .put(protect, updateDetails);

router
  .route('/updatepassword')
  .put(protect, updatePassword);

router
  .route('/forgotpassword')
  .post(forgotPassword);

router
  .route('/resetpassword/:resetToken')
  .put(resetPassword);

module.exports = router;