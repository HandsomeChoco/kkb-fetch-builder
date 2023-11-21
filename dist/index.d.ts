declare class ApiBuilder {
    private baseUrl: string;
    private fetchOption: RequestInit;
    private endPoint: string;
    private qs: string;

    constructor(baseUrl: string);

    get(): this;
    post(): this;
    put(): this;
    patch(): this;
    delete(): this;

    headers(headerOptions?: HeadersInit): this;

    jsonBody<T>(data: T): this;

    endpoint(url: string): this;

    query(query: string): this;

    queries(query: string[]): this;

    overrideBaseUrl(url: string): this;

    send(): Promise<any>;
}

export default ApiBuilder;