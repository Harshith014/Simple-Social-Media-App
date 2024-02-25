// Import necessary modules
const express = require('express');
const router = express.Router();
const { Profile, UpdateProfile } = require('../controllers/AuthController');
const { userVerification } = require("../middlewares/AuthMiddleware");

// Define the route for displaying user profile
router.get('/profile',userVerification, Profile);

// Define the route for updating user profile
router.put('/profile', userVerification, UpdateProfile);

module.exports = router;
