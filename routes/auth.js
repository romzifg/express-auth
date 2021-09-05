const router = require('express').Router();
const User = require('../model/User');

router.post('/register', (req, res) => {
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