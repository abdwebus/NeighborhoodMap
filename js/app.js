var model = new Model();
var viewEvent = new ViewEvent();
var googleMap = new GoogleMapAPI();
var viewModel = new ViewModel();

model.init();
viewEvent.init();

function initMap(){
	googleMap.init();
	viewModel.init();
	ko.applyBindings(viewModel);
}