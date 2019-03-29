function ViewModel() {
	var self = this;

	self.init = function(){
		self.listItems = ko.observableArray([]);
		self.populateList(self.listItems);

		self.filter = ko.observable();
		self.query = ko.observable('');	
		self.searchResult = ko.computed(function(){
			var q = self.query().toLowerCase();
			var itemsList = self.listItems().filter(function(i){
				return i.title.toLowerCase().indexOf(q) >= 0;
			});

			var markersList = googleMap.markers.filter(function(i){
				return i.title.toLowerCase().indexOf(q) >= 0;
			});

			googleMap.hideMarkers(googleMap.markers);
			googleMap.showMarkers(markersList);
			return itemsList;
		});
	}

	self.populateList = function(list){
		var count = 0;
		model.locations.forEach(function(element){
			i = {
				id: element.wiki,
				title: element.title,
				location: element.location,
				wiki: element.wiki,
				active: ko.observable(false),
				hidden: ko.observable(true),
			}

			list.push(i);
			count++;
		});
	}

	self.activate = function(item){
		googleMap.markers.forEach(function(arrayItem){
			if(item.title == arrayItem.title){
				googleMap.populateInfoWindow(arrayItem);
				googleMap.toggleBounce(arrayItem);
			}
		});
		self.listItems().forEach(function(arrayItem){
			if (item == arrayItem) {
				arrayItem.active(true);
			} else {
				arrayItem.active(false);
			}
		});
	};

	self.bridge = function(itemTitle){
		self.listItems().forEach(function(arrayItem){
			if (itemTitle == arrayItem.title) {
				self.activate(arrayItem)
			}
		});
	}

	self.getWikiInfo = function (pageId, callback){
	    $.ajax({
	        type: 'GET',
	        url: 'https://en.wikipedia.org/w/api.php',
	        data: {action: 'query', format: 'json', prop: 'extracts', redirects: '1',exintro: '', explaintext:'',  pageids: pageId},
	        dataType: 'jsonp',
	        success: function(data){
	            var para;
	            for(var page in data.query.pages){
	                para = data.query.pages[page].extract;  
	            }
	            callback(para);
	        },
	        error: function(){
	            var result = "Couldn't reach Wikipedia page!"
	            callback(result);
	        }
	    });
	}
}