class ApiBuilder {
    private baseUrl: string;
    private fetchOption: RequestInit;
    private endPoint: string;
    private qs: string;
    /**
     * @param baseUrl - example: `http://localhost:3000`
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.qs = '';
        this.fetchOption = {
        };
        this.endPoint = '';
    }

    /**
     * set request method to GET (default)
     */
    get() {
        this.fetchOption = {
            method: "GET",
            ...this.fetchOption
        }
        return this;
    }

    /**
     * set request method to POST
     */
    post() {
        this.fetchOption = {
            method: "POST",
            ...this.fetchOption
        };
        return this;
    }

    /**
     * set request method to PUT
     */
    put() {
        this.fetchOption = {
            method: "PUT",
            ...this.fetchOption,
        }
        return this;
    }

    /**
     * set request method to PATCH
     */
    patch() {
        this.fetchOption = {
            method: "PATCH",
            ...this.fetchOption,
        }
        return this;
    }

    /**
     * set request method to DELETE
     */
    delete() {
        this.fetchOption = {
            method: "DELETE",
            ...this.fetchOption
        }
        return this;
    }

    /**
     * set header contents
     * @param headerOptions 
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
     * @param data - body object
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
    query(query: string) {
        if (query[0] === "?") {
            this.qs = query;
        } else {
            this.qs = "?" + query;
        }
        return this;
    }

    /**
     * set multiple query parameters
     * @param query ex) `["key=value", "key2=value2", "key3=value3"]`
     */
    queries(query: string[]) {
        this.qs = "?" + query.join("&")
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

    /**
     * send request to call this method
     */
    async send() {
        return await fetch(this.baseUrl + this.endPoint + this.qs, { ...this.fetchOption })
            .then(async (res) => await res.json())
            .catch(err => err)
    }
}

export default ApiBuilder;
