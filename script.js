let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let blinkInterval;

const display = document.getElementById('display');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const stopwatch = document.getElementById('stopwatch');

function start() {
    if (!running) {
        message.innerHTML = '';  // Clear the message
        startTime = new Date().getTime() - difference; // Calculate new startTime based on difference
        tInterval = setInterval(updateTime, 1000); // Update every second
        running = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval); // Stop the interval that updates the time
        clearInterval(blinkInterval); // Stop the blinking
        running = false;
        difference = new Date().getTime() - startTime; // Save the time difference
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
    }
}

function reset() {
    clearInterval(tInterval); // Stop the interval that updates the time
    clearInterval(blinkInterval); // Stop the blinking
    running = false;
    display.style.color = 'black'; // Reset color to black
    display.style.visibility = 'visible'; // Reset visibility
    message.innerHTML = '';  // Clear the message
    stopwatch.style.backgroundColor = 'white'; // Reset background color
    display.innerHTML = "00:00:00"; // Reset display to 00:00:00
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    difference = 0; // Reset the difference to 0
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;

    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

    if (seconds === 5) {
        message.innerHTML = "Time's up!";
        startBlinking();
        startColorChange();
        stopwatch.style.backgroundColor = 'red'; // Change background color to red
    }

    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function startColorChange() {
    display.style.color = 'red'; // Change color to red
}

function startBlinking() {
    blinkInterval = setInterval(() => {
        display.style.visibility = (display.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 500);
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

stopButton.disabled = true;
resetButton.disabled = true;
