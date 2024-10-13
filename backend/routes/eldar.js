const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/* Model */
const UserModel = require('../models/userModel'); // Make sure this path is correct and the model exists

/* Middlewares */
const { isAuthenticated } = require('../middlewares/auth');

/* Functions */

/* Constants */

/* Utils */
const utils = require("../utils/constants");

//DONE
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, last_name, username } = req.body;

        const emailLowerCase = email.toLowerCase();
        const userExist = await UserModel.exists({ email: emailLowerCase });
        const user_Exist = await UserModel.exists({ username });

        if (userExist) {
            return res.status(400).json({ message: 'The email already exists' });
        }

        if (user_Exist) {
            return res.status(400).json({ message: 'The username is already taken' });
        }

        // Create the new user
        const newUser = new UserModel({
            email: emailLowerCase,
            password,
            name,
            last_name,
            username,
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {

        console.log("/register", error);
        return res.status(500).send({ message: "Could not create the user", error });
    }
});

//DONE
router.get('/get-user', [isAuthenticated], async (req, res) => {
    try {
        const findUser = await UserModel.findById(req.userId).select('username last_name name createdAt rol');

        if (!findUser) {
            return res.status(404).send({ message: "User does not exist" });
        }

        return res.status(200).send({ findUser });
    } catch (error) {
        console.log("/get-user", error);
        return res.status(500).send({ message: "Error fetching user" });
    }
});

//DONE
router.post('/login', [], async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database, including the password field
        const user_exist = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
        
        // If the user is not found, return a 404 error
        if (!user_exist) return res.status(404).send({ message: `Invalid credentials` });

        // Compare the entered password with the one stored in the database using bcrypt
        const password_match = await bcrypt.compare(password, user_exist.password);
        
        // If the password does not match, return a 401 error (unauthorized)
        if (!password_match) return res.status(401).send({ message: 'Invalid credentials' });

        // Generate a JWT token with the user's id, using the secret key and set the expiration time to 2 hours
        const token = jwt.sign(
            { id: user_exist._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.status(200).send({
            message: 'Welcome Back ' + user_exist.username,
            token,
        });

    } catch (error) {
        console.log('Error /login', error);

        return res.status(500).send({
            message: 'An error occurred while logging in',
            error
        });
    }
});

//DONE
router.put('/update-user', [isAuthenticated], async (req, res) => {
    try {
        const { name, last_name, username } = req.body;

        // Verify that the required fields are not empty or blank strings
        if (!name || name.trim() === '' || 
            !last_name || last_name.trim() === '' ||
            !username || username.trim() === '') {
            
            return res.status(400).json({ message: "All fields are required and cannot be empty" });
        }

        const findUser = await UserModel.findById(req.userId);

        if (!findUser) {
            return res.status(404).send({ message: "User does not exist" });
        }

        // Check if the new username is already in use
        if (username && username !== findUser.username) {
            const usernameExists = await UserModel.exists({ username });
            if (usernameExists) {
                return res.status(400).json({ message: "The username is already in use. Please choose another one." });
            }
        }

        // Update the user with the new values
        await UserModel.findByIdAndUpdate(
            req.userId,
            { name, last_name, username },
            { new: true }
        );

        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.log("/update-user", error);
        return res.status(500).json({ message: "An error occurred while updating the user" });
    }
});

module.exports = router;
