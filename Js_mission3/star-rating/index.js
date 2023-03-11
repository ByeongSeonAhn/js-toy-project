// do something!
const StarRating = $container => {
    //step1: start container 생성
    const $starRatingContainer = document.createElement('div');
    $starRatingContainer.classList.add('star-rating-container');
    $starRatingContainer.style.display = 'flex';
    $starRatingContainer.style.justifyContent = 'center';
    $container.after($starRatingContainer);

    //stpe2: star 이미지 생성
    const starCnt = $container.getAttribute('data-max-rating')
    for (let i = 0; i < starCnt; i++) {
        const $childStar = document.createElement('i');
        $childStar.classList.add('bx', 'bxs-star');
        $starRatingContainer.append($childStar);
    }

    //step3: star 이미지별 eventListener 부여
    let star = $starRatingContainer.childNodes;
    for (let i = 0; i < star.length; i++) {
        let starEle = star[i];
        starEle.addEventListener('mouseover', () => {
            for (let j = 0; j <= i; j++) {
                star[j].classList.add('hovered');
            }
        });

        starEle.addEventListener('mouseleave', () => {
            for (let j = 0; j <= i; j++) {
                star[j].classList.remove('hovered');
            }
        });

        starEle.addEventListener('click', () => {
            for (let j = 0; j < star.length; j++) {
                star[j].classList.remove('selected');
            }

            for (let j = 0; j <= i; j++) {
                star[j].classList.add('selected');
                let event = new CustomEvent('rating-change', {
                    detail: j + 1,
                    bubbles: true
                });
                $container.dispatchEvent(event);
            }
        });
    }

    //step4: event외 다른 정보 클릭시 초기화
    document.addEventListener('click', (e) => {
        let targetClsNm = e.target.className;

        //star 외에 다른 정보 클릭시 모두 초기화
        if(!(targetClsNm.includes('bx bxs-star'))) {
            let event = new CustomEvent('rating-change', {
                detail: 0,
                bubbles: true
            });
            $container.dispatchEvent(event);

            for (let j = 0; j < star.length; j++) {
                star[j].classList.remove('selected');
                star[j].classList.remove('hovered');
            }
        }
    })

};

//CSS 링크 추가
let addLink = function (src) {
    //element추가
    let link = document.createElement('link');
    link.href = src;
    link.rel = "stylesheet"

    let linkTags = document.getElementsByTagName('link');
    let lastLinkTag = linkTags[linkTags.length - 1];

    lastLinkTag.after(link);
}

const init = () => {
    let styleSrc = "star-rating/theme.css";
    addLink(styleSrc);
}

init();

export default StarRating;
