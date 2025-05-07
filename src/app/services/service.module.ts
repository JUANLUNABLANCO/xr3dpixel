import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { HttpModule } from '@angular/http';

// propios
import { ContactService } from "./service.index";

@NgModule({
  imports: [
    CommonModule,
    // HttpModule
  ],
  providers: [ContactService],
  declarations: [],
})
export class ServiceModule {}
