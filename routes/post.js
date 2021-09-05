const router = require('express').Router();
const verify = require('./verifiyToken');

router.get('/', verify, (req, res) => {
    const id = res.send(req.user)
    res.json({
        status: "Ok",
        desc: "Success fot use Token",
        data: id
    });
});

module.exports = router;