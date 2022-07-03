export default class Option {
    private _optionName: string;
    private _optionValue: string;

    constructor(optionName: string, optionValue: string) {
        this._optionName = optionName;
        this._optionValue = optionValue;
    }

    get optionName() {
        return this._optionName;
    }

    set optionName(name: string) {
        this._optionName = name;
    }

    get optionValue() {
        return this._optionValue;
    }

    set optionValue(value: string) {
        this._optionValue = value;
    }
}