"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var underscore_1 = require('underscore');
var ModalMessageComponent = (function () {
    function ModalMessageComponent() {
        this.id = underscore_1._.uniqueId();
        this.onConfirm = new core_1.EventEmitter();
        this.onDeny = new core_1.EventEmitter();
    }
    ModalMessageComponent.prototype.confirm = function () {
        this.onConfirm.emit(this.data);
    };
    ModalMessageComponent.prototype.deny = function () {
        this.onDeny.emit(this.data);
    };
    __decorate([
        core_1.Input('data')
    ], ModalMessageComponent.prototype, "data");
    __decorate([
        core_1.Input('class')
    ], ModalMessageComponent.prototype, "class");
    __decorate([
        core_1.Input('title')
    ], ModalMessageComponent.prototype, "title");
    __decorate([
        core_1.Input('content')
    ], ModalMessageComponent.prototype, "content");
    __decorate([
        core_1.Input('confirmLabel')
    ], ModalMessageComponent.prototype, "confirmLabel");
    __decorate([
        core_1.Input('denyLabel')
    ], ModalMessageComponent.prototype, "denyLabel");
    __decorate([
        core_1.Output('onConfirm')
    ], ModalMessageComponent.prototype, "onConfirm");
    __decorate([
        core_1.Output('onDeny')
    ], ModalMessageComponent.prototype, "onDeny");
    ModalMessageComponent = __decorate([
        core_1.Component({
            selector: 'confirm-button',
            template: "\n              <a href=\"#{{ id }}\" class=\"{{class}} modal-trigger\">\n                <ng-content></ng-content>\n              </a>\n              <div id=\"{{ id }}\" class=\"modal\">\n                <div class=\"modal-content left-align\">\n                    <h4>{{ title || 'Alerta' }}</h4>\n                    <p>{{ content || 'Deseja confirmar essa a\u00E7\u00E3o?' }}</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <a (click)= \"deny()\" class=\" modal-action modal-close waves-effect waves-red btn-flat\">{{ denyLabel || 'N\u00E3o' }}</a>\n                    <a (click)= \"confirm()\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">{{ confirmLabel || 'Sim' }} </a>\n                </div>\n              </div>"
        })
    ], ModalMessageComponent);
    return ModalMessageComponent;
}());
exports.ModalMessageComponent = ModalMessageComponent;
//# sourceMappingURL=modal-message.component.js.map