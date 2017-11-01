"use strict";

const getAttractionByAreaId = (detailValue) => {
// a call for attractions based on areaID,
	// include type name and Id

};

const getAttractions = () => {
	// get just attractions
};

const getAttractionsAndType = () => {
	// combines attractions and typeId's
};
// a call for area collection
	// holding area name and area id


// a call for attractions for matchingAttracitons ...
	// that has attractions



// const getMovieList = () => {
//   let movies = [];
//   return new Promise((resolve, reject) => {
//     $.ajax(`${firebaseKey.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((fbMovies) => {
//       if (fbMovies != null){
//         Object.keys(fbMovies).forEach((key) => {
//           fbMovies[key].id = key;
//           movies.push(fbMovies[key]);
//         });
//       }
//       resolve(movies);
//     }).catch((err) => {
//       reject(err);
//     });
//   });
// };