; (function () {
  'use strict'

  //2.클래스 get
  const get = (target) => {
    return document.querySelector(target)
  }

  //3.객체화된 클래스
  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement;
      this.itemClassName = 'carousel_item';
      this.items = this.carouselElement.querySelectorAll('.carousel_item');
      this.totalItems = this.items.length;
      this.current = 0;
      this.isMoving = false;
    }

    //초기화
    initCarousel() {
      this.isMoving = false

      this.items[this.totalItems - 1].classList.add('prev')
      this.items[0].classList.add('active')
      this.items[1].classList.add('next')
    }

    //이벤트 리스너
    setEventListeners() {
      this.prevButton = this.carouselElement.querySelector(
        '.carousel_button--prev'
      );
      this.nextButton = this.carouselElement.querySelector(
        '.carousel_button--next'
      );

      this.prevButton.addEventListener('click', () => {
        this.movePrev();
      });
      this.nextButton.addEventListener('click', () => {
        this.moveNext();
      });
    }

    //prev 이벤트
    movePrev() {
      if (!this.isMoving) {
        if (this.current === 0) {
          this.current = this.totalItems - 1;
        } else {
          this.current--;
        }

        this.moveCarouselTo();
      }
    }

    //next 이벤트
    moveNext() {
      if (!this.isMoving) {
        if (this.current === this.totalItems - 1) {
          this.current = 0
        } else {
          this.current++
        }

        this.moveCarouselTo()
      }
    }

    //이벤트 발생시 값 세팅
    moveCarouselTo() {
      if (!this.isMoving) {
        this.disableInteraction();

        let prev = this.current - 1;
        let next = this.current + 1;

        if (this.current === 0) {
          prev = this.totalItems - 1
        } else if (this.current === this.totalItems - 1) {
          next = 0
        }

        for (let i = 0; i < this.totalItems; i++) {
          if (i == this.current) {
            this.items[i].className = this.itemClassName + ' active';
          } else if (i == prev) {
            this.items[i].className = this.itemClassName + ' prev';
          } else if (i == next) {
            this.items[i].className = this.itemClassName + ' next';
          } else {
            this.items[i].className = this.itemClassName;
          }
        }
      }
    }

    disableInteraction() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 500)
    }


  }

  // 1.초기시작 
  document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = get('.carousel'); //초기 시작시 carousel의 item 목록 가져오기

    const carousel = new Carousel(carouselElement); //클래스 인스턴스화
    carousel.initCarousel();      //초기화
    carousel.setEventListeners()  //이벤트 발생시 확인
  })
})()