
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "The password must be at least 6 characters long"],
        minlength: 6
    }
});

// Hashing password before saving
UserSchema.pre("save", async function (next) {
    if ( this.isModified("password") ) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }

    next();
} );

// Static method to login user
UserSchema.statics.login = async function (email, password) {
    // Find the user by email address from the request body
    const user = await this.findOne({ email });
    // if the user exist, get the password and compare it with the hashed password in the db
    if ( user ) {
        const auth = await bcrypt.compare(password, user.password);
        // if the password is correct, return the user
        if ( auth ) {
            return user;
        }
        throw new Error("Incorrect password");
    }
    throw new Error("Incorrect Email");
}

// User Model
export const User = mongoose.model("User", UserSchema);
