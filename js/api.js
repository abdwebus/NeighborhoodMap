var map;


function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: model.center,
		zoom: 12
	});
	

	createMarkers();
}

function createMarkers(){
	var defaultIcon = makeMarkerIcon('0091ff');
	var highlightedIcon = makeMarkerIcon('ffff24');
	var largeInfowindow = new google.maps.InfoWindow();
	
	for(var i = 0; i < model.locations.length; i++){
		var position = model.locations[i].location;
		var title = model.locations[i].title;
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			icon: defaultIcon,
			animation: google.maps.Animation.DROP,
			id: i
		});
		model.markers.push(marker);

		marker.addListener('mouseover', function(){
            this.setIcon(highlightedIcon);
        });

        marker.addListener('mouseout', function(){
            this.setIcon(defaultIcon);
        });

        marker.addListener('click', function(){
            populateInfoWindow(this,largeInfowindow);
        });
	}
	showListings();
}


function makeMarkerIcon(markerColor){
    var image = {
        url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
        size: new google.maps.Size(21, 34),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(10, 34),
        scaledSize: new google.maps.Size(21,34)
    };
    return image;
}

function showListings(){
    var bounds = new google.maps.LatLngBounds();
    for(var i=0; i < model.markers.length; i++){
        model.markers[i].setMap(map);
        bounds.extend(model.markers[i].position);
    }
    map.fitBounds(bounds);
}

function populateInfoWindow(marker, infoWindow){
    if (infoWindow.marker != marker){
        infoWindow.marker = marker;
        infoWindow.setContent('<div><h5>' + marker.title + '</h5></div>');
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function(){
            infoWindow.marker = null;
        });
    }
}