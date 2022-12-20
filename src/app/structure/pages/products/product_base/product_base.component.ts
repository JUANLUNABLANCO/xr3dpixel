import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'; // recibe parametros por la url


// declare function carga_PLUGINS();

@Component({
  selector: 'app-product_base',
  templateUrl: './product_base.component.html',
})
export class ProductBaseComponent implements OnInit {
  id = 'scrollTo_Products';   // para el scroll inicial
  el: HTMLElement;            // elementos del dom
  outputPath: any;            // src out
  section: string;            // segun el parametro seccion ira a ese scroll
  // fechas y horas
  options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric"};
  currentDate:String = new Date().toLocaleDateString('es', this.options);
  Day   = this.currentDate.split(" ")[0];
  Hour  = this.currentDate.split(" ")[1];
  ampm  =  parseInt(this.Hour.split(":")[0]) <= 12 ? "am"  : "pm";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.scrollTo(this.id);

    this.section = this.activatedRoute.snapshot.params['section'] || null;
    if (this.section){
      console.log("Section: ", this.section );
      this.activatedRoute.params.subscribe((params: Params)=>{
        this.section = params.section;

        if (this.section == "museo-del-rock"){
          console.log("museo-del-rock");
          this.scrollTo ( this.section); // meter el id en el html "#section01", "#section02"  museo-del-rock
        }else {
          this.scrollTo(this.id);
        }
      });

    }

  }

  scrollTo(id : string) {
    this.el= document.getElementById(id);
    this.el.scrollIntoView();
  }

  public HrefTo(site: string) {
    if (site === 'app_android') {
     this.outputPath = 'https://drive.google.com/file/d/14AWshXxSyC1qrus3onS25E1TLx0nUd66/view?usp=sharing';
     // https://drive.google.com/file/d/1BvVBSCv6p6_ZwS6bDy2t_jA78gy6-Hwt/view?usp=sharing
   } else if (site === 'app_apple') {
     this.outputPath = 'https://';
   }
   window.open(this.outputPath, '_blank');
   document.location.href = this.outputPath;
 }



}
