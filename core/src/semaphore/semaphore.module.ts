import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SemaphoreComponent } from './semaphore.component';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  imports: [
    BrowserModule,
    TooltipModule
  ],
  declarations: [
    SemaphoreComponent
  ],
  exports: [
    SemaphoreComponent
  ]
})
export class SemaphoreModule {}