const openCheckout = (urlProvidedByService, paymentID) => {
    const options = {
        paymentSuccess: () => {
            window.location = "/payment/" + paymentID;
        },
        paymentFail: () => {console.log("Payment fail")},
        iframeFallback: () => {
            window.location = "/failed";
        },
        changeOrder: () => {
            window.location = "/";
        }
    }

    window.CheckoutBexs(urlProvidedByService, 'iframe', options);
};

export default openCheckout;
