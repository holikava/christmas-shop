const timerNumbers = document.querySelectorAll(".timer__number");
const countdownCaption = document.querySelector('.coundown__caption');
let futureDate = new Date(2024, 11, 31, 23, 59, 59);

const futureTime = futureDate.getTime();

function countdownTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  const formatingTime = (item) => {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };

  timerNumbers.forEach((item, index) => {
    item.innerHTML = formatingTime(values[index]);
  });

  if (t < 0) {
      clearInterval(countdown);
      countdownCaption.innerText = 'Happy New Year!!'
  }
}

let countdown = setInterval(countdownTime, 1000);
countdownTime();
