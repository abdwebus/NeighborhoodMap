function populateList(list){
	var count = 0;
	model.locations.forEach(function(element){
		i = {
			id: count,
			title: element.title,
			location: element.location,
			active: ko.observable(false),
			hidden: ko.observable(true),
		}
		list.push(i);
		count++;
	});
}

function viewModel() {
	var self = this;
	self.listItems = ko.observableArray([]);
	self.filter = ko.observable();
	self.query = ko.observable('');
	self.searchResult = ko.computed(function(){
		var q = self.query();
		return self.listItems().filter(function(i){
			return i.title.toLowerCase().indexOf(q) >= 0;
		});
	});

	populateList(self.listItems);
		

	// Methods
	self.activate = function(item){
		self.listItems().forEach(function(arrayItem){
			if (item == arrayItem) {
				arrayItem.active(true);
			} else {
				arrayItem.active(false);
			}
		});
	};
}

ko.applyBindings(viewModel);


// self.fullName = ko.pureComputed(function(){
// 		if(self.filter() == ''){
// 			return self.firstName() + " " + self.lastName();	
// 		} else {
// 			return self.filter();
// 		}
		
// 	});