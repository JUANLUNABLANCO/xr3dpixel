import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';


import { InicioComponent } from './inicio/inicio.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
// import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { LegalComponent } from './legal/legal.component';

// projects
import { Tour360_01Component } from '../projects/tour360_01/tour360_01.component';
import { Tour360_02Component } from '../projects/tour360_02/tour360_02.component';







const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'inicio', component: InicioComponent },
      {
        path: 'products/:section',
        component: ProductsComponent,
        loadChildren: '../pages/products/products.module#ProductsModule'
      },
      {
        path: 'products',
        component: ProductsComponent,
        loadChildren: '../pages/products/products.module#ProductsModule'
      },
      {path: 'services', component: ServicesComponent },
      // {path: 'about', component: AboutComponent },
      {path: 'contact/:reason', component: ContactComponent },
      {path: 'contact', component: ContactComponent },
      {path: 'legal', component: LegalComponent },
      {path: '', redirectTo: '/inicio', pathMatch: 'full' }

    ]

  },
  {path: 'tour360_01', component: Tour360_01Component},
  {path: 'tour360_02', component: Tour360_02Component},
  {path: '**', component: NotfoundComponent },
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
