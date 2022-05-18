// Helps to provide authentication in the project

// Verifies the token for staff user.
function AuthTokenStaff(params) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({accessToken: params})
    };
    
    return fetch('http://localhost:5000/product/getProductById',requestOptions)
    .then(res => res.json())
    .then(res => {
        return res;
    })
    .catch((err) => {
        return "TokenFailed";
    })
}
