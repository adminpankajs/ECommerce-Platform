import React, { useEffect, useState } from "react";
import './productView.css';
import '../../../constants/constants.css'
import { useParams } from "react-router-dom";
var constants = require("../../../constants/constants.js")
const ProductService = require("../../../services/ProductService.js");

export default function ProductDetailedView(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        product_details : {serial_no : '',features:[],price:0},
        product_name : '',
        product_img_link : 'blank',
        launch_date : ''
    });
    useEffect(() => {
        ProductService.getProductById({product_id : productId})
            .then((res)=> {
                if(res && res.length>0) {
                    setProduct({
                        product_details: res[0].product_details, 
                        product_name: res[0].product_name,
                        product_img_link: res[0].product_img_link,
                        launch_date: res[0].launch_date
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    },[])


    return(
        <div className="product-view-main">
            <div className="product-view-grid">
                <div className="product-view-img">
                    <img className="product-view-img-props" alt="Error loading image" src={`${constants.websiteProductImages}/tv/${product.product_img_link}`}></img>
                </div>
                <div className="product-view-details">
                    <div><b>{product.product_name}</b></div>
                    {/* <div style={{fontSize:"1.25vw"}}>PQCV123F50</div> */}
                    <div style={{fontSize:"1.25vw"}}>{product.product_details.serial_no}</div>
                    <br></br>
                    <div>
                        Features
                        <pre></pre>
                        <div style={{fontSize: "1vw"}}>
                            {
                                product.product_details.features.map((feature) => (
                                    <div>
                                        {feature}
                                        <br></br>
                                    </div>
                                )
                                )
                            }
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