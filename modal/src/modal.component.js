"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var util_1 = require('util');
var ModalComponent = (function () {
    function ModalComponent() {
        this.onConfirm = new core_1.EventEmitter();
        this.onDeny = new core_1.EventEmitter();
    }
    ModalComponent.prototype.confirm = function () {
        this.onConfirm.emit(this.data);
    };
    ModalComponent.prototype.deny = function () {
        this.onDeny.emit(this.data);
    };
    ModalComponent.prototype.showDenyButton = function () {
        return !util_1.isNullOrUndefined(this.denyLabel);
    };
    ModalComponent.prototype.showConfirmButton = function () {
        return !util_1.isNullOrUndefined(this.confirmLabel);
    };
    ModalComponent.prototype.modalClose = function () {
        return this.modalClose ? 'modal-close' : '';
    };
    ModalComponent.prototype.ngClass = function () {
        var returnClass = '';
        if (this.disableConfirm) {
            returnClass += 'disable-confirm';
        }
        if (this.modalClose) {
            returnClass += 'modal-close';
        }
        return returnClass;
    };
    __decorate([
        core_1.Input('id')
    ], ModalComponent.prototype, "id");
    __decorate([
        core_1.Input('data')
    ], ModalComponent.prototype, "data");
    __decorate([
        core_1.Input('class')
    ], ModalComponent.prototype, "class");
    __decorate([
        core_1.Input('title')
    ], ModalComponent.prototype, "title");
    __decorate([
        core_1.Input('confirmLabel')
    ], ModalComponent.prototype, "confirmLabel");
    __decorate([
        core_1.Input('denyLabel')
    ], ModalComponent.prototype, "denyLabel");
    __decorate([
        core_1.Input('modalClose')
    ], ModalComponent.prototype, "modalClose");
    __decorate([
        core_1.Input('disableConfirm')
    ], ModalComponent.prototype, "disableConfirm");
    __decorate([
        core_1.Output('onConfirm')
    ], ModalComponent.prototype, "onConfirm");
    __decorate([
        core_1.Output('onDeny')
    ], ModalComponent.prototype, "onDeny");
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            template: "\n              <div id=\"{{ id }}\" ngClass=\"{{ class }}\" class=\"modal modal-fixed-footer\">\n                <div class=\"modal-content left-align\">\n                    <h4>{{ title || 'Modal' }}</h4>\n                    <ng-content></ng-content>\n                </div>\n                <div class=\"modal-footer\">\n                    <a *ngIf=\"showDenyButton()\" (click)= \"deny()\" class=\" modal-action modal-close waves-effect waves-red btn-flat\">{{ denyLabel }}</a>\n                    <a *ngIf=\"showConfirmButton()\" (click)= \"confirm()\" [ngClass]=\"ngClass()\" class=\" modal-action waves-effect waves-green btn-flat\">{{ confirmLabel }} </a>\n                </div>\n              </div>",
            styleUrls: ['./css/modal.css']
        })
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map