var express = require('express').Router;
var app_route = express();
// requires
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../_configs/general').TOKEN_SECRET;
// midlewares
var mdValidate = require('../midlewares/validate');
var mdAuthenticate = require('../midlewares/authenticate.js');
// model
var User = require('../models/user.model.js');
/* ######## RUTA user ########## */
// ===============================
// GET: obtener todos los usuarios
// WARNING !!!!!!!!!!!!!!!!!!!!!!!
// quizás esto no haga falta, SOLO OBTENER EL USUARIO LOGGED
// en un modulo de registro y login de usuarios hay varias rutas implicadas.
// get('/login', get('/forgot_password'), get('/register'), get('/users'), get('/user_logged'), get('/admin_panel'), etc
// Para ello es mejor hacer un CRUD del usuario y otro archivo CRUD del login, el register y el forgot-password
//  WARNING !!!!!!!!!!!!!!!!!!!!!!!
//
// @@@@@@@@@@@@@@@@@ otros módulos @@@@@@@@@@@@@@@@
// PAGINATION: La paginacion esta hecha en la página de antonio troyano. y en los videos de udemy: v 122
// SEARCH: La busqueda de conceptos en el video: v 123
// ASYNC SEARCH: busquedas asincronas con promesas en diferentes colecciones: v 124
// UPLOAD-IMAGES: libreria express-fileupload para subir imagenes: v 127
// RECUPERACION DE IMAGENES: video 133
// LOGIN GOOGLE API: ID de cliente de OAuth: video 139
// TOKEN GOOGLE OAUTH: video 140
// GOOGLE AUTH LIBRARY: necesario para authenticarse desde oauth con google en el backend de node.js: video 141
//      url de ejemplo: (https://developers.google.com/identity/sign-in/web/backend-auth?authuser=1)
// ADMIN PRO PANEL NG: paneles de administracion para angular: video 148
// @@@@@@@@@@@@@@@@@ otros módulos @@@@@@@@@@@@@@@@
// ===============================
app_route.get('/', (req, res) => {

    User.find({}, { _id: 1, name: 1, email: 1, url_photo: 1, provider: 1 })
        .exec((err, users) => {
            if (err) {
              // return res.status(500).json... // WARNING !!!!!!!!!!
              // el instructor lo pone así con return res., pruebalo con postman y sin conexion a bd
                res.status(500).json({
                    ok: false,
                    message: "ERROR: bd falló!",
                    errors: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    users: users
                });
            }
        });

});
// ===============================
// POST: subir un usuario nuevo quizas en el register
// ===============================
app_route.post('/', mdValidate.verifyNewUser, (req, res) => {
    var body = req.body;
    // ############################################################# encryptamos
    var salt = bcrypt.genSaltSync(10); // retorna un salt
    var password = bcrypt.hashSync(body.password, salt); // crea un  hash
    // ############################################################# encryptamos
    // preparamos los datos
    var user = new User({
        name: body.name,
        email: body.email,
        salt: salt,
        password: password,
    });
    // grabamos el user
    user.save((err, userBD) => {
        if (err) {
            res.status(500).json({ // 500 es error del sistema 400 es bad request
                ok: false,
                message: "fallo al intentar grabar",
                errors: err // SI PUSISTE CONDICIONES EN EL MODELO, ese mensaje saldrá aquí
                // existe un plugin para validaciones de mongoose llamado mongoose-unique-validator
                // se importa en el modelo y se usa como plugin: video 105
            });
        } else {
            // filtrar datos a enviar
            userBD.password = ":)";
            userDB.salt = ":(";
            // ############# !!! IMPORTANT enviar token aquí y quizás colocar en req.user ese user
            var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 43200 });
            req.user = userDB;
            // ############# !!! IMPORTANT enviar token aquí y quizás colocar en req.user ese user
            res.status(201).json({  //  201 recurso creado
                ok: true,
                message: "el usuario fue registrado",
                user: userBD,
                token: token,
                id: userBD._id
            });
        }
    });
});
// ===============================
// UPDATE: actualizar usuario
// ===============================
app_route.put('/:id', [mdAuthenticate.verifyToken, mdValidate.verifyUser], (req, res) => {
    var body = req.body;
    var id = req.params.id;

    User.findById(id, (err, userBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: "error al buscar el usuario",
                errors: err
            });
        }
        if (!userBD) {
            return res.status(400).json({
                ok: false,
                message: "El usuario con el id " + id + ", no existe",
                errors: { message: 'no existe un usario con ese id' }
            });
        }
        // validado y existe
        var name = body.name;
        var email = body.email;

        // WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!
        // controlar la actualizacion con los datos que nos deben llegar
        // WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!
        // actualizamos el user
        User.update({ _id: id }, {
            $set: {
                name: name,
                email: email
            }
        }, (err, respMongo) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    message: "fallo al intentar grabar",
                    errors: err
                });
            } else {
                // tenemos el user del find solo hay que actualizarlo
                res.status(200).json({
                    ok: true,
                    message: "el usuario fue actualizado",
                    resp: respMongo
                }); // si lo que quieres es el usuario completo haces un finbyid o en vez de update usas save()
            }
        });
    });
});
// ===============================
// DELETE: borrar usuario !!!WARNING NO DEBES PERMITIR BORRAR USERS
// ===============================
app_route.delete('/:id', [mdAuthenticate.verifyToken, mdValidate.verifyId], (req, res) => {

    var id = req.params.id;

    User.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: "fallo al intentar borrar",
                errors: err
            });
        } else if (!userDeleted) {
            res.status(400).json({
                ok: false,
                message: "no existe usuario con ese id",
                errors: { message: "el id no existe" }
            });
        } else {
            // tenemos el user del find solo hay que actualizarlo
            res.status(200).json({
                ok: true,
                message: "el usuario fue borrado",
                userDeleted: userDeleted
            }); // si lo que quieres es el usuario completo haces un finbyid o en vez de update usas save()
        }
    });

});

/* ######## RUTA user ########## */

module.exports = app_route;
