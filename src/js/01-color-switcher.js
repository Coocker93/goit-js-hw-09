const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;


startBtn.addEventListener('click', onStartClick)
stopBtn.addEventListener('click', onStopClick)

function onStartClick() {
timerId = setInterval(()=> {
    const newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
}, 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function onStopClick() {
    clearInterval(timerId)
    startBtn.disabled = false;
    stopBtn.disabled = true;
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }