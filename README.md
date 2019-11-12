# recipe-finder

A single page web application built using Vue.js, Vuex, Vuetify, Express, NodeJS, SQLite 

Frontend client is built in VueJS. It's fast, provides reactive components and allows easy future modification, plus ideal for state management and routing    
Backend: Express is the middleware to handle HTTP requests and routing, SQLite (embedded relational database) to store the data and NodeJs is the server that the application runs on    
Veutify (material design component framework) used for styling  
Testing framework used here is chai and mocha, for the backend    

Features of this app currently include: displaying current recipes stored in db, add a recipe, update a recipe and delete a recipe   

## Project setup to run locally
```
npm install
```
```
npm run db 
```
```
npm run serve-fe
```
```
npm run serve-be
```
### Compiles and hot-reloads for vue development
```
npm run serve-fe
```
### Starts express server 
```
npm run serve-be
```

### Run this app locally
```
npm run local
```
### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```
### Run your tests for BE
```
npm run test-be
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
