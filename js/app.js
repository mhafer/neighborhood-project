var map;
var markersArray = [];

openNav();

/* Set the width of the side navigation to 250px */
function openNav() {
    var nav = document.getElementById("mySidenav");
    
    if($(window).width() > 1200) {
        nav.style.width = "20%";
    }else if($(window).width() > 922) {
        nav.style.width = "20%";
    }else if($(window).width() > 768) {
        nav.style.width = "30%";
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
			lat: 39.282027,
			lng: -76.577158
		},
		{
			name:"Smaltimore",
			street:"2522 Fait Ave",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Great Food",
			url:"smaltimorebaltimore.com",
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
	 };

};


function initMap(){

	// styles reference: https://snazzymaps.com/style/38/shades-of-grey

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
	// var lees = {lat: 39.28242, lng:-76.575708};
			// var marker = new google.maps.Marker({
			// 	position: lees,
			// 	map: map,
			// 	title: "Lee's Pint & Shell"
			// });
			// var infowindow = new google.maps.InfoWindow({
			// 	content: "Lee's pint and shell"
			// });

			// marker.addListener('click', function(){
			// 	infowindow.open(map, marker)
			// });
		}

ko.applyBindings(new ViewModel());