var GoogleMapAPI = function(){
    var self = this;

    self.init = function(){
        self.map;
        self.largeInfowindow;
        self.markers = [];
        self.createMap();
        self.createMarkers();
    }

    self.createMap = function createMap(){
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: model.center,
            zoom: 12
        });
        
        self.largeInfowindow = new google.maps.InfoWindow();
    }

    self.createMarkers = function(){
        var defaultIcon = self.makeMarkerIcon('0091ff');
        var highlightedIcon = self.makeMarkerIcon('ffff24');
        
        for(var i = 0; i < model.locations.length; i++){
            var position = model.locations[i].location;
            var title = model.locations[i].title;
            var id = model.locations[i].wiki;
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                icon: defaultIcon,
                animation: google.maps.Animation.DROP,
                id: id
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
                viewModel.bridge(this.title);
            });
        }
        
        var bounds = new google.maps.LatLngBounds();
        for(var i=0; i < self.markers.length; i++){
            self.markers[i].setMap(self.map);
            bounds.extend(self.markers[i].position);
        }
        self.map.fitBounds(bounds);
    }

    self.toggleBounce = function (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function(){marker.setAnimation(null);}, 3000);
    }

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

    self.showMarkers = function (markers){
        for(var i=0; i < markers.length; i++){
            markers[i].setMap(self.map);   
        }
    }

    self.hideMarkers = function (markers){
        for(var i=0; i < markers.length; i++){
            markers[i].setMap(null);
        }
    }

    self.populateInfoWindow = function (marker){
        var pageid = marker.id;
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