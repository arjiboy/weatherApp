var url = "http://ip-api.com/json";
var unit = 'C';
var temp = '';


function weather(n){
	fetch(n)
	.then(function(res){
		return res.json()
	})
	.then(function(data){
		return ({lon: data.lon, lat: data.lat});
	})
	.then(function(data){
		var endpoint = "https://fcc-weather-api.glitch.me/api/current?lat=" + data.lat + "&lon=" + data.lon;
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
	})
	.catch(function(error){
		console.log(error)
	})
}

weather(url);

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
	weather(url);
})

