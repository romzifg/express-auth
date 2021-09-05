const router = require('express').Router();
const User = require('../model/User');

// Validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    full_name: Joi.string().min(3).required(),
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', (req, res) => {

    // Validate Data before save
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

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