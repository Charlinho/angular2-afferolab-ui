"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var underscore_1 = require('underscore');
var SelectComponent = (function () {
    function SelectComponent() {
        this.id = underscore_1._.uniqueId();
        this.onChange = new core_1.EventEmitter();
        this.modelValueChange = new core_1.EventEmitter();
    }
    SelectComponent.prototype.change = function (newValue) {
        this.modelValue = newValue;
        this.modelValueChange.emit(newValue);
        this.onChange.emit(newValue);
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.options && changes.options.currentValue) {
            setTimeout(function () {
                if (underscore_1._.isUndefined(_this.modelValue)) {
                    $('#' + _this.id + ' option:first').attr('selected', 'selected');
                    _this.change($('#' + _this.id + ' option:first').val());
                }
                else {
                    $('#' + _this.id).val(_this.modelValue).attr('selected', 'selected');
                }
            }, 0);
        }
    };
    __decorate([
        core_1.Input('modelValue')
    ], SelectComponent.prototype, "modelValue");
    __decorate([
        core_1.Input('options')
    ], SelectComponent.prototype, "options");
    __decorate([
        core_1.Input('key')
    ], SelectComponent.prototype, "key");
    __decorate([
        core_1.Input('disabledSelect')
    ], SelectComponent.prototype, "disabledSelect");
    __decorate([
        core_1.Output('onChange')
    ], SelectComponent.prototype, "onChange");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "modelValueChange");
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'select-box',
            template: "<select id=\"{{ id }}\" class=\"browser-default\" [(ngModel)]=\"modelValue\" (ngModelChange)=\"change($event)\" [disabled]=\"disabledSelect\">\n                <option *ngFor=\"let option of options\" [value]=\"option[key]\">{{ option.name }}</option>\n              </select>"
        })
    ], SelectComponent);
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map