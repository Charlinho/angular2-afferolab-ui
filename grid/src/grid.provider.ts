import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Mapper } from './mapper';

export class GridProvider<MODEL> {

  private _pagination: Pagination = Pagination.empty;

  private _filter: Filter = new Filter();

  params: URLSearchParams;

  _pageRequest: PageRequest = new PageRequest();

  get pagination() {
    return this._pagination;
  }

  get filter() {
    return this._filter;
  }

  get pageRequest() {
    return this._pageRequest;
  }


  static builder() : GridProviderBuilder {
    return new GridProviderBuilder();
  }

  constructor(public serverApi: any,
              protected mapper: Mapper,
              protected params: URLSearchParams,
              protected _headers: Array<string>,
              protected _editPermissions: Array<string> = [],
              protected _removePermissions: Array<string> = [],
              protected _readOnly: boolean) {}


  get headers() {
    return this._headers;
  }

  get path() {
    return this.serverApi.getResourceUrl();
  }

  get editPermissions() {
    return this._editPermissions;
  }

  get removePermissions() {
    return this._removePermissions;
  }

  get readOnly() {
    return this._readOnly;
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

  private _editPermissions: Array<string>;

  private _removePermissions: Array<string>;

  private _readOnly: boolean = false;

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

  editPermissions(editPermissions: Array<string>): GridProviderBuilder {
    this._editPermissions = editPermissions;
    return this;
  }

  removePermissions(removePermissions: Array<string>): GridProviderBuilder {
    this._removePermissions = removePermissions;
    return this;
  }

  readOnly(): GridProviderBuilder {
    this._readOnly = true;
    return this;
  }


  build(): GridProvider<MODEL> {
    let params: URLSearchParams = this._params || new PageRequest().buildParams();
    return new GridProvider(this._service, this._mapper, params, this._headers, this._editPermissions, this._removePermissions, this._readOnly);
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
  constructor(public status?: boolean, public q?: string) {}
}

class PageRequest extends Params {
  constructor(public page: number = Pagination.defaultPageNumber, public size: number = Pagination.defaultPageSize) {}
}
