var express = require('express');
var path = require('path');

var app_router = express();

var env = process.env.NODE_ENV || 'development';

var staticPath = {
    development: 'views',
    production: 'app_client'
};

// ############################################################## ????? OJO CUIDADO CAMBIA ESTO EN PRODUCCION Y AÑADE EL google-page.html manualmente
// app_router.set('views', path.join(__dirname, '..', 'views')); para usar ejs con vistas renderizadas desde node-express con ejs
app_router.set('views', path.join(__dirname, '..', staticPath[env]));
// ############################################################## ????? OJO CUIDADO CAMBIA ESTO EN PRODUCCION Y AÑADE EL google-page.html manualmente



/* ######## RUTA RAIZ: MAIN ########## */
app_router.get('/', (req, res) => {
    // res.render('spa.html'); // para usar ejs con vistas renderizadas desde node-express con ejs
    res.render('spa.html');
});
/* ######## RUTA RAIZ: MAIN ########## */   

module.exports = app_router;
