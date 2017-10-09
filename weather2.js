/*uses geolocation to track location*/

var unit = 'C';
var temp = '';

function bg(){
	var colors = ['#8e44ad',"#1abc9c","#16a085","#f39c12","#2ecc71","#27ae60","#e67e22","#d35400","#c0392b","#e74c3c","#3498db","#2980b9","#9b59b6"];
	var rand = Math.floor(Math.random() * colors.length);

	console.log(colors[rand])
	document.getElementsByTagName('body')[0].style.background = colors[rand];
}

function weather(){
	var lon = '';
	var lat = '';

  	bg();

  	function exec(){

		var endpoint = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
		fetch(endpoint)
		.then(function(data){
			return(data.json())
		})
		.then(function(data){
			document.getElementById('date').innerHTML = Date(data.dt);
			document.getElementById('location').innerHTML = data.name + ", " + data.sys.country;
			document.getElementById('icon').innerHTML = "<img src=" + data.weather[0].icon + ">";
			document.getElementById('temp').innerHTML = data.main.temp + "&deg; C";

		})
		.catch(function(error){
			console.log(error)
		})
	}

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(pos){
			lon = pos.coords.longitude;
			lat = pos.coords.latitude;
			exec();
		})
	}
}

weather();

document.getElementById('btn').addEventListener('click',function(){
	var temp = ((document.getElementById('temp').innerHTML).split("°"))[0]
	if(unit == 'C'){
		var fTemp = temp * 9/5 + 32;
		unit = 'F'
		document.getElementById('temp').innerHTML = fTemp + "&deg; F";
		document.getElementById('btn').innerHTML = "F to C";
	}
	else if(unit == 'F'){
		var cTemp = ((temp - 32) * 5/9).toFixed(1);
		unit = 'C';
		document.getElementById('temp').innerHTML = cTemp + "&deg; C";
		document.getElementById('btn').innerHTML = "C to F";
	}
});

document.getElementById('ref').addEventListener('click',function(){
	weather();
});

