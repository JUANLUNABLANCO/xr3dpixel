var jwt = require('jsonwebtoken');
var SEED = require('../_configs/general').TOKEN_SECRET;

// ===============================
// verifica el token
// ===============================
exports.verifyToken = (req, res, next) => {
    var token = req.query.token; // que lo envie por la query tipo ?token=sadasdsadadasdasdasdasdasdasdsada

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: "Token no correcto",
                errors: err
            });
        }
        // ############## !!! WARNING peligroso esto ###########################
        // ############## !!! IMPORTANT mirar si es necesario este req.user pues
        // fue enviado con register (POST) y con login (POST)
        // además corre el peligro de ser reemplazado por un token falso
        // ############## !!! IMPORTANT
        req.user = decoded.user;
        // ############## !!! WARNING peligroso esto ###########################
        next();
    });

};
