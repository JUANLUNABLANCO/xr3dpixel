import { NgModule } from '@angular/core';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// componentes externos
// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ProductBaseComponent } from './product_base/product_base.component';

// ##### soluciones
import { SoluInfoSliderComponent } from './product_base/avr_soluciones/solu-infoslider/solu-infoslider.component';
import { SoluInfoLeftComponent } from './product_base/avr_soluciones/solu-infoleft/solu-infoleft.component';

// ##### eventos
// import { EvenInfoSliderComponent } from './product_base/avr_eventos/even-infoslider/even-infoslider.component';
// import { EvenInfoLeftComponent } from './product_base/avr_eventos/even-infoleft/even-infoleft.component';


// angular material
// import {  MatCardModule } from '@angular/material';

// my modules
// import { SharedModule } from '../../shared/shared.module';
// import { PagesModule } from  '../pages.module';
// rutas
import { PRODUCTS_ROUTES } from './products.routes';


// services



// componentes
// Paginas: products,...
  // import { InfoLeftComponent} from './infoleft/infoleft.component';
  // import { InfoSliderComponent } from './infoslider/infoslider.component';


@NgModule({
  declarations: [
    ProductBaseComponent,
    SoluInfoSliderComponent,
    SoluInfoLeftComponent,
    // EvenInfoSliderComponent,
    // EvenInfoLeftComponent,
  ],
  imports: [
    PRODUCTS_ROUTES,
    CommonModule
  ],
  exports: [
    ProductBaseComponent,
    SoluInfoSliderComponent,
    SoluInfoLeftComponent,
    // EvenInfoSliderComponent,
    // EvenInfoLeftComponent
  ]
})
export class ProductsModule { }
