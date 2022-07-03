import Article from "./Article";

export default class NewsResult {
    private readonly _status: string;
    private readonly _totalResult: number;
    private readonly _articles: Array<Article>;

    constructor(status: string, totalResult: number, articles: Array<Article>) {
        this._status = status;
        this._totalResult = totalResult;
        this._articles = articles;
    }

    get articles() {
        return this._articles;
    }

    get status() {
        return this._status;
    }

    get totalResult() {
        return this._totalResult;
    }
}