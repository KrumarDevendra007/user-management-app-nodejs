const router = require('express').Router();
const { home, signup, login, changePassword, allUser, logout, getByName, getByCountry, userGreaterThenAge, userLessThenAge, notEqualTo, getUserByCountryOrAge, multipleQuery, userByNotAge, getUserByMaxMinAge } = require('../controller/controller')
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


// get user by name
router.get('/user/:name', getByName);

// get user by country
router.get('/country/:country', getByCountry);

// get user by age greater then
router.get('/greaterthen/:age', userGreaterThenAge);

// get user by age less then
router.get('/lessthen/:age', userLessThenAge);

// get user which is not-equal to
router.get('/notequal/:age', notEqualTo);


// get user by logical OR Operator
router.get('/logical/:country/:age', getUserByCountryOrAge);

// get user by logical AND Operator(multiple)
router.get('/query/:age', multipleQuery);

// get user by logical NOR Operat
router.get('/notage/:age', userByNotAge);


// get user by age in range of maximum and minimum 
router.get('/range/:minAge/:maxAge', getUserByMaxMinAge);



module.exports = router;