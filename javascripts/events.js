"use strict";

const data = require("./data");
const dom = require("./dom");
const time = require("./time");
const attractionsJS = require('./attractions'); 
const moment = require('../lib/node_modules/moment/moment.js');

const pressEnter = () => {
	$("#searchBox").keypress(function (e) {
		let keyCode = e.keyCode || e.which; 
		if (keyCode === 13) {
			e.preventDefault();
			$('.thumbnail').removeClass("area-border");
			$('.thumbnail').removeClass("upside-down-image");
			if (this.value !== '') {
				matchingAttractions(this.value);
			}
		}
	}); 
};

const matchingAttractions = (searchInputValue) => {
	let matchingAreaIds = [];
	let matchingUpsideDownAreaIds = [];
	const regex = RegExp(`${searchInputValue}`, 'gi');
	data.getAttractions().then((fbAttractions) => {
		let attractions = attractionsJS.applyUpsideDowntoAttractions(fbAttractions);
		attractions.forEach((attraction) => {
			if (regex.test(attraction.name)) {
				matchingAreaIds.push(attraction.area_id);
				if (attraction.isUpsideDown === true) {
					matchingUpsideDownAreaIds.push(attraction.area_id);
				} 
			}
		});
		let uniqueMatchingAreaIds = [...new Set(matchingAreaIds)]; 
		let uniqueMatchingUpsideDownAreaIds = [...new Set(matchingUpsideDownAreaIds)];
		highlightAreas(uniqueMatchingAreaIds);
		giveAreasUpsideDownImage(uniqueMatchingUpsideDownAreaIds);
	}); 
};

const giveAreasUpsideDownImage = (matchingAreas) => {
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		matchingAreas.forEach((id) => {
			if (id === domId) {
				domElement.addClass('upside-down-image');
			}
		});
	});
};


const highlightAreas = (matchingIds) => {
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		matchingIds.forEach((id) => {
			if (id === domId) {
				domElement.addClass("area-border");
			}
		});
	});
};
let userSelectedDateAndTime;

const showAttractionsByTime = () => {

		$("#datepicker").blur(() => {
			userSelectedDateAndTime = time.getSelectedDay();
			if (userSelectedDateAndTime != undefined) {

				data.getAttractionsWithAreasByTime(userSelectedDateAndTime);
				$("#user-time-feedback").html("Things Happening on: " + userSelectedDateAndTime);
			}

		});

		$(".dropdown-menu").click((e) => {
			userSelectedDateAndTime = time.getSelectedTime(e);
			if (userSelectedDateAndTime != undefined) {

				data.getAttractionsWithAreasByTime(userSelectedDateAndTime);
				$("#user-time-feedback").html("Things Happening on: " + userSelectedDateAndTime);
			}
 });

}; // end showAttractionsByTime()

const clickArea = () => {
	$(document).ready(() => {
		$(document).on("click", ".thumbnail", (function(e){
			let areaId = $(this).data("area-id");
			data.getAttractionsWithTypeAndMaintenanceTicketsbyAreaId(areaId).then((attractions) => {
				let openAttractions = attractionsJS.getOpenAttractions(attractions);
				let openWithUpsideDown = attractionsJS.applyUpsideDowntoAttractions(openAttractions);
				dom.domStringDetails(openWithUpsideDown, moment());

			}).catch((err) => {
				console.log(err);
			});
		}));
	});
};

//***use this to test functions requiring ajax calls - just press "t" in the search box and this with execute**** 
const testFunction = () => {
	$("#searchBox").keypress(function (e) {
		let keyCode = e.keyCode || e.which; 
		if (keyCode === 116) {
			data.getAttractions().then((attractions) => {
				let upsideDownAttractions = attractionsJS.applyUpsideDowntoAttractions(attractions); 
				console.log(upsideDownAttractions); 
			});
		}
	}); 
};


const init = () => {
	showAttractionsByTime();
	clickArea();
	pressEnter();
};


module.exports = {
	init,
	testFunction
};

