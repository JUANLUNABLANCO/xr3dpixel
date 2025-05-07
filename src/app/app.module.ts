// ############################# modulos de angular
import { NgModule } from "@angular/core"; // LOCALE_ID
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// ##### MY MODULES
import { PagesModule } from "./structure/pages/pages.module";
// RUTAS
import { APP_ROUTES } from "./app.routes";
// ############################# modulos
// ############################# Declarations: components, pipes
import { AppComponent } from "./app.component";

// ######################### dates
// import localeEs from '@angular/common/locales/es';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(localeEs);

// import { Tour360_01Component } from './structure/projects/tour360_01/tour360_01.component';
// import { SafedomPipe } from './pipes/safedom.pipe';
// ############################# Declarations: components, pipes

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // CommonModule,
    // HttpClientModule,
    APP_ROUTES,
    PagesModule,

    BrowserAnimationsModule,
  ],
  providers: [],
  // providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
