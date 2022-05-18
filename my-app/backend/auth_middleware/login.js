const router = require('express').Router();
const Seller = require('../models/seller.model');
const Customer = require('../models/customer.model');
const jwt = require("jsonwebtoken")
const secretToken = "abc123"
var bcrypt = require('bcryptjs');

router.route('/Seller/generateToken').post(async(req,res) => {
    const Seller = await Seller.find({'email': req.body.email});
    if(Seller != "") {
        const validPass = await bcrypt.compare(req.body.password,Seller[0].password)
        if(validPass) {
            await jwt.verify(Seller[0].accessToken,secretToken,(err,verfiedJWT) => {
                if(err) {
                    const accessToken = jwt.sign(
                        {"email": Seller.email},
                        secretToken,
                        { expiresIn: '1d' }
                    );
                    Seller[0].accessToken = accessToken

                    Seller.updateOne({
                        email: Seller[0].email
                    }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                        .then(data => {
                            res.json(Seller);
                        })
                        .catch(err => console.log(err))

                }
                else {
                    res.json(Seller);
                }
            })
            
        }
    }
    else {
        res.json(Seller)
    }
})

router.route('/Customer/generateToken').post(async(req,res) => {
    const Customer = await Customer.find({'email': req.body.email});
    if(Customer != "") {
        const validPass = await bcrypt.compare(req.body.password,Customer[0].password)
        if(validPass) {
            await jwt.verify(Customer[0].accessToken,secretToken,(err,verfiedJWT) => {
                if(err) {
                    const accessToken = jwt.sign(
                        {"email": Customer.email},
                        secretToken,
                        { expiresIn: '1d' }
                    );
                    Customer[0].accessToken = accessToken

                    Customer.updateOne({
                        email: Customer[0].email
                    }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                        .then(data => {
                            res.json(Customer);
                        })
                        .catch(err => console.log(err))

                }
                else {
                    res.json(Customer);
                }
            })
            
        }
    }
    else {
        res.json(Customer)
    }
})


module.exports = router;