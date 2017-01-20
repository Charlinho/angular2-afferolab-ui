import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TooltipComponent
  ],
  exports: [
    TooltipComponent
  ]
})
export class TooltipModule {}
