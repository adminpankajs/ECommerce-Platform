const router = require('express').Router();
const { model } = require('mongoose');
const Product = require('../models/product.model');
const DbHelper = require('../models/dbHelper.model')

router.route('/getAll').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/getAllByCategory').post((req,res) => {
    Product.find(req.body)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/getProductById').post((req,res) => {
    Product.find({product_id : req.body.product_id})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error:'+err))
})

router.route('/add').post(async (req,res) => {
    await DbHelper.find().then(obj => {

        const newProduct = new Product({
            product_id: parseInt(obj[0].product_counter)+1,
            seller_id: req.body.seller_id,
            product_name: req.body.product_name,
            product_type: req.body.product_type,
            sub_category: req.body.sub_category,
            product_img_link: req.body.product_img_link,
            launch_date: new Date(),
            oem_address: req.body.oem_address,
            oem_mobileNo: req.body.oem_mobileNo,
            product_details: req.body.product_details
        })
        newProduct.save()
            .then(async (result) => { 
                await DbHelper.updateMany({

                },{
                    $set : {
                        product_counter : parseInt(obj[0].product_counter)+1
                    }
                })
                res.json(result); 
            })
            .catch((err) => res.status(404).json("Error "+err));
    })

})

router.route('/update').post((req,res) => {
    Product.updateOne({
        name: req.body.name
    }, {
        $set: req.body
    })
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err))
})

router.route('/delete').delete((req,res) => {
    Product.deleteOne(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Product.deleteMany()
        .then(result => {
            process.env.productTableCounter = 0;
            res.json(result);
        })
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;