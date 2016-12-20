import { Component, Input, Output, EventEmitter } from '@angular/core';
import { _ } from 'underscore';

@Component({
  selector: 'confirm-button',
  template: `
              <a href="#{{ id }}" class="{{class}} modal-trigger">
                <ng-content></ng-content>
              </a>
              <div id="{{ id }}" class="modal">
                <div class="modal-content left-align">
                    <h4>{{ title || 'Alerta' }}</h4>
                    <p>{{ content || 'Deseja confirmar essa ação?' }}</p>
                </div>
                <div class="modal-footer">
                    <a (click)= "deny()" class=" modal-action modal-close waves-effect waves-red btn-flat">{{ denyLabel || 'Não' }}</a>
                    <a (click)= "confirm()" class=" modal-action modal-close waves-effect waves-green btn-flat">{{ confirmLabel || 'Sim' }} </a>
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
}