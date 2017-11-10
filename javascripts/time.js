"use strict";

const moment = require("../lib/node_modules/moment/moment.js");
const Pikaday = require("../lib/node_modules/pikaday/pikaday.js");

let userSelectedDay;
let userSelectedTime;
let chosenTimeAndDate;
var picker = new Pikaday({
	field: document.getElementById('datepicker')
});

// if the user selects a day and time maintenance_date ...
	// up to the time of the end of the first maintenance_duration_hours ...
		// do not show that ride
	//
const getCurrentTime = () => {

	let currentDate = picker.getMoment().format("YYYY-MM-DD");
	let currentDateFormated = moment(currentDate).format("dddd, MMMM DD YYYY");
	let currentTime = moment().format("hA");
	let currentDateAndTime = currentDateFormated + " " + currentTime;
	console.log("current date and time", currentDateAndTime);
};

const getSelectedDay = () => {

	userSelectedDay = moment(picker._d).format("dddd, MMMM DD YYYY");
	return TimeAndDate(userSelectedDay, userSelectedTime);
};

const getSelectedTime = (event) => {

	if (event.currentTarget.nodeName === "UL") {
		userSelectedTime = event.target.id;
		}
	return TimeAndDate(userSelectedDay, userSelectedTime);
};

const TimeAndDate = (date, time) => {
	if (date != undefined && time != undefined) {
		return date + " " + time;
	} 
};

module.exports = {getCurrentTime, getSelectedTime, getSelectedDay};