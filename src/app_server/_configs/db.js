var env = process.env.NODE_ENV || 'development';
////console.log(env);

var configDB = {
    'development': {
        user: "xr3dpixel_app",
        password: "JMLB_1234_ppcs_2709",
        host: "localhost",
        port: 30030, //puerto que requiere --auth
        database: "DB_xr3dpixel"
    },
    'local-vps': {
        user: null,
        password: null,
        host: "localhost",
        port: 30028, //puerto que no requiere --auth
        database: "DB_xr3dpixel"
            // para esto tienes que configurar la base de datos de mongodb en el vps crear el usuario admin y luego crear el avr3ds_app
            // con roles, permisos y auth
            // mongod --dbpath <ruta/a-las-bases-de-datos>  --port 30030  --auth
    },
    'production': {
        // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!! usuario, db, etc
        user: "xr3dpixel_app", // este es el usuario-cliente de la db (app, robomongo, consola), quien se esta conectando
        password: "JMLB_1234_ppcs_2709",
        host: "@ds263640.mlab.com", //esto puede cambiar en remoto a no ser que la bd este en el mismo servidor que la app
        port: 63640, //y el puerto deberias cambiarlo aunque esten o no en la misma máquina
        database: "db_xr3dpixel", // ¡¡¡¡¡¡¡ cambiar esto en mlab !!!!!!!!!!
        apikey_mlab: 'EF8CpYqjZnQYk8p18QX77MJqxE-LJcqi',
        mongo_version: '3.4.15 (MMAPv1)'
    } // mongodb://<dbuser>:<dbpassword>@ds263640.mlab.com:63640/db_avr3ds
};

// USA UN SISTEMA PARA ENCRYPTAR DESENCRYPTAR ESTO NO LO DEJES ASI
////console.log(config[env]);

module.exports = configDB[env];