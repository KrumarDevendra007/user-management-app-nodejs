const router = require('express').Router();
const { home, signup, login, changePassword, allUser, logout } = require('../controller/controller')
const User = require("../model/user.model")


router.get('/', home);

// signup -> post -> /signup /register -> user data databse save
router.post("/signup", signup);


// login -> post
router.post('/login', login);


// change password put
router.put('/changePassword', changePassword);

router.get('/allUser', allUser);


// logout get
router.get('/logout', logout);


module.exports = router;