/*app.js */
/*
 @author      Juan Luna
 @description un servidor para la app xr3dpixel y rutas con controllers, conexion a bd
              y modelos, db/DB_xr3dpixel
 
 @DB_name     DB_xr3dpixel
 */
// ################################### MODULOS REQUERIDOS -----------------------------------------------------
const express = require("express"); // express
const hbs = require("hbs"); // motor plantillas
// const cors = require('cors'); // seguridad headers
const path = require("path"); // directorios
const fs = require("fs"); // manejo de ficheros
const https = require("https"); // protocolo seguro SSL, necsita instalar certificado CSR
// ################################### MODULOS REQUERIDOS ----------------------------------------------------- FIN
//
// ################################### SSL CERTIFICATE
const credentials = {
  ca: fs.readFileSync(
    __dirname + "/app_server/_configs/ssl/xr3dpixel_com.ca-bundle",
    "utf8"
  ), //la certification authority o CA
  key: fs.readFileSync(
    __dirname + "/app_server/_configs/ssl/xr3dpixel_com.key",
    "utf8"
  ), //la clave SSL, que es el primer archivo que generamos ;)
  cert: fs.readFileSync(
    __dirname + "/app_server/_configs/ssl/xr3dpixel_com.crt",
    "utf8"
  ), //el certificado
};
// ################################### SSL CERTIFICATE
//
// ################################### CONFIGURACION EXPRESS --------------------------------------------------
const app = express(); //controlador principal del servidor de node
app.set("ENV", process.env.NODE_ENV || "development"); //por defecto este será el env
app.set("PORT", process.env.PORT || 3000);
app.set("MONGO_URL", process.env.MONGO_URL || null);
// ################################### cache | static folder | json | body ------------------------------------
app.use(express.static(path.join(__dirname, "app_dist"))); // ... en routes
app.set("view cache", app.get("ENV") === "development" ? false : true);
// TODO  app.use(express.json());
// app.use(express.urlencoded()); // app.use(bodyParser.urlencoded({ extended: false })); //el servidor aceptará datos por post
app.use(express.json()); // app.use(bodyParser.json());
// TODO  app.use(express.json());
// ################################### CONFIGURACION EXPRESS -------------------------------------------------- FIN
//
// ################################### MOTOR PLANTILLAS: ejs --------------------------------------------------
// hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'), function(err) { console.log(err); });
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'app_server', 'views'));
// ################################### MOTOR PLANTILLAS: ejs -------------------------------------------------- FIN

// console.log('path views: ', path.join(__dirname, 'app_server', 'views'));
// console.log('path static folder: ', staticFolder);
// console.log('path cache status: ', statusCache)
// console.log(app.get('views'));

// ################################### MOTOR PLANTILLAS: ejs ------------------------------------------------- FIN
//
// ################################### CONFIGURACION CABECERAS Y CORS -----------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// ################################### CONFIGURACION CABECERAS Y CORS ----------------------------------------- FIN
// ################################### midlewares cors -------------------------------------------------------
// app.use(cors());
// ################################### midlewares cors ------------------------------------------------------- FIN
//
// ################################### RUTAS ----------------------------------------------------------------
// importacion de rutas // development
const mainRoutes = require("./app_server/routes/main.routes.js");
const userRoutes = require("./app_server/routes/user.routes.js");
const loginRoutes = require("./app_server/routes/login.routes.js");
const contactRoutes = require("./app_server/routes/contact.routes.js");
// #### resolver rutas !!ojo cuidao deben respetar el orden
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/api/contact", contactRoutes);
app.use("/", mainRoutes);
// // ################################### RUTAS ---------------------------------------------------------------- FIN
//
// ################################### app.listen -----------------------------------------------------------
// servidor secure layer transport SSL https://www.xr3dpixel.com:3000
if (app.get("env") == "production") {
  var Server = https
    .createServer(credentials, app)
    .listen(app.get("PORT"), function () {
      console.log("NODE_ENV: ", app.get("ENV"));
      console.log("PORT: ", app.get("PORT"));
      console.log("MONGO_URL: ", app.get("MONGO_URL"));
      console.log(
        "Express server with SSL certificate listening in https://www.xr3dpixel.com:" +
          Server.address().port
      );
    });
}
// servidor local http://localhost:3000
else {
  var Server = app.listen(app.get("PORT"), function () {
    console.log("NODE_ENV: ", app.get("ENV"));
    console.log("PORT: ", app.get("PORT"));
    console.log(
      "MONGO_URL: ",
      app.get("MONGO_URL") || "no establecido por docker!"
    );
    console.log(
      "Express server listening in: http://localhost:4200" +
        Server.address().port
    );
    // console.log('Express server listening in http://localhost:' + app.get('PORT'));
  });
}
// ################################### app.listen ----------------------------------------------------------- FIN
module.exports = {
  app,
  Server,
}; // https://localhost:3000
