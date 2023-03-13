// do something!
import { Nav, NewsList } from './components/index.js';


//네이게이션의 선택된 element 리턴 --> 초기값은 all로
let rootEle = document.getElementById('root');
console.log("rootEle: ", rootEle);
let navCategoryId = Nav(rootEle);



const proxyData = new Proxy({
        category: 'all',
    },
    {
        set: async function(target, prop, value) {
            console.log(target)
            console.log(prop)
            console.log(value)
            Reflect.set(target, prop, value);
            const newsListElement = await NewsList(proxyData);
            const container = rootEle.querySelector('.news-list-container');

            if (container === null) {
                rootEle.appendChild(newsListElement);
            } else {
                container.replaceWith(newsListElement);
                return;
            }
        },
    });

console.log("proxyData: " , proxyData);


//선택된 data에 따라 렌더링
NewsList(rootEle, navCategoryId);