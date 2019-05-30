# 🏪 DEMO SHOP - Sample Application using Checkout Pay (Bexs PAY API + checkout-iframe.js)

Este projeto é uma Aplicação de Exemplo que mostra como integrar na API da Bexs PAY no modulo de checkout.
Aqui terão algumas práticas que servem como exemplo para o desenvolvedor. 
Haverão algumas recomendações de como manter esta integração segura e sem riscos de exposição de dados.

Nosso site oficial para desenvolvedores que desejam integrar com nossos serviços. [Developers Bexs](https://developers.bexs.com.br)

## Stacks utilizadas nesta aplicação de exemplo
[![Nodejs](/img_readme/nodejs.png)](https://nodejs.org/en/)
[![NPM](/img_readme/npm.png)](https://www.npmjs.com/)
[![ExpressJS](/img_readme/express.png)](https://expressjs.com/)
[![Axios](/img_readme/axios.png)](https://github.com/axios/axios)
[![Pugjs](/img_readme/pugjs.png)](https://pugjs.org/)
[![Stylus](/img_readme/stylus.png)](http://stylus-lang.com/)
[![Webpack](/img_readme/webpack.png)](https://webpack.js.org/)

A Stack Tecnológica desta Aplicação de Exemplo não deve influenciar na decisão da sua Stack Tecnológica. As tecnologias escolhidas são popularmente conhecidas e de fácil entendimento. Utiliza basicamente de Javascript. Podemos resumir os papeis de cada técnologia utilizada neste projeto em grupos:

### Backend:
* Nodejs: Principal linguagem utilizada (javascript no backend);
* Expressjs: Utilizado para manipular as requests de páginas vindas do browser (middleware);
* Axios: O http client - através dele conectamos no Bexs Pay

### Frontend
* Pugjs: Template HTML minimalista
* Stylus: Um pré-processador CSS simples
* Webopack: Empacota os códigos CSS e Javascript do site em um bundle único.

### Other:
* NPM: gerenciador de pacotes do nodejs - semelhante ao maven, nuget, gradle, dep, ivy, etc

## 

### TODO List no Readme:
Read me todo list  ⬜ ✅
* ✅ Do que se trata o projeto
* ✅ Explicar stacks
    * ✅ npm
    * ✅ nodejs
    * ✅ express
    * ✅ pugjs
    * ✅ webpack
    * ✅ Stylus    
* ⬜ como cadastrar Client ID e Client Secret no environment
* ⬜ como subir a aplicação