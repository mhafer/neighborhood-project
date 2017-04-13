var map;
var markersArray = [];
var showMarkers = true;

/* Set the width of the side navigation to 250px */
function openNav() {
    var nav = document.getElementById("mySidenav");
    
    if($(window).width() > 1200) {
        nav.style.width = "30%";
    }else if($(window).width() > 922) {
        nav.style.width = "36%";
    }else if($(window).width() > 768) {
        nav.style.width = "42%";
    }else if($(window).width() > 420) {
        nav.style.width = "66%";
    }else{
        nav.style.width = "90%";
    }
    var height = $('.map-parent').height();
    nav.style.height = (height - 20) + "px";
}


/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



var model = {
	currentRestaurant: null,
	restaurants: [
		{
			name:"Lee's Pint & Shell",
			street:"2844 Hudson St",
			city:"Baltimore, MD",
			type: ["Pub", "Bar", "Seafood"],
			comments:"Great Food",
			url:"http://www.leespintandshell.com",
			location: {lat:39.282347, lng:-76.575689},
			index: 0
		},
		{
			name:"Sip & Bite",
			street:"2200 Boston St",
			city:"Baltimore, MD",
			type: ["Breakfast","American", "Greek", "Diner", "Mediterranean"],
			comments:"Great Food",
			url:"www.sipandbite.com",
			location:{lat:39.283959, lng:-76.585578},
			index: 1
		},
		{
			name:"Fork & Wrench",
			street:"2322 Boston St",
			city:"Baltimore, MD",
			type: ["New American", "Fine Dining", "Cocktails"],
			comments:"Great Food",
			url:"www.theforkandwrench.com",
			location:{lat: 39.282901, lng: -76.583881},
			index: 2
		},
		{
			name:"Dangerously Delicious",
			street:"2839 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Bakery","Dessert"],
			comments:"Great Food",
			url:"dangerouspiesbalt.com",
			location: {lat: 39.279923, lng: -76.575537},
			index: 3
		},
		{
			name:"DiPasquales",
			street:"3700 Gough St",
			city:"Baltimore, MD",
			type: ["Italian", "Deli"],
			comments:"Great Food",
			url:"www.dipasquales.com",
			location: {lat: 39.288904, lng: -76.566489},
			index: 4
		},
		{
			name:"The Boathouse Canton",
			street:"2809 Boston St",
			city:"Baltimore, MD",
			type: ["New American","Seafood","Contemporary"],
			comments:"Great Food",
			url:"www.boathousecanton.com",
			location: {lat: 39.276836, lng: -76.576378},
			index: 5
		},
			{
			name:"Cask & Grain",
			street:"2823 O'Donnell St",
			city:"Baltimore, MD",
			type: ["New American","Cocktails","Fine Dining"],
			comments:"Great Food",
			url:"caskandgrainkitchen.com",
			location: {lat: 39.279865, lng: -76.575957},
			index: 6
		},
		{
			name:"Ra Sushi",
			street:"1390 Lancaster St",
			city:"Baltimore, MD",
			type: ["Sushi", "Asian"],
			comments:"Great Food",
			url:"www.rasushi.com",
			location: {lat: 39.282465, lng: -76.597435},
			index: 7
		},
		{
			name:"Ekiben",
			street:"1622 Eastern Ave",
			city:"Baltimore, MD",
			type: ["Asian"],
			comments:"Great Food",
			url:"ekibenbaltimore.com",
			location: {lat: 39.285737, lng: -76.594554},
			index: 8
		},
		{
			name:"Southern Provisions",
			street:"3000 O'Donnell S",
			city:"Baltimore, MD",
			type: ["Southern", "Bar","Pub"],
			comments:"Great Food",
			url:"southern-provisions.com",
			location: {lat: 39.28056, lng: -76.573867},
			index: 9
		},
		{
			name:"Verde",
			street:"641 S Montford Ave",
			city:"Baltimore, MD",
			type: ["Italian","Pizza"],
			comments:"Great Food",
			url:"www.verdepizza.com",
			location: {lat: 39.284113, lng: -76.582571},
			index: 10
		},
		{
			name:"HomeSlyce Canton",
			street:"900 S Kenwood Ave",
			city:"Baltimore, MD",
			type: ["Pizza","Bar","Pub"],
			comments:"Great Food",
			url:"www.homeslyce.com",
			location: {lat: 39.2820, lng: -76.577158},
			index: 11
		},
		{
			name:"Smaltimore",
			street:"2522 Fait Ave",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Great Food",
			url:"smaltimorebaltimore.com",
			location: {lat: 39.283255, lng: -76.58041},
			index: 12
		},
		{
			name:"Hudson Street Stack house",
			street:"2626 Hudson St",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Great Food",
			url:"www.hudsonstreetstackhouse.com",
			location: {lat: 39.282294, lng: -76.578838},
			index: 13
		},
		{
			name:"Kooper's Tavern",
			street:"1702 Thames St",
			city:"Baltimore, MD",
			type: ["Pub","Bar"],
			comments:"Great Food",
			url:"www.kooperstavern.com",
			location: {lat: 39.282027, lng: -76.592431},
			index: 14
		},
		{
			name:"The Abbey Burger Bistro",
			street:"811 S Broadway",
			city:"Baltimore, MD",
			type: ["Pub","Bar","Burgers"],
			comments:"Great Food",
			url:"www.abbeyburgerbistro.com",
			location: {lat: 39.282204, lng: -76.592697},
			index: 15
		},
		{
			name:"Shiso Tavern",
			street:"2933 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Sushi","Asian","Noodles"],
			comments:"Great Food",
			url:"http://www.shisotavern.com",
			location: {lat: 39.279923, lng: -76.574212},
			index: 16
		},
		{
			name:"Jasa Kabob",
			street:"2917 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Asian","Indian"],
			comments:"Great Food",
			url:"www.jasakabob.com",
			location: {lat: 39.279906, lng: -76.574872},
			index: 17
		},
		{
			name:"Saigon Today",
			street:"700 S Potomac St",
			city:"Baltimore, MD",
			type: ["Asian","Noodles"],
			comments:"Great Food",
			url:"saigontodaybmore.com",
			location: {lat: 39.284189, lng: -76.574399},
			index: 18
		},
		{
			name:"Blue Moon Cafe",
			street:"1621 Aliceanna St",
			city:"Baltimore, MD",
			type: ["Breakfast","American"],
			comments:"Great Food",
			url:"www.bluemoonbaltimore.com",
			location: {lat: 39.283394, lng: -76.594241},
			index: 19
		},
		{
			name:"Iron Rooster",
			street:"3721 Boston St",
			city:"Baltimore, MD",
			type: ["Southern","Breakfast","American"],
			comments:"Great Food",
			url:"www.ironroosterallday.com",
			location: {lat: 39.276453, lng: -76.565328},
			index: 20
		}
	]
};


