"use strict";

const getCurrentTime = () => {
	// calls moment function ...
		// ...returns the current time

};

const getSelectedTime = () => {
	// uses dropDown time picker ...
	$("#time").click(() => {
					console.log("change detected on click");

		$("#dropdown").change(() => {
			console.log("change detected on change");
		});
	});

		// .. returns selected time
};

module.exports = {getSelectedTime};