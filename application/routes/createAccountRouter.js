const express = require('express');
const path = require('path');
const router = express.Router();


router.get("/", (req, res)=>{
    res.sendFile(path.join(process.env.EXPRESS_STATIC, 'views/sign-Up-3.html'));
})


module.exports = router;