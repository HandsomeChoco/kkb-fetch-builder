"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ApiBuilder {
    /**
     * @param baseUrl - example: `http://localhost:3000`
     */
    constructor(baseUrl) {
        this.baseUrl = this.filterSlash(baseUrl);
        this.endPoint = '';
        this.fetchOption = {};
        this.path = '';
        this.qs = '';
    }
    /**
     * set request method to GET (default)
     * @param {string} path - set path
     */
    get(path) {
        this.setFetchOptMethod("GET");
        if (path) {
            this.setPath(this.filterSlash(path));
        }
        return this;
    }
    /**
     * set request method to POST
     * @param {string} path - set path
     */
    post(path) {
        this.setFetchOptMethod("POST");
        if (path) {
            this.setPath(this.filterSlash(path));
        }
        return this;
    }
    /**
     * set request method to PUT
     * @param {string} path - set path
     */
    put(path) {
        this.setFetchOptMethod("PUT");
        if (path) {
            this.setPath(this.filterSlash(path));
        }
        return this;
    }
    /**
     * set request method to PATCH
     * @param {string} path - set path
     */
    patch(path) {
        this.setFetchOptMethod("PATCH");
        if (path) {
            this.setPath(this.filterSlash(path));
        }
        return this;
    }
    /**
     * set request method to DELETE
     * @param {string} path - set path
     */
    delete(path) {
        this.setFetchOptMethod("DELETE");
        if (path) {
            this.setPath(this.filterSlash(path));
        }
        return this;
    }
    /**
     * set header contents
     * @param {headerOptions} HeadersInit - fetch api header option object
     */
    headers(headerOptions) {
        if (headerOptions) {
            this.fetchOption = Object.assign(Object.assign({}, this.fetchOption), { headers: Object.assign({}, headerOptions) });
        }
        return this;
    }
    /**
     * set body data. it automatically serialized and change header content-type to application/json
     * @param {T} data - fetch api body object
     */
    jsonBody(data) {
        if (typeof data == "object" && data !== null) {
            this.fetchOption = Object.assign(Object.assign({}, this.fetchOption), { headers: Object.assign(Object.assign({}, this.fetchOption.headers), { 'Content-Type': 'application/json' }), body: JSON.stringify(data) });
        }
        return this;
    }
    /**
     * set url under base url
     * @param url - ex. /api/user/login
     */
    endpoint(url) {
        this.endPoint = this.filterSlash(url);
        return this;
    }
    /**
     * set query parameter
     * @param query ex) `key=value`
     * @returns
     */
    query(query) {
        this.qs = query;
        return this;
    }
    /**
     * set multiple query parameters
     * @param query ex) `["key=value", "key2=value2", "key3=value3"]`
     */
    queries(query) {
        this.qs = query.join("&");
        return this;
    }
    /**
     * override base url
     * @param url
     * @returns
     */
    overrideBaseUrl(url) {
        if (url) {
            this.baseUrl = url;
        }
        return this;
    }
    setPath(path) {
        this.path = this.filterSlash(path);
    }
    setFetchOptMethod(method) {
        this.fetchOption.method = method;
    }
    generateUrl(baseUrl, endPoint, path, qs) {
        if (baseUrl && endPoint && path && qs) {
            return baseUrl + "/" + endPoint + "/" + path + "?" + qs;
        }
        if (baseUrl && endPoint && path) {
            return baseUrl + "/" + endPoint + "/" + path;
        }
        if (baseUrl && endPoint) {
            return baseUrl + "/" + endPoint;
        }
        if (baseUrl) {
            return baseUrl;
        }
        throw new Error("There is no baseUrl in constructor. did you forgot to pass base url when you create constructor?");
    }
    filterSlash(url) {
        if (url[0] === "/" && url[url.length - 1] === "/") {
            url = url.slice(1, url.length - 1);
        }
        if (url[0] === "/" && url[url.length - 1] !== "/") {
            url = url.slice(1);
        }
        if (url[0] !== "/" && url[url.length - 1] === "/") {
            url = url.slice(0, url.length - 1);
        }
        return url;
    }
    /**
     * send request to call this method
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.generateUrl(this.baseUrl, this.endPoint, this.path, this.qs);
            return yield fetch(url, Object.assign({}, this.fetchOption))
                .then((res) => __awaiter(this, void 0, void 0, function* () { return yield res.json(); }))
                .catch(err => err);
        });
    }
}
exports.default = ApiBuilder;
