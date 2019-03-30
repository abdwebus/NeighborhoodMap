var model = new Model();
var viewEvent = new ViewEvent();
var googleMap = new GoogleMapAPI();
var viewModel = new ViewModel();

model.init();
viewEvent.init();

/**
* @description Gets called with google map api is ready
* Calls initiate methods for googleMap and viewModel
* Binds the view with the viewModel
*/
function initMap(){
	googleMap.init();
	viewModel.init();
	ko.applyBindings(viewModel);
}