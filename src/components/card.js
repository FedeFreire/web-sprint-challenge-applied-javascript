const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  
  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = article.headline;
  cardElement.appendChild(headline);
  
  const authorElement = document.createElement('div');
  authorElement.classList.add('author');
  cardElement.appendChild(authorElement);
  
  const imgContainerElement = document.createElement('div');
  imgContainerElement.classList.add('img-container');
  authorElement.appendChild(imgContainerElement);
  
  const authorPhotoElement = document.createElement('img');
  authorPhotoElement.src = article.authorPhoto;
  imgContainerElement.appendChild(authorPhotoElement);
  
  const authorNameElement = document.createElement('span');
  authorNameElement.textContent = `By ${article.authorName}`;
  authorElement.appendChild(authorNameElement);
  
  cardElement.addEventListener('click', () => {
    console.log(article.headline);
  });

  return cardElement;
};
  
  
  

  


const cardAppender = async (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  try {
    const targetElement = document.querySelector(selector);
    const response = await axios.get('http://localhost:5001/api/articles');
    const articlesData = Object.entries(response.data.articles);
    
    articlesData.forEach(([key, articles]) => {
      articles.forEach((article) => {
        const cardElement = Card(article);
        targetElement.appendChild(cardElement);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export { Card, cardAppender }
