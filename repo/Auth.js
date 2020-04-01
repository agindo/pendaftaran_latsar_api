const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Peserta = require("../models/Peserta");
const { SECRET } = require("../config");

const userLogin = async (infoUser, res) => {
    // let { nip, password } = infoUser;
    // const user = await Peserta.findOne({ nip });
    // if (!user) {
    //     return res.status(404).json({
    //         message: "Nip is not found. Invalid login credentials",
    //         success: false
    //     });
    // }

    let { username, password } = infoUser;
    const user = await Peserta.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "Username is not found. Invalid login credentials",
            success: false
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email,
            instansi: user.instansi
        }, SECRET, { expiresIn: "7 days" });

        let result = {
            role: user.role,
            username: user.username,
            email: user.email,
            instansi: user.instansi,
            token,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: "Hurry! Your are now logged in",
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password",
            success: false
        });
    }
}

const userAuth = passport.authenticate("jwt", { session: false });

const validateEmail = async email => {
    let mail = await Peserta.findOne({ email });
    return mail ? false : true;
}

module.exports = { userAuth, userLogin };