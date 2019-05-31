# 🏪 DEMO SHOP - Sample Application using Checkout Pay (Bexs PAY API + checkout-iframe.js)

This project is an Sample Application that shows how to integrate onto the Bexs Payment API with checkout module. Here are some practices that serve as an guide for developers.

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
There is a set of presets to be made before running this application.
First you need to create the key combination to gain access to services on the sandbox environment (more info [here](https://developers.bexs.com.br/api/pay#section/Introduction/Creating-your-User-to-Sandbox)), to do so, visit our developer portal and clicking on Sandbox >>>> [Developers Bexs](https://developers.bexs.com.br).

After creating the keys, on root of this project contains a file named `.env`, fill on the variables according to the generated credentials `BEXS_API_CLIENT_ID` and `BEXS_API_CLIENT_SECRET`. We recommend when developing your real production application, use some technique to keep your key safe, preventing any leakage.

## Running application
* Install [Nodejs](https://nodejs.org/) higher version 9
* run `npm install` on terminal
* Post installing, run `npm start`

Access on browser http://localhost:9000