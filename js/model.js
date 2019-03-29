var Model = function() {
	var self = this;

	self.init = function(){
		self.center = {lat: 53.543141, lng: -113.492030};
		self.locations = [
			{title: 'World Waterpark', wiki: '1123377', location: {lat: 53.522632, lng: -113.6279083}},
			{title: 'Snow Valley Ski Club', wiki: '10411085', location: {lat: 53.4836592, lng: -113.5587015}},
			{title: 'Edmonton Valley Zoo', wiki: '4977740', location: {lat: 53.5109055, lng: -113.5557524}},
			{title: 'Fort Edmonton Park', wiki: '1775939', location: {lat: 53.5033814, lng: -113.5757267}},
			{title: 'Muttart Conservatory', wiki: '2540063', location: {lat: 53.5352159, lng: -113.4794735}},
			{title: 'Alberta Legislature Building', wiki: '4159154', location: {lat: 53.5334764, lng: -113.5088265}}
		];
	}
}