/**
 * @author
 * @description crea un panorama con el example.component.html, examples.less/FX-panorama y el demo.class.js
 *              para exportarlo como una clase pero de ts ponemos export class Demo { ... }
 *              Para recuperarlo desde un componente se llama al archivo ts como si fuese una importación
 *              import ( Demo ) from './MyObjects/Demo.class'; y lo usas en el componente dentro del decorador
 *              @Component({ ... }) de esta manera
 *              ngOnInit() {
                    this.demo = new Demo().Init();
                }
                el css y las imagenes cargadas deben ser las mismas.
* ####### !!!!! be carefully
                @problems no funciona un acceso al dom hecho con acceso normal 'js' e insertado en angular
                seguramente son scopes diferentes que no se relacionan, cuando averigües como acceder a ese dom
                desde angular y manipularlo puedes usar esta clase. Mientras hazlo con jquery desde scripts
* ####### !!!!! be carefully
 */

// FX-panorama
export class Demo {
    animationFrame;
    e;
    p;
    l;
    loaded;
    drag;
    speed;
    brake;
    r;
    sources;
    o;
    x;
    time;
    _imgs;
    img_w;
    img_h;


    constructor () {
      this.animationFrame = (function() {
        return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          // window.mozRequestAnimationFrame    ||
          function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
        this.e = document.getElementById('demo');
        this.p = document.getElementById('panorama');
        this.l = document.getElementById('loader');

        this.loaded = 0;
        this.drag = false;
        this.speed = 0.5;
        this.brake = 1;
        this.r = 0;
        this.sources = new Array (
          '../../assets/images/demos/panorama/img01.jpg',
          '../../assets/images/demos/panorama/img02.jpg',
          '../../assets/images/demos/panorama/img03.jpg',
          '../../assets/images/demos/panorama/img04.jpg',
          '../../assets/images/demos/panorama/img05.jpg',
          '../../assets/images/demos/panorama/img06.jpg'
        );
        this._imgs = new Array(this.sources.length);
        // iniciamos el Demo.Load()
        this.Init();
    }

    Down (e) {
      this.o = this.r;
      this.x = this.r + e.clientX;
      this.drag = true;
      this.time = new Date();
    }
    Move (e) {
      if (this.drag) {
        this.r = this.x - e.clientX;
        this.p.style.webkitTransform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
        this.p.style.mozTransform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
        this.p.style.transform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
      }
    }
    Up () {
      if (this.drag) {
        const time = this.newDate().getMilliseconds() - this.time;
        const path = this.r - this.o;
        this.speed = path / time * 5;
        this.brake = 1.01;
        this.drag = false;
      }
    }
    Spin () {
      if (!this.drag) {
        this.r += this.speed;
        this.speed /= this.brake;
        this.p.style.webkitTransform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
        this.p.style.mozTransform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
        this.p.style.transform = 'rotateY(' + this.r * 180 / 400 + 'deg)';
      }
      this.animationFrame(this.Spin);
    }
    Bind () {
      this.e.addEventListener('mousedown', this.Down, false);
      this.e.addEventListener('mousemove', this.Move, false);
      this.e.addEventListener('mouseup', this.Up, false);
      this.e.addEventListener('mouseleave', this.Up, false);
      this.animationFrame(this.Spin);
    }
    Progress () {
      this.loaded++;
      console.log(this.l);
      this.l.style.width = this.loaded / this.sources.length * 100 + '%';
      if (this.loaded === this.sources.length) {
        this.l.style.opacity = 0;
        this.p.style.opacity = 1;
        this.Bind();
      }
    }
    Load () {

      for (let i = 0; i < this.sources.length; i++) {
        this._imgs[i]  = new Image();
        this._imgs[i].addEventListener('load', this.Progress, false);
        this._imgs[i].src = this.sources[i];
      }
    }
    newDate () {
      return new Date();
    }
    Init () {
      const that = this;
      // saber si el documento esta operativo en JS
      document.onreadystatechange = function () {
        if (document.readyState === 'interactive') {
            that.Load();
        }
      };
    }
  }

  /*  // imagenes remotas
          'https://cs617727.vk.me/v617727366/942f/DqbS0IRIATA.jpg',
          'https://cs617727.vk.me/v617727366/9436/Ig4ieHZXvNo.jpg',
          'https://cs617727.vk.me/v617727366/943d/g8xqn7S87kQ.jpg',
          'https://cs617727.vk.me/v617727366/9444/DfhvfFfTarY.jpg',
          'https://cs617727.vk.me/v617727366/944b/-McVeNNxf-A.jpg',
          'https://cs617727.vk.me/v617727366/9452/w1bBTnHANig.jpg'
*/

/*    // imagenes locales
          '../../assets/images/demos/panorama/img01.jpg'
          '../../assets/images/demos/panorama/img02.jpg'
          '../../assets/images/demos/panorama/img03.jpg'
          '../../assets/images/demos/panorama/img04.jpg'
          '../../assets/images/demos/panorama/img05.jpg'
          '../../assets/images/demos/panorama/img06.jpg'
*/
