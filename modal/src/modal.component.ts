import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'modal',
  template: `
              <div id="{{ id }}" ngClass="{{ class }}" class="modal modal-fixed-footer">
                <div class="modal-content left-align">
                    <h4>{{ title || 'Modal' }}</h4>
                    <ng-content></ng-content>
                </div>
                <div class="modal-footer">
                    <a *ngIf="showDenyButton()" (click)= "deny()" class=" modal-action modal-close waves-effect waves-red btn-flat">{{ denyLabel }}</a>
                    <a *ngIf="showConfirmButton()" (click)= "confirm()" [ngClass]="ngClass()" class=" modal-action waves-effect waves-green btn-flat">{{ confirmLabel }} </a>
                </div>
              </div>`,
  styleUrls: ['./css/modal.css']
})

export class ModalComponent {
  @Input('id')
  id: string;

  @Input('data')
  data: any;

  @Input('class')
  class: string;

  @Input('title')
  title: string;

  @Input('confirmLabel')
  confirmLabel: string;

  @Input('denyLabel')
  denyLabel: string;

  @Input('modalClose')
  modalClose: boolean;

  @Input('disableConfirm')
  disableConfirm: boolean;

  @Output('onConfirm')
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output('onDeny')
  onDeny: EventEmitter<any> = new EventEmitter<any>();

  confirm(): void {
      this.onConfirm.emit(this.data);
  }

  deny(): void {
      this.onDeny.emit(this.data);
  }

  showDenyButton(): boolean {
    return !isNullOrUndefined(this.denyLabel);
  }

  showConfirmButton(): boolean {
    return !isNullOrUndefined(this.confirmLabel);
  }

  modalClose(): string {
    return this.modalClose ? 'modal-close' : '';
  }

  ngClass(): string {
    let returnClass = '';

    if (this.disableConfirm) {
      returnClass += 'disable-confirm';
    }

    if (this.modalClose) {
      returnClass +='modal-close';
    }

    return returnClass;
  }
}