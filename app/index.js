import clock from "clock";
import document from "document";


/*import { preferences } from "user-settings";
import * as util from "./common/utils";*/
//import { HeartRateSensor } from "heart-rate";

// Update the clock every minute
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);


/*
// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
//const hrmLabel = document.getElementById("hrmLabel");
//const act = GET https://api.fitbit.com/1/activities.json;
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

//if (HeartRateSensor) {
//  const hrm = new HeartRateSensor({ frequency: 1 });
//  hrm.addEventListener("reading", () => {
 //   console.log(`Current heart rate: ${hrm.heartRate}`);
//    hrmLabel.text = `${hrm.heartRate}`;
//  });
//  hrm.start();
//}*/