//--THIS PART OF CODE KEEPS JAVASCRIPT VARIABLE UPDATED TO FORM INPUT--//
//select text input in form and store to a variable
const howManyInput = document.getElementById('HOWMANY');
let howMany = howManyInput.value;
const whatInput = document.getElementById('WHAT');
let what = whatInput.value;
const minMagInput = document.getElementById('MINMAG');
let minMag = minMagInput.value;
const maxMagInput = document.getElementById('MAXMAG');
let maxMag = maxMagInput.value;
const timeframeInput = document.getElementById('TIMEFRAME');
let timeframe = timeframeInput.value;
const countryInput = document.getElementById('COUNTRY');
let country = countryInput.value;

howManyInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	howMany = e.target.value;
	}
)
whatInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	what = e.target.value;
	}
)
minMagInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	minMag = e.target.value;
	}
)
maxMagInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	maxMag = e.target.value;
	}
)
timeframeInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	timeframe = e.target.value;
	}
)
countryInput.addEventListener('input', function(e) {
	// listener: prevent form default behavior
	//e: event
	country = e.target.value;
	}
)

//--THIS PART OF CODE RETRIEVES INPUT FROM FORM WHEN SUBMITTED--//
// querySelector selects the form item from the html document that uses this scripts
//return: HTMLElement object representing the first element match
//parameter: CSS selector string
const form = document.querySelector('form');

//this listens to event when "Submit" is clicked
form.addEventListener('submit', function(e) {
			// listener: prevent form default behavior
			//e: event
			e.preventDefault();//prevent default action if not handled explicitly
			
			//make request to API using axios
			//axios lets us easily get API request
			//make sure to include axios CDN in html
			axios.get("http://localhost:8000/earthquakes/?howMany="+howMany+"&what="+what+"&minMag="+minMag+"&maxMag="+maxMag+"&timeframe="+timeframe+"&country="+country).then(function(resp){
					outputdata(resp);})
					.catch(function(error){
						console.log(error);
					})
			
			
			howManyInput.value="";
			whatInput.value="";
			minMagInput.value="";
			maxMagInput.value="";
			timeframeInput.value="";
			countryInput.value="";//clear form input box
			}	
)

function outputdata(resp){
	//resp.data will be array of employee objects 
	console.log(resp.data);
	console.log(resp.data.length)	
	
	//display results in HTML page
	let outputheading = document.querySelector('.outputheading');
	let geodata = document.querySelector('.geodata');
	let errormsg = document.querySelector('.error-message');
	//console.log(resp.data.earthquakelist);
	
	let earthquakelist=[];
	let earthquakestr="";
	
	if (resp.data.length){

		for(let i=0; i<resp.data.length;i++){
			earthquakestr="A magnitude " + resp.data[i].mag + " earthquake occurred " +resp.data[i].place + ", on " + resp.data[i].month+ " " +resp.data[i].day+ ", " +resp.data[i].year;
			earthquakelist.push(earthquakestr);
			console.log(earthquakelist);
		}
		console.log(earthquakelist);
		outputheading.innerHTML = earthquakestr;
		geodata.innerHTML = earthquakelist;
		errormsg.innerHTML="";
	} else{
		errormsg.innerHTML = "There are no earthquakes."
		
	}	
	
} 
