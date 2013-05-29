var App = App || { };

$(function () {

	// Define external template
	infuser.defaults.templateSuffix = ".tmpl.html";
    infuser.defaults.templateUrl = "js/templates";

    // The ViewModel
    App.viewmodel = (function (){
    	
    })();

    // Bind the ViewModel to the View using Knockout
    ko.applyBindings(App.viewmodel);

});