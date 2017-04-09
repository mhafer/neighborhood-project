var map;
var markersArray = [];
var showMarkers = true;

openNav();

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

    //console.log();
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
			url:"www.leespintandshell.com",
			location: {lat:39.282347, lng:-76.575689},
			lat:39.282347,
			lng:-76.575689
		},
		{
			name:"Sip & Bite",
			street:"2200 Boston St",
			city:"Baltimore, MD",
			type: ["Breakfast","American", "Greek", "Diner", "Mediterranean"],
			comments:"Great Food",
			url:"www.sipandbite.com",
			location:{lat:39.283959, lng:-76.585578},
			lat:39.283959,
			lng:-76.585578
		},
		{
			name:"Fork & Wrench",
			street:"2322 Boston St",
			city:"Baltimore, MD",
			type: ["New American", "Fine Dining", "Cocktails"],
			comments:"Great Food",
			url:"www.theforkandwrench.com",
			location:{lat: 39.282901, lng: -76.583881},
			lat: 39.282901,
			lng: -76.583881
		},
		{
			name:"Dangerously Delicious",
			street:"2839 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Bakery","Dessert"],
			comments:"Great Food",
			url:"dangerouspiesbalt.com",
			location: {lat: 39.279923, lng: -76.575537},
			lat: 39.279923,
			lng: -76.575537
		},
		{
			name:"DiPasquales",
			street:"3700 Gough St",
			city:"Baltimore, MD",
			type: ["Italian", "Deli"],
			comments:"Great Food",
			url:"www.dipasquales.com",
			location: {lat: 39.288904, lng: -76.566489},
			lat: 39.288904,
			lng: -76.566489
		},
		{
			name:"The Boathouse Canton",
			street:"2809 Boston St",
			city:"Baltimore, MD",
			type: ["New American","Seafood","Contemporary"],
			comments:"Great Food",
			url:"www.boathousecanton.com",
			location: {lat: 39.276836, lng: -76.576378},
			lat: 39.276836,
			lng: -76.576378
		},
			{
			name:"Cask & Grain",
			street:"2823 O'Donnell St",
			city:"Baltimore, MD",
			type: ["New American","Cocktails","Fine Dining"],
			comments:"Great Food",
			url:"caskandgrainkitchen.com",
			location: {lat: 39.279865, lng: -76.575957},
			lat: 39.279865,
			lng: -76.575957
		},
		{
			name:"Woodberry Kitchen",
			street:"2010 Clipper Park Rd",
			city:"Baltimore, MD",
			type: ["American","Fine Dining"],
			comments:"Great Food",
			url:"www.woodberrykitchen.com",
			location: {lat: 39.332001, lng: -76.64568},
			lat: 39.332001,
			lng: -76.64568
		},
		{
			name:"Ra Sushi",
			street:"1390 Lancaster St",
			city:"Baltimore, MD",
			type: ["Sushi", "Asian"],
			comments:"Great Food",
			url:"www.rasushi.com",
			location: {lat: 39.282465, lng: -76.597435},
			lat: 39.282465,
			lng: -76.597435
		},
		{
			name:"Ekiben",
			street:"1622 Eastern Ave",
			city:"Baltimore, MD",
			type: ["Asian"],
			comments:"Great Food",
			url:"ekibenbaltimore.com",
			location: {lat: 39.285737, lng: -76.594554},
			lat: 39.285737,
			lng: -76.594554
		},
		{
			name:"Southern Provisions",
			street:"3000 O'Donnell S",
			city:"Baltimore, MD",
			type: ["Southern", "Bar","Pub"],
			comments:"Great Food",
			url:"southern-provisions.com",
			location: {lat: 39.28056, lng: -76.573867},
			lat: 39.28056,
			lng: -76.573867
		},
		{
			name:"Verde",
			street:"641 S Montford Ave",
			city:"Baltimore, MD",
			type: ["Italian","Pizza"],
			comments:"Great Food",
			url:"www.verdepizza.com",
			location: {lat: 39.284113, lng: -76.582571},
			lat: 39.284113,
			lng: -76.582571
		},
		{
			name:"HomeSlyce Canton",
			street:"900 S Kenwood Ave",
			city:"Baltimore, MD",
			type: ["Pizza","Bar","Pub"],
			comments:"Great Food",
			url:"www.homeslyce.com",
			location: {lat: 39.2820, lng: -76.577158},
			lat: 39.2820,
			lng: -76.577158
		},
		{
			name:"Smaltimore",
			street:"2522 Fait Ave",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Great Food",
			url:"smaltimorebaltimore.com",
			location: {lat: 39.283255, lng: -76.58041},
			lat: 39.283255,
			lng: -76.58041
		},
		{
			name:"Hudson Street Stack house",
			street:"2626 Hudson St",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Great Food",
			url:"www.hudsonstreetstackhouse.com",
			location: {lat: 39.282294, lng: -76.578838},
			lat: 39.282294,
			lng: -76.578838
		},
		{
			name:"Kooper's Tavern",
			street:"1702 Thames St",
			city:"Baltimore, MD",
			type: ["Pub","Bar"],
			comments:"Great Food",
			url:"www.kooperstavern.com",
			location: {lat: 39.282027, lng: -76.592431},
			lat: 39.282027,
			lng: -76.592431
		},
		{
			name:"The Abbey Burger Bistro",
			street:"811 S Broadway",
			city:"Baltimore, MD",
			type: ["Pub","Bar","Burgers"],
			comments:"Great Food",
			url:"www.abbeyburgerbistro.com",
			location: {lat: 39.282204, lng: -76.592697},
			lat: 39.282204,
			lng: -76.592697
		},
		{
			name:"Shiso Tavern",
			street:"2933 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Sushi","Asian","Noodles"],
			comments:"Great Food",
			url:"http://www.shisotavern.com",
			location: {lat: 39.279923, lng: -76.574212},
			lat: 39.279923,
			lng: -76.574212
		},
		{
			name:"Jasa Kabob",
			street:"2917 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Asian","Indian"],
			comments:"Great Food",
			url:"www.jasakabob.com",
			location: {lat: 39.279906, lng: -76.574872},
			lat: 39.279906,
			lng: -76.574872
		},
		{
			name:"Saigon Today",
			street:"700 S Potomac St",
			city:"Baltimore, MD",
			type: ["Asian","Noodles"],
			comments:"Great Food",
			url:"saigontodaybmore.com",
			location: {lat: 39.284189, lng: -76.574399},
			lat: 39.284189,
			lng: -76.574399
		},
		{
			name:"Blue Moon Cafe",
			street:"1621 Aliceanna St",
			city:"Baltimore, MD",
			type: ["Breakfast","American"],
			comments:"Great Food",
			url:"www.bluemoonbaltimore.com",
			location: {lat: 39.283394, lng: -76.594241},
			lat: 39.283394,
			lng: -76.594241
		},
		{
			name:"Iron Rooster",
			street:"3721 Boston St",
			city:"Baltimore, MD",
			type: ["Southern","Breakfast","American"],
			comments:"Great Food",
			url:"www.ironroosterallday.com",
			location: {lat: 39.276453, lng: -76.565328},
			lat: 39.276453,
			lng: -76.565328
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
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
};

var ViewModel = function(){

 	var self = this;

 	this.restaurantList = ko.observableArray([]);

 	model.restaurants.forEach(function(place){
 		self.restaurantList.push(new Restaurant(place));
 	});

    this.currentRestaurant = ko.observable(this.restaurantList[0]);

	 this.setRestaurant = function(place){
			self.currentRestaurant(place);
			console.log(self.currentRestaurant().name());
			//call closeNav()
			//animate the marker
			//display the place's information
	 };

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

    for(i=0; i < model.restaurants.length; i++) {

    	var position = model.restaurants[i].location;
    	var title = model.restaurants[i].name;
    	var marker = new google.maps.Marker({
    		position: position,
    		title: title,
    		animation: google.maps.Animation.DROP,
    		id: i
    	});
			bounds.extend(marker.position);
			markersArray.push(marker);

			marker.addListener('click', function(){
				populateInfoWindow(this, largeInfoWindow);
			});
    }

    function populateInfoWindow(marker, infowindow){
    	if(infowindow.marker != marker){
    		infowindow.marker = marker;
    		infowindow.setContent('<div class="marker">' + marker.title + '</div>');
    		infowindow.open(map, marker);
    		//make sure the marker property is cleared if the inforwindow is closed
    		infowindow.addListener('closeclick', function(){
    			infowindow.setMarker(null);
    		});
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

ko.applyBindings(new ViewModel());