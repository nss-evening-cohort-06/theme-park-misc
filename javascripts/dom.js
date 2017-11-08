"use strict";

//accepts an arrays of area name and its area ID to makes area boxes
const domStringAreas = (areaCollection) => {
	let domStringAreas = "";
  	for (let i = 0; i < areaCollection.length; i++){

  		domStringAreas +=`<div class="col-sm-6 col-md-4"><a href="#menu-toggle" class="menu-toggle">`;
    	domStringAreas +=	`<div class="thumbnail" data-area-id="${areaCollection[i].id}" style="background-color:#${areaCollection[i].colorTheme}">`;
    	domStringAreas +=		`<h3 class="areaName">${areaCollection[i].name}</h3>`;
    	domStringAreas +=	`</div>`;
    	domStringAreas +=`</a></div>`;
	}
		domStringAreas +=`<div class="container">`;
		domStringAreas +=  `<div class="row">`;
		domStringAreas +=    `<div class="col-sm-12">`;
		domStringAreas +=      `<footer class="footer">`;
    	domStringAreas +=        `<div class="container">`;
    	domStringAreas +=          `<p class="text-muted">&copy; Today's Date, Current Year</p>`;
    	domStringAreas +=        `</div>`;
    	domStringAreas +=      `</footer>`;
    	domStringAreas +=    `</div>`;
    	domStringAreas +=  `</div>`;
    	domStringAreas +=`</div>`;
	printAreasToDom(domStringAreas);
	toggleMeElmo();
};

const toggleMeElmo = () => {
$(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
});
};

const clearDom = (divName) => {
	// clears div
		// probably only going to clear the sidebar
};


const printAreasToDom = (strang) => {
	$("#areaHolder").append(strang);
};

module.exports = {domStringAreas};
