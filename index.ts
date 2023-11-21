class ApiBuilder {
    private baseUrl: string;
    private fetchOption: RequestInit;
    private endPoint: string;
    private qs: string;
    /**
     * @param baseUrl - base url
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.qs = '';
        this.fetchOption = {
        };
        this.endPoint = '';
    }

    get() {
        this.fetchOption = {
            method: "GET",
            ...this.fetchOption
        }
        return this;
    }

    post() {
        this.fetchOption = {
            method: "POST",
            ...this.fetchOption
        };
        return this;
    }

    put() {
        this.fetchOption = {
            method: "PUT",
            ...this.fetchOption,
        }
        return this;
    }

    patch() {
        this.fetchOption = {
            method: "PATCH",
            ...this.fetchOption,
        }
        return this;
    }

    delete() {
        this.fetchOption = {
            method: "DELETE",
            ...this.fetchOption
        }
        return this;
    }

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

    blobBody(data: any) {
        if (typeof data == "object" && data !== null) {
            this.fetchOption = {
                ...this.fetchOption,
                headers: {
                    ...this.fetchOption.headers,
                    'Content-Type': 'application/json',
                },
                body: new Blob(data)
            }
        }
        return this;
    }

    endpoint(url: string) {
        if (url[0] !== "/") {
            url = "/" + url;
        }

        this.endPoint = url;
        return this;
    }

    query(query: string) {
        if (query[0] === "?") {
            this.qs = query;
        } else {
            this.qs = "?" + query;
        }
        return this;
    }

    quries(query: string[]) {
        this.qs = "?" + query.join("&")
        return this;
    }

    overrideBaseUrl(url: string) {
        if (url) {
            this.baseUrl = url;
        }
        return this;
    }

    async send() {
        return await fetch(this.baseUrl + this.endPoint + this.qs, { ...this.fetchOption })
            .then(async (res) => await res.json())
            .catch(err => err)
    }
}

export default ApiBuilder
