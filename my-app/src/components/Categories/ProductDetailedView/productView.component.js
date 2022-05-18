import React, { useState } from "react";
import './productView.css';
import '../../../constants/constants.css'
var constants = require("../../../constants/constants.js")

export default function ProductDetailedView() {
    const [product, setProduct] = useState({});
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(myparams)
    };

    fetch(`${constants.backendApiUrl}'/product/getProductById`,requestOptions)
        .then(res => res = res.json())
        .then(res => {
            setProduct(res);
        })
        .catch((err) => {
            setProduct({});
            console.log(err);
        })

    return(
        <div className="product-view-main">
            <div className="product-view-grid">
                <div className="product-view-img">
                    <img className="product-view-img-props"  src={constants.websiteProductImages+'/tv/tv_product_1.jpeg'}></img>
                </div>
                <div className="product-view-details">
                    <div><b>Samsung UHD Smart 4K TV</b></div>
                    <div style={{fontSize:"1.25vw"}}>PQCV123F50</div>
                    <br></br>
                    <div>
                        Features
                        <pre></pre>
                        <div style={{fontSize: "1vw"}}>
                            *Brand New Color Engine
                            <br></br>
                            *No Cost EMI starts from ₹ 4624.17/ month.
                            <br></br>
                            *Crystal Display and HDR
                            <br></br>
                            *Adaptive Sound & Q Symphony
                            <br></br>
                            *Multiple Voice Assistant with One Remote Control
                            <br></br>
                        </div>
                    </div>
                    <div className="product-buy">
                        <button className="product-buy-button">Add to Cart</button>
                        <button className="product-buy-button websiteButton1">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}