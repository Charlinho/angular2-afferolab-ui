import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Mapper } from './mapper';
import { _ } from 'underscore';
import * as handlers from './handlers';
import { AbstractStatus } from './grid.status';

export class GridProvider<MODEL> {

  private _pagination: Pagination = Pagination.empty;

  private _filter: Filter = new Filter();

  params: URLSearchParams;

  _pageRequest: PageRequest = new PageRequest();

  public static get SEMAPHORE():string { return "GridSemaphore"; }

  constructor(public serverApi: any,
              protected mapper: Mapper,
              protected params: URLSearchParams,
              protected _headers: Array<string>,
              protected _readOnly: boolean,
              protected _hasFilter: boolean = true,
              protected _actionRemove: Action,
              protected _actionEdit: Action,
              protected _actionMultiSelect: Action,
              protected _actionSingleSelect: Action,
              protected _status: AbstractStatus) {}

  get pagination() {
    return this._pagination;
  }

  get filter() {
    return this._filter;
  }

  get actionRemove() {
    return this._actionRemove;
  }

  get actionEdit() {
    return this._actionEdit;
  }

  get actionMultiSelect() {
    return this._actionMultiSelect;
  }

  get actionSingleSelect() {
    return this._actionSingleSelect;
  }

  get status() {
    return this._status;
  }

  get pageRequest() {
    return this._pageRequest;
  }

  static builder() : GridProviderBuilder {
    return new GridProviderBuilder();
  }

  get headers() {
    return this._headers;
  }

  get path() {
    return this.serverApi.getResourceUrl();
  }

  get readOnly() {
    return this._readOnly;
  }

  get hasFilter() {
    return this._hasFilter;
  }

  getData(page: number = -1): Observable<Array<any>> {
    if (page === -1) {
      page = this._pagination.currentPage;
    }
    this._pageRequest.page = page;
    return this.loadPageData(this._pageRequest);
  }

  loadPageData(pageRequest: PageRequest): Observable<Array<any>> {
    this.params.setAll(this._filter.buildParams());
    this.params.setAll(pageRequest.buildParams());
    return this.serverApi.list(this.params).map(data=> {
      this._pagination = new Pagination(data.numberOfElements, data.totalPages, data.totalElements, pageRequest.page);
      return data.content.map((model)=>{
        return this.mapper(model);
      });
    });
  }

  remove(id:number): Observable<boolean>  {
    return this.serverApi.remove(id);
  }
}

class GridProviderBuilder {

  private _service : any;

  private _mapper : Mapper;

  private _params: URLSearchParams;

  private _headers: Array<string>;

  private _readOnly: boolean = false;

  private _hasFilter: boolean;

  private _actionRemove: Action;

  private _actionEdit: Action;

  private _actionMultiSelect: Action;

  private _actionSingleSelect: Action;

  private _status: AbstractStatus;

  service(service: any): GridProviderBuilder {
    this._service = service;
    return this;
  }

  mapper(mapper: Mapper): GridProviderBuilder {
    this._mapper = mapper;
    return this;
  }

  params(params: URLSearchParams): GridProviderBuilder {
    this._params = params;
    return this;
  }

  addParams(key:string, value:string): GridProviderBuilder {

    if(this._params == undefined) {
      this._params = new URLSearchParams();
    }

    this._params.append(key, value);

    return this;
  }

  headers(headers: Array<string>): GridProviderBuilder {
    this._headers = headers;
    return this;
  }

  actionRemove(hasPermission: boolean = false): GridProviderBuilder {
    this._actionRemove = new ActionRemove(hasPermission);
    return this;
  }

  actionEdit(hasPermission: boolean = false): GridProviderBuilder {
    this._actionEdit = new ActionEdit(hasPermission);
    return this;
  }

  actionMultiSelect(hasPermission: boolean = false, selectedItems: Array<any> = []): GridProviderBuilder {
    this._actionMultiSelect = new ActionMultiSelect(hasPermission, selectedItems);
    return this;
  }

  actionSingleSelect(hasPermission: boolean = false, selectedItem: any, callback: any): GridProviderBuilder {
    this._actionSingleSelect = new ActionSingleSelect(hasPermission, selectedItem, callback);
    return this;
  }

