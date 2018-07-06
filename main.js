var myContent = ["Morning Run", "Buy Pizza", "10AM Meeting", "Lunch"];
var myContentElement = document.querySelector(".todo-items-list");

function renderMyContent(todoList) {
    myContentElement.innerHTML = '';

    for (var i = 0; i < todoList.length; i++) {

        (function (i) {
            var checkboxDOM = document.createElement('input');
            checkboxDOM.setAttribute('type', 'checkbox');

            var item = todoList[i];
            var inputDOM = document.createElement('input');
            inputDOM.setAttribute('value', item);

            var labelDOM = document.createElement('p');
            labelDOM.classList.add('todo-items-list__item');

            var saveBtn = document.createElement('button');
            var btnText = document.createTextNode("Save");
            saveBtn.appendChild(btnText);
            document.body.appendChild(saveBtn);
            saveBtn.classList.add('save-button');

            labelDOM.appendChild(checkboxDOM);
            labelDOM.appendChild(inputDOM);
            labelDOM.appendChild(saveBtn);

            inputDOM.classList.toggle('input-style');

            inputDOM.addEventListener('focus', function (event) {
                event.target.classList.add('input-style--visible');
            });

            inputDOM.addEventListener('blur', function (event) {
                event.target.classList.remove('input-style--visible');
            });

            saveBtn.addEventListener('click', function () {
                updateValue(i);
            });

            myContentElement.appendChild(labelDOM);
        })(i);
    }

    var allCheckboxes = document.querySelectorAll('.todo-items-list__item > input[type="checkbox"]');
    allCheckboxes.forEach(function (checkboxDOM, index) {
        checkboxDOM.addEventListener('click', function () {
            deleteItem(index);
        })
    });
}

function deleteItem(index) {
    myContent.splice(index, 1);

    var arrayLength = tasks();
    document.getElementById("counter").innerHTML = arrayLength;

    renderMyContent(myContent);
}

function addItem() {
    var inputValue = document.getElementById("search-bar").value;

    if (inputValue !== "") {
        myContent.unshift(inputValue);

        var length = myContent.length;
        var arrayLength = tasks();
        document.getElementById("counter").innerHTML = arrayLength;
    }
    renderMyContent(myContent);
}

function tasks() {
    var array = "";

    if (myContent.length === 0) {
        array = (myContent.length + " tasks")
    } else if (myContent.length === 1) {
        array = (myContent.length + " task")
    } else {
        array = (myContent.length + " tasks")
    }
    return array;
}

function newDayName() {
    var date = new Date();

    var weekday = new Array(7);
    weekday[0] = "Sunday, ";
    weekday[1] = "Monday, ";
    weekday[2] = "Tuesday, ";
    weekday[3] = "Wednesday, ";
    weekday[4] = "Thursday, ";
    weekday[5] = "Friday, ";
    weekday[6] = "Saturday, ";

    var dayName = weekday[date.getDay()];
    document.getElementById("date__day-name").idocumennnerHTML = dayName;

    return dayName;
}

newDayName();

function newDay() {
    var date = new Date();
    var dayNumber = date.getDate();
    document.getElementById("date__day-number").innerHTML = dayNumber;

    if (dayNumber === 1) {
        document.getElementById("date__day-number").innerHTML = 1 + "st";
    } else if (dayNumber === 2) {
        document.getElementById("date__day-number").innerHTML = 2 + "nd";
    } else if (dayNumber === 3) {
        document.getElementById("date__day-number").innerHTML = 3 + "rd";
    } else {
        document.getElementById("date__day-number").innerHTML = dayNumber + "th";
    }
}

newDay();

function newMonth() {

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var date = new Date();
    var monthName = month[date.getMonth()];
    document.getElementById("date__month").innerHTML = monthName;
}

newMonth();

function updateValue(idx) {

    var inputValue = document.querySelectorAll('#addToList .input-style');
    var newValue = inputValue[idx].value;

    myContent.splice(idx, 1, newValue);
}

//Tasks counter
var counterSpan = document.createElement("span");
var counterText = document.createTextNode(myContent.length + " tasks");

counterSpan.appendChild(counterText);
document.getElementById("counter").appendChild(counterSpan);

renderMyContent(myContent);


//Day name, day number, month
var dateSpan = document.createElement("span");
var dateText = document.createTextNode(newDayName());

dateSpan.appendChild(dateText);
document.getElementById("date__day-name").appendChild(dateSpan);

dateSpan.classList.toggle('header-date__day-name');

renderMyContent(myContent);

document.getElementById("date__day-number").classList.toggle('header-date__day');

document.getElementById("date__month").classList.toggle('header-date__month');


//Enter, Esc (delete main input value)
var mainInput = document.getElementById('search-bar');
mainInput.addEventListener('keydown', function (event) {
    var key = event.keyCode;
    if (key === 13) {
        addItem();
    }
    mainInput.addEventListener('keyup', function (event) {
        var key = event.keyCode;
        if (key === 27) {
            mainInput.value = "";
        }
    });
});

//List input Enter
var listInput = document.querySelectorAll('#addToList .input-style');

for (var i = 0; i < myContent.length; i++) {
    listInput[i].addEventListener('keydown', function (event) {
        var key = event.keyCode;
        if (key === 13) {
            updateValue();
        }
        console.log(event);
    });
}