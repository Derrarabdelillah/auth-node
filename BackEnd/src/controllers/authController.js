import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// Handle Errors
const handleErrors = (err) => {
    let errors = { username: "", email: "", password: "" };

    // Duplicate Error Code
    if ( err.code ===  11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // Validation Errors
    if ( err.message.includes("User validation failed") ) {
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        } )
    };

    return errors;
}

// Max Age
const maxAge = 3 * 24 * 60 * 60;

// Create Token
const createToken = (id) => {
    return jwt.sign( { id }, "Abdelilah Developer Secret Key", { expiresIn: maxAge } );
}

export const signUp_get = (req, res) => {
    res.send("Sign Up ROute")
};

export const signUp_post = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });

        // Create Token
        const token = createToken( user._id );
        console.log(token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(201).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

export const login_get = (req, res) => {
    res.send('Login GET route');
};

export const login_post = async (req, res) => {
    res.send('Login Post route');
};