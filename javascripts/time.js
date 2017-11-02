"use strict";

const getCurrentTime = () => {
	// calls moment function ...
		// ...returns the current time

};

const getSelectedTime = () => {
	// uses dropDown time picker ...
	$("#time-picker").change(() => {
		console.log("change detected");
	});
		// .. returns selected time
};

module.exports = {getSelectedTime};