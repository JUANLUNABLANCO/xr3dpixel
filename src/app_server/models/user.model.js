// conexion bd
var mongoose = require('../connections/db_connect'); // podriamos hacer un try catch y si hay error mandar un mensaje: "No hay Conexion con bd"
var Schema = mongoose.Schema;

var userSchema = new Schema({
    // required
    name: { type: String, required: true, index: { unique: true } }, //debe seguir el patron rules.username
    // name: { type: String, required: [true, "El nombre es requerido"], index: { unique: [true, "Ese nombre ya existe"] } }, // mensajes de error integrados
    email: { type: String, required: true, index: { unique: true } }, //debe seguir el patron rules.email   lowercase: true, trim: true
    // default
    provider: { type: String, default: 'tipically', enum: ['twitter', 'facebook', 'tipically'] }, //de momento esos tres
    id_network: { type: String, default: 'not_allowed' }, //puede ser un numero "75676768594" o un "not_allowed"
    salt: { type: String, default: "not_allowed" }, // "not_allowed" | "********" debe seguir el patron rules.password
    // null
    password: { type: String }, // null
    url_photo: { type: String }, // nul
    // out-of-app
    role: { type: String, default: "USER_ROLE" } //los roles le conferiran permisos en la base de datos. desde web/avr3ds_app no se puede cambiar, desde mongo/avr3ds_app si
    // necesario y opcional
    // _id?: string
});
// para envio de usuarios: '_id username email url_photo provider'
module.exports = mongoose.model('users', userSchema); //este user es el nombre de la colleccion en mongodb
// module.exports = mongoose.model('user', userSchema); // EL INSTRUCTOR LO CREA EN SINGULAR Y LA 1ª EN MAYUSCULA, porque es un Modelo

// ################### LEER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// pensar muy bien los campos antes de crear la bd, si necesita el email_conffirm o el password_conffirm
// ################### LEER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
