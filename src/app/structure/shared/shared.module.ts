import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// material imports
// import { MatMenuModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import {  MatIconModule } from '@angular/material';

// import { MatGridListModule } from '@angular/material/grid-list';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// shareds
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
    // import { MenuSliderComponent } from '../pages/products/menu-slider/menu-slider.component';
    // import { MainComponent } from '../pages/products/main/main.component';
    // import { AsideComponent } from '../pages/products/aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { PAGES_ROUTES } from '../pages/pages.routes';

// ############################# componentes reutilizables
// componente visitcard ra
import {  VisitCardComponent } from './reutilizables/visit_card/visit_card.component';

// ejemplos no ocntemplados
// import { ExampleComponent } from './_examples/example.component';
// import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    // MenuSliderComponent,
    // MainComponent,
    // AsideComponent,
    FooterComponent,
    NotfoundComponent,
    // ExampleComponent,
    // SidebarComponent
    VisitCardComponent
  ],
  imports: [
    PAGES_ROUTES,
    // MatMenuModule,
    // MatToolbarModule,
    // MatTabsModule,
    // MatButtonModule,
    MatIconModule,
    // MatCardModule,
    // MatGridListModule,
    // BrowserAnimationsModule
  ],

  exports: [
    HeaderComponent,
    DashboardComponent,
    // MenuSliderComponent,
    // MainComponent,
    // AsideComponent,
    FooterComponent,
    NotfoundComponent,
    VisitCardComponent
  ]
})
export class SharedModule { }