  readOnly(): GridProviderBuilder {
    this._readOnly = true;
    return this;
  }

  status(className: string, statuses: Array<any>): GridProviderBuilder {
    if (className && statuses.length > 0) {
      this._status = new (<any>handlers)[className](statuses);
    }
    return this;
  }

  hasFilter(filter: boolean): GridProviderBuilder {
    this._hasFilter = filter;
    return this;
  }

  build(): GridProvider<any> {
    let params: URLSearchParams = this._params || new PageRequest().buildParams();
    let actionEdit = this._actionEdit || new ActionEdit();
    let actionRemove = this._actionRemove || new ActionRemove();
    let actionMultiSelect = this._actionMultiSelect || new ActionMultiSelect();
    let actionSingleSelect = this._actionSingleSelect || new ActionSingleSelect();
    return new GridProvider(this._service, this._mapper, params, this._headers, this._readOnly, this._hasFilter, actionRemove, actionEdit, actionMultiSelect, actionSingleSelect, this._status || null);
  }
}

class Pagination {

  static defaultPageSize: number = 10;
  static defaultPageNumber: number = 0;

  static empty:Pagination = new Pagination(0, 0, 0, 0);

  constructor(public totalElements: number,
              public totalPages: number,
              public totalRegisters: number,
              public currentPage: number) { }

  previousPage(): number {
    return this.currentPage - 1;
  }

  nextPage(): number {
    return this.currentPage + 1;
  }

  canShowPage(page: number): boolean {
    let canShow = true;

    if (page < 0 || page > this.totalPages) {
      canShow = false;
    }

    return canShow;
  }

  canShowPrevious(page: number) : boolean {
    return page > 0;
  };

  canShowNext(page: number) : boolean {
    return page < this.totalPages
  };

}

abstract class Params {
  public buildParams(): URLSearchParams {
    let filters: URLSearchParams = new URLSearchParams();
    for (var prop in Object.keys(this)) {
      if (!isNullOrUndefined(this[Object.keys(this)[prop]])) {
        filters.set(Object.keys(this)[prop], this[Object.keys(this)[prop]]);
      }
    }
    return filters;
  }
}

class Filter extends Params {
  status: boolean;
  q: string;

  constructor(status?: boolean, q?: string) {
    super();
    if (status) {
      this.status = status;
    } else {
      this.status = '';
    }
    this.q = q;
  }
}

class PageRequest extends Params {
  page: number;
  size: number;

  constructor(page: number = Pagination.defaultPageNumber, size: number = Pagination.defaultPageSize) {
    super();
    this.page = page;
    this.size = size;
  }
}

interface Action {
  canShow(hasPermission: boolean): boolean;
}

abstract class AbstractAction implements Action {
  hasPermission: boolean;

  constructor(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }

  canShow(): boolean {
    return this.hasPermission;
  }
}

class ActionRemove extends AbstractAction {
  constructor(hasPermission: boolean = false) {
    super(hasPermission);
  }
}

class ActionEdit extends AbstractAction {
  constructor(hasPermission: boolean = false) {
    super(hasPermission);
  }

}

class ActionMultiSelect extends AbstractAction {
  public selectedItems: Array<any> = [];

  constructor(hasPermission: boolean = false, selectedItems: Array<any> = []) {
    super(hasPermission);
    this.selectedItems = selectedItems;
  }

  public addItem(item: any) {
    this.selectedItems.push(item);
  }

  public removeItem(item: any) {
    let indexToRemove = _.findIndex(this.selectedItems, function (selectedItem) {
      return selectedItem.id == item.id;
    });
    this.selectedItems.splice(indexToRemove, 1);
  }
}

class ActionSingleSelect extends AbstractAction {
  public selectedItem: any;
  private callback: any;

  constructor(hasPermission: boolean = false, selectedItem: any, callback: any) {
    super(hasPermission);
    this.selectedItem = selectedItem;
    this.callback = callback;
  }

  public addItem(item: any) {
    Object.assign(this.selectedItem, item);
    if (this.callback) {
      this.callback(this.selectedItem);
    }
  }

  public removeItem() {
    delete this.selectedItem;
  }
}
