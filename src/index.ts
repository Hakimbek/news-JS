import './style.css';
import sourcesView from "./components/view/sourcesView";
import newsView from './components/view/newsView'
import Source from "./components/Dto/Source";
import Article from "./components/Dto/Article";

sourcesView();
newsView();

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('type') === 'sources') {
    const data = JSON.parse((localStorage.getItem('data') as string)) as Array<Source>;
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

    data.forEach((value: Source, index: number) => {
      const table = document.querySelector('.table-body') as HTMLElement;
      table.innerHTML = table.innerHTML + `<tr>
                                                    <th>${index + 1}</th>
                                                    <td>${value.name}</td>
                                                    <td class="description">${value.description}</td>
                                                    <td><a href=${value.url} target="_blank">Url</a></td>
                                                 </tr>`;
    });
  }

  if (localStorage.getItem('type') === 'news') {
    const data = JSON.parse((localStorage.getItem('data') as string)) as Array<Article>;
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

    data.forEach((value, index) => {
      const table = document.querySelector('.table-body') as HTMLElement;
      table.innerHTML = table.innerHTML + `<tr>
                                                    <th>${index + 1 + (Number.parseInt(localStorage.getItem('count') as string) - 1) * 100}</th>
                                                    <td>${value.title}</td>
                                                    <td class="description">${value.description}</td>
                                                    <td><a href=${value.url} target="_blank">url</a></td>
                                                 </tr>`;
    });

    const tableFooter = document.querySelector('.pagination') as HTMLElement;
    tableFooter.setAttribute('class', 'd-flex justify-content-center mb-5 align-items-center');

    const leftButton = document.createElement('button');
    leftButton.innerText = '<';
    leftButton.setAttribute('class', 'btn btn-primary mb-5 left-btn');

    const count = document.createElement('div');
    count.innerText = (localStorage.getItem('count') as string);
    count.setAttribute('class', 'mx-3 mb-5 count');

    const rightButton = document.createElement('button');
    rightButton.innerText = '>';
    rightButton.setAttribute('class', 'btn btn-primary mb-5 right-btn');

    tableFooter.appendChild(leftButton);
    tableFooter.appendChild(count);
    tableFooter.appendChild(rightButton);
  }
})