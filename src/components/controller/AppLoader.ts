import Loader from "./Loader";
import Option from "../Dto/Option";
import RequestParameters from "../Dto/RequestParameters";

export default class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/',
            new Set([new Option(RequestParameters.ApiKey, "d06dc9e966e14b94b4244a341a1366cc")]));
    }
}