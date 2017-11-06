"use strict";


const moment = require("../lib/node_modules/moment/moment.js");
const Pikaday = require("../lib/node_modules/pikaday/pikaday.js");

// let $picker = document.getElemntById('datepicker').pikaday({firstDay: 1});
var picker = new Pikaday({
	field: document.getElementById('datepicker')
});

// if the user selects a day and time maintenance_date ...
	// up to the time of the end of the first maintenance_duration_hours ...
		// do not show that ride
	//
const getCurrentTime = () => {
	// calls moment function ...
		// matches formats of database info and our info
		// ...returns the current time
			// for the currently happening things to show up in the sidebar
			// and for our footer

	let currentDate = picker.getMoment().format("YYYY-MM-DD");
	let currentDateFormated = moment(currentDate).format("dddd, MMMM DD YYYY");
	let currentTime = moment().format("hA");
	let currentDateAndTime = currentDateFormated + " " + currentTime;

	console.log("the format our JSON gives us", moment("Fri Nov 10 2017 18:30:00 GMT-0500 (CDT)").format("dddd, MMMM d YYYY, hA"));
	console.log("current time and date from the picker", currentDateAndTime);

// return currentDateAndTime
};

// Add day picker

// To compare the time clicked to any times in our data
	// the time in our json file ...

		// AND needs to show if it's AM or PM

	// the time in our clicker ...
		// needs to report back the hour
		// AND needs to show if it's AM or PM

let userSelectedDay;
let userSelectedTime;
let chosenTimeAndDate;


const getSelectedDay = () => {

	userSelectedDay = moment(picker._d).format("dddd, MMMM DD YYYY");

	return TimeAndDate(userSelectedDay, userSelectedTime);
};

const getSelectedTime = (event) => {
	// uses dropDown time picker ...
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