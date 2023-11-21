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
        this.baseUrl = baseUrl;
        this.qs = '';
        this.fetchOption = {};
        this.endPoint = '';
    }
    /**
     * set request method to GET (default)
     */
    get() {
        this.fetchOption = Object.assign({ method: "GET" }, this.fetchOption);
        return this;
    }
    /**
     * set request method to POST
     */
    post() {
        this.fetchOption = Object.assign({ method: "POST" }, this.fetchOption);
        return this;
    }
    /**
     * set request method to PUT
     */
    put() {
        this.fetchOption = Object.assign({ method: "PUT" }, this.fetchOption);
        return this;
    }
    /**
     * set request method to PATCH
     */
    patch() {
        this.fetchOption = Object.assign({ method: "PATCH" }, this.fetchOption);
        return this;
    }
    /**
     * set request method to DELETE
     */
    delete() {
        this.fetchOption = Object.assign({ method: "DELETE" }, this.fetchOption);
        return this;
    }
    /**
     * set header contents
     * @param headerOptions
     */
    headers(headerOptions) {
        if (headerOptions) {
            this.fetchOption = Object.assign(Object.assign({}, this.fetchOption), { headers: Object.assign({}, headerOptions) });
        }
        return this;
    }
    /**
     * set body data. it automatically serialized and change header content-type to application/json
     * @param data - body object
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
        if (url[0] !== "/") {
            url = "/" + url;
        }
        this.endPoint = url;
        return this;
    }
    /**
     * set query parameter
     * @param query ex) `key=value`
     * @returns
     */
    query(query) {
        if (query[0] === "?") {
            this.qs = query;
        }
        else {
            this.qs = "?" + query;
        }
        return this;
    }
    /**
     * set multiple query parameters
     * @param query ex) `["key=value", "key2=value2", "key3=value3"]`
     */
    quries(query) {
        this.qs = "?" + query.join("&");
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
    /**
     * send request to call this method
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(this.baseUrl + this.endPoint + this.qs, Object.assign({}, this.fetchOption))
                .then((res) => __awaiter(this, void 0, void 0, function* () { return yield res.json(); }))
                .catch(err => err);
        });
    }
}
exports.default = ApiBuilder;
