var express = require('express');

var app = express();
// requires
var general = require('./general');
var nodemailer = require('nodemailer');
// var xoauth2 = require('xoauth2');

// ######### FORMA 01: envio desde localhost SIN AUTORIZACION DE APIS Y CIFRADO
// var configMailling = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: '465', // es 465 confirmado
//     auth: {
//         user: general.GMAIL_APP,
//         pass: general.GMAIL_PASS
//     },
//     secure: true,
//     tls: {
//         ciphers: 'SSLv3',
//         rejectUnauthorized: false
//     }
// });
// ######### FORMA 01: envio desde localhost SIN AUTORIZACION DE APIS Y CIFRADO
//
// ######### FORMA 02: CON AUTORIZACION DESDE APP DOBLE SENTIDO
// if (app.get('env') === "production") {
//     USER = general.APP_NAME_GMAIL; // nombre de aplicacion
//     PASS = general.APP_PASS_GMAIL; // pasword de aplicacion
//     console.log("entorno-email: " + app.get('env'));
// } else {
//     USER = general.GMAIL_APP; // usuario normal
//     PASS = general.GMAIL_PASS; // contraseña normal
//     console.log("entorno-email: " + app.get('env'));
// }
var configMailling = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secure: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: general.APP_NAME_GMAIL,
        pass: general.APP_PASS_GMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

// ######### FORMA 02: CON AUTORIZACION DESDE APP DOBLE SENTIDO
//
// ######### FORMA 03: envio desde localhost CON AUTORIZACION DE APIS OAUTH2
// var configMailling = nodemailer.createTransport({
//     service: 'Gmail',
//     // host: 'smtp.gmail.com',
//     // port: 465,
//     // secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: general.GMAIL_APP,
//         clientId: '1017564721948-42nc63bmmi4aapsfl50blo6bv1shm0aj.apps.googleusercontent.com',
//         clientSecret: 'VvYONCMN6dEAQLh3FDQu_KIm',
//         refreshToken: '1/148Ayg6USLyNtHMXXalYCduRL6JNY0j-bDZtDQerE1Q',
//         expires: 3600
//     },
//     // añadido
//     // tls: {
//     //     rejectUnauthorized: false
//     // }
// });
// ######### FORMA 02: envio desde localhost CON AUTORIZACION DE APIS
//
// ######### FORMA 03: envio desde VPS CON AUTORIZACION DE APIS, COMO DICE NODEMAILER
// var configMailling = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         type: 'OAuth2',
//         user: general.GMAIL_APP,
//         clientId: '592401692574-du15t3kv8bsarfgpdjpc3bcu408kao0q.apps.googleusercontent.com',
//         clientSecret: 'SupiRsAWnZEUmy4116CZ9an9',
//         refreshToken: ''
//     },
//     debug: true
// });
// ######### FORMA 03: envio desde VPS CON AUTORIZACION DE APIS, COMO DICE NODEMAILER
//
module.exports = configMailling;