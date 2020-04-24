const express = require('express');
const appserver = express();
const geodata = require('./data.json');
const cors = require('cors');

appserver.use(cors());
appserver.get('/earthquakes', function(request, response) {
	console.log(request.query);
	

	var what = request.query.what;
	if(!what){
		what = '';
	} else if (what == 'MOSTRECENT') {
		var timeframe = '';
	} else if (what == 'WORST') {
		var minMag = 4;
		var maxMag = 8;
	}

	var howMany = request.query.howMany;
	if((!howMany) || (howMany <= 0)) {
		return response.send({"status" : "error", "message" : "No howMany value provided"});
	}

	var minMag = request.query.minMag;
	//if(!minMag){
	//	minMag = '';
	//}
//
	var maxMag = request.query.maxMag;
	//if(!maxMag){
	//	maxMag = '';
	//}

	var timeframe = request.query.timeframe.toLowerCase();
	if(!timeframe){
		timeframe = '';
	}

	var country = request.query.country.toLowerCase();


	var retobjar = [];

	for(let a = 0; a <= howMany; a++) {
				if(what == 'MOSTRECENT') {
					for(let i = 0; i < geodata.features.length; i++){
							if((minMag) <= geodata.features[i].properties.mag <= (maxMag)) {
								let t = new Date(geodata.features[i].properties.time);	
								let month = t.getMonth();
								let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
								var quakes = {
									mag: geodata.features[i].properties.mag,
									place: geodata.features[i].properties.place,
									year: t.getFullYear(),
									month: months[t.getMonth()],
									day: t.getDate()
									}

							}
							
					}
				retobjar.push(quakes);
				console.log(JSON.stringify(retobjar));
				response.send(JSON.stringify(retobjar));
				return response;				
				} else if (what == 'WORST') {
					console.log('Begin Worst');
					console.log(minMag + ' '  + maxMag);
					minMag = 4;
					maxMag = 8;
					for(let i = 0; i < geodata.features.length; i++){
						if((minMag) <= geodata.features[i].properties.mag <= (maxMag)) {
							if(timeframe == 'month') {
								let t = new Date(geodata.features[i].properties.time);
								let month = t.getMonth();
								let d = new Date();
								let currentMonth = d.getMonth();
								if (month == currentMonth) {
									console.log('compare months')
									let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
									var quakes = {
									mag: geodata.features[i].properties.mag,
									place: geodata.features[i].properties.place,
									year: t.getFullYear(),
									month: months[t.getMonth()],
									date: t.getDate()
									}
								}
							
								console.log('Sending worst');
								retobjar.push(quakes);
								console.log(JSON.stringify(retobjar));
								//return 
								response.send(JSON.stringify(retobjar));
								//break;
		
							} else if (timeframe == 'week') {
									var t = new Date(geodata.features[i].properties.time);
									var day = t.getDate();
									var month = t.getMonth();
									var d = new Date();
									var currentDay = d.getDate();
									for (let w = currentDay; w < currentDay-7; w--){
										if (day == currentDay) {
											var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
											let quakes = {
											mag: largest,
											place: geodata.features[i].properties.place,
											year: t.getFullYear(),
											month: months[t.getMonth()],
											date: t.getDate()
											}
										}
									}
							} else if (timeframe == 'day') {
								var t = new Date(geodata.features[i].properties.time);
								var day = t.getDate();
								var month = t.getMonth();
								var d = new Date();
								var currentDay = d.getDate();
								if(day == currentDay) {
										var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
										let retobjar = {
										mag: largest,
										place: geodata.features[i].properties.place,
										year: t.getFullYear(),
										month: months[t.getMonth()],
										date: t.getDate()
										}
								}

							} else if (timeframe == 'hour') {
								var t = new Date(geodata.features[i].properties.time);
								var hour = t.getHours();
								var month = t.getMonth();
								var d = new Date();
								var currentHour = d.getHours();
								if(hour == currentHour) {
										var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
										let retobjar = {
										mag: largest,
										place: geodata.features[i].properties.place,
										year: t.getFullYear(),
										month: months[t.getMonth()],
										date: t.getDate()
										}
								}
							} else {
								return response.send({"status" : "error", "message" : "No timeframe specified"});
							}
						}	
					}
									return response.send(JSON.stringify(retobjar));
				} else {
					console.log('hello');
					what = '';
					for(var l = 0; l < howMany; l++) {
						for(let i = 0; i < geodata.features.length; i++){ 
							if ((minMag) <= geodata.features[i].properties.mag <= (maxMag)) {
							if(timeframe == month) {
								var t = new Date(geodata.features[i].properties.time);
								var month = t.getMonth();
								var d = new Date();
								var currentMonth = d.getMonth();
								if (month == currentMonth) {
									var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
									let retobjar = {
									mag: geodata.features[i].properties.mag,
									place: geodata.features[i].properties.place,
									year: t.getFullYear(),
									month: months[t.getMonth()],
									date: t.getDate()
									}
								}
							} else if (timeframe == 'week') {
									var t = new Date(geodata.features[i].properties.time);
									var day = t.getDate();
									var month = t.getMonth();
									var d = new Date();
									var currentDay = d.getDate();
									for (let w = currentDay; w < currentDay-7; w--){
										if (day == currentDay) {
											var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
											let retobjar = {
											mag: geodata.features[i].properties.mag,
											place: geodata.features[i].properties.place,
											year: t.getFullYear(),
											month: months[t.getMonth()],
											date: t.getDate()
											}
										}
									}
							} else if (timeframe = 'day') {
								var t = new Date(geodata.features[i].properties.time);
								var day = t.getDate();
								var month = t.getMonth();
								var d = new Date();
								var currentDay = d.getDate();
								if(day == currentDay) {
										var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
										let retobjar = {
										mag: geodata.features[i].properties.mag,
										place: geodata.features[i].properties.place,
										year: t.getFullYear(),
										month: months[t.getMonth()],
										date: t.getDate()
										}
								}

							} else if (timeframe = 'hour') {
								var t = new Date(geodata.features[i].properties.time);
								var hour = t.getHours();
								var month = t.getMonth();
								var d = new Date();
								var currentHour = d.getHours();
								if(hour == currentHour) {
										var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
										let retobjar = {
										mag: geodata.features[i].properties.mag,
										place: geodata.features[i].properties.place,
										year: t.getFullYear(),
										month: months[t.getMonth()],
										date: t.getDate()
										}
								}
							} else {
								return response.send({"status" : "error", "message" : "No timeframe specified"});
								}	
							}
						}
					}
				}

				return('ended');
			}
	
});

appserver.listen(8000, function() {
	console.log('Listening on port 8000...');
});