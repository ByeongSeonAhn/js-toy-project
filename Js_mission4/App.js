import {DatePicker} from './components/index.js';

//여러 date picker 선택
const $containers = [...document.querySelectorAll('.date-picker')];
for(let i=0; i < $containers.length; i++) {
    let datePicker = DatePicker();
    $containers[i].appendChild(datePicker);
}

