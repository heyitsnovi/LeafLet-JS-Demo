var mymap = L.map('mapid',{

	}).setView([8.754795, 123.75], 2);

	var tileLayerID = 'mapbox.run-bike-hike';

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: '',
		id: tileLayerID,
	}).addTo(mymap);

 
mymap.on('mousemove', Onmousemove);
mymap.on('click',Onmouseclick);

	//array from matches array to example : manila -> tokyo , australia->new zealand and so on...
var popup = L.popup();

 var from = [
	 	[
	 		['Philippines',14.732386081418454,121.02539062500001],
	 		['Australia',-26.431228,137.460938],
	 		['Hong Kong',22.187405, 115.664063],
	 		['Indonesia',-1.757537, 119.179688],
	 		['Sweden',65.2198939361321,16.523437500000004],
	 		['Argentina',-34.88593094075316,-62.22656250000001],
	 		['Madagascar', -19.973348786110602,45],
	 		['Mexico',24.84656534821976,258.39843750000006]

	 	]

 ];


var to = [

	 	[	

		 	['Japan',36.24427318493909, 138.60351562500003],
		 	['New Zealand',-44.087585,173.671875],
		 	['United Kingdom',53.120405, -1.40625],
		 	['United States Of America',33.431441, 243.28125],
		 	['Canada',55.178867663282006,254.88281250000003],
		 	['Spain',41.244772343082076,-3.5156250000000004],
		 	['Maldives', -3.162455530237848,72.77343750000001],
		 	['Hawaii',19.973348786110613,204.609375]
	 		
	 	]
];


for(var i=0; i<from.length;i++){

	for(var x=0;x<from[i].length;x++){

		
		var pointA = new  L.LatLng(from[i][x][1],from[i][x][2]);
		var pointB = new  L.LatLng(to[i][x][1],to[i][x][2]);


			var pointList = [pointA,pointB];

				new L.Polyline(pointList, {
				    color: getRandomColor(),
				    weight: 5,
				    opacity: 3,
				    smoothFactor: 0,
				    lineJoin: 'dotted',
				    dashArray: '9,9'
				}).addTo(mymap);


		L.marker([from[i][x][1], from[i][x][2]]).addTo(mymap).bindPopup('<strong>'+from[i][x][0]+'</strong>');
		L.marker([to[i][x][1], to[i][x][2]]).addTo(mymap).bindPopup('<strong>'+to[i][x][0]+'</strong>');

	}
}


var searchbox = new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat','lon'],
		marker: L.circleMarker([0,0],{radius:30}),
		autoCollapse: true,
		autoType: false,
		minLength: 2,
		formatData: formatJSON,
	});

 

mymap.addControl(searchbox);

   mymap.on('search:locationfound', function (result) {
    console.log(result);
});

function Onmouseclick(e){
	document.getElementById('log').innerHTML = 'Latitude: '+e.latlng.lat+'<br> Longitude: '+e.latlng.lng
}

function Onmousemove(e) {

	document.getElementById('log').innerHTML = 'Latitude: '+e.latlng.lat+'<br> Longitude: '+e.latlng.lng;
}

function getRandomColor() {

  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




function detectMyLocation(){

	var greenIcon = L.icon({
	    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Breathe-face-smile.svg/220px-Breathe-face-smile.svg.png',
	    shadowUrl: 'leaf-shadow.png',

	    iconSize:     [38, 95], // size of the icon
	    shadowSize:   [50, 64], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [4, 62],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	
	navigator.geolocation.getCurrentPosition(function(location) {

	  console.log(location.coords.latitude);
	  console.log(location.coords.longitude);
	  console.log(location.coords.accuracy);


	  L.marker([location.coords.latitude, location.coords.longitude], {icon: greenIcon}).addTo(mymap);

	});
}


	function formatJSON(rawjson) {	//callback that remap fields name
		var json = {},
			key, loc, disp = [];
		for(var i in rawjson)
		{
			disp = rawjson[i].display_name.split(',');	
			key = disp[0] +', '+ disp[1];
			
			loc = L.latLng( rawjson[i].lat, rawjson[i].lon );
			
			json[ key ]= loc;	//key,value format
		}
		console.log(rawjson[i].lat+","+rawjson[i].lon);
		return json;
	}
