/**
 * @author
 * @description crea un panorama con el example.component.html, examples.less/FX-panorama y el demo.class.js
 *              para exportarlo como una clase pero de js se envuelve en una funcion del tipo Demo = function () {}
 *              y al final ponemos exports.Demo = Demo;
 *              Para recuperarlo desde un componente se llama al archivo js como si fuese una importación
 *              import ( Demo ) from './MyObjects/Demo.class.js'; y lo usas en el componente dentro del decorador
 *              @Component({ ... }) de esta manera
 *              ngOnInit() {
                    this.demo = new Demo();
                }
                el css y las imagenes cargadas deben ser las mismas


                    images: [ 400x400
                      Demo.lado: 800        --> 400
                      //y el css cambiar
                      @init-width : 800px;  --> 400px
                      @init-height: 800px;  --> 400px
                      @rot : -399px;        --> -199px
        '../../assets/images/demos/panorama/img01.jpg',
        '../../assets/images/demos/panorama/img02.jpg',
        '../../assets/images/demos/panorama/img03.jpg',
        '../../assets/images/demos/panorama/img04.jpg',
        '../../assets/images/demos/panorama/img05.jpg',
        '../../assets/images/demos/panorama/img06.jpg'
    ],
 */
function init_PANORAMA() {
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    var Demo = {

        loaded: 0,
        drag: false,
        speed: 0.5,
        brake: 1,
        r: 0,
        ladoX: 800,
        ladoY: 400,
        images: [
            '../../assets/images/demos/panorama/img01.jpg',
            '../../assets/images/demos/panorama/img02.jpg',
            '../../assets/images/demos/panorama/img03.jpg',
            '../../assets/images/demos/panorama/img04.jpg',
            '../../assets/images/demos/panorama/img05.jpg',
            '../../assets/images/demos/panorama/img06.jpg'
        ],

        Down: function(e) {
            Demo.o = Demo.r;
            Demo.x = Demo.r + e.clientX;
            Demo.drag = true;
            Demo.time = new Date();
        },

        Move: function(e) {
            if (Demo.drag) {
                Demo.r = Demo.x - e.clientX;
                Demo.p.style.webkitTransform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
                Demo.p.style.mozTransform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
                Demo.p.style.transform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
            }
        },

        Up: function() {
            if (Demo.drag) {
                var time = new Date() - Demo.time;
                var path = Demo.r - Demo.o;
                Demo.speed = path / time * 5;
                Demo.brake = 1.01;
                Demo.drag = false;
            }
        },

        Spin: function() {
            if (!Demo.drag) {
                Demo.r += Demo.speed;
                Demo.speed /= Demo.brake;
                Demo.p.style.webkitTransform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
                Demo.p.style.mozTransform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
                Demo.p.style.transform = 'rotateY(' + Demo.r * 180 / Demo.ladoX + 'deg)';
            }
            window.requestAnimFrame(Demo.Spin);

        },

        Bind: function() {
            Demo.e.addEventListener('mousedown', Demo.Down, false);
            Demo.e.addEventListener('mousemove', Demo.Move, false);
            Demo.e.addEventListener('mouseup', Demo.Up, false);
            Demo.e.addEventListener('mouseleave', Demo.Up, false);
            window.requestAnimFrame(Demo.Spin);
        },

        Progress: function() {
            Demo.loaded++;
            Demo.l.style.width = Demo.loaded / Demo.images.length * 100 + '%';
            if (Demo.loaded === Demo.images.length) {
                Demo.l.style.opacity = 0;
                Demo.p.style.opacity = 1;
                Demo.Bind();
            }
        },

        Load: function() {
            for (var i = 0; i < Demo.images.length; i++) {
                var img = new Image();
                img.addEventListener('load', Demo.Progress, false);
                img.src = Demo.images[i];
            }
        },

        Init: function() {
            Demo.e = document.getElementById('demo');
            Demo.p = document.getElementById('panorama');
            Demo.l = document.getElementById('loader');
            Demo.Load();
        }
    };



    // document.addEventListener('DOMContentLoaded', Demo.Init, false);
    // esta última línea no funciona en todos los navegadores pero estas si
    // document.onreadystatechange = function() {
    //     if (document.readyState === 'interactive') {
    //         Demo.Init();
    //         console.log("### Iniciando panorama ###");
    //     }
    // };

    Demo.Init();
    console.log("### Iniciando panorama ###");

    // Observación sobre las imágenes: cargar las que quieras ten en cuenta los derechos de autor
    // pero que coincidan el background del css con las requeridas en el script.js

    /*  // imagenes remotas
              'http://cs617727.vk.me/v617727366/942f/DqbS0IRIATA.jpg',
              'http://cs617727.vk.me/v617727366/9436/Ig4ieHZXvNo.jpg',
              'http://cs617727.vk.me/v617727366/943d/g8xqn7S87kQ.jpg',
              'http://cs617727.vk.me/v617727366/9444/DfhvfFfTarY.jpg',
              'http://cs617727.vk.me/v617727366/944b/-McVeNNxf-A.jpg',
              'http://cs617727.vk.me/v617727366/9452/w1bBTnHANig.jpg'
    */

    /*    // imagenes locales
              '../../assets/images/demos/panorama/img01.jpg'
              '../../assets/images/demos/panorama/img02.jpg'
              '../../assets/images/demos/panorama/img03.jpg'
              '../../assets/images/demos/panorama/img04.jpg'
              '../../assets/images/demos/panorama/img05.jpg'
              '../../assets/images/demos/panorama/img06.jpg'
    */

    /* manera de insertar jquery en un componente */
    /*
    // en la cabecera despues de los imports
    declare var JQuery: any;
    declare var $:any;

    //en el componente export class {
      onInit(){
        aqui
      }
      //o por aqui en una funcion
    }
    $('button').click(function(){
          $(this).animate({
            left: '200px'
          }, 'slow');
        });
        */
}