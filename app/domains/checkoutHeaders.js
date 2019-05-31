module.exports = (token_type, access_token) => {
    return {
        "headers": {
            "content-type": "application/json",
            "Authorization": token_type + " " + access_token
        }
    }
}