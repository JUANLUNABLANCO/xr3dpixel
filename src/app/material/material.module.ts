import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material imports
import { MatMenuModule, MatToolbarModule, MatTabsModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  declarations: []
})
export class MaterialModule { }
