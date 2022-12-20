import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-visit_card',
  templateUrl: './visit_card.component.html',
  styles: []
})
export class VisitCardComponent implements OnInit {
  outputPath: any;

  options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric"};

  currentDate:String = new Date().toLocaleDateString('es', this.options);
  Day   = this.currentDate.split(" ")[0];
  Hour  = this.currentDate.split(" ")[1];

  ampm  =  parseInt(this.Hour.split(":")[0]) <= 12 ? "am"  : "pm";

  constructor() {
  }

  ngOnInit() {
    // this.currentDate= new Date();
  }
  public HrefTo(site: string) {
    if (site === 'target') {
      this.outputPath = 'https://drive.google.com/file/d/1QVRj7uz9epp_VAj01ImsDL6qbwaOt9NV/view?usp=sharing';
    } else if (site === 'app_android') {
      this.outputPath = 'https://drive.google.com/file/d/16N-lhJAtE9jleDfJzlBF3J5QsKCz7DDC/view?usp=sharing';  // donde estará la app en android
    } else if (site === 'app_apple') {
      this.outputPath = '';  // donde estará la app en ios
    } else {
      return;
    }
    window.open(this.outputPath, '_blank');
    // document.location.href = this.outputPath;
  }

}
