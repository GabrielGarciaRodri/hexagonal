const passport = require('passport');
const configPassportGoogleOAuth = require('../middlewares/googleOAuth');
const authController = require('../controllers/loginController');
const express = require('express');
const path = require('path');
const router = express.Router();
configPassportGoogleOAuth(passport)


router.get("/", (req, res)=>{
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'src/index.html'));
})
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/calback',  authController.googleAuthCallback)


module.exports = router;