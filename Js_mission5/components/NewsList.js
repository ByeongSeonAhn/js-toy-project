import axios from "../../node_modules/axios/dist/http_unpkg.com_axios_dist_axios.js";
const NewsList = async (data) => {
    const newsListContainer = document.createElement('div');
    newsListContainer.classList.add('news-list-container');

    const newsListArticle = document.createElement('article');
    newsListArticle.classList.add('news-list');
    newsListArticle.dataset.category = data.categoryId;
    newsListContainer.appendChild(newsListArticle);

    const scrollObserverNode = observerNode();
    newsListContainer.appendChild(scrollObserverNode);
    scrollObserver(scrollObserverNode, newsListArticle);

    return newsListContainer;
};

//[ObserverNode 생성: scroll element대상]
const observerNode = () => {
    const observerElement = document.createElement('div');
    observerElement.classList.add('scroll-observer');
    observerElement.dataset.page = '1';

    const observerImg = document.createElement('img');
    observerImg.src = './img/ball-triangle.svg';
    observerImg.alt = 'Loading...';

    observerElement.appendChild(observerImg);

    return observerElement;
};

//[스크롤 옵저버]: observerNode의 스크롤 변화 감지
const scrollObserver = (scrollObserverNode, newsListArticle) => {
    let callback = async (entries) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                //1.실시간으로 높이를 계산해야하므로 변수처리 x
                if(window.innerHeight < document.getElementById('root').scrollHeight){
                    await dataSetFunc(entry, newsListArticle)
                }

                //2.스크롤이 생기지 않았을 시 무한스크롤 현상이 되지 않기에 브라우저 높이를 계산해 호출
                while(window.innerHeight > document.getElementById('root').scrollHeight){
                    await dataSetFunc(entry, newsListArticle)
                }
            }
        }
    };

    let option = {
        threshold: 1.0
    }
    let observer = new IntersectionObserver(callback, option);
    observer.observe(scrollObserverNode);
};

//[데이터 세팅]
const dataSetFunc = async function(entry, newsListArticle) {
    let nextPage = parseInt(entry.target.dataset.page);
    let category = newsListArticle.dataset.category;

    let newsList = await getNewsList(nextPage, category);
    entry.target.dataset.page = nextPage + 1;

    if (newsList.length > 0) {
        newsList.forEach((data) => {
            newsListArticle.appendChild(data);
        });
    }
}

//[axios를 이용한 api 호출]
const getNewsList = async (page = 1, category) => {
    // let apiKey = 'd07c46a4af5548649977196532728ed8';
    let apiKey = '2dcab2d2df5d4228bc20943fc86dad7f';
    let country = 'kr';
    let pageSize = '5';
    let newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    let newsItems = [];

    let response = await axios.get(newsApiUrl);
    let articles = response.data.articles;

    articles.forEach((data) => {
        if (data.urlToImage == null) {
            data.urlToImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
        }

        if (data.description == null) {
            data.description = '내용없음';
        }

        let newsItem = document.createElement('section');
        newsItem.className = 'news-item';
        //innerHTML을 쓰는 것보다 동일한 element가 있을 시 반응하지 않아 insertAdjacentHTML을 쓴느 것이 렌더링하는데 더 효율적
        newsItem.insertAdjacentHTML('beforeend', `
                <div class="thumbnail">
                    <a href=${data.url} target="_blank" rel="noopener noreferrer">
                        <img src=${data.urlToImage} alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                        <a href=${data.url} target="_blank"  rel="noopener noreferrer"> 
                            ${data.title}
                        </a>
                    </h2>
                    <p>
                        ${data.description}
                    </p>
                </div>
            `);
        newsItems.push(newsItem);
    });
    return newsItems;
};

export default NewsList;