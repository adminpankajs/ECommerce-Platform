const router = require('express').Router();
const Customer = require('../models/customer.model');
var bcrypt = require("bcryptjs");


router.route('/getAll').get((req,res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);
    const name = req.body.name;
    const enrollNo = Number(req.body.enrollNo);
    const gender = req.body.gender;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const course = req.body.course;
    const address = req.body.address;
    const mobileNo = req.body.mobileNo;
    const accessToken = req.body.accessToken;

    const newCustomer = new Customer({
        customer_email: email,
        customer_password: password,
        customer_name : name,
        gender : gender,
        dateOfBirth : dateOfBirth,
        address: address,
        mobileNo: mobileNo,
        accessToken: accessToken
    });

    newCustomer.save()
        .then(() => res.json('New Customer added'))
        .catch(err => res.status(400).json('Error: '+err));
})

router.route('/getOne').post(async(req,res) => {
    Customer.findOne({email : req.body.name})
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error:'+ err))

        

})

router.route('/update').patch((req,res) => {
    Customer.updateOne({
        email: req.body.credentials.email
    }, {
        $set: req.body.data
    })
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json(err))
})

router.route('/delete').delete((req,res) => {
    Customer.deleteOne(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Customer.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;