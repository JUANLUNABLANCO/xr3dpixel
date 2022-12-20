/*
 * configuracion en localhost
 */

//server.get('env') === 'development') o definido en proc.env.PORT
var configUrls = function(port) {
    //    //console.log(port);
    var env = process.env.NODE_ENV || 'development'; //funcionara esto? o tendrías que poner  server.get('NODE_ENV') //VARIABLE DEL SERVER DEFINIDA EN server.js

    var URL = {
        development: {
            protocol: "http://",
            hostname: "localhost",
            port: port,
            app_browser: "/app",
            public: "/public",
            uploads: "/uploads",
            media: "/media"
        },
        production: {
            protocol: "https://",
            hostname: "www.avr3dstudio.com",
            port: port,
            app_browser: "/app",
            public: "/public",
            uploads: "/uploads",
            media: "/media"
        }
    };

    var URLS = {
        TEMP_UPLOADS_URL: URL[env].protocol + URL[env].hostname + ':' + URL[env].port + URL[env].app_browser + URL[env].public + URL[env].uploads,
        MEDIA_URL: URL[env].protocol + URL[env].hostname + ':' + URL[env].port + URL[env].app_browser + URL[env].public + URL[env].media,
        MEDIA_DIAPOS_URL: this.MEDIA_URL + URL[env].up_diapos,
        FACEBOOK_CONNECTION: URL[env].protocol + URL[env].hostname + ':' + URL[env].port + '/auth/facebook/callback', //'http://localhost:3000/api/auth/facebook/callback'
        TWITTER_CONNECTION: URL[env].protocol + URL[env].hostname + ':' + URL[env].port + '/auth/twitter/callback', //'http://localhost:3000/auth/twitter/callback'
        BASE_URL: URL[env].protocol + URL[env].hostname + ':' + URL[env].port + '/' // http://localhost:3000/  o http://www.avr3dstudio.com:3000/
    };
    return URLS;
};

module.exports = configUrls;

//MEDIA_URL         = "http://" + hostname + ":" + port + "/app_browser/public/media"
//TEMP_UPLOADS_URL  = "http://" + hostname + ":" + port + "/app_browser/public/uploads"
//MEDIA_DIAPOS_URL  = "http://" + hostname + ":" + port + "/app_browser/public/media/_foros"
//RND_SLIDES        = "http://" + hostname + ":" + port + "/app_browser/public/media/images/random_slides