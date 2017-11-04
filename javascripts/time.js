"use strict";

const getCurrentTime = () => {
	// calls moment function ...
		// ...returns the current time

};

const getSelectedTime = (event) => {
	// uses dropDown time picker ...

			if (event.currentTarget.nodeName === "UL") {

			let clickedHour = event.target.innerHTML.split(":");
			let justHour = clickedHour.shift();
			let timeOfDay = clickedHour.pop().split("00 ").pop();

					console.log("just the hour clicked", justHour);
					console.log("just the AM or PM of click", timeOfDay);
				}

		// .. returns selected time
};

module.exports = {getSelectedTime};