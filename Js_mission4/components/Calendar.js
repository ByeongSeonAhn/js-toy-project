const Calendar = (now) => {

    //[날짜 클릭이벤트]
    const clickDate = (dayElement) => {
        dayElement.addEventListener('click', (e) => {
            console.log(dayElement.getAttribute('data-date'))  //날짜표기: yyyy-mm-dd [과제요청]

            //표시된 date 삭제
            e.target.parentElement.querySelectorAll(".calendar-date-click").forEach(element => {
                element.classList.remove('calendar-date-click');
            });

            let inputElement = calendarElement.parentElement.querySelector('input');
            inputElement.value = e.target.dataset.date;
            dayElement.classList.add('calendar-date-click');
            calendarElement.classList.add("hidden");
        })
    };

    //[calendar 생성 화면]
    const makeCalendar = () => {
        //step1. navigation element
        let calendarNavElement = document.createElement("div");
        calendarNavElement.classList.add('calendar-nav')

        //1-1:  [< 버튼: 이전달 이벤트]
        let leftNavElement = document.createElement("div");
        leftNavElement.classList.add('calendar-left-click');

        leftNavElement.addEventListener('click', function () {
            let prevMonth = Calendar(new Date(now.setMonth(now.getMonth() - 1)));  //지난달 재귀
            prevMonth.classList.remove('hidden');
            calendarElement.replaceWith(prevMonth);
        });
        calendarNavElement.appendChild(leftNavElement);

        //1-2: [calendar-nav 중앙]
        calendarNavElement.insertAdjacentHTML('beforeend', `
                                                                    <div class="calendar-month-year">
                                                                        <div>${month}</div>
                                                                        <div>${currYear}</div>
                                                                    </div>
                                                                `);
        //1-3 [> 버튼: 다음달 이벤트]
        const rightNavElement = document.createElement("div");
        rightNavElement.classList.add('calendar-right-click');
        rightNavElement.addEventListener('click', function () {
            let calendar = Calendar(new Date(now.setMonth(now.getMonth() + 1))); //다음달 재귀
            calendar.classList.remove('hidden');
            calendarElement.replaceWith(calendar);
        });
        calendarNavElement.appendChild(rightNavElement);
        calendarElement.appendChild(calendarNavElement);


        //step2: calendar-grid element
        let calendarGridElement = document.createElement("div");
        calendarGridElement.className = "calendar-grid";
        calendarGridElement.insertAdjacentHTML('beforeend', `
                                                                        <div class="calendar-day-of-the-week">SUN</div>
                                                                        <div class="calendar-day-of-the-week">MON</div>
                                                                        <div class="calendar-day-of-the-week">TUE</div>
                                                                        <div class="calendar-day-of-the-week">WED</div>
                                                                        <div class="calendar-day-of-the-week">THU</div>
                                                                        <div class="calendar-day-of-the-week">FRI</div>
                                                                        <div class="calendar-day-of-the-week">SAT</div>
                                                                `);

        //2-1: 전월 데이터
        for(let prevDayObj of prevDays) {
            calendarGridElement.appendChild(prevDayObj);
        }

        //2-2: 금월 데이터
        for(let currentDayObj of currentDays) {
            calendarGridElement.appendChild(currentDayObj);
        }

        //2-3: 익월 데이터
        for(let nextDayObj of nextDays) {
            calendarGridElement.appendChild(nextDayObj);
        }

        calendarElement.appendChild(calendarGridElement);
    }



    let currYear = now.getFullYear();  //현재년도
    let currMonthIdx = now.getMonth(); //현재 달 index
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = monthList[currMonthIdx]; //현재달

    //현재시작
    let originCurrDate = new Date();

    //전월
    let preDate = new Date(currYear, currMonthIdx, 0) //전월
    let prevDayIdx = preDate.getDay();   //전월 요일 index
    let prevLastDay = preDate.getDate(); //마지막 날짜

    //금월
    let currDate = new Date(currYear, currMonthIdx + 1, 0) //금월
    let currLastDay = currDate.getDate(); //금월 마지막 날짜

    //익월
    let nextFirstDay = currDate.getDay(); //익월 첫째 날짜

    const prevDays = [];    //전월 list
    const currentDays = []; //금월 list
    const nextDays = [];    //익월 list

    //전월 리스트
    if (prevDayIdx + 1 < 7) { //7일 모두 표기되지 않게
        for (let i = prevLastDay - prevDayIdx; i <= prevLastDay; i++) {
            let dayElement = document.createElement("div");
            dayElement.className = "calendar-previous-days";
            dayElement.innerHTML = String(i);
            prevDays.push(dayElement);

            let month = String(now.getMonth()).padStart(2, "0");
            let day = String(i).padStart(2, "0");
            dayElement.dataset.date = `${now.getFullYear()}-${month}-${day}`;

            clickDate(dayElement);
        }
    }


    //금월 리스트
    for (let i = 1; i <= currLastDay; i++) {
        //현재날짜 표시
        let addClass = '';
        if(now.getFullYear() === originCurrDate.getFullYear() && now.getMonth() === originCurrDate.getMonth() &&  now.getDate() === i) {
            addClass = 'calendar-today';
        }

        let dayElement = document.createElement("div");
        dayElement.className = `calendar-day ${addClass}`;
        dayElement.innerHTML = String(i);


        let month = String(now.getMonth() + 1).padStart(2, "0");
        let day = String(i).padStart(2, "0");
        dayElement.dataset.date = `${now.getFullYear()}-${month}-${day}`;
        currentDays.push(dayElement);

        clickDate(dayElement);
    }

    //익월 리스트
    for (let i = 1; i <= 7 - nextFirstDay -1; i++) {
        let dayElement = document.createElement("div");
        dayElement.className = "calendar-next-days";
        dayElement.innerHTML = String(i);
        nextDays.push(dayElement);

        let month = String(now.getMonth() + 2).padStart(2, "0");
        let day = String(i).padStart(2, "0");
        dayElement.dataset.date = `${now.getFullYear()}-${month}-${day}`;

        clickDate(dayElement);
    }


    let calendarElement = document.createElement("div");
    calendarElement.classList.add('calendar', 'hidden')

    makeCalendar(); //calendar 화면

    return calendarElement;

}

export default Calendar;
