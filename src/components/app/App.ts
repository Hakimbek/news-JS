import AppController from "../controller/AppController";

export default class App {
    private _controller: AppController;

    constructor() {
        this._controller = new AppController();
    }

    get controller() {
        return this._controller;
    }

    set controller(controller: AppController) {
        this._controller = controller;
    }
}