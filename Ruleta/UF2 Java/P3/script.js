const currentTime = document.querySelector("#current-time");
const timeLeft = document.querySelector("#time-left")
const hourSelect = document.querySelector("#hour-select");
const minuteSelect = document.querySelector("#minute-select");
const ampmSelect = document.querySelector("#ampm-select");
const setAlarmBtn = document.querySelector("#set-alarm-btn");
const startTimerBtn = document.querySelector("#start-timer-btn");

let alarmTime;
let isAlarmSet;
let timerInterval;
let remainingTime;

const ringtone = new Audio("./files/ringtone.mp3");
// Configuración de los selectores de hora, minuto y am/pm

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  hourSelect.insertAdjacentHTML("beforeend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  minuteSelect.insertAdjacentHTML("beforeend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  ampmSelect.insertAdjacentHTML("beforeend", option);
}

// Actualizar el reloj en tiempo real

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeLeft.innerText = `${h}:${m}:${s} ${ampm}`;

  if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

// Función para configurar y desactivar la alarma

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    setAlarmBtn.innerText = "Fijar Alarma";
    isAlarmSet = false;
  } else {
    let time = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;

    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
      return alert("¡Por favor, seleccione una hora válida para configurar la alarma!");
    }

    alarmTime = time;
    isAlarmSet = true;
    setAlarmBtn.innerText = "Desactivar Alarma";
  }
}

// Función para iniciar y detener el temporizador

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    startTimerBtn.innerText = "Iniciar Temporizador";
    timerInterval = null;
    remainingTime = null;
  } else {
    let hours = parseInt(hourSelect.value);
    let minutes = parseInt(minuteSelect.value);
    let seconds = 0;

    if (isNaN(hours) ||  isNaN(minutes) || isNaN(seconds) ||
    hours < 0 || hours > 12 ||
    minutes < 0 || minutes > 59 ||
    seconds < 0 || seconds > 59
  ) {
    return alert("Por favor, seleccione una duración válida para el temporizador.");
  }

  let totalSeconds =
    hours * 3600 +
    minutes * 60 +
    seconds;

  remainingTime = totalSeconds;

  startTimerBtn.innerText = "Detener Temporizador";

  timerInterval = setInterval(updateTimer, 1000);
}
}

// Función para actualizar el temporizador

function updateTimer() {
if (remainingTime <= 0) {
  clearInterval(timerInterval);
  ringtone.play();
  ringtone.loop = true;
  startTimerBtn.innerText = "Iniciar Temporizador";
  timerInterval = null;
  remainingTime = null;
} else {
  let hours = Math.floor(remainingTime / 3600);
  let minutes = Math.floor((remainingTime % 3600) / 60);
  let seconds = remainingTime % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  currentTime.style.visibility = "visible"
  currentTime.innerText = `${hours}:${minutes}:${seconds}`;
  
  remainingTime--;
}
}



setAlarmBtn.addEventListener("click", setAlarm);
startTimerBtn.addEventListener("click", startTimer);