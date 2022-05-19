// Helps to provide authentication in the project

// Verifies the token for staff user.

async function getProductById(params) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({product_id: params.product_id})
    };
    
    return await fetch('http://localhost:5000/product/getProductById',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "Failed";
    })
}

async function getAllProducts(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    };
    
    return await fetch('http://localhost:5000/product/getAllByCategory',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "FailedbHelper/getAlld";
    })
}

module.exports = { getProductById, getAllProducts };