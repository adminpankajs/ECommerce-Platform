import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './tvProductList.css';
var constants =  require('../../../constants/constants');
const ProductService = require("../../../services/ProductService.js");

export default function TvProductList(props) {
    const [products, setProducts] = useState([])
    const { sub_category }  = useParams();
    useEffect(() => {
        const params = {
            sub_category : constants.imagesHelper[sub_category]
        };
        ProductService.getAllProducts(params)
            .then((res)=> {
                setProducts(res);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])

    return (
        <div style={{zIndex: "0"}}>
            <h1 id="tv-main" className="center-text heading1">Televisions</h1> 
            <div className="product-grid">

            {products.map((product) => (
                <div>
                    <a href={`/product/view/${product.product_id}`}>
                        <div className="product-grid-item">
                            <div className="product-grid-item-img">
                                <img className="product-grid-item-img-props" alt="Error" src={constants.websiteProductImages+`${constants.imagesHelper[product.sub_category]}/${product.product_img_link}`}></img>
                            </div>
                            <div className="product-grid-item-details">
                                <div>
                                    {product.product_name}
                                </div>
                                <div style={{float: "right"}}>
                                    Rs. {Number(product.product_details.price).toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            ))}

            <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/samsung_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            Samsung Smart TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 56,500
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>





                <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/samsung_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            Samsung Smart TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 56,500
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>
                <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/onida_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            Onida TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 44,000
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>
                <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/mi_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            Mi Android TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 34,200
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>
                <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/lg_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            LG 3D TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 54,000
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>
                <a href="/product/view">
                <div className="product-grid-item">
                    <div className="product-grid-item-img">
                        <img className="product-grid-item-img-props" src={constants.websiteProductImages+'/tv/sony_tv.jpg'}></img>
                    </div>
                    <div className="product-grid-item-details">
                        <div>
                            Sony Bravia OLED TV
                        </div>
                        <div style={{float: "right"}}>
                            Rs. 97,000
                        </div>
                    </div>
                    {/* <div style={{float: "right"}}>
                        <button className="product-buy-link">Quick Look</button>
                    </div> */}
                </div>
                </a>
            </div>
        </div>
    )
}