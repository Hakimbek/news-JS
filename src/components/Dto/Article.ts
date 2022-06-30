export default class Article {
    private readonly _author: string;
    private readonly _description: string;
    private readonly _publishedAt: string;
    private readonly _title: string;
    private readonly _url: string;

    constructor(author: string, description: string, publishedAt: string, title: string, url: string) {
        this._author = author;
        this._description = description;
        this._publishedAt = publishedAt;
        this._title = title;
        this._url = url;
    }

    get author() {
        return this._author;
    }

    get description() {
        return this._description;
    }

    get publishedAt() {
        return this._publishedAt;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }
}