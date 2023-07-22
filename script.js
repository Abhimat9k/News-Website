const API_KEY = "d3276258dfa0d3e912027a198d19ef26";
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&lang=en&country=in&apikey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.image) {
      return;
    }
    const cardClone = newsCardTemplate.content.cloneNode(true);

    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
    
  newsSource.innerHTML = `${article.source.name} · ${date}`;
  cardClone.firstElementChild.addEventListener("click" ,() => {
    window.open(article.url, "_blank");
  })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click" , () => {
    const query = searchText.value;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
