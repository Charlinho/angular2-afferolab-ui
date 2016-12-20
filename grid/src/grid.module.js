"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var modal_module_1 = require('.././src/modal.module');
var select_module_1 = require('../../core/src/select/select.module.ts');
var loader_module_1 = require('../../core/src/loader/loader.module.ts');
var toast_message_module_1 = require('../../core/src/toast-message/toast-message.module.ts');
var grid_component_1 = require('./grid.component.ts');
var GridModule = (function () {
    function GridModule() {
    }
    GridModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule,
                modal_module_1.ModalModule,
                forms_1.FormsModule,
                select_module_1.SelectModule,
                loader_module_1.LoaderModule,
                toast_message_module_1.ToastMessageModule
            ],
            declarations: [
                grid_component_1.GridComponent
            ],
            exports: [
                grid_component_1.GridComponent
            ]
        })
    ], GridModule);
    return GridModule;
}());
exports.GridModule = GridModule;
//# sourceMappingURL=grid.module.js.map