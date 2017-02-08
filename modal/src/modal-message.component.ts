import { Component, Input, Output, EventEmitter } from '@angular/core';
import { _ } from 'underscore';

@Component({
  selector: 'confirm-button',
  template: `
              <span class="{{class}}" (click)="openModal()" style="cursor: pointer">
                <ng-content></ng-content>
              </span>
              <div id="{{ id }}" class="modal">
                <div class="modal-content left-align">
                    <h4>{{ title || 'Alerta' }}</h4>
                    <p>{{ content || 'Deseja confirmar essa ação?' }}</p>
                </div>
                <div class="modal-footer" >
                    <a *ngIf="showConfirm" (click)= "deny()" class=" modal-action modal-close waves-effect waves-red btn-flat">{{ denyLabel || 'Não' }}</a>
                    <a *ngIf="showConfirm" (click)= "confirm()" class=" modal-action modal-close waves-effect waves-green btn-flat">{{ confirmLabel || 'Sim' }} </a>
                    <a *ngIf="!showConfirm" class=" modal-action modal-close waves-effect waves-green btn-flat">{{closeLabel || 'Fechar' }}</a>
                </div>
              </div>`
})

export class ModalMessageComponent {
  public id: string = _.uniqueId();

  @Input('data')
  data: any;

  @Input('class')
  class: string;

  @Input('title')
  title: string;

  @Input('content')
  content: string;

  @Input('confirmLabel')
  confirmLabel: string;

  @Input('denyLabel')
  denyLabel: string;

  @Input('closeLabel')
  closeLabel: string;

  @Input('checkToDelete')
  checkToDelete: any;

  @Input('showConfirm')
  showConfirm: boolean = true;

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

  openModal(): void {
    if (this.checkToDelete && this.checkToDelete._actionCheckToDelete && this.checkToDelete._actionCheckToDelete.canDelete) {
      this.checkToDelete._actionCheckToDelete.checkToDelete(this.data).subscribe(
        data => {
          this.showConfirm = this.checkToDelete._actionCheckToDelete.classInstance.showConfirm;

          if (this.checkToDelete._actionCheckToDelete.classInstance.hasAssigned) {
            this.title = this.checkToDelete._actionCheckToDelete.classInstance.title;
            this.content = this.checkToDelete._actionCheckToDelete.classInstance.content;
          }
          $('#' + this.id).openModal();
        },
        () => {}
      );
    } else {
      $('#' + this.id).openModal();
    }
  }
}