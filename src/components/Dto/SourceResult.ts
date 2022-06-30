import Source from "./Source";

export default class SourceResult {
    private readonly _sources: Array<Source>;
    private readonly _status: string;

    constructor(sources: Array<Source>, status: string) {
        this._sources = sources;
        this._status = status;
    }

    get sources() {
        return this._sources
    }

    get status() {
        return this._status
    }
}