var Restaurant = function(data){

	this.name = ko.observable(data.name);
	this.street = ko.observable(data.street);
	this.city = ko.observable(data.city);
	this.type = ko.observableArray(data.type);
	this.comments = ko.observable(data.comments);
	this.url = ko.observable(data.url);
	this.location = ko.observable(data.location);
	this.index = data.index;

};


var ViewModel = function(){

 	var self = this;
 	this.restaurantList = ko.observableArray([]);
 	this.filter = ko.observable('');
 	
 	//create the restaurantList object
     model.restaurants.forEach(function(place){
 		    self.restaurantList.push(new Restaurant(place));
 	 });

 	 this.filteredList = ko.computed(function() {
 	 		var filter = this.filter().toLowerCase();
 	 		// console.log(filter);
  	 				if(!filter){
  	 					return self.restaurantList();
  	 				}else{	 				
  	 					return ko.utils.arrayFilter(self.restaurantList(), function(item){
  	 						return stringStartsWith(item.name().toLowerCase(), filter);
  	 					});
  	 				}
 	 		}, self);


    this.currentRestaurant = ko.observable(this.restaurantList[0]);

	this.setRestaurant = function(place){
			self.currentRestaurant(place);
			document.getElementById("title").innerHTML = self.currentRestaurant().name();
			var el = document.getElementById("website");
			el.setAttribute("href", self.currentRestaurant().url());
			document.getElementById("address").innerHTML = self.currentRestaurant().street() + "<br>" + self.currentRestaurant().city();
			document.getElementById("comments").innerHTML = self.currentRestaurant().comments();
			toggleBounce(markersArray[place.index]);
			
	 };

};

//knockout.js removed their stringStartsWith method, this solution to make your own I found on stackoverflow
//http://stackoverflow.com/questions/28042344/filter-using-knockoutjs
//it was simple and worked well so I decided to keep it
var stringStartsWith = function (string, startsWith) {          
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

function initMap(){

	// styles reference: https://snazzymaps.com/style/38/shades-of-grey
	// modified the colors slightly to go with my design
	var styles = [
		{
		    "featureType": "all",
		    "elementType": "labels.text.fill",
		    "stylers": [
		        {
		            "saturation": 36
		        },
		        {
		            "lightness": 40
		        }
		    ]
		},
		{
		    "featureType": "all",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		        {
		            "visibility": "on"
		        },
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 16
		        }
		    ]
		},
		{
		    "featureType": "all",
		    "elementType": "labels.icon",
		    "stylers": [
		        {
		            "visibility": "off"
		        }
		    ]
		},
		{
		    "featureType": "administrative",
		    "elementType": "geometry.fill",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 20
		        }
		    ]
		},
		{
		    "featureType": "administrative",
		    "elementType": "geometry.stroke",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 17
		        },
		        {
		            "weight": 1.2
		        }
		    ]
		},
		{
		    "featureType": "landscape",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 20
		        }
		    ]
		},
		{
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 21
		        }
		    ]
		},
		{
		    "featureType": "road.highway",
		    "elementType": "geometry.fill",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 17
		        }
		    ]
		},
		{
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 29
		        },
		        {
		            "weight": 0.2
		        }
		    ]
		},
		{
		    "featureType": "road.arterial",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 18
		        }
		    ]
		},
		{
		    "featureType": "road.local",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 16
		        }
		    ]
		},
		{
		    "featureType": "transit",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 19
		        }
		    ]
		},
		{
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		        {
		            "color": "#000000"
		        },
		        {
		            "lightness": 17
		        }
		    ]
		}
	];

	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.2904, lng: -76.6122},
		zoom: 13,
		styles: styles,
		mapTypeControl: false
	});

	var largeInfoWindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();

    for(var i=0; i < model.restaurants.length; i++) {

    	var content = model.restaurants[i].url;

    	var position = model.restaurants[i].location;
    	var title = model.restaurants[i].name;
    	var street = model.restaurants[i].street;
    	var city = model.restaurants[i].city;
    	var marker = new google.maps.Marker({
    		position: position,
    		title: title,
    		icon: {url: 'img/pin-sm.png'},
    		animation: google.maps.Animation.DROP,
    		id: i
    	});	

		bounds.extend(marker.position);
		markersArray.push(marker);
		marker.addListener('click', function(){
			toggleBounce(this);
			zoomToArea(this);
			populateInfoWindow(this, largeInfoWindow);		
		});
    }

    function zoomToArea(marker) {
    	var geocoder = new google.maps.Geocoder();
    	var address = marker.street;

    	if(address == ''){
    		window.alert('Can\'t zoom to address');
    	} else {
    		geocoder.geocode({
    			address: address,
    			componentRestrictions: {locality: 'Baltimore'}
    		}, function(results, status){
    			if(status == google.maps.GeocoderStatus.OK){
    				map.setCenter(results[0].geometry.location);
    				map.setZoom(15)
    			} else {
    				window.alert('Could not find that location');
    			}
    		});
    	}
    }


    function populateInfoWindow(marker, infowindow){
    	if(infowindow.marker != marker){
    		infowindow.setContent('');
    		infowindow.marker = marker;

    		//populate the orange block
    		document.getElementById("title").innerHTML = model.restaurants[marker.id].name;
			document.getElementById("address").innerHTML = model.restaurants[marker.id].street + "<br>" + model.restaurants[marker.id].city;
			document.getElementById("comments").innerHTML = model.restaurants[marker.id].comments;

    		//make sure the marker property is cleared if the inforwindow is closed
    		infowindow.addListener('closeclick', function(){
    			infowindow.marker = null;
    		});

    		//get google street view
    		var streetViewService = new google.maps.StreetViewService();
    		var radius = 30;

    		streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    		

    		function getStreetView(data, status){
    			if(status == google.maps.StreetViewStatus.OK) {
    				var nearStreetViewLocation = data.location.latLng;
    				var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
    				infowindow.setContent('<div class="marker">' + marker.title + '<div id="pano"></div></div>');
    				var panoramaOptions = {
    					position: nearStreetViewLocation,
    					pov:{
    						heading: heading,
    						pitch: 20
    					}
    				};
    				var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
    			} else {
    				infowindow.setContent('<div class="marker">' + marker.title + '<br>No Street View Found</div>');
    			}
    		}

    		infowindow.open(map,marker);
    	}
    	
    }

    toggleMarkers();	

};

function toggleMarkers(){

	if(showMarkers){
		var bounds = new google.maps.LatLngBounds();
		for(var i = 0; i < markersArray.length; i++){
			markersArray[i].setMap(map);
			markersArray[i].setAnimation(google.maps.Animation.DROP);
			bounds.extend(markersArray[i].position);	
		}
		map.fitBounds(bounds);
		document.getElementById("btnIcon").className = "glyphicon glyphicon-remove";
		document.getElementById("toggleBtn").title = "Hide Markers";
		showMarkers = false;
	} else{
		for(var i = 0; i < markersArray.length; i++){
			markersArray[i].setMap(null);
		}
		document.getElementById("btnIcon").className = "glyphicon glyphicon-ok";
		document.getElementById("toggleBtn").title = "Show Markers";
		showMarkers = true;
	}

}

 function toggleBounce(marker) {
      
	if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
    } else {
      	  marker.setAnimation(google.maps.Animation.BOUNCE);
    }  	         
  	setTimeout(function(){ 
  		marker.setAnimation(null);   
  	}, 2100);
}




openNav();      
ko.applyBindings(new ViewModel());
