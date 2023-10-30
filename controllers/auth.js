const user = require('../models/user');
const User =  require('../models/user')
const bcrypt = require('bcryptjs')
const {isEmail} = require('validator')

// register

const register = async (req, res ) => {
    const { email, username, password, profile} = req.body
    // protecting users password
    // hashing and salting
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const createdUser = await User.create({ 
            email,
            username,
            password: hashedPassword,
            profile})
        res.status(201).json ({success: true, createdUser})
    } catch (error) {
        console.log(error);
        res.json(error)
    }
    res.send('register user')
};

// login 
const login = async (req, res) => {
    // res.send('login user')
    // email and pasword
    const { email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'please provide necessary info'})
    }
    try {
        // check if the user is registered
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: 'user is not registered'})
        }

        //check if the password is correct
        const isAuthenticated = await bcrypt.compare(password, user.password)

        if (!isAuthenticated) {
            return res.status(401).json({success: false, message: 'Invalid credentials'})

        }

        res.status(200).json({success: true, user: {
            email: user.email, username: user.username, profilepic: user.profilepic
        }})


    } catch (error) {
        console.log(error);
        res.json(error)
    }
};

module.exports ={ register, login}


// login2 
const login2 = async (req, res) => {
    // res.send('login user')
    // email and pasword
    const { emailorUsername, password} = req.body

    const loginFun = isEmail(emailorUsername)
    if (loginFun) {
        const user = await User.findOne({email: emailorUsername})
        if (!user) {
            return res.status(400).json({ success: false, message: 'user not registered'})
        }
        const isAuthenticated = await bcrypt.compare(password, user.password)

        if (!isAuthenticated) {
            return res.status(401).json({success: false, message: 'Invalid credentials'})

        }

        res.status(200).json({success: true, user: {
            email: user.email, 
        username: user.username, 
        profilepic: user.profile
        }})

    }else {
        const user = await User.findOne({username: emailorUsername})
        if (!user) {
            return res.status(400).json({success: false, message: 'user not registered'})
        }
        const isAuthenticated = await bcrypt.compare(password, user.password)

        if (!isAuthenticated) {
            return res.status(401).json({success: false, message: 'Invalid credentials'})
    
        }
        res.status(200).json({success: true, user: {
            email: user.email, 
            username: user.username, 
            profilepic: user.profile
        }})
    }
   

    
}
module.exports ={ register, login, login2}

