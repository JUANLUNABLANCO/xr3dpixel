import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  id = 'scrollTo_Inicio';
  el: HTMLElement;
  outputPath: any;

  constructor() {}


  ngOnInit() {
    this.scrollTo(this.id);
  }


  private scrollTo(id : string) {
    this.el= document.getElementById(id);
    this.el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  public HrefTo(site: string) {
     if (site === 'ghyde') {
      this.outputPath = 'https://www.facebook.com/gabinete.hyde';
    } else if (site === 'junta') {
      this.outputPath = 'https://www.andaluciaemprende.es/';
    }else if (site === 'fr29') {
      this.outputPath = 'https://www.fashionrooms29.com/';
    }
    window.open(this.outputPath, '_blank');
    // document.location.href = this.outputPath;
  }

}
