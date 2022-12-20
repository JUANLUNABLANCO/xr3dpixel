import { Component, OnInit } from '@angular/core';

declare function carga_PLUGINS();

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    carga_PLUGINS();  // !!!WARNING declarardo dos veces en  main.component.ts
  }

}
