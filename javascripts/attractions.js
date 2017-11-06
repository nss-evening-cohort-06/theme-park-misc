"use strict";

const moment = require('../lib/node_modules/moment/moment.js');

//sorts maintenance times in the array so index 0 will always be the first date of maintenance

const sortMaintenance = (maintArr) => {
    if (maintArr.length > 0) {
        maintArr.sort((a, b) => {
            return moment(a.maintenance_date).format('x') - moment(b.maintenance_date).format('x');
        });        
    }
}; 


const findFixedAttractions = (attractionsWithMaint, time) => {
    let brokenAttractions = attractionsWithMaint.filter((attraction) => {
        if (attraction.out_of_order) {
            return attraction.out_of_order === true; 
        }
    });
    let fixedAttractions = brokenAttractions.filter((attraction) => {
        if (attraction.maintenance.length > 0) {
            return moment(time).format('x') > moment(attraction.maintenance[0].maintenance_date).format('x'); 
        } 
    });
    return fixedAttractions; 
};


const filterOutOfOrder = (attractionsWithMaint) => {
    let inOrderAttractions = attractionsWithMaint.filter((attraction) => {
        return attraction.out_of_order === false || !attraction.out_of_order; 
    });
    return inOrderAttractions; 
};


const filterUnderMaintenance = (attractionsWithMaint, time) => {
    let comparisonTime = moment(time).format('x'); 
    let openAttractions = attractionsWithMaint.filter((attraction) => {
        if (!attraction.maintenance || attraction.maintenance.length === 0) {
            return true; 
        } else {
            let closedCount = 0; 
            attraction.maintenance.forEach((date) => {
                let maintenanceStart = moment(date.maintenance_date).format('x'); 
                let maintenanceEnd = moment(date.maintenance_date).add(date.maintenance_duration_hours, 'hours').format('x'); 
                if ( comparisonTime >= maintenanceStart && comparisonTime <= maintenanceEnd) {
                    closedCount++;                  
                }
            }); 
            return (closedCount > 0) ? false : true;            
        }
    });
    return openAttractions;
}; 


const getOpenAttractions = (attractionsWithMaint, time) => {
    console.log("att with maint", attractionsWithMaint);
    let fixedAttractions = findFixedAttractions(attractionsWithMaint, time);  
    fixedAttractions.forEach((fixedAttraction) => {
        attractionsWithMaint.forEach((attraction) => {
            if (fixedAttraction.id === attraction.id) {
                attraction.out_of_order = false; 
            }
        });
    }); 
    let inOrderAttractions = filterOutOfOrder(attractionsWithMaint);
    let openAttractions = filterUnderMaintenance(inOrderAttractions, time);
    console.log("fixed attractions", fixedAttractions);
    console.log("attractions after fixed", attractionsWithMaint);
    console.log("in order attractions", inOrderAttractions);
    console.log("open attractions", openAttractions);
    return openAttractions;
}; 






module.exports = {
    sortMaintenance,
    findFixedAttractions, 
    filterUnderMaintenance,
    getOpenAttractions
};