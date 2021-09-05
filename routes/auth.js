const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    // Validate Data before save
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user is already in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ status: "Error", message: 'Email already exist' })

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // save data if not error validation
    const user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'Data register created',
                data: user._id
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed to register',
                data: []
            })
        })

})

router.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({
        status: "Error", message: 'Email is not found'
    })

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({
        status: "Error", message: 'Invalid password is wrong'
    })

    res.status(200).json({
        status: "Success",
        message: "Login Success"
    });

})

module.exports = router