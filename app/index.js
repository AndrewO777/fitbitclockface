import clock from "clock";
import document from "document";
import { today as todayActivity } from 'user-activity';

import { preferences } from "user-settings";
import * as util from "./common/utils";
import { HeartRateSensor } from "heart-rate";

const sElem = document.getElementById("stepsText");
const clockLabel = document.getElementById("clock-label");
const hrmLabel = document.getElementById("hrmLabel");
const backgroundImage = document.getElementById("backgroundImage");

let images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png"];
let imageIndex = Math.floor(Math.random() * 12);
backgroundImage.href = images[imageIndex];

clock.granularity = 'seconds';
// Get a handle on the <text> element

//const act = GET https://api.fitbit.com/1/activities.json;
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  let mins = today.getMinutes();
  if (hours >= 10)
    clockLabel.text = `${hours}:`;
  else
    clockLabel.text = `0${hours}:`;
  if (mins >= 10)
    clockLabel.text += mins;
  else
    clockLabel.text += `0${mins}`;
  if (mins === 0){
    let newImageIndex = Math.floor(Math.random() * 12);
    while (newImageIndex === imageIndex)
      newImageIndex = Math.floor(Math.random() * 12);
    imageIndex = newImageIndex;
    backgroundImage.href=images[imageIndex];
  }
    if (todayActivity.adjusted != null) {
        let steps = todayActivity.adjusted.steps;
        let stepsText = "";
        if (steps < 10)
            sElem.x = 245;
        else if (steps < 100)
            sElem.x = 237;
        else if (steps < 1000)
            sElem.x = 230;
        else if (steps < 10000)
            sElem.x = 220;
        stepsText += steps;
        sElem.text = stepsText;
    } else {
        sElem.text = "--";
    }
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrmLabel.text = `${hrm.heartRate}`;
  });
  hrm.start();
}


