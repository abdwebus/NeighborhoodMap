
document.getElementById('sidebarButton').addEventListener('click', toggleSidebar);
var mapElement = document.getElementById('map');
var asideDiv = document.getElementById('sidebar');

handleMapEventListener();


/**
 * Toggle hiddenSidebar class on the sidebar element.
 *
 * This functions only on small devices:
 * Show sidebar when the sidebar is hidden.
 * Hide sidebar when the sidebar is visible.
 * Call handleMapEventListener function to Add/Remove map event listeners.
 */
function toggleSidebar(){
	asideDiv.classList.toggle('hiddenSidebar');
	handleMapEventListener();
}

/**
 * Add/Remove map event listener according to sidebar position status.
 *
 * Add click event listener to the map element when sidebar is visible 
 * on small screen devices. 
 * Remove click event listener from the map element if the side bar is hidden
 * on small devices. 
 */
function handleMapEventListener(){
	if (asideDiv.classList.contains('hiddenSidebar')){
		mapElement.removeEventListener('click', toggleSidebar);
	} else {
		mapElement.addEventListener('click', toggleSidebar);
	}
}