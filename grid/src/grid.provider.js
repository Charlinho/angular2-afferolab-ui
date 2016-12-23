"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var util_1 = require('util');
var GridProvider = (function () {
    function GridProvider(serverApi, mapper, params, _headers, _hasEditPermissions, _hasRemovePermissions, _readOnly, _hasFilter) {
        if (_hasEditPermissions === void 0) { _hasEditPermissions = true; }
        if (_hasRemovePermissions === void 0) { _hasRemovePermissions = true; }
        if (_hasFilter === void 0) { _hasFilter = true; }
        this.serverApi = serverApi;
        this.mapper = mapper;
        this.params = params;
        this._headers = _headers;
        this._hasEditPermissions = _hasEditPermissions;
        this._hasRemovePermissions = _hasRemovePermissions;
        this._readOnly = _readOnly;
        this._hasFilter = _hasFilter;
        this._pagination = Pagination.empty;
        this._filter = new Filter();
        this._pageRequest = new PageRequest();
    }
    Object.defineProperty(GridProvider.prototype, "pagination", {
        get: function () {
            return this._pagination;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "pageRequest", {
        get: function () {
            return this._pageRequest;
        },
        enumerable: true,
        configurable: true
    });
    GridProvider.builder = function () {
        return new GridProviderBuilder();
    };
    Object.defineProperty(GridProvider.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "path", {
        get: function () {
            return this.serverApi.getResourceUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "hasEditPermissions", {
        get: function () {
            return this._hasEditPermissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "hasRemovePermissions", {
        get: function () {
            return this._hasRemovePermissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "readOnly", {
        get: function () {
            return this._readOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "hasFilter", {
        get: function () {
            return this._hasFilter;
        },
        enumerable: true,
        configurable: true
    });
    GridProvider.prototype.getData = function (page) {
        if (page === void 0) { page = -1; }
        if (page === -1) {
            page = this._pagination.currentPage;
        }
        this._pageRequest.page = page;
        return this.loadPageData(this._pageRequest);
    };
    GridProvider.prototype.loadPageData = function (pageRequest) {
        var _this = this;
        this.params.setAll(this._filter.buildParams());
        this.params.setAll(pageRequest.buildParams());
        return this.serverApi.list(this.params).map(function (data) {
            _this._pagination = new Pagination(data.numberOfElements, data.totalPages, data.totalElements, pageRequest.page);
            return data.content.map(function (model) {
                return _this.mapper(model);
            });
        });
    };
    GridProvider.prototype.remove = function (id) {
        return this.serverApi.remove(id);
    };
    return GridProvider;
}());
exports.GridProvider = GridProvider;
var GridProviderBuilder = (function () {
    function GridProviderBuilder() {
        this._readOnly = false;
        this._hasFilter = false;
    }
    GridProviderBuilder.prototype.service = function (service) {
        this._service = service;
        return this;
    };
    GridProviderBuilder.prototype.mapper = function (mapper) {
        this._mapper = mapper;
        return this;
    };
    GridProviderBuilder.prototype.params = function (params) {
        this._params = params;
        return this;
    };
    GridProviderBuilder.prototype.addParams = function (key, value) {
        if (this._params == undefined) {
            this._params = new http_1.URLSearchParams();
        }
        this._params.append(key, value);
        return this;
    };
    GridProviderBuilder.prototype.headers = function (headers) {
        this._headers = headers;
        return this;
    };
    GridProviderBuilder.prototype.hasEditPermissions = function (editPermissions) {
        this._hasEditPermissions = editPermissions;
        return this;
    };
    GridProviderBuilder.prototype.hasRemovePermissions = function (removePermissions) {
        this._hasRemovePermissions = removePermissions;
        return this;
    };
    GridProviderBuilder.prototype.readOnly = function () {
        this._readOnly = true;
        return this;
    };
    GridProviderBuilder.prototype.hasFilter = function (filter) {
        this._hasFilter = filter;
        return this;
    };
    GridProviderBuilder.prototype.build = function () {
        var params = this._params || new PageRequest().buildParams();
        return new GridProvider(this._service, this._mapper, params, this._headers, this._hasEditPermissions, this._hasRemovePermissions, this._readOnly, this._hasFilter);
    };
    return GridProviderBuilder;
}());
var Pagination = (function () {
    function Pagination(totalElements, totalPages, totalRegisters, currentPage) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.totalRegisters = totalRegisters;
        this.currentPage = currentPage;
    }
    Pagination.prototype.previousPage = function () {
        return this.currentPage - 1;
    };
    Pagination.prototype.nextPage = function () {
        return this.currentPage + 1;
    };
    Pagination.prototype.canShowPage = function (page) {
        var canShow = true;
        if (page < 0 || page > this.totalPages) {
            canShow = false;
        }
        return canShow;
    };
    Pagination.prototype.canShowPrevious = function (page) {
        return page > 0;
    };
    ;
    Pagination.prototype.canShowNext = function (page) {
        return page < this.totalPages;
    };
    ;
    Pagination.defaultPageSize = 10;
    Pagination.defaultPageNumber = 0;
    Pagination.empty = new Pagination(0, 0, 0, 0);
    return Pagination;
}());
var Params = (function () {
    function Params() {
    }
    Params.prototype.buildParams = function () {
        var filters = new http_1.URLSearchParams();
        for (var prop in Object.keys(this)) {
            if (!util_1.isNullOrUndefined(this[Object.keys(this)[prop]])) {
                filters.set(Object.keys(this)[prop], this[Object.keys(this)[prop]]);
            }
        }
        return filters;
    };
    return Params;
}());
var Filter = (function (_super) {
    __extends(Filter, _super);
    function Filter(status, q) {
        this.status = status;
        this.q = q;
    }
    return Filter;
}(Params));
var PageRequest = (function (_super) {
    __extends(PageRequest, _super);
    function PageRequest(page, size) {
        if (page === void 0) { page = Pagination.defaultPageNumber; }
        if (size === void 0) { size = Pagination.defaultPageSize; }
        this.page = page;
        this.size = size;
    }
    return PageRequest;
}(Params));
//# sourceMappingURL=grid.provider.js.map