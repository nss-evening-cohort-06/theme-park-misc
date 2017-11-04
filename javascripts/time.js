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
		// ...returns the current time

	let currentDate = picker.getMoment().format("YYYY-MM-DD");
	let currentDateFormated = moment(currentDate).format("dddd, MMMM DD YYYY");
	let currentTime = moment().format("hA");
	let currentDateAndTime = currentDateFormated + " " + currentTime;

	console.log("the format our JSON gives us", moment("Fri Nov 10 2017 18:30:00 GMT-0500 (CDT)").format("dddd, MMMM d YYYY, hA"));
	console.log("current time and date from the picker", currentDateAndTime);

// return timeAndDate
};

// Add day picker

// To compare the time clicked to any times in our data
	// the time in our json file ...
		// needs to be rounded down
		// AND needs to show if it's AM or PM
		// AND make AM or PM all caps or all lowercase

	// the time in our clicker ...
		// needs to report back the hour
		// AND needs to show if it's AM or PM

// const getSelectedDay = (eVent) => {
// 	console.log();
// };

const getSelectedTime = (event) => {
	// uses dropDown time picker ...
	console.log("time selection", event);
			if (event.currentTarget.nodeName === "UL") {

				
				}

		// .. returns selected time
};

module.exports = {getCurrentTime, getSelectedTime};