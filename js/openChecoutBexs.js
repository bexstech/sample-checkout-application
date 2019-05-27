const openCheckout = (urlProvidedByService) => {
    const options = {
        paymentSuccess: () => {console.log("Payment Success")},
        paymentFail: () => {console.log("Payment fail")},
        iframeFallback: () => {
            console.log("Fallback Iframe");
        },
        changeOrder: () => {
            console.log("Change Order");
        }
    }

    window.CheckoutBexs(urlProvidedByService, 'iframe', options);
};

export default openCheckout;