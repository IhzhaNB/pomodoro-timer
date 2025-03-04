const notifier = require("node-notifier");
const moment = require("moment");

const argTime = process.argv.slice(2);

const MYNOTIFE_DURATION = argTime[0]; // jam kerja
const BREAK_DURATION = argTime[1]; // jam istirahat

let isWorking = false;
let remainingTime = 0; //Waktu tersisa

function formattingTime(totalSecond) {
  const duration = moment.duration(totalSecond, "seconds");
  const hours = duration.hours().toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function startTime(duration) {
  isWorking = !isWorking;
  remainingTime = duration * 60;

  const timer = setInterval(() => {
    remainingTime--;

    const formattedTime = formattingTime(remainingTime);

    console.log(`${isWorking ? "Work" : "Break"}: ${formattedTime}`);

    if (remainingTime === 0) {
      clearInterval(timer);

      notifier.notify({
        title: isWorking ? "Break time" : "Working time",
        message: isWorking ? "Good Break!" : "Good Word!",
        sound: true,
        wait: true,
      });
      startTime(isWorking ? BREAK_DURATION : MYNOTIFE_DURATION);
    }
  }, 1000);
}

startTime(MYNOTIFE_DURATION);
