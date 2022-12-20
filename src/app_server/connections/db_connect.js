var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

var db = require('../_configs/db'); //la configuracion de la bd en remoto y en local
var uri;
if (process.env.MONGO_URL) { // desde docker
    uri = process.env.MONGO_URL;
} else { // sin docker
    if (env === "development") {
        uri = "mongodb://" + db.host + ":" + db.port + "/" + db.database;
    } else if (env === 'production') {
        uri = "mongodb://" + db.user + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.database;
    } else { // test // la base de datos borrarla antes de conectar en los tests
        uri = "mongodb://localhost:27017/test"
    }
}
mongoose.connect(uri, (error) => {
    if (error) {
        console.error(`error de conexion en ${uri}`);
        console.error(error.message);
    } else {
        console.log(`DB connection established at: ${uri}`);
    }
});

module.exports = mongoose;