/*
 * configuracion generica
 */

var configGeneral = {
    ROUTE_MODULES: './app_server/node_modules/', //donde se encuentran los modulos de node
    TOKEN_SECRET: process.env.TOKEN_SECRET || "chapitudebaratillotokenultrasecretodelaostiaquetecagaslasbragas",
    PASSPORT_SECRET: process.env.PASSPORT_SECRET || "maricojonudogiliputariano", //"root_secret",
    ROLE_ADMIN: "AVR3DS_ADMIN", // esta es logica interna de la app
    GMAIL_APP: "avr3dstudio.api@gmail.com",
    GMAIL_PASS: "_JUMALUBL_$27091971$.fp1cfdaw.#12481632#",
    APP_NAME_GMAIL: "app_gmail", // es una aplicacion la que envia el correo no un usuario
    APP_PASS_GMAIL: "tcjaumbkloehpjdt",
    GMAIL_CONTACT: "contact@avr3dstudio.com",
    LINK_MAILS: {
        'development': "http:localhost:3000/",
        'production': "https://www.avr3dstudio.com/"
    }
};

module.exports = configGeneral;
