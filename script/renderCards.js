const renderCards = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const template = document.createDocumentFragment();

  const cards = data.articles.map(item => {
    const image = item.urlToImage ? item.urlToImage :
      'image/plug.jpg';
    const author = item.author ? item.author : '';
    const description = item.description ? item.description :
      'Подробнее по ссылке';

    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `
      <div class="news-card__img">
        <img src="${image}" alt="">
      </div>
      <h3 class="news-card__title">
        <a href="${item.url}" class="news-card__link" target="_blank">
          ${item.title}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 1H13V11M13 1L1 13L13 1Z" stroke="#F2994A"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>  
      </h3>
      <p class="news-card__descr">
        ${description}
      </p>
      <div class="news-card__date">
        <span class="date">${item.publishedAt}</span>
        <span class="author">${author}</span>
      </div>
    `;

    return card;
  });

  template.append(...cards);

  return template;
};

export default renderCards;
