declare class ApiBuilder {
    private baseUrl;
    private endPoint;
    private fetchOption;
    private path;
    private qs;
    /**
     * @param baseUrl - example: `http://localhost:3000`
     */
    constructor(baseUrl: string);
    /**
     * set request method to GET (default)
     * @param {string} path - set path
     */
    get(path?: string): this;
    /**
     * set request method to POST
     * @param {string} path - set path
     */
    post(path?: string): this;
    /**
     * set request method to PUT
     * @param {string} path - set path
     */
    put(path?: string): this;
    /**
     * set request method to PATCH
     * @param {string} path - set path
     */
    patch(path?: string): this;
    /**
     * set request method to DELETE
     * @param {string} path - set path
     */
    delete(path?: string): this;
    /**
     * set header contents
     * @param {headerOptions} HeadersInit - fetch api header option object
     */
    headers(headerOptions?: HeadersInit): this;
    /**
     * set body data. it automatically serialized and change header content-type to application/json
     * @param {T} data - fetch api body object
     */
    jsonBody<T>(data: T): this;
    /**
     * set url under base url
     * @param url - ex. /api/user/login
     */
    endpoint(url: string): this;
    /**
     * set query parameter
     * @param query ex) `key=value`
     * @returns
     */
    query(query: string): this;
    /**
     * set multiple query parameters
     * @param query ex) `["key=value", "key2=value2", "key3=value3"]`
     */
    queries(query: string[]): this;
    /**
     * override base url
     * @param url
     * @returns
     */
    overrideBaseUrl(url: string): this;
    private setPath;
    private setFetchOptMethod;
    private generateUrl;
    private filterSlash;
    /**
     * send request to call this method
     */
    send(): Promise<any>;
}
export default ApiBuilder;
