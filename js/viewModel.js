function ViewModel() {
	var self = this;

	/**
	* @description Initiate ViewModel ko observables
	*/
	self.init = function(){
		self.listItems = ko.observableArray([]);
		self.populateList(self.listItems);

		self.filter = ko.observable();
		self.query = ko.observable(''); //filter search query

		//Compute the list elements depending on the search query
		self.searchResult = ko.computed(function(){
			var q = self.query().toLowerCase();

			// Generate an array of query matching sidebar list elements
			var itemsList = self.listItems().filter(function(i){
				return i.title.toLowerCase().indexOf(q) >= 0;
			});

			// Generate an array of query matching markers
			var markersList = googleMap.markers.filter(function(i){
				return i.title.toLowerCase().indexOf(q) >= 0;
			});

			// Show only the matching markers
			// Achieved by hiding all visible markers then showing the matching markers
			googleMap.hideMarkers(googleMap.markers);
			googleMap.showMarkers(markersList);

			// Return the matching sidebar list items
			return itemsList;
		});
	}

	/**
	* @description Handler method to populate observableArray from the model
	* @param {ko.observableArray} list
	*/
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

	/**
	* @description Activate/Deactivate list items
	* @param {ko.observableArray element} item
	*/
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

	/**
	* @description Pullout the cooresponding sidebar list item and activated
	* @param {string} itemTitle The title that is used to find the cooresponding item
	*/
	self.bridge = function(itemTitle){
		self.listItems().forEach(function(arrayItem){
			if (itemTitle == arrayItem.title) {
				self.activate(arrayItem)
			}
		});
	}

	/**
	* @description Calls wikipedia api to retrieve page information
	* @param {string} pageId wikipedia page id
	* @param {function} callback 
	*/
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