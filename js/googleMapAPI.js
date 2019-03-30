/**
* @description Handle the functionality of creating google map, markers and info windows
*/
var GoogleMapAPI = function(){
	var self = this;

	self.init = function(){
		self.map;
		self.largeInfowindow;
		self.markers = [];
		self.createMap();
		self.createMarkers();
	}

	/**
	* @description Creates google map and infowindow objects
	*/
	self.createMap = function createMap(){
		self.map = new google.maps.Map(document.getElementById('map'), {
			center: model.center,
			zoom: 12
		});

		self.largeInfowindow = new google.maps.InfoWindow();
	}

	/**
	* @description Creates google markers
	*/
	self.createMarkers = function(){
		var defaultIcon = self.makeMarkerIcon('0091ff');
		var highlightedIcon = self.makeMarkerIcon('ffff24');

		// Create markers from the model locations elements
		for(var i = 0; i < model.locations.length; i++){
			var position = model.locations[i].location;
			var title = model.locations[i].title;
			var id = model.locations[i].wiki;
			var marker = new google.maps.Marker({
				position: position,
				title: title,
				icon: defaultIcon,
				animation: google.maps.Animation.DROP,
				id: id //Assign wiki page id to the marker id
			});
			self.markers.push(marker);

			marker.addListener('mouseover', function(){
				this.setIcon(highlightedIcon);
			});

			marker.addListener('mouseout', function(){
				this.setIcon(defaultIcon);
			});

			marker.addListener('click', function(){
				self.toggleBounce(this);
				self.populateInfoWindow(this);

				// Activate the corresponding sidebar list item
				viewModel.bridge(this.title);
			});
		}

		// Change the map bounds to fit all the markers
		var bounds = new google.maps.LatLngBounds();
		for(var i=0; i < self.markers.length; i++){
			self.markers[i].setMap(self.map);
			bounds.extend(self.markers[i].position);
		}
		self.map.fitBounds(bounds);
	}

	/**
	* @description Makes the passed marker bounce for 3secs
	* @param {marker} marker
	*/
	self.toggleBounce = function (marker) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		window.setTimeout(function(){marker.setAnimation(null);}, 3000);
	}

	/**
	* @description Creates marker icon with the passed color
	* @param {string} markerColor
	*/
	self.makeMarkerIcon = function (markerColor){
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

	/**
	* @description Shows all the passed markers
	* @param {[marker]} markers
	*/
	self.showMarkers = function (markers){
		for(var i=0; i < markers.length; i++){
			markers[i].setMap(self.map);
		}
	}

	/**
	* @description Hides all the passed markers
	* @param {[marker]} markers
	*/
	self.hideMarkers = function (markers){
		for(var i=0; i < markers.length; i++){
			markers[i].setMap(null);
		}
	}

	/**
	* @description Populates the infowindow with marker related information
	* @param {marker} marker
	*/
	self.populateInfoWindow = function (marker){
		var pageid = marker.id;

		// Get wikipedia information
		viewModel.getWikiInfo(pageid, function(result){
			if (self.largeInfowindow.marker != marker){
				self.largeInfowindow.marker = marker;
				htmlContent = '<div><h5>' + marker.title + '</h5></div><p>' + result + '</p>';
				htmlContent += '<a href="https://en.wikipedia.org/?curid=' + pageid + '">View wikipedia page</a>';
				self.largeInfowindow.setContent(htmlContent);
				self.largeInfowindow.open(self.map, marker);
				self.largeInfowindow.addListener('closeclick', function(){
					self.largeInfowindow.marker = null;
				});
			}
		});
	}
}