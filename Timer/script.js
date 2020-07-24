// getting all elements
let clockController = document.getElementsByClassName("time_controller");
let minUp = document.getElementById("min_up");
let minDown = document.getElementById("min_down");
let secUp = document.getElementById("sec_up");
let secDown = document.getElementById("sec_down");

let clock = document.getElementById("clock");
let clockMin = document.getElementById("clock_min");
let clockSec = document.getElementById("clock_sec");

let controller = document.getElementById("controller");

// setting initial values
let timerMin = 5;
let timerSec = 0;
let min = timerMin;
let sec = timerSec;
let timer;

// initially showing the timer controller
clockController[0].classList.add("show_element");
clockController[1].classList.add("show_element");

// listening for events on controller button
controller.onclick = () => {
    let buttonType = controller.innerHTML;
    // console.log(buttonType);
    if (buttonType == "Start") {
        buttonType = controller.innerHTML = "Pause";
        startTimer();
        clockController[0].classList.remove("show_element");
        clockController[1].classList.remove("show_element");
    }
    else if (buttonType == "Pause") {
        clearInterval(timer);
        controller.innerHTML = "Start";
    }
    else if (buttonType == "Reset") {
        min = timerMin;
        sec = timerSec;
        clock.classList.toggle("color_red");
        controller.innerHTML = "Start";
        setClock();
        clockController[0].classList.add("show_element");
        clockController[1].classList.add("show_element");
    }
}

// listening for events initilize the timer
minUp.onclick = () => {
    if (timerMin < 59) {
        timerMin++;
        min = timerMin;
        setClock();
        buttonController();
    }
}

minDown.onclick = () => {
    if (timerMin > 0) {
        timerMin--;
        min = timerMin;
        setClock();
        buttonController();
    }
}

secUp.onclick = () => {
    if (timerSec < 59) {
        timerSec++;
        sec = timerSec;
        setClock();
        buttonController();
    }
}

secDown.onclick = () => {
    if (timerSec > 0) {
        timerSec--;
        sec = timerSec;
        setClock();
        buttonController();
    }
}

// function to start timer
const startTimer = () => {
    if (sec == 0 && min == 0) {
        clock.classList.toggle("color_red");
        controller.innerHTML = "Reset";
        return;
    }

    timer = setInterval(() => {
        if (sec == 0) {
            min--;
            sec = 59;
        }
        else {
            sec--;
        }
        setClock();
        if (sec == 0 && min == 0) {
            clearInterval(timer);
            clock.classList.toggle("color_red");
            controller.innerHTML = "Reset";
        }

    }, 1000);
}

// function to set the clock
const setClock = () => {
    if (min < 10) {
        clockMin.innerHTML = '0' + min;
    }
    else {
        clockMin.innerHTML = min;
    }

    if (sec < 10) {
        clockSec.innerHTML = '0' + sec;
    }
    else {
        clockSec.innerHTML = sec;
    }
}


// function to controll controller button
const buttonController = () => {
    minUp.classList.remove("disabledbutton");
    minDown.classList.remove("disabledbutton");
    secUp.classList.remove("disabledbutton");
    secDown.classList.remove("disabledbutton");

    if(timerMin == 59){
        minUp.classList.add("disabledbutton");
    }

    if(timerMin == 0){
        minDown.classList.add("disabledbutton");
    }

    if(timerSec == 59){
        secUp.classList.add("disabledbutton");
    }

    if(timerSec == 0){
        secDown.classList.add("disabledbutton");
    }
}

// initilizing
buttonController();
