import Option from "./Option";

export default class UrlData {
    private _endpoint: string;
    private _options?: Set<Option>;

    constructor(endpoint: string, options?: Set<Option>) {
        this._endpoint = endpoint;
        this._options = options
    }

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(endpoint: string) {
        this._endpoint = endpoint;
    }

    get options() {
        return this._options;
    }

    set options(options: Set<Option> | undefined) {
        this._options = options;
    }
}