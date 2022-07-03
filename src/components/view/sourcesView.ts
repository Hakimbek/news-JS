import App from "../app/App";
import Option from "../Dto/Option";
import RequestParameters from "../Dto/RequestParameters";
import SourceResult from "../Dto/SourceResult";
import NewsResult from "../Dto/NewsResult";

export default function sourcesView() {
    const app = new App();

    let categoryValue = 'all';
    let languageValue = 'all';
    let countryValue = 'all';

    (document.getElementById('category') as HTMLElement).addEventListener('change', (e) => {
        const categoryElement = e.target as HTMLSelectElement;
        categoryValue = categoryElement.options[categoryElement.selectedIndex].value;
    });

    (document.getElementById('language') as HTMLElement).addEventListener('change', (e) => {
        const languageElement = e.target as HTMLSelectElement;
        languageValue = languageElement.options[languageElement.selectedIndex].value;
    });

    (document.getElementById('country') as HTMLElement).addEventListener('change', (e) => {
        const countryElement = e.target as HTMLSelectElement;
        countryValue = countryElement.options[countryElement.selectedIndex].value;
    });

    (document.querySelector('.source-search') as HTMLElement).addEventListener('click', () => {
        const options: Set<Option> = new Set();

        if (categoryValue !== 'all') {
            options.add(new Option(RequestParameters.Category, categoryValue));
        }

        if (languageValue !== 'all') {
            options.add(new Option(RequestParameters.Language, languageValue));
        }

        if (countryValue !== 'all') {
            options.add(new Option(RequestParameters.Country, countryValue));
        }

        app.controller.getSources(options, (data: SourceResult | NewsResult) => {
            localStorage.setItem('data', JSON.stringify((data as SourceResult).sources));
            localStorage.setItem('type', 'sources')
            const content = document.querySelector('.content') as HTMLElement;
            content.innerHTML = '';
            content.innerHTML = `<table class="table mb-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th class="description">Description</th>
                                        <th>Url</th>
                                    </tr>
                                </thead>
                                <tbody class="table-body">
                                
                                </tbody>
                             </table>`;

            (data as SourceResult).sources.forEach((value, index) => {
                const table = document.querySelector('.table-body') as HTMLElement;
                table.innerHTML = table.innerHTML + `<tr>
                                                    <th>${index + 1}</th>
                                                    <td>${value.name}</td>
                                                    <td class="description">${value.description}</td>
                                                    <td><a href=${value.url} target="_blank">Url</a></td>
                                                 </tr>`;
            });
        });
    });
}