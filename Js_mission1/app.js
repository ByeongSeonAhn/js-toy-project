// do something!
; (function () {
    'use strict'

    //[공통] 클래스 get
    const get = (target) => {
        return document.querySelector(target)
    }

    const $toggleCls = get('.toggle');  //토글 클래스
    const $navCls = get('nav');         //네비게이션 클래스
    const $loader = get('.preload');    //로딩 클래스


    //[nav 클릭 이벤트]
    $toggleCls.addEventListener('click', () => {
        if (!Object.keys(localStorage).includes("toggle_key")) {  //초기 localStorage에 toggle_key가 없을시
            localStorage.setItem("toggle_key", "add");
            $navCls.classList.add("active");
        } else {
            if (localStorage.getItem("toggle_key") == "add") {
                $navCls.classList.remove("active");
                localStorage.setItem("toggle_key", "remove");
            } else {
                $navCls.classList.add("active");
                localStorage.setItem("toggle_key", "add");
            }
        };
    });



    //[초기시작 ]
    document.addEventListener('DOMContentLoaded', () => {
        $loader.style.visibility = 'visible';


        if (Object.keys(localStorage).includes("toggle_key")) {
            if (localStorage.getItem("toggle_key") == "add") {
                $navCls.classList.add("active");
            } else {
                $navCls.classList.remove("active");
            }
        }
    });
})()