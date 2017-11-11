"use strict";

const dom = require('./dom'); 
const attractionsJS = require('./attractions');
const time = require('./time');
const moment = require('../lib/node_modules/moment/moment.js');


//FIREBASE

let firebaseKey = '';
let sortedArray = [];


const setFirebaseKey = (key) => {
    firebaseKey = key; 
};

const apiKeys = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/apiKeys.json`
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {        
        setFirebaseKey(results.firebase);
        firebase.initializeApp(results.firebase);
        return getAreas();
    }).then((areas) => {
        dom.domStringAreas(areas);
        return getAttractionsWithTypeAndMaintenanceTickets();
    }).then((attractions) => {
        updateFixedAttractions(attractions);
        getAttractionsOpenAtCurrentTime(moment());
    }).catch((error) => {
        console.log(error); 
    });
};

const updateFixedAttractions = (attractions) => {
    let fixedAttractions = attractionsJS.findFixedAttractions(attractions, moment());
    fixedAttractions.forEach((fixedAttraction) => {
        updateFixedAttraction(fixedAttraction).then((result) => {
        }).catch((error) => {
            console.log(error); 
        });
    });
};



//PROMISES 

const getAttractionsByAreaId = (areaId) => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="area_id"&equalTo=${areaId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                Object.keys(fbAttractions).forEach((key) => {
                    attractions.push(fbAttractions[key]);
                }); 
                resolve(attractions); 
            }
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsByType = (typeId) => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="type_id"&equalTo=${typeId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                resolve(fbAttractions);
            }
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionById = (attractionId) => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="id"&equalTo=${attractionId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                resolve(fbAttractions);
            }
        }).catch((err) => {
            reject(err); 
        });
    });   
};

const getAttractionsWithTypeAndMaintenanceTickets = () => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        getAttractionsWithType().then((fbAttractions) => {
            attractions = fbAttractions; 
            return getMaintTickets(); 
        }).then((tickets) => {
            attractions.forEach((attraction) => {
                tickets.forEach((ticket) => {
                    if (attraction.id == ticket.attraction_id) {
                        if (!attraction.maintenance) {
                            attraction.maintenance = [];
                        }
                        let maintObj = {}; 
                        maintObj.maintenance_date = ticket.maintenance_date;
                        maintObj.maintenance_duration_hours = ticket.maintenance_duration_hours;
                        attraction.maintenance.push(maintObj);
                        attractionsJS.sortMaintenance(attraction); 
                    }
                resolve(attractions);
                });
            });
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractions = () => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                resolve(fbAttractions) ;
            }         
        }).catch((err) => {
            console.log(err);
        });
    }); 
}; 


const getMaintTickets = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/maintenance_tickets.json`).then((fbTickets) => { 
            if (fbTickets !== null) {
                resolve(fbTickets); 
            } 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionTypes = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json`).then((fbAttractionTypes) => { 
            if (fbAttractionTypes !== null) {
                resolve(fbAttractionTypes);
            }
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAreas = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((fbAreas) => { 
            if (fbAreas !== null) {
                resolve(fbAreas);
            }
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getParkInfo = () => {
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((fbInfo) => { 
            if (fbInfo !== null) {
                resolve(fbInfo);
            }
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsWithTypeByAreaId = (areaId) => {
    let attractions = []; 
    return new Promise ((resolve, reject) => {
        getAttractionsByAreaId(areaId).then((_attractions) => {
            attractions = _attractions; 
            return getAttractionTypes();
        }).then((types) => {
            let attractionsWithType = attractions.map((attraction) => {
                let obj = Object.assign(attraction); 
                types.forEach((type) => {
                    if (attraction.type_id == type.id) {
                        obj.attractionType = type.name;
                    }
                });
                return obj;
            });
            resolve(attractionsWithType);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getAttractionsWithType = () => {
    let attractions = []; 
    return new Promise ((resolve, reject) => {
        getAttractions().then((_attractions) => {
            attractions = _attractions; 
            return getAttractionTypes();
        }).then((types) => {
            let attractionsWithType = attractions.map((attraction) => {
                let obj = Object.assign(attraction); 
                types.forEach((type) => {
                    if (attraction.type_id == type.id) {
                        obj.attractionType = type.name;
                    }
                });
                return obj;
            });
            resolve(attractionsWithType);
        }).catch((err) => {
            reject(err);
        });
    });
};

const updateFixedAttraction = (fixedAttraction) => {
    let id = fixedAttraction.id; 
    return new Promise((resolve, reject) => {
        getAttractionById(id).then((attraction) => {
            let key = Object.keys(attraction)[0]; 
            attraction[key].out_of_order = false; 
            $.ajax({
                method: "PUT",
                url: `${firebaseKey.databaseURL}/attractions/${key}.json`,
                data: JSON.stringify(attraction[key])
            }).then((edit) => {
                resolve(edit); 
            }).catch((err) => {
                reject(err); 
            });
        });
    });
};


const getAttractionsWithTypeAndMaintenanceTicketsbyAreaId = (areaId) => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        getAttractionsWithTypeByAreaId(areaId).then((fbAttractions) => {
            attractions = fbAttractions; 
            return getMaintTickets(); 
        }).then((tickets) => {
            attractions.forEach((attraction) => {
                tickets.forEach((ticket) => {
                    if (attraction.id == ticket.attraction_id) {
                        if (!attraction.maintenance) {
                            attraction.maintenance = [];
                        }
                        let maintObj = {}; 
                        maintObj.maintenance_date = ticket.maintenance_date;
                        maintObj.maintenance_duration_hours = ticket.maintenance_duration_hours;
                        attraction.maintenance.push(maintObj);
                        attractionsJS.sortMaintenance(attraction); 
                    }
                resolve(attractions);
                });
            });
        }).catch((err) => {
            reject(err); 
        });
    });
};


// ON PAGE LOAD ...
const getAttractionsWithAreasByTime = (userSelectedDateAndTime) => {    // this will at some point need to accept a time to pass along

  let attractions = [];

    getAttractionsWithTypeAndMaintenanceTickets().then((_attractions) => {
      attractions = _attractions;
      let attractionsWithUpsideDown = attractionsJS.applyUpsideDowntoAttractions(attractions);
      let availableAttractions = attractionsJS.getOpenAttractions(attractionsWithUpsideDown, userSelectedDateAndTime);
    // if any attraction has a time ...
        // let attractionsWithTimes = availableAttractions.filter((attraction) => {
        attractions = availableAttractions.filter((attraction) => {

            return attraction.times;
      }); // end filter
    // return filterByTime(attractionsWithTimes, userSelectedDateAndTime);
    return getAreas();
    }).then((areas) => {
        filterByTime(attractions, areas, userSelectedDateAndTime);
    }); // end 
};


const filterByTime = (onesWithTime, areas, userSelectedDateAndTime) => {
    // holds matching attractions by name
    let holdingArray = [];

        onesWithTime.forEach((attraction) => {
            attraction.times.forEach((time) => {

                if (moment(userSelectedDateAndTime, 'LLLL').startOf('hour').format("LT") === moment(time, 'h:A').startOf('hour').format("LT")) {
                    holdingArray.push(attraction);
                    areas.forEach((area) => {
                        if (attraction.area_id === area.id) {
                            attraction.areaName = area.name;
                            sortedArray.push(attraction);                        
                        }
                    });
                } // end if for time comparison
            }); // end onesWithTime.forEach(time)     
        }); 
    let uniqueMatchingAttractions = [...new Set(sortedArray)]; 
    dom.domStringDetails(uniqueMatchingAttractions, false);
    sortedArray = []; 
};

const getAttractionsOpenAtCurrentTime = (currentTime) => { 
  let attractions = [];
    getAttractionsWithTypeAndMaintenanceTickets().then((_attractions) => {
      attractions = _attractions;
      let attractionsWithUpsideDown = attractionsJS.applyUpsideDowntoAttractions(attractions);
      let availableAttractions = attractionsJS.getOpenAttractions(attractionsWithUpsideDown, currentTime);
        attractions = availableAttractions.filter((attraction) => {
            return attraction.times;
      });
    return getAreas();
    }).then((areas) => {
        filterByTime(attractions, areas, currentTime);
    }); 
};


module.exports = {
    getAttractions,
    getAttractionsByAreaId,
    getAttractionsByType,
    getAttractionTypes,
    getAttractionsWithTypeByAreaId,
    getAttractionsWithAreasByTime,
    getAttractionsWithTypeAndMaintenanceTicketsbyAreaId,
    updateFixedAttraction,
    getAreas,
    getParkInfo,
    retrieveKeys
};