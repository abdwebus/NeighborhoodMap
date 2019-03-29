var ViewEvent = function(){
	var self = this;
	
	self.init = function(){
		document.getElementById('sidebarButton').addEventListener('click', self.toggleSidebar);
		self.mapElement = document.getElementById('map');
		self.asideDiv = document.getElementById('sidebar');
		self.handleMapEventListener();	
	};

	/**
	* Toggle hiddenSidebar class on the sidebar element.
	*
	* This functions only on small devices:
	* Show sidebar when the sidebar is hidden.
	* Hide sidebar when the sidebar is visible.
	* Call handleMapEventListener function to Add/Remove map event listeners.
	*/
	self.toggleSidebar = function(){
		self.asideDiv.classList.toggle('hiddenSidebar');
		self.handleMapEventListener();
	};

	/**
	* Add/Remove map event listener according to sidebar position status.
	*
	* Add click event listener to the map element when sidebar is visible 
	* on small screen devices. 
	* Remove click event listener from the map element if the side bar is hidden
	* on small devices. 
	*/
	self.handleMapEventListener = function(){
		if (self.asideDiv.classList.contains('hiddenSidebar')){
			self.mapElement.removeEventListener('click', self.toggleSidebar);
		} else {
			self.mapElement.addEventListener('click', self.toggleSidebar);
		}
	}
}