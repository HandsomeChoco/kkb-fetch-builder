class ApiBuilder {
    private baseUrl: string;
    private endPoint: string;
    private fetchOption: RequestInit;

    private path: string;
    private qs: string;
    /**
     * @param baseUrl - example: `http://localhost:3000`
     */
    constructor(baseUrl: string) {
        this.baseUrl = this.filterSlash(baseUrl);
        this.endPoint = '';
        this.fetchOption = {
        };
        this.path = '';
        this.qs = '';
    }

    /**
     * set request method to GET (default)
     * @param {string} path - set path
     */
    get(path?: string) {
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
    post(path?: string) {
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
    put(path?: string) {
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
    patch(path?: string) {
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
    delete(path?: string) {
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
    headers(headerOptions?: HeadersInit) {
        if (headerOptions) {
            this.fetchOption = {
                ...this.fetchOption,
                headers: {
                    ...headerOptions,
                }
            }
        }

        return this;
    }

    /**
     * set body data. it automatically serialized and change header content-type to application/json
     * @param {T} data - fetch api body object
     */
    jsonBody<T>(data: T) {
        if (typeof data == "object" && data !== null) {
            this.fetchOption = {
                ...this.fetchOption,
                headers: {
                    ...this.fetchOption.headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        }
        return this;
    }

    /**
     * set url under base url
     * @param url - ex. /api/user/login
     */
    endpoint(url: string) {
        this.endPoint = this.filterSlash(url);
        return this;
    }

    /**
     * set query parameter
     * @param query ex) `key=value`
     * @returns 
     */
    query(query: string) {
        this.qs = query;
        return this;
    }

    /**
     * set multiple query parameters
     * @param query ex) `["key=value", "key2=value2", "key3=value3"]`
     */
    queries(query: string[]) {
        this.qs = query.join("&");
        return this;
    }

    /**
     * override base url
     * @param url
     * @returns 
     */
    overrideBaseUrl(url: string) {
        if (url) {
            this.baseUrl = url;
        }
        return this;
    }

    private setPath(path: string): void {
        this.path = this.filterSlash(path);
    }

    private setFetchOptMethod(method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"): void {
        this.fetchOption.method = method;
    }

    private generateUrl(baseUrl: string, endPoint: string, path: string, qs: string): string {
        if (baseUrl && endPoint && path && qs) {
            return baseUrl + "/" + endPoint + "/" + path + "?" + qs;
        }

        if (baseUrl && endPoint && path) {
            return baseUrl + "/" + endPoint + "/" + path;
        }

        if (baseUrl && endPoint) {
            return baseUrl + "/" + endPoint
        }

        if (baseUrl) {
            return baseUrl;
        }

        throw new Error("There is no baseUrl in constructor. did you forgot to pass base url when you create constructor?")
    }

    private filterSlash(url: string): string {
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
    async send() {
        const url = this.generateUrl(this.baseUrl, this.endPoint, this.path, this.qs);
        return await fetch(url, { ...this.fetchOption })
            .then(async (res) => await res.json())
            .catch(err => err)
    }
}

export default ApiBuilder;
