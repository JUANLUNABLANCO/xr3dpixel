// ===============================
// verifica que el susuario viene
// con los datos requeridos
// POST
// ===============================
exports.verifyNewUser = (req, res, next) => {
    var body = req.body;

    if (!body.name || !body.email || !body.password) {
        res.status(403).json({
            ok: false,
            message: "los datos no son correctos",
            body: body
        });
    } else {
        next();
    }
};
// ===============================
// verifica que el susuario viene
// con los datos requeridos similar
// al anterior hay que limitarlos
// UPDATE
// ===============================
exports.verifyUser = (req, res, next) => {
    var body = req.body;
    // deberias comprobar el token y que el user is loggin
    if (!body.name || !body.email || !req.params.id) {
        res.status(403).json({
            ok: false,
            message: "los datos no son correctos",
            body: body
        });
    } else {
        next();
    }
};
// ===============================
// verifica que el id es valido
// y que tiene permisos, para borrar
// DELETE
// ===============================
exports.verifyId = (req, res, next) => {
    // deberias comprobar el token y que el user is loggin Y QUE TIENE PERMISOS PARA BORRAR !!!
    if (!req.params.id) {
        res.status(403).json({
            ok: false,
            message: "los datos no son correctos",
            body: body
        });
    } else {
        next();
    }
};
// ===============================
// verifica que lleguen datos correctos
// para login
// POST
// ===============================
exports.verifyLogin = (req, res, next) => {
    var body = req.body;

    if (!body.email || !body.password) {
        res.status(403).json({
            ok: false,
            message: "los datos no son correctos",
            body: body
        });
    } else {
        next();
    }
};
// ===============================
// verifica que lleguen datos correctos
// para /contact
// POST
// ===============================
exports.verifyDataContact = (req, res, next) => {
    var body = req.body;

    if (!body.email  || !body.telephone || !body.company || !body.message || !body.subject || body.form_control != "client_contact") {
        res.status(403).json({
            ok: false,
            message: "los datos no son correctos",
            body: body
        });
    } else {
        next();
    }
};
