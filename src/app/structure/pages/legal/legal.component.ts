import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styles: []
})
export class LegalComponent implements OnInit {
  id = 'scrollTo_Legal';
  constructor() { }

  ngOnInit() {
    this.Scroll();

  }

  public Scroll() {
    console.log('scrolling to');
    const el: HTMLElement = document.getElementById(this.id);
      el.scrollIntoView();
  }

}
