# 🏪 DEMO SHOP - Sample Application using Checkout Pay (Bexs PAY API + checkout-iframe.js)

This project is an Sample Application that shows how to integrate onto the Bexs Payment API with checkout module. Here are some practices to helps like an guide for developers.

Our official website for developers who wish to integrate with our services. [Developers Bexs](https://developers.bexs.com.br)

## Technologies used in this example application
[![Nodejs](/img_readme/nodejs.png)](https://nodejs.org/)
[![NPM](/img_readme/npm.png)](https://www.npmjs.com/)
[![ExpressJS](/img_readme/express.png)](https://expressjs.com/)
[![Axios](/img_readme/axios.png)](https://github.com/axios/axios)
[![Pugjs](/img_readme/pugjs.png)](https://pugjs.org/)
[![Stylus](/img_readme/stylus.png)](http://stylus-lang.com/)
[![Webpack](/img_readme/webpack.png)](https://webpack.js.org/)

The Technology of this Sample Application should not influence the decision of your Technological choice. The technologies chosen are popularly known and easily understood. It basically uses Javascript. 

We can summarize the roles of each technique used in this project in groups:
### Backend:
* Nodejs: Main programming language used (javascript on backend);
* Expressjs: Used to handle page requests from browser (as the middleware);
* Axios: A HTTP Client - through it we connect on Bexs Pay

### Frontend
* Pugjs: Minimalist HTML Template
* Stylus: A simple CSS preprocessor
* Webpack: It packs CSS and Javascript (just js of frontend) codes on a single bundle.

### Other:
* NPM: node package manager - similar to maven, nuget, gradle, dep, ivy, etc

## What you need to do before running this application
There is a preset to be made before running this application.
First you need to create the key combination to gain access to services on the sandbox environment (more info [here](https://developers.bexs.com.br/api/pay#section/Introduction/Creating-your-User-to-Sandbox)), to do so, visit our developer portal and clicking on Sandbox >>>> [Developers Bexs](https://developers.bexs.com.br).

After creating the keys, on root of this project contains a file named `.env`, fill on the variables according to the generated credentials `BEXS_API_CLIENT_ID` and `BEXS_API_CLIENT_SECRET`. We recommend when developing your real production application, use some technique to keep your key safe, preventing any leakage.

## Running application
* Install [Nodejs](https://nodejs.org/) higher version 9
* run `npm install` on terminal
* After installing, run `npm start`

Access on browser http://localhost:9000

## Understand how to works this application
There are two important code snippets to understand how integration works. First part on backend (integration on Bexs Payment API) and other part is on frontend (using the library to render Bexs Pay Checkout). Let's check out.

### Backend integration
For the complete and detailed understanding, we recommend that you take a look on our [official website for developers](https://developers.bexs.com.br). Now following the example of integration, consider this project is an example application, so feel free to use the language and pattern of your choice or that makes the most sense for your project.

Look on file `/app/controllers/checkout.js`, this is where the main integration flow occurs. As explained in the [API documentation](https://developers.bexs.com.br/api/pay#tag/Authentication), the code snippet on line 16 mounts the object to be used to gain access to the Payment API services.

```javascript
const getTokenPayload = {
    "client_id": process.env.BEXS_API_CLIENT_ID,
    "client_secret": process.env.BEXS_API_CLIENT_SECRET,
    "audience": CONFIG_BEXS_PAY.audience,
    "grant_type": CONFIG_BEXS_PAY.grant_type
};
```
To understand the values instantiated by the variables, just follow a few snippets of code above (including keys created via portal).

After obtaining the Bearer Token, before generating a payment, it is necessary to obtain the exchange rate, as we can see in the code snippet of line 35:
```javascript
axios.get(CONFIG_BEXS_PAY.url.get_exchange_rate, requestConfig)
```

Now we have all the information and access required to generate the payment, so let's go!

We abstract the Payload object on a function to analyze in detail what is passed to the service.
```javascript
checkoutPayloadDTO(product.price, rate, product.description, consumer)
```

```javascript
// /app/domains/checkoutPayload.js
module.exports = (amount, foreign_amount_rate, description, consumer) => {
        
    return {
        checkout: PAY_CHECKOUT.checkout,
        confirm: PAY_CHECKOUT.confirm,
        installments: PAY_CHECKOUT.installments,
        due_date: genDate(PAY_CHECKOUT.due_date_rule),
        soft_descriptor: PAY_CHECKOUT.soft_descriptor,

        amount: parseFloat(amount),
        foreign_amount: getForeignAmount(parseFloat(amount), parseFloat(foreign_amount_rate)),
        cart: [
            {
                description: description,
                quantity: PAY_CHECKOUT.quantity,
                unit_price: amount
            }
        ],
        consumer: consumer,
        billing: {
            national_id: consumer.national_id,
            name: consumer.full_name
        },

        redirect_url: PAY_CHECKOUT.redirect_url
    }
}
```
The explanation about this Payload can be found in our documentation ([Creating a Payment - Bexs Pay API Reference](https://developers.bexs.com.br/api/pay#tag/Payments/paths/~1payments/post)).

Now just send the generated payment token to the frontend.
```javascript
{
    url_token: responseCheckout.data.redirect_url,
    payment_id: responseCheckout.data.id
}
```

### Frontend using lib js
Before we begin to understand how lib's call in javascript works, let's understand where frontend files beens.

```
/app/views/*.pug >> template html
/js/*.js >> scripts javascripts (executed on client side)
/stylus/*.styl >> css preprocessor (similar to sass and less)
```

The important thing in this first moment is to understand how to import javascript library. Looking on `layout.pug` file on `/app/views/components/`, we can see two imported javascript scripts, `bundle.js` (result of all javascript local files minified and merged) and `checkout-bexs.js` (imported from an external address `https://apis.bexs.com.br/v1/lib/`).

The import of `checkout-bexs.js` ensures that function that renders checkout will be available to use. On the `/js/openChecoutBexs.js` file we can see the example of invoking this function:

```javascript
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
    //Invoking Bexs checkout function
    window.CheckoutBexs(urlProvidedByService, 'iframe', options);
};
```
The `openCheckout` function is invoked on `checkout-full.pug`, `checkout-share.pug` or `checkout-light.pug` and just to do as an abstraction for easy to use the CheckoutBexs function.
Look that function receives 3 parameters:

1. the url with token retrieved by the Payment Service - by backend service;
2. the ID of the element that will wrap the iframe;
3. options object with some callbacks:
    - paymentSuccess - runs when payment is successfully approved
    - paymentFail - runs when the payment failed (by default, Checkout suggests "try again" to the user)
    - iframeFallback - runs if the rendering of iframe fails for some reason (example, invalid token)
    - changeOrder - when declaring this callback, enables a button for user can change the order and function declared is runs

## Questions?
If there is still any question about the Sample Application, please contact us via [Support Form](https://developers.bexs.com.br/support) or open an issue here on Github. This way we can help you about your question. You also make this application easier to understand.