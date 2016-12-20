import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../modal/src/modal.module';
import { SelectModule } from '../../core/src/select/select.module';
import { LoaderModule } from '../../core/src/loader/loader.module';
import { ToastMessageModule } from '../../core/src/toast-message/toast-message.module';
import { GridComponent } from './grid.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    ModalModule,
    FormsModule,
    SelectModule,
    LoaderModule,
    ToastMessageModule
  ],
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule {}