import { RouterModule, Routes } from '@angular/router';

// import { ProductsComponent } from './products.component';
import {  ProductBaseComponent } from './product_base/product_base.component';

// import { NotfoundComponent } from '../../../notfound/notfound.component';


const productsRoutes: Routes = [

  {path: '', component: ProductBaseComponent },


      // {path: '', redirectTo: '/inicio', pathMatch: 'full' },
      // {path: '**', component: NotfoundComponent },

];

export const PRODUCTS_ROUTES = RouterModule.forChild( productsRoutes );
