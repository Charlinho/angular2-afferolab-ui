import { Component, Input } from '@angular/core';
import { _ } from 'underscore';

@Component({
  selector: 'semaphore',
  template: `<tooltip [id]="id" [text]="tooltipText" [delay]="30" [ngClass]="getStyle()" [position]="'top'"></tooltip>`,
  styleUrls: ['./css/semaphore.css']
})

export class SemaphoreComponent {

  @Input('status')
  status: any;

  @Input('tooltipText')
  tooltipText: string;

  @Input('style')
  style: string;

  id: string = _.uniqueId();

  getStyle(): string {
    return 'btn-floating ' + this.style + ' semaphore-status';
  }
}