import fetchRequest from './fetchRequest.js';
import preload from './preload.js';
import renderCards from './renderCards.js';

const page = document.querySelector('.main');
const search = document.querySelector('.search');

const searchTitle = document.createElement('h2');
const headlinesTitle = document.createElement('h2');
const searchWrapper = document.createElement('div');
const headlinesWrapper = document.createElement('div');

searchTitle.className = 'title title_search';
headlinesTitle.className = 'title';
searchWrapper.className = 'container card-wrapper card-wrapper_search';
headlinesWrapper.className = 'container card-wrapper card-wrapper_headlines';

headlinesTitle.textContent = 'Свежие новости';

const searchRequest = (request) => {
  preload.show();

  return Promise.all([
    fetchRequest(`everything?q=${request}&pageSize=8`, {
      headers: {
        'X-Api-Key': '794883d9246d476aa1d793f5fc5f259c',
      },
      callback: renderCards,
    }),
    fetchRequest('top-headlines?country=ru&pageSize=4', {
      headers: {
        'X-Api-Key': '794883d9246d476aa1d793f5fc5f259c',
      },
      callback: renderCards,
    }),
  ]);
};

search.addEventListener('submit', e => {
  e.preventDefault();
  const request = search.input.value;

  page.innerHTML = '';
  searchWrapper.innerHTML = '';
  headlinesWrapper.innerHTML = '';

  searchRequest(request).then(data => {
    preload.remove();

    searchWrapper.append(data[0]);
    headlinesWrapper.append(data[1]);
    page.append(searchTitle, searchWrapper, headlinesTitle, headlinesWrapper);

    searchTitle.textContent = searchWrapper.children.length ?
    `По вашему запросу “${request}” найдено ${searchWrapper.children.length}
    результатов` : 'По вашему запросу ничего не найдено';

    search.reset();
  });
});

const init = () => {
  preload.show();

  fetchRequest(`top-headlines?country=ru&pageSize=8`, {
    headers: {
      'X-Api-Key': '794883d9246d476aa1d793f5fc5f259c',
    },
    callback: renderCards,
  })
      .then(data => {
        preload.remove();
        headlinesWrapper.append(data);
        page.append(headlinesTitle, headlinesWrapper);
      });
};

init();

