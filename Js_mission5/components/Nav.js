const Nav = (data) => {
    const categoryItemliTagAdd = function(parentTag, idNm, contentNm) {
        let liTag = document.createElement('li');
        liTag.classList.add('category-item');
        liTag.setAttribute('id', idNm);
        liTag.textContent = contentNm;
        parentTag.appendChild(liTag);
    }

    const $container = document.getElementById('root');

    //step1: navigation 추가
    const navTag = document.createElement('nav');
    navTag.classList.add('category-list');
    $container.appendChild(navTag)

    //step2: ul tag 추가
    const ulTag = document.createElement('ul');
    navTag.appendChild(ulTag);


    //step3: li tag 추가
    categoryItemliTagAdd(ulTag, 'all', '전체보기');
    categoryItemliTagAdd(ulTag, 'business','비즈니스');
    categoryItemliTagAdd(ulTag, 'entertainment','엔터테인먼트');
    categoryItemliTagAdd(ulTag, 'health','건강');
    categoryItemliTagAdd(ulTag, 'science','과학');
    categoryItemliTagAdd(ulTag, 'sports','스포츠');
    categoryItemliTagAdd(ulTag, 'technology','기술');

    //step4: 초기값 전체보기 세팅
    let categoryItemList = document.querySelectorAll('.category-item');
    categoryItemList[0].classList.add('active');

    //stpe5: 선택된 ul tag 이벤트
    for(let i=0; i < categoryItemList.length; i++) {
        categoryItemList[i].addEventListener('click', () => {
            for(let j=0; j < categoryItemList.length; j++) {
                categoryItemList[j].classList.remove('active');
            }

            categoryItemList[i].classList.add('active');
            //step6: newsList에 전달할 categoryId 전달
            data.categoryId =categoryItemList[i].getAttribute('id');
        });
    }
}


export default Nav;