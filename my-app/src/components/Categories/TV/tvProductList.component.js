import React, { useState } from "react";
import { Link } from "react-router-dom";
import './tvProductList.css';
var constants =  require('../../../constants/constants');

export default function TvProductList(props) {
    const [products, setProducts] = useState({})
    // setProducts({})
    return (
        <div style={{zIndex: "0"}}>
            <h1 id="tv-main" className="center-text heading1">Televisions</h1> 
            <div className="product-grid">
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