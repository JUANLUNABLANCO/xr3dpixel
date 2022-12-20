import { Component, OnInit } from '@angular/core';

// declare function carga_PLUGINS();
declare function carga_PLUGINS();

@Component({
  selector: 'app-ases-infoslider',
  templateUrl: './ases-infoslider.component.html',
  // styleUrls: ['./infoslider.component.less']
})
export class AsesInfoSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
        // carga_PLUGINS();
  }

}
