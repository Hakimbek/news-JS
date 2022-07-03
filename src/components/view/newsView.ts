import Option from "../Dto/Option";
import RequestParameters from "../Dto/RequestParameters";
import NewsResult from "../Dto/NewsResult";
import SourceResult from "../Dto/SourceResult";
import Article from "../Dto/Article";
import App from "../app/App";

export default function newsView() {
    const app = new App();

    let q = '';
    let newsLanguage = 'all';
    let searchIn = 'all';
    let sortBy = 'publishedAt';

    (document.getElementById('q') as HTMLElement).addEventListener('change', (e) => {
        const qElement = e.target as HTMLInputElement;
        q = qElement.value;
    });

    (document.getElementById('searchIn') as HTMLElement).addEventListener('change', (e) => {
        const searchInElement = e.target as HTMLSelectElement;
        searchIn = searchInElement.options[searchInElement.selectedIndex].value;
    });

    (document.getElementById('newsLanguage') as HTMLElement).addEventListener('change', (e) => {
        const newsLanguageElement = e.target as HTMLSelectElement;
        newsLanguage = newsLanguageElement.options[newsLanguageElement.selectedIndex].value;
    });

    (document.getElementById('sortBy') as HTMLElement).addEventListener('change', (e) => {
        const sortByElement = e.target as HTMLSelectElement;
        sortBy = sortByElement.options[sortByElement.selectedIndex].value;
    });

    (document.querySelector('.news-search') as HTMLElement).addEventListener('click', () => {
        (document.getElementById('q') as HTMLInputElement).value = '';

        const options: Set<Option> = new Set();

        if (q !== '') {
            options.add(new Option(RequestParameters.Q, q));
        } else {
            options.add(new Option(RequestParameters.Q, 'all'));
        }

        if (newsLanguage !== 'all') {
            options.add(new Option(RequestParameters.Language, newsLanguage));
        }

        if (searchIn !== 'all') {
            options.add(new Option(RequestParameters.SearchIn, searchIn));
        }

        options.add(new Option(RequestParameters.SortBy, sortBy));

        app.controller.getNews(options, (data: NewsResult | SourceResult) => {
            localStorage.setItem('type', 'news')
            localStorage.setItem('data', JSON.stringify((data as NewsResult).articles));
            const content = document.querySelector('.content') as HTMLElement;
            content.innerHTML = '';
            content.innerHTML = `<table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th class="description">Description</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody class="table-body">
                                
                                </tbody>
                             </table>
                             <div class="pagination">
                                
                             </div>`;

            const articles: Array<Article> = (data as NewsResult).articles;
            articles.forEach((value, index) => {
                const table = document.querySelector('.table-body') as HTMLElement;
                table.innerHTML = table.innerHTML + `<tr>
                                                    <th>${index + 1}</th>
                                                    <td>${value.title}</td>
                                                    <td class="description">${value.description}</td>
                                                    <td><a href=${value.url} target="_blank">url</a></td>
                                                 </tr>`;
            });

            const tableFooter = document.querySelector('.pagination') as HTMLElement;
            tableFooter.setAttribute('class', 'd-flex mb-5 justify-content-center mb-2 align-items-center');

            const leftButton = document.createElement('button');
            leftButton.innerText = '<';
            leftButton.setAttribute('class', 'btn mb-5 btn-primary left-btn');

            const count = document.createElement('div');
            count.innerText = '1';
            count.setAttribute('class', 'mx-3 mb-5 count');
            localStorage.setItem('count', count.innerText);
            const rightButton = document.createElement('button');
            rightButton.innerText = '>';
            rightButton.setAttribute('class', 'btn mb-5 btn-primary right-btn');

            tableFooter.appendChild(leftButton);
            tableFooter.appendChild(count);
            tableFooter.appendChild(rightButton);
        });
    });

    const body = document.querySelector('body') as HTMLElement;

    body.addEventListener('click', (e) => {
        const bodyElement = e.target as HTMLElement;
        if (bodyElement.matches('.left-btn')) {
            e.preventDefault();
            const count = document.querySelector('.count') as HTMLElement;
            if (count.innerText !== '1') {
                count.innerText = Number.parseInt(count.innerText) - 1 + '';
                localStorage.setItem('count', count.innerText);
                const options: Set<Option> = getOptions(count);
                draw(options, count);
            }
        }
    });

    body.addEventListener('click', (e) => {
        const bodyElement = e.target as HTMLElement;
        if (bodyElement.matches('.right-btn')) {
            e.preventDefault();
            const count = document.querySelector('.count') as HTMLElement;
            count.innerText = Number.parseInt(count.innerText) + 1 + '';
            localStorage.setItem('count', count.innerText);
            const options: Set<Option> = getOptions(count);
            draw(options, count);
        }
    });

    function draw(options: Set<Option>, count: HTMLElement) {
        app.controller.getNews(options, (data: NewsResult | SourceResult) => {
            localStorage.setItem('type', 'news')
            localStorage.setItem('data', JSON.stringify((data as NewsResult).articles));

            const content = document.querySelector('.content') as HTMLElement;
            content.innerHTML = '';
            content.innerHTML = `<table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th class="description">Description</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody class="table-body">
                                
                                </tbody>
                             </table>
                             <div class="pagination">
                                
                             </div>`;

            const articles: Array<Article> = (data as NewsResult).articles;
            articles.forEach((value, index) => {
                const table = document.querySelector('.table-body') as HTMLElement;
                table.innerHTML = table.innerHTML + `<tr>
                                                    <th>${index + 1 + (Number.parseInt(count.innerText) - 1) * 100}</th>
                                                    <td>${value.title}</td>
                                                    <td class="description">${value.description}</td>
                                                    <td><a href=${value.url} target="_blank">url</a></td>
                                                 </tr>`;
            });

            const tableFooter = document.querySelector('.pagination') as HTMLElement;
            tableFooter.setAttribute('class', 'd-flex mb-5 justify-content-center align-items-center');

            const leftButton = document.createElement('button');
            leftButton.innerText = '<';
            leftButton.setAttribute('class', 'btn mb-5 btn-primary left-btn');

            const countElement = document.createElement('div');
            countElement.innerText = count + '';
            countElement.setAttribute('class', 'mx-3 mb-5 count');

            const rightButton = document.createElement('button');
            rightButton.innerText = '>';
            rightButton.setAttribute('class', 'btn mb-5 btn-primary right-btn');

            tableFooter.appendChild(leftButton);
            tableFooter.appendChild(count);
            tableFooter.appendChild(rightButton);
        });
        window.scrollTo(0, 0);
    }

    function getOptions(count: HTMLElement): Set<Option> {
        const options: Set<Option> = new Set();

        if (q !== '') {
            options.add(new Option(RequestParameters.Q, q));
        } else {
            options.add(new Option(RequestParameters.Q, 'all'));
        }

        if (newsLanguage !== 'all') {
            options.add(new Option(RequestParameters.Language, newsLanguage));
        }

        if (searchIn !== 'all') {
            options.add(new Option(RequestParameters.SearchIn, searchIn));
        }

        options.add(new Option(RequestParameters.SortBy, sortBy));
        options.add(new Option(RequestParameters.Page, count.innerText));

        return options;
    }
}