const AnalogClock = $container => {
  // do something!

  const $clock = $container;

  //시간 html
  const hourHand = document.createElement('div');
  hourHand.classList.add('hand', 'hour');
  $clock.appendChild(hourHand);


  //분 html
  const minsHand = document.createElement('div');
  minsHand.classList.add('hand', 'minute');
  $clock.appendChild(minsHand);

  //초 html
  const secondHand = document.createElement('div');
  secondHand.classList.add('hand', 'second');
  $clock.appendChild(secondHand);

  //시간 html 구성
  function timeFunc() {
    for (let i = 1; i < 13; i++) {
      let timeCommonCls = 'time';
      let timeRotateDegCls = 'time' + new String(i);
      let timeEle = document.createElement('div');
      timeEle.innerHTML = "|";
      timeEle.classList.add(timeCommonCls, timeRotateDegCls);
      $clock.appendChild(timeEle);
    }
  }

  //시간 degree 설정 function 
  function setTimeDeg() {
    const dateInfo = new Date();

    //초 degree
    const sec = dateInfo.getSeconds();
    const milsec = dateInfo.getMilliseconds();
    const secondsDegrees = sec * 6 + (milsec * 0.36 / 1000);
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    //분 degree
    const min = dateInfo.getMinutes();
    const minsDegrees = min * 6 + (sec * 6 / 60);
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    //시간 degree
    const hr = dateInfo.getHours() > 12 ? dateInfo.getHours() - 12 : dateInfo.getHours();
    const hourDegrees = hr * 30 + (min * 6 / 12);
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  //시간 1초마다 interval
  setInterval(setTimeDeg, 1000);

  timeFunc();
  setTimeDeg();
};

export default AnalogClock;
