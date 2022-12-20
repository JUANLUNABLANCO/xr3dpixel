import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// componentes externos
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';

// angular material
// import {  MatCardModule } from '@angular/material';

// my modules
import { SharedModule } from '../shared/shared.module';
// import { ProductsModule } from '../pages/products/products.module';
// rutas
import { PAGES_ROUTES } from './pages.routes';
// services
import { ServiceModule } from '../../services/service.module';


// componentes
import { PagesComponent } from './pages.component';

// Paginas: products,...
import { InicioComponent } from './inicio/inicio.component';
/* ##### Lazy Load ##### */
import { ProductsComponent } from '../pages/products/products.component';
/* ##### Lazy Load ##### */

import { ServicesComponent } from './services/services.component';

  // ##### asesoria
import { AsesInfoSliderComponent } from './services/avr_asesoria/ases-infoslider/ases-infoslider.component';
import { AsesInfoLeftComponent } from './services/avr_asesoria/ases-infoleft/ases-infoleft.component';
// import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';



// PIPES
import { SafedomPipe } from '../../pipes/safedom.pipe';

// projects
import { Tour360_01Component } from '../projects/tour360_01/tour360_01.component';
import { Tour360_02Component } from '../projects/tour360_02/tour360_02.component';




@NgModule({
  declarations: [
    PagesComponent,
    /* ##### Lazy Load ##### */
    ProductsComponent,
    /* ##### Lazy Load ##### */
    ServicesComponent,
      AsesInfoLeftComponent,
      AsesInfoSliderComponent,
    // AboutComponent,
    Tour360_01Component,
    Tour360_02Component,
    InicioComponent,
    ContactComponent,
    LegalComponent,
    SafedomPipe
  ],
  imports: [
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServiceModule
  ],
  exports: [
    PagesComponent,
    InicioComponent,
    /* ##### Lazy Load ##### */
    ProductsComponent,
    /* ##### Lazy Load ##### */
    ServicesComponent,
      AsesInfoLeftComponent,
      AsesInfoSliderComponent,
    // AboutComponent,
    Tour360_01Component,
    Tour360_02Component,
    ContactComponent,
    LegalComponent
  ]
})
export class PagesModule { }
