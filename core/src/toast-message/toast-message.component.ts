import { Component, Input, OnChanges } from '@angular/core';
import { Materialize } from 'materialize';

@Component({
  moduleId: module.id,
  selector: 'toast-message',
  template: ''
})
export class ToastMessageComponent implements OnChanges {

  @Input('message')
  message: string;

  ngOnChanges(): void {
      if (this.message) {
        Materialize.toast(this.message, 10000);
      }
  }

}