"use strict";

const moment = require("../lib/node_modules/moment/moment.js");

// if the user selects a day and time maintenance_date ...
	// up to the time of the end of the first maintenance_duration_hours ...
		// do not show that ride
	//

const getCurrentTime = () => {
	// calls moment function ...
		// ...returns the current time
console.log(moment().format("dddd, MMMM d YYYY, hA"));
console.log(moment("Fri Nov 10 2017 18:30:00 GMT-0500 (CDT)").format("dddd, MMMM d YYYY, hA"));

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

const getSelectedTime = (event) => {
	// uses dropDown time picker ...
	console.log("event", event);
			if (event.currentTarget.nodeName === "UL") {

				let hour = event.target.innerHTML;
				let clickedHour = event.target.innerHTML.split(":");
				let justHour = clickedHour.shift();
				let timeOfDay = clickedHour.pop().split("00 ").pop();

				console.log("hour", hour);
				console.log("just the hour clicked", justHour);
				console.log("just the AM or PM of click", timeOfDay);
				}

		// .. returns selected time
};

module.exports = {getCurrentTime, getSelectedTime};