import { Nav, NewsList } from './components/index.js';



//step1: 데이터 유형 선정
const data = new Proxy({
        categoryId: 'all',
    },
    {
        set: async function (target, prop, value) {
            Reflect.set(target, prop, value);

            const newsListContainer = document.querySelector('.news-list-container');
            const changedNewsListContainer = await NewsList(data);
            console.log(data)
            newsListContainer.replaceWith(changedNewsListContainer);
        },
    });


//step2: 초기 데이터 세팅
Nav(data); //proxy 데이터로  매개변수로 들어가 categoryId를 계속 지켜보는 역할
const rootContainer = document.getElementById('root');
const newsListContainer = await NewsList(data);
rootContainer.appendChild(newsListContainer);
