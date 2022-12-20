var express = require('express').Router;

var app_router = express();
// requires
var nodemailer = require('nodemailer'); // quizas lo quitas, ya desde conexion esta presente
var validate = require('../midlewares/validate');
var general = require('../_configs/general');
var conexion = require('../_configs/mailing'); // crea el objeto transporter de la api

/* ######## RUTA /contact ########## */
app_router.post('/', validate.verifyDataContact, (req, res) => {

    var body = req.body;

    // recibir los datos del usuario
    var message =
        "email: " + body.email + "\r\n" +
        "Name: " + body.name + "\r\n" +
        "Company: " + body.company + "\r\n" +
        "Telephone: " + body.telephone + "\r\n" + "\r\n" +
        "Message: " + body.message;

    // opciones del correo
    var mailOptions = {
        from: general.GMAIL_APP,
        to: general.GMAIL_CONTACT,
        subject: body.subject + " " + body.urgent,
        text: message,
        auth: {
            user: general.GMAIL_APP,
        }
    };

    // ################ FORMA 01: SIN PROMESAS
    // enviamos correo a avr3dstudio.contact@gmail.com
    conexion.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                message: "No se envía el correo: ",
                error: error.message

            });
        } else {
            console.log('Email enviado: ' + info.response);
            conexion.close();
            res.status(200).json({
                ok: true,
                message: "recibido un mensaje del usuario, hemos enviado un email a contact@avr3dstudio.com",
            });
        }
    });
});
// ################ FORMA 01: SIN PROMESAS
// ################ FORMA 02: PROMESAS

// var MailControllerPromise = () => {
//     return new Promise((resolve, reject) => {
//         conexion.sendMail(mailOptions, error => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(info);
//             }
//         });
//     });
// };

// MailControllerPromise()
//     .then(info => {
//         console.log('Email enviado: ' + info.response);
//         res.status(200).json({
//             ok: true,
//             message: "recibido un mensaje del usuario, hemos enviado un email a avr3dstudio.contact@gmail.com",
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             message: "No se envía el correo: ",
//             error: error
//         });
//     });

// ################ FORMA 02: PROMESAS
/* ######## RUTA /contact ########## */

module.exports = app_router;
