const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {

    // Validate Data before save
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user is already in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ status: "Error", message: 'Email already exist' })

    // save data if not error validation
    const user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'Data register created',
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed to register',
                data: []
            })
        })

})

module.exports = router