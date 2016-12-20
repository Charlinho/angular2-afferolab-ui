import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalMessageComponent } from './modal-message.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ModalMessageComponent,
    ModalComponent
  ],
  exports: [
    ModalMessageComponent,
    ModalComponent
  ]
})
export class ModalModule {}