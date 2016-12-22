"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var underscore_1 = require('underscore');
var jquery_1 = require('jquery');
var core_1 = require('@angular/core');
var GridComponent = (function () {
    function GridComponent(ref) {
        this.ref = ref;
        this.modalMessage = {};
        this.id = underscore_1._.uniqueId();
        this.status = [
            { name: 'Todos', value: '' },
            { name: 'Ativo', value: true },
            { name: 'Inativo', value: false }
        ];
        this.list = [];
        this.loaded = false;
        this.modalMessage.title = 'Remoção';
        this.modalMessage.content = 'Deseja realizar a remoção desse registro?';
    }
    Object.defineProperty(GridComponent.prototype, "items", {
        get: function () {
            var _this = this;
            /*@todo criar classe para Lazy load que carregue apenas uma vez o conteudo.*/
            if (!this.loaded) {
                this.loaded = true;
                this.loadData(function () { return _this.provider.getData(0); });
            }
            return this.list;
        },
        enumerable: true,
        configurable: true
    });
    GridComponent.prototype.getPage = function (page) {
        var _this = this;
        this.loadData(function () { return _this.provider.getData(page); });
    };
    GridComponent.prototype.remove = function (id) {
        var _this = this;
        this.showLoad = true;
        this.provider.remove(id).subscribe(function () {
            _this.loadData(function () { return _this.provider.getData(); });
            _this.showLoad = false;
        }, function () {
            _this.message = 'Erro ao remover registro.';
            _this.showLoad = false;
        });
    };
    GridComponent.prototype.search = function () {
        var _this = this;
        this.loadData(function () { return _this.provider.getData(0); });
    };
    GridComponent.prototype.loadElements = function () {
        setTimeout(function () { return jquery_1.$('.modal-trigger').leanModal(); }, 0);
    };
    GridComponent.prototype.loadData = function (dataLoader) {
        var _this = this;
        this.showLoad = true;
        dataLoader().subscribe(
        // onSuccess
        function (data) {
            _this.list.length = 0;
            data.forEach(function (values) {
                var item = { columns: [] };
                for (var key in values) {
                    if (key === '_id') {
                        item.id = values[key];
                    }
                    else {
                        item.columns.push(values[key]);
                    }
                }
                _this.list.push(item);
            });
            _this.showLoad = false;
        }, 
        // onError
        function () {
            _this.showLoad = false;
            _this.message = 'Erro ao listar os registros.';
        }, 
        // onComplete
        function () {
            _this.ref.detectChanges();
            _this.loadElements();
            _this.showLoad = false;
        });
    };
    GridComponent.prototype.keypress = function (e) {
        if (e.keyCode === 13) {
            this.search();
        }
    };
    __decorate([
        core_1.Input('provider')
    ], GridComponent.prototype, "provider");
    __decorate([
        core_1.HostListener('document:keypress', ['$event'])
    ], GridComponent.prototype, "keypress");
    GridComponent = __decorate([
        core_1.Component({
            selector: 'grid',
            template: "\n            <loader [showLoad]=\"showLoad\"></loader>\n            <toast-message [message]=\"message\"></toast-message>\n            <div class=\"card-panel\">\n              <div class=\"row\">\n                <div class=\"col s12 m12 l2\">\n                <select-box [options]=\"status\" [key]=\"'value'\" [(modelValue)]=\"provider.filter.status\" ></select-box>\n                </div>\n                <div class=\"col s12 m12 l5\">\n                  <input class=\"\" placeholder=\"Pesquisar...\" aria-controls=\"example\" type=\"search\" [(ngModel)]=\"provider.filter.q\">\n                </div>\n                <div>\n                  <a (click)=\"search()\" class=\"btn-floating btn-sm waves-effect waves-light red\">\n                    <i class=\"material-icons\">search</i>\n                  </a>\n                </div>\n              </div>\n            </div>\n\n            <div id=\"example_wrapper\" class=\"dataTables_wrapper\">\n              <table id=\"{{ id }}\" class=\"display responsive-table datatable-example striped\">\n                <thead>\n                  <tr>\n                    <th *ngFor=\"let head of provider.headers\">{{ head }}</th>\n                    <th width=\"15%\" *ngIf=\"!provider.readOnly\">A\u00E7\u00F5es</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let item of items\">\n                    <td *ngFor=\"let value of item.columns\">\n                        <!-- TODO: REFATORAR -->\n                        <a *ngIf=\"value != null && value.toString().indexOf('http') > -1\" href=\"{{ value }}\" target=\"_blank\" >VISUALIZAR</a>\n                        <span *ngIf=\"value != null && value.toString().indexOf('http') === -1\">{{ value }}</span>\n                    </td>\n                     <td *ngIf=\"!provider.readOnly\">\n                        <a *ngIf=\"provider.hasEditPermissions\" [routerLink]=\"[provider.path, item.id]\"><i class=\"material-icons action-button\">mode_edit</i></a>\n                        <confirm-button *ngIf=\"provider.hasRemovePermissions\" (onConfirm)=\"remove($event)\"\n                                        [title]=\"modalMessage.title\"\n                                        [content]=\"modalMessage.content\"\n                                        [data]=\"item.id\">\n                            <i class=\"material-icons action-button\">delete</i>\n                        </confirm-button>\n                    </td>\n                  </tr>\n                  <tr *ngIf=\"items && items.length == 0\">\n                    <td [attr.colspan]=\"provider.headers.length+1\">\n                      <b>Nenhum registro encontrado!</b>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            \n              <div class=\"card-panel\">\n                <div class=\"row\">\n                  <div class=\"col s12 m12 l1\" id=\"register\">\n                    <label>Mostrar</label>\n                    <select name=\"register\" class=\"browser-default\" [(ngModel)]=\"provider.pageRequest.size\" (ngModelChange)=\"getPage(0)\">\n                      <option value=\"5\">5</option>\n                      <option value=\"10\">10</option>\n                      <option value=\"25\">25</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"dataTables_info left-align col s12 m12 l8\" style=\"margin-top: 10px\" id=\"example_info\" role=\"status\" aria-live=\"polite\">Mostrando 1 at\u00E9 {{ provider.pagination.totalElements }} de {{ provider.pagination.totalRegisters }} registros</div>\n                  <div class=\"dataTables_paginate paging_simple_numbers right-align col s12 m12 l4\" id=\"example_paginate\">\n                    <button *ngIf=\"provider.pagination.canShowPrevious(provider.pagination.currentPage)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" id=\"example_previous\" (click)=\"getPage(provider.pagination.previousPage())\">\n                        <i class=\"material-icons\">chevron_left</i>\n                    </button>\n  \n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage -3)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage -3)\">{{provider.pagination.currentPage -2}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage -2)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage -2)\">{{provider.pagination.currentPage -1}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage -1)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage -1)\">{{provider.pagination.currentPage}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage)\" class=\"paginate_button current\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage)\">{{provider.pagination.currentPage +1}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage +2)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage +1)\">{{provider.pagination.currentPage +2}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage +3)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage +2)\">{{provider.pagination.currentPage +3}}</button>\n                    <button *ngIf=\"provider.pagination.canShowPage(provider.pagination.currentPage +4)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" (click)=\"getPage(provider.pagination.currentPage +3)\">{{provider.pagination.currentPage +4}}</button>\n  \n                    <button *ngIf=\"provider.pagination.canShowNext(provider.pagination.currentPage +4)\" class=\"paginate_button\" aria-controls=\"example\" tabindex=\"0\" id=\"example_next\" (click)=\"getPage(provider.pagination.nextPage())\">\n                        <i class=\"material-icons\">chevron_right</i>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            "
        })
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map