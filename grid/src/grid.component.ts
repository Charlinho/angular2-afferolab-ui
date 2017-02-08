import { _ } from 'underscore';
import { Input, Output, Component, ChangeDetectorRef, HostListener, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { GridProvider } from './grid.provider';

@Component({
  selector: 'grid',
  template: `
            <loader [showLoad]="showLoad"></loader>
            <toast-message [message]="message"></toast-message>
            <div class="card-panel">
              <ng-content></ng-content>
              <div *ngIf="!provider.hasFilter && filters" ngClass="{{buttonSearchClass}}">
                  <a (click)="search()" class="btn-floating btn-sm button-confirm-color" [ngStyle]="buttonSearchStyle">
                    <i class="material-icons">search</i>
                  </a>
                </div>
              <div class="row">
                <div *ngIf="provider.hasFilter" ngClass="{{statusClass ? statusClass : 'col s12 m12 l2'}}">
                <select-box [options]="status" [key]="'value'" [optionValue]="'name'" [(modelValue)]="provider.filter.status" ></select-box>
                </div>
                <div *ngIf="provider.hasFilter" ngClass="{{inputSearchClass ? inputSearchClass : 'col s12 m12 l5'}}">
                  <input class="" placeholder="Pesquisar..." aria-controls="example" type="search" [(ngModel)]="provider.filter.q">
                </div>
                <div *ngIf="provider.hasFilter" ngClass="{{buttonSearchClass}}">
                  <a (click)="search()" class="btn-floating btn-sm button-confirm-color">
                    <i class="material-icons">search</i>
                  </a>
                </div>
               </div>
              </div>

            <div id="example_wrapper" class="dataTables_wrapper">
              <table id="{{ id }}" class="display responsive-table datatable-example striped">
                <thead>
                  <tr>
                    <th *ngFor="let head of provider.headers">{{ head }}</th>
                    <th width="15%" *ngIf="!provider.readOnly">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of items">
                    <td *ngFor="let value of item.columns">                                               
                        <div style="max-width: 600px; word-wrap: break-word">{{ value }}</div>     
                    </td>
                     <td *ngIf="!provider.readOnly">
                        <a *ngIf="provider.actionEdit && provider.actionEdit.canShow()" [routerLink]="[provider.path, item.id]"><i class="material-icons action-button">mode_edit</i></a>
                        <confirm-button *ngIf="provider.actionRemove && provider.actionRemove.canShow()" (onConfirm)="remove($event)"
                                        [title]="modalMessage.title"
                                        [content]="modalMessage.content"
                                        [data]="item.id">
                            <i class="material-icons action-button">delete</i>
                        </confirm-button>
                        <span *ngIf="provider.actionMultiSelect && provider.actionMultiSelect.canShow()" >
                          <input id="multi_select_{{item.id}}" type="checkbox" [(ngModel)]="item.checked" (change)="updateList($event, item)">
                          <label htmlFor="multi_select_{{item.id}}"></label>
                        </span>
                        <span *ngIf="provider.actionSingleSelect && provider.actionSingleSelect.canShow()" >
                          <a class="btn-sm btn-floating button-confirm-color" (click)="updateItem(item)">
                            <i class="material-icons dp48">add</i>
                          </a>
                        </span>
                    </td>
                  </tr>
                  <tr *ngIf="items && items.length == 0">
                    <td [attr.colspan]="provider.headers.length+1">
                      <b>Nenhum registro encontrado!</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            
              <div class="card-panel">
                <div class="row">
                  <div class="col s12 m12 l1" [ngStyle]="registerStyle" id="register">
                    <label>Mostrar</label>
                    <select name="register" class="browser-default" [(ngModel)]="provider.pageRequest.size" (ngModelChange)="getPage(0)">
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="dataTables_info left-align col s12 m12 l8" style="margin-top: 10px" id="example_info" role="status" aria-live="polite">Mostrando 1 até {{ provider.pagination.totalElements }} de {{ provider.pagination.totalRegisters }} registros</div>
                  <div class="dataTables_paginate paging_simple_numbers right-align col s12 m12 l4" id="example_paginate">
                    <button *ngIf="provider.pagination.canShowPrevious(provider.pagination.currentPage)" class="paginate_button" aria-controls="example" tabindex="0" id="example_previous" (click)="getPage(provider.pagination.previousPage())">
                        <i class="material-icons">chevron_left</i>
                    </button>
  
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage -3)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage -3)">{{provider.pagination.currentPage -2}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage -2)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage -2)">{{provider.pagination.currentPage -1}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage -1)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage -1)">{{provider.pagination.currentPage}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage)" class="paginate_button current" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage)">{{provider.pagination.currentPage +1}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage +2)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage +1)">{{provider.pagination.currentPage +2}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage +3)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage +2)">{{provider.pagination.currentPage +3}}</button>
                    <button *ngIf="provider.pagination.canShowPage(provider.pagination.currentPage +4)" class="paginate_button" aria-controls="example" tabindex="0" (click)="getPage(provider.pagination.currentPage +3)">{{provider.pagination.currentPage +4}}</button>
  
                    <button *ngIf="provider.pagination.canShowNext(provider.pagination.currentPage +4)" class="paginate_button" aria-controls="example" tabindex="0" id="example_next" (click)="getPage(provider.pagination.nextPage())">
                        <i class="material-icons">chevron_right</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            `
})

export class GridComponent {

  public modalMessage: any = {};

  public id: string = _.uniqueId();

  public showLoad: boolean;

  public message: string;

  public status = [
    {name: 'Todos', value: ''},
    {name: 'Ativo', value: true},
    {name: 'Inativo', value: false}
  ];

  @Input('provider')
  provider: GridProvider<any>;

  @Output('singleSelectItem')
  singleSelectItem: EventEmitter<any> = new EventEmitter<any>();

  @Input('loadOnStart') loadOnStart;

  @Input('filters') filters;

  @Input('statusClass') statusClass;

  @Input('inputSearchClass') inputSearchClass;

  @Input('buttonSearchClass') buttonSearchClass;

  @Input('buttonSearchStyle') buttonSearchStyle;

  @Input('registerStyle') registerStyle;

  private list:Array<any> = [];

  private loaded:boolean = false;

  constructor(private ref: ChangeDetectorRef) {
    this.modalMessage.title = 'Remoção';
    this.modalMessage.content = 'Deseja realizar a remoção desse registro?'
  }

  get items() {
    /*@todo criar classe para Lazy load que carregue apenas uma vez o conteudo.*/
    if (!this.loaded && (this.loadOnStart == undefined || this.loadOnStart)) {
      this.loaded = true;
      this.loadData(() => {
        return this.provider.getData(0);
      });
    }

    return this.list;
  }

  getPage(page: number) : void {
    this.loadData(() => {
      return this.provider.getData(page);
    });
  }

  remove(id: number): void {
    this.showLoad = true;
    this.provider.remove(id).subscribe(
        () => {
          this.loadData(() => this.provider.getData(this.getPageAfterRemoveLastRegister()));
          this.showLoad = false;
        },
        () => {
          this.message = 'Erro ao remover registro.';
          this.showLoad = false;
        }
    );
  }

  search(): void {
    this.buildSearchFilters();
    this.loadData(()=> this.provider.getData(0));
  }

  loadElements(): void {
    setTimeout(() => $('.modal-trigger').leanModal(), 0);
  }

  getPageAfterRemoveLastRegister(): any {
    let page = -1;

    if (this.list.length == 1) {
      page = this.provider.pagination.currentPage - 1;
    }
    return page;
  }

  public loadData(dataLoader : ()=>Observable<Array<any>>) {
    this.showLoad = true;
    dataLoader().subscribe(
        // onSuccess
        data => {
          this.list.length=0;
          data.forEach(values =>  {
            let item = values;
            item.columns = [];

            let mapperValues = this.provider.mapper(values);
            for(var key in mapperValues) {
              if (key === '_id') {
                item.id = mapperValues[key];
              } else {
                item[this.buildKey(key)] = mapperValues[key];
                item.columns.push(mapperValues[key]);
              }
            }
            this.list.push(item);
          });
          this.showLoad = false;
        },
        // onError
        () => {
          this.showLoad = false;
          this.message = 'Erro ao listar os registros.'
        },
        // onComplete
        () => {
          this.ref.detectChanges();
          this.loadElements();
          this.showLoad = false;
        }
    );
  }

  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  updateList(event, item: any): void {
    if (event.currentTarget.checked) {
      this.provider.actionMultiSelect.addItem(item);
    } else {
      this.provider.actionMultiSelect.removeItem(item);
    }
  }

  updateItem(item: any): void {
    this.provider.actionSingleSelect.addItem(item);
    this.singleSelectItem.emit();
  }

  buildKey(key: string): string {
    return key.substring(key.indexOf('.') +1, key.length);
  }

  buildSearchFilters() {
    this.cleanFilters();
    if (this.filters) {
      for (var key in this.filters) {
        if (this.filters[key] !== 'null') {
          this.provider.filter[key] = this.filters[key];
        }
      }
    }
  }

  cleanFilters() {
    for (var key in this.filters) {
      delete this.provider._filter[key];
    }
  }
}