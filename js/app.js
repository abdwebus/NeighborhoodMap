
document.getElementById('sidebarButton').addEventListener('click', function(){
	toggleSidebar();
});


function toggleSidebar(){
	// var mapDiv = document.getElementById('map');
	var asideDiv = document.getElementById('sidebar');
	asideDiv.classList.toggle('hiddenSidebar');
}

var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}


