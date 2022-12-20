var express = require('express').Router;
var app_router = express();
// requires
var bcrypt = require('bcryptjs');
var validate = require('../midlewares/validate');
var jwt = require('jsonwebtoken');
var SEED = require('../_configs/general').TOKEN_SECRET;
// model
var User = require('../models/user.model.js');

app_router.post('/', validate.verifyLogin, (req, res) => {

    var body = req.body;

    User.findOne({ email: body.email }, { _id: 1, name: 1, email: 1, url_photo: 1, provider: 1, password: 1, salt: 1 }, (err, userDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: "Error al buscar el usuario ",
                errors: err
            });
        }

        if (!userDB) {
            res.status(400).json({
                ok: false,
                message: "Credenciales incorrectas #-# email #-#",
                data_send: body
            });
        }
        if (userDB) {
            var password_crypt = bcrypt.hashSync(body.password, userDB.salt);
            // el instructor lo hace asi:
            // bcrypt.compareSync(body.password, userDB.password)

            // comparar la password de bd con la password del body, pero recuerda la password de bd esta grabada con un salt
            if (password_crypt !== userDB.password) {
                res.status(400).json({
                    ok: false,
                    message: "Credenciales incorrectas #-# password #-#",
                    data_send: body
                });
            } else {
                // si se loguea enviaremos el user !!! WARNING NO LO ENVIES TODO
                userDB.password = ":)";
                userDB.salt = ":(";
                // ############# !!! IMPORTANT enviar token aquí y quizás colocar en req.user ese user
                // puedes ver si valida en www.jwt.io
                var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 43200 }); // 43200 = 12 horas
                req.user = userDB;
                // ############# !!! IMPORTANT enviar token aquí y quizás colocar en req.user ese user
                // WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // los token del lado de angular se deben guaradar en el local storage y enviarlos siempre en  todas las
                // peticiones que necesitemos tener al usuario logueado, a partir del login todas.
                // en el video 112 remite al usuario a partir del decoded, que es el usuario del payload y lo guarda en
                // req.user "refiriendonos al usuario que hizo la peticion, que puede ser diferenete al usuario creado", por ejemplo:
                // cuando hay varios administradores o en un chat con varios usuarios, etc.
                // WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                res.status(200).json({
                    ok: true,
                    message: "Credenciales correctas, usuario logueado",
                    user: userDB,
                    token: token,
                    id: userDB._id
                });
            }
        }
    });
});
module.exports = app_router;
