const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });
}
const register = async (req, res) => {
    const { name, phone, email, password, address, gender } = req.body;
    try {
        let user = null;
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'user already exist' });
        }

        // hash password
       
        const hashPassword = await bcrypt.hash(password,10);

        user = new User({
            name,
            phone,
            email,
            password: hashPassword,
            address,
            gender
        })
        await user.save();
        res.status(200).json({ success: true, message: "user created" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error" });
    }

};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        // check if  user exists or not
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" })
        }
        const token = generateToken(user);
        const userData = user.toObject(); // Convert Mongoose model to a plain object
        delete userData.password; // Remove the password field

        res.status(200).json({
            status: true,
            message: "Successfully logged in",
            token,
            data: userData
        });

    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to Login" });
    }
}
module.exports = { register, login };