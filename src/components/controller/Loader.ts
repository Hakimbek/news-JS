import Option from "../Dto/Option";
import UrlData from "../Dto/UrlData";
import NewsResult from "../Dto/NewsResult";
import SourceResult from "../Dto/SourceResult";

export default class Loader {
    private _baseLink: string;
    private _options: Set<Option>

    constructor(baseLink: string, options: Set<Option>) {
        this._baseLink = baseLink;
        this._options = options;
    }

    get baseLink() {
        return this._baseLink;
    }

    set baseLink(baseLink: string) {
        this._baseLink = baseLink;
    }

    get options() {
        return this._options;
    }

    set options(options: Set<Option>) {
        this._options = options;
    }

    addOption(option: Option) {
        this._options.add(option);
    }

    getResp(urlDate: UrlData, callback: (data: NewsResult | SourceResult) => void) {
        this.load('GET', urlDate.endpoint, callback, urlDate.options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: string, options?: Set<Option>) {
        let urlOptions: Array<Option>;
        let url = `${this.baseLink}${endpoint}?`;

        if (options) {
            urlOptions = [ ...this.options, ...options ];
        } else {
            urlOptions = [ ...this.options ];
        }

        urlOptions.forEach((option: Option) => {
            url += `${option.optionName}=${option.optionValue}&`;
        })

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: (data: NewsResult | SourceResult) => void, options?: Set<Option>) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}