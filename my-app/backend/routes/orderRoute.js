const router = require('express').Router();
const { model } = require('mongoose');
const Order = require('../models/order_details.model');
const Customer = require('../models/customer.model')

router.route('/getAll').get((req,res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post((req,res) => {
    const newOrder = new Order({
        customer_email: req.body.customer_email,
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        sub_category: req.body.sub_category,
        is_payed: false
    })
    newOrder.save()
        .then(() => res.json("Order Successfully Added."))
        .catch((err) => res.status(404).json("Error "+err));
})

router.route('/getOne').post((req,res) => {
    Order.find(req.body)
        .then(Orders => res.json(Orders))
        .catch(err => res.status(400).json('Error:'+ err))

})

// router.route('/getAllWithStudentData').post((req,res) => {
//     Order.aggregate([
//         {
//             $lookup: {
//                 from: "students",
//                 localField: "email",
//                 foreignField: "email",
//                 as: "item"

//             }
//         },
//         { $unwind: "$item"},
//         {
//             $project: {
//                 "_id": 1,
//                 "name": "$item.name",
//                 "email": 1,
//                 "Order": 1,
//                 "subject": 2,
//                 "enrollNo": "$item.enrollNo",
//                 "mobileNo": "$item.mobileNo",
//                 "address": "$item.address"
//             }
//         },
//         {
//             $match: req.body.queries
//         },
//         {
//             $sort: req.body.sorting
//         }
//     ])
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json('Error'+err));

// })

router.route('/update').patch(async(req,res) => {
    await Order.updateOne({
        email: req.body.email,
        subject: req.body.subject
    }, {
        $set: {
            Order: req.body.Order
        }
    })
        .then(student => res.json(student))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Order.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;