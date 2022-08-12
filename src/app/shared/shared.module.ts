import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import {MaterialModule} from "./material/material.module";
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MapComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MapComponent,
    MaterialModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
