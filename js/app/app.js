var App = App || { };

var stubMapData = [   
      {name: 'Lake #1', lat: 38.825801, lon: -104.304199, tooltip: 'I am lake #1!'},
      {name: 'Lake #2', lat: 38.720207, lon: -104.103699, tooltip: 'I am lake #2!'},
      {name: 'Lake #3', lat: 38.690199, lon: -104.219055, tooltip: 'I am lake #3!'}
  ];

$(function () {

  ko.bindingHandlers.leafletMap = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var options = ko.utils.unwrapObservable(valueAccessor()),                                       
          lat = ko.utils.unwrapObservable(options.lat),
          lon = ko.utils.unwrapObservable(options.lon),
          pins = ko.utils.unwrapObservable(options.pins) || [];
      
      //init the map    
      map =  L.map('map').setView([lat, lon], 10);

      //add push pins
      ko.utils.arrayForEach(pins, function(pin) {        
        var clean = ko.toJS(pin);
                    
        //add marker
        L.marker([clean.lat, clean.lon]).addTo(map).bindPopup(clean.tooltip).openPopup(); 
        var popup = L.popup();           
      });
    
    	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    		maxZoom: 18,
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    	}).addTo(map);
    
    	function onMapClick(e) {
    		popup
    			.setLatLng(e.latlng)
    			.setContent("You clicked the map at " + e.latlng.toString())
    			.openOn(map);
    	}
    
    	map.on('click', onMapClick);    	
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
        console.log('updating');
    }
  };
  
  function PushPin(title, description, lat, lon) {
    this.title = ko.observable(title);
    this.description = ko.observable(description);
    this.lat = ko.observable(lat);
    this.lon = ko.observable(lon);  
  }
  
  var MapModel = function(lat, lon, pins) {
    this.lat = ko.observable(lat);
    this.lon = ko.observable(lon);
    this.pins = ko.observableArray(pins);
  };

  ko.applyBindings(new MapModel(38.831551, -104.900208, stubMapData));

});