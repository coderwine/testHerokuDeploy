require('dotenv').config();

let express = require('express');
let router = express.Router();      
let sequelize = require('../db');
let Tester = sequelize.import('../models/testmodel'); 
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken'); 

router.post('/createtest', function (req, res) {

    let username = req.body.test.username;
    let pass = req.body.test.password;

    Tester.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)

    }).then(
        function createSuccess(tester) {
            let token = jwt.sign({id: tester}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                tester: tester,
                message: 'tester created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message)
        }
    );
});

router.post('/signin', (req, res) => {
    Tester.findOne( {where: {
        username: req.body.test.username }
    }).then(
        function(tester) {
            if(tester) {
                bcrypt.compare(req.body.test.password, tester.pasword, function (err, matches) {
                    if(matches) {
                        let token = jwt.sign({id: tester.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.jjson({
                            user: tester,
                            message: "authenticated!!!",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "Failure"})
                    }
                });
            } else {
                res.status(500).send({ error: 'failed to authenticate'});
            }
        },
        function (err) {
            res.status(501).send({ error: 'Failed'})
        }
    );
});

module.exports = router;