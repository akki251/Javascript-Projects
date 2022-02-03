var daysel = document.getElementById("days");
var hoursel = document.getElementById("hours");
var minsel = document.getElementById("mins");
var secondsel = document.getElementById("seconds");
const newYearss = "1 Jan 2023";
function countDown() {
  const newYearDate = new Date(newYearss);
  const currentData = new Date();
  const diff = newYearDate - currentData;
  const totalSeconds = diff / 1000;
  const days = Math.floor(totalSeconds / 24 / 3600);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds % 60);

  daysel.innerHTML = formatTime(days);
  hoursel.innerHTML = formatTime(hours);
  minsel.innerHTML = formatTime(mins);
  secondsel.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

countDown();

setInterval(() => {
  countDown();
}, 1000);
