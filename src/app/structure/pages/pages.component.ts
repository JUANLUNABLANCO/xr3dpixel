import { Component, OnInit} from '@angular/core';
import { Event, Router, NavigationEnd} from '@angular/router';

// declare function carga_PLUGINS();
declare function carga_UIKIT();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  /* de esta manera detectamos la carga del componente cada vez que entramos, y así el script
     funcionará no solo la primera vez cuando se carga el onInit, sino cada vez que la página se carga*/
  constructor(private router: Router) {
    router.events.subscribe(
      (event: Event)=>{
        if (event instanceof NavigationEnd) {
          // cada vez que cargue el componente
          carga_UIKIT();
        }
      });
  }
  // recuerda debes importar Router Event y NavigatgionEnd

  ngOnInit() {
    // solo se ejecuta la primera vez, no funciona bien para todo tipo de scripts de jquery
  }

}
