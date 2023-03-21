import {Calendar} from "./index.js";

const DatePicker = () => {
    //step1. date-picker element 생성
    let datePickerElement = document.createElement('div');
    datePickerElement.innerHTML += '<h1 class="date-picker-title">Date Picker</h1>';

    //step2.text type input date-picker 자식으로 생성
    let datePickerInputElement = document.createElement('input');
    datePickerInputElement.type = 'text';
    datePickerInputElement.className = 'date-picker-input';
    datePickerInputElement.placeholder = 'Select date';
    datePickerInputElement.readOnly = true;
    datePickerElement.appendChild(datePickerInputElement);

    //step3. calendar import 하여 datepicker element 자식으로 생성
    const calendarElement = Calendar(new Date());
    datePickerElement.appendChild(calendarElement);

    //step4. textbox click event 발생
    datePickerInputElement.addEventListener('click', function () {
        const calendarElement = datePickerElement.querySelector(".calendar");
        if (calendarElement.classList.contains("hidden")) {
            calendarElement.classList.remove('hidden');
        } else {
            calendarElement.classList.add('hidden');
        }
    });

    return datePickerElement;
};

export default DatePicker;