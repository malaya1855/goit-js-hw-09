const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let changeColor = "";

startBtn.addEventListener('click', onStartBtnClick)

stopBtn.addEventListener('click', onStopBtnClick)

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function onStartBtnClick () {
    document.body.style.backgroundColor = getRandomHexColor()
changeColor = setInterval( ()=>{
    document.body.style.backgroundColor = getRandomHexColor()}, 1000)
    startBtn.disabled = true}
 
function onStopBtnClick () {
    clearInterval(changeColor);
    startBtn.disabled = false;
}


