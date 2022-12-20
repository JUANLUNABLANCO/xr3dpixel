import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  id = 'scrollTo_Services';
  direction1 = 'down'; direction2 = 'down';  direction3 = 'down';  direction4 = 'down';  direction5 = 'down';  direction6 = 'down';
  constructor() { }

  ngOnInit() {
    this.Scroll();

  }

  public Scroll() {
    console.log('scrolling to');
    const el: HTMLElement = document.getElementById(this.id);
      el.scrollIntoView();
  }
  // in Page services cada uno de los toogle
  public ToogleDirection(dir: string) {
    console.log(dir);
    if (dir === 'direction1') {
      if (this.direction1 === 'up') {
        this.direction1 = 'down';
      }else {
        this.direction1 = 'up';
      }
    } else if (dir === 'direction2') {
      if (this.direction2 === 'up') {
        this.direction2 = 'down';
      }else {
        this.direction2 = 'up';
      }
    } else if (dir === 'direction3') {
      if (this.direction3 === 'up') {
        this.direction3 = 'down';
      }else {
        this.direction3 = 'up';
      }
    }  else if (dir === 'direction4') {
      if (this.direction4 === 'up') {
        this.direction4 = 'down';
      }else {
        this.direction4 = 'up';
      }
    }  else if (dir === 'direction5') {
      if (this.direction5 === 'up') {
        this.direction5 = 'down';
      }else {
        this.direction5 = 'up';
      }
    }  else if (dir === 'direction6') {
      if (this.direction6 === 'up') {
        this.direction6 = 'down';
      }else {
        this.direction6 = 'up';
      }
    }
  }

}
