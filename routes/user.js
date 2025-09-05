const express = require('express');
const {handleUserSighnUp, handleUserLogin} = require('../controllers/user')
const router = express.Router();


router.post('/login',handleUserLogin);
router.post('/', handleUserSighnUp);



module.exports = router;