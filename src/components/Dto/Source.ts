export default class Source {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _url: string;
    private readonly _country: string;
    private readonly _category: string;

    constructor(id: string, name: string, description: string, url: string, country: string, category: string) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._url = url;
        this._country = country;
        this._category = category;
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get url() {
        return this._url
    }
}