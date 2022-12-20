import { RouterModule, Routes } from '@angular/router';

// PAGES

// import { NotfoundComponent } from './notfound/notfound.component';
// import { InicioComponent } from './structure/pages/Inicio/inicio.component';
// import { ProductsComponent } from './structure/pages/products/products.component';
// import { ServicesComponent } from './structure/pages/services/services.component';
// import { ContactComponent } from './structure/pages/contact/contact.component';
// import { AboutComponent } from './structure/pages/about/about.component';

import { PagesComponent } from './structure/pages/pages.component';
// import { Tour360_01Component } from './structure/projects/tour360_01/tour360_01.component';
// import { AppComponent } from './app.component';






const appRoutes: Routes = [
  {path: '**', component: PagesComponent }




  // {path: '**', component: NotfoundComponent },

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });
