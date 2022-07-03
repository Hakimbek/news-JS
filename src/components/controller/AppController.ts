import AppLoader from "./AppLoader";
import UrlData from "../Dto/UrlData";
import Option from "../Dto/Option";
import SourceResult from "../Dto/SourceResult";
import NewsResult from "../Dto/NewsResult";

export default class AppController extends AppLoader {
    getSources(options: Set<Option>,callback: (data: SourceResult | NewsResult) => void) {
        super.getResp(
            new UrlData("sources", options),
            callback
        );
    }

    getNews(options: Set<Option>, callback: (data: NewsResult | SourceResult) => void) {
        super.getResp(
            new UrlData("everything", options),
            callback
        );
    }
}