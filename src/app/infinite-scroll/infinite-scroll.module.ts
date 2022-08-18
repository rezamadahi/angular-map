import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollRoutingModule } from './infinite-scroll-routing.module';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import {SharedModule} from "../shared/shared.module";
import { ScrollDirective } from './scroll.directive';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    ScrollDirective
  ],
  imports: [
    CommonModule,
    InfiniteScrollRoutingModule,
    SharedModule
  ]
})
export class InfiniteScrollModule { }
