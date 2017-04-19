// global variables
var map;
var marker;
var markersArray = [];
var showMarkers = true;
var flag;


var CLIENT_ID = '3IVGPORHDKYSW3UJUI4RXOZASB3Y3ESIDZT4HH4TV3GJ5SPO';
var CLIENT_SECRET = '4QCTDJU0DCNE0NF032RKU54WVCG0HHWFUSLBFLE3AKOKLA4U';
var VERSION = '20170401';

// if the map fails to load this will alert the user via allert window message
function googleError(){
	console.log("error loading map");
	alert("Sorry, but we are unable to load the map at the moment, please try again later");
}

// This is a bootstrap implemented sliding carousel
// documentatoin can be found at http://getbootstrap.com/javascript/#carousel
$(document).ready(function() {
	$('#myCarousel').carousel({
	interval: 10000
	}); 
    $('#myCarousel').on('slid.bs.carousel', function() {
	}); 
});

/* The navigation window will open once the page loads
 *	Depending on the width of the window then nav's width will display accordingly
 *	It will also get the heigh of it's parent div and calculate to be a bit smaller to fit
 *	I found this works well considering since in a mobile view the columns become stacked and this prevents the nav from covering parts it shouldn't be
 */
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

/* 
 +  This sets the width to 0, therefore it is not visible on screen 
 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/*
 * Set up my model, which include local restaurants that I have eaten at
 *
 */
var model = {
	currentRestaurant: null,
	restaurants: [
		{
			name:"Lee's Pint & Shell",
			street:"2844 Hudson St",
			city:"Baltimore, MD",
			type: ["Pub", "Bar", "Seafood"],
			comments:"This place is great for a fun night out. It's pretty loud, but the patio is a quiet alternative. They have outside heaters too! My favrorite drink is the Frontier-YUM. I would recommend the duck nachos, or any of their fries!",
			url:"http://www.leespintandshell.com",
			location: {lat:39.282347, lng:-76.575689},
			index: 0
		},
		{
			name:"Sip & Bite",
			street:"2200 Boston St",
			city:"Baltimore, MD",
			type: ["Breakfast","American", "Greek", "Diner", "Mediterranean"],
			comments:"I LOVE the Greek food here. It's hard for me to try anything else on the menu since I always default to the lamb! Although I heard their breakfast burrito is fantastic as well. The service is always great, and it's open 24/7 so hey - why not?",
			url:"http://www.sipandbite.com",
			location:{lat:39.283959, lng:-76.585578},
			index: 1
		},
		{
			name:"Fork & Wrench",
			street:"2322 Boston St",
			city:"Baltimore, MD",
			type: ["New American", "Fine Dining", "Cocktails"],
			comments:"This is my go to place for a great meal. Although, be prepared to pay up, it's not cheap. But well worth it! I recommend the beef cheek or lamb (if they have it on the menu). The menu changes seasonally so go every now and then to change it up, or if you don't like what you see, wait 3 months and it'll be new again.",
			url:"http://www.theforkandwrench.com",
			location:{lat: 39.282901, lng: -76.583881},
			index: 2
		},
		{
			name:"Dangerously Delicious",
			street:"2839 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Bakery","Dessert"],
			comments:"I think the name says it all. They have both sweet and savory pies. If you go on their date night you can get 1 of each plus a drink for a great price. The Baltimore Bomb is a classic, especially if you are new to Bmore.",
			url:"http://www.dangerouspiesbalt.com",
			location: {lat: 39.279923, lng: -76.575537},
			index: 3
		},
		{
			name:"DiPasquales",
			street:"3700 Gough St",
			city:"Baltimore, MD",
			type: ["Italian", "Deli"],
			comments:"This is an old Italian market and deli, you can order it to go, or swing by and pick it up, or grab some Italian groceries from there. I recommend the lamborgini sandwich or the meatball sub. I'm sure the pasta is great as well!",
			url:"http://www.dipasquales.com",
			location: {lat: 39.288904, lng: -76.566489},
			index: 4
		},
		{
			name:"The Boathouse Canton",
			street:"2809 Boston St",
			city:"Baltimore, MD",
			type: ["New American","Seafood","Contemporary"],
			comments:"The view at the Boathouse is beautiful, just over looking the water. It's great for large groups and has a little bit of everything on the menu",
			url:"http://www.boathousecanton.com",
			location: {lat: 39.276836, lng: -76.576378},
			index: 5
		},
			{
			name:"Cask & Grain",
			street:"2823 O'Donnell St",
			city:"Baltimore, MD",
			type: ["New American","Cocktails","Fine Dining"],
			comments:"I have only been once, but I'm sure I'll go back. This little restaurant opened up in January of 2017 and has been a hit in Canton. The atmosphere is a bit more up-scale than the other places around. The food is all good, from the appies to the desserts!",
			url:"http://caskandgrainkitchen.com",
			location: {lat: 39.279865, lng: -76.575957},
			index: 6
		},
		{
			name:"Ra Sushi",
			street:"1390 Lancaster St",
			city:"Baltimore, MD",
			type: ["Sushi", "Asian"],
			comments:"Living in Vancouver I have yet to find any sushi place that can come close and compare to the sushi we have there. However, this one wasn't bad. Probably my favorite place in Bmore to go for sushi (thus far...)",
			url:"http://www.rasushi.com",
			location: {lat: 39.282465, lng: -76.597435},
			index: 7
		},
		{
			name:"Ekiben",
			street:"1622 Eastern Ave",
			city:"Baltimore, MD",
			type: ["Asian"],
			comments:"It's hard to explain the wonderfullness that is Ekiben. It's a great concenpt... asain inspired, yet with an American twist. Can you say steamed buns? Yes please!",
			url:"http://www.ekibenbaltimore.com",
			location: {lat: 39.285737, lng: -76.594554},
			index: 8
		},
		{
			name:"Southern Provisions",
			street:"3000 O'Donnell S",
			city:"Baltimore, MD",
			type: ["Southern", "Bar","Pub"],
			comments:"This is a great, open concept restaurant. In the summer the windows all roll up and it's like eating inside but outdoors. They have an assortment of southern styled food, but I recommend the beef braised briskette! Comes with delicious corn bread on the side.",
			url:"http://www.southern-provisions.com",
			location: {lat: 39.28056, lng: -76.573867},
			index: 9
		},
		{
			name:"Verde",
			street:"641 S Montford Ave",
			city:"Baltimore, MD",
			type: ["Italian","Pizza"],
			comments:"I love the pizza here so much that I decided to host my wedding reception here. Nuff said.",
			url:"http://www.verdepizza.com",
			location: {lat: 39.284113, lng: -76.582571},
			index: 10
		},
		{
			name:"HomeSlyce Canton",
			street:"900 S Kenwood Ave",
			city:"Baltimore, MD",
			type: ["Pizza","Bar","Pub"],
			comments:"The best thing about HomeSlyce (well, there's a lot) but I gotta say it's the fact that they don't hold out on the cheese. I mean like LOADS of cheese, and they have awesome deals every day of the week - hooray!",
			url:"http://www.homeslyce.com",
			location: {lat: 39.2820, lng: -76.577158},
			index: 11
		},
		{
			name:"Smaltimore",
			street:"2522 Fait Ave",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"The burgers are great, and so is the beer, what else do you need? Be careful, if you go when the NYG are playing you probably wont be able to squeeze yourself in there.",
			url:"http://www.smaltimorebaltimore.com",
			location: {lat: 39.283255, lng: -76.58041},
			index: 12
		},
		{
			name:"Hudson Street Stack house",
			street:"2626 Hudson St",
			city:"Baltimore, MD",
			type: ["Bar","Pub"],
			comments:"Another great spot for burgers and drinks. And well, for appies and cocktails. And... anything else you may want?",
			url:"http://www.hudsonstreetstackhouse.com",
			location: {lat: 39.282294, lng: -76.578838},
			index: 13
		},
		{
			name:"Kooper's Tavern",
			street:"1702 Thames St",
			city:"Baltimore, MD",
			type: ["Pub","Bar"],
			comments:"Great food and drinks. You can't beat the location being right in the water in Fell's Point.",
			url:"http://www.kooperstavern.com",
			location: {lat: 39.282027, lng: -76.592431},
			index: 14
		},
		{
			name:"The Abbey Burger Bistro",
			street:"811 S Broadway",
			city:"Baltimore, MD",
			type: ["Pub","Bar","Burgers"],
			comments:"This is a burger place where you can order an incredible burger right off the menu OR build your own! They always have interesting meat selections, or if you prefer, they have great vegetarian burger options too!",
			url:"http://www.abbeyburgerbistro.com",
			location: {lat: 39.282204, lng: -76.592697},
			index: 15
		},
		{
			name:"Shiso Tavern",
			street:"2933 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Sushi","Asian","Noodles"],
			comments:"The sushi's not bad... the prices are good. I prefer the bowls and appies over the actual sushi rolls here.",
			url:"http://www.shisotavern.com",
			location: {lat: 39.279923, lng: -76.574212},
			index: 16
		},
		{
			name:"Jasa Kabob",
			street:"2917 O'Donnell St",
			city:"Baltimore, MD",
			type: ["Asian","Indian"],
			comments:"If you are craving curry, here is the place! This little restaurant looks small from the outside, but has huge flavor! Plus delicious ice cream if you have room for it after your meal.",
			url:"http://www.jasakabob.com",
			location: {lat: 39.279906, lng: -76.574872},
			index: 17
		},
		{
			name:"Saigon Today",
			street:"700 S Potomac St",
			city:"Baltimore, MD",
			type: ["Asian","Noodles"],
			comments:"This place is the bomb, pho realz, if you're craving a hot belly of soup! The service is great, fast, and the food is tasty!",
			url:"http://www.saigontodaybmore.com",
			location: {lat: 39.284189, lng: -76.574399},
			index: 18
		},
		{
			name:"Blue Moon Cafe",
			street:"1621 Aliceanna St",
			city:"Baltimore, MD",
			type: ["Breakfast","American"],
			comments:"This is once of Baltimore's more famous breakfast place. Be prepared to arrive early on the weekends if you want a spot. Their breakfast burritos are amazing, or try their famous captain crunch french toast!",
			url:"http://www.bluemoonbaltimore.com",
			location: {lat: 39.283394, lng: -76.594241},
			index: 19
		},
		{
			name:"Iron Rooster",
			street:"3721 Boston St",
			city:"Baltimore, MD",
			type: ["Southern","Breakfast","American"],
			comments:"Come hungry! Servings a big, and full of southern flavor. I have never had a bad meal here, and I've had many!",
			url:"http://www.ironroosterallday.com",
			location: {lat: 39.276453, lng: -76.565328},
			index: 20
		}
	]
};

/*
 * Set up observables on my restaurant object
 *
 */
var Restaurant = function(data){

	this.name = data.name;
	this.street = data.street;
	this.city = data.city;
	this.type = data.type;
	this.comments = data.comments;
	this.url = data.url;
	this.location = data.location;
	this.index = data.index;
	this.marker = ko.observable();

};

/*
 * VIEW MODEL object
 *
 */
var ViewModel = function(){

 	var self = this;

 	// this is to store images from fourSquare
 	this.restaurantPhoto = ko.observableArray([]);

 	this.visibleWelcome = ko.observable(true); 
 	// this array will hold/save the list of restaurant objects created
 	this.restaurantList = ko.observableArray([]);
 	// this observable is set on the search bar and will update on every key down
 	this.filter = ko.observable('');
	
 	//create the restaurantList object
 	//loops through my data model and creat an Restaurant object from each entry in the model
     model.restaurants.forEach(function(place){
 		    self.restaurantList.push(new Restaurant(place));
 	 });

     // this list will be created GIVEN if the filter is being used or not.
     // If there is nothing types into the filter, then just return the restaurantList array, which hold all the restaurant objects
     // If there is text in the filter, then it will return the filtered list (which hold only the restaurant objects which names match the letters being typed into the search bar)
 	 this.filteredList = ko.computed(function() {
 	 		var filter = this.filter().toLowerCase();
  	 				if(!filter){
  	 					//set all markers to visible
  	 					for(var m = 0; m < markersArray.length; m++){
  	 						markersArray[m].setVisible(true);
  	 					}
  	 					return self.restaurantList();
  	 				}else{	 
	 					 return ko.utils.arrayFilter(self.restaurantList(), function(item){ 					 
	  	 						var match = item.name.toLowerCase().indexOf(filter) !== -1;	
	  	 						markersArray[item.index].setVisible(match);
	  	 						return match;					 						 	 						
  	 					});
  	 				}

 	 		}, self);

 	 //this will be set the current restaurant in the observable list to the one at index 0
    this.currentRestaurant = ko.observable(this.filteredList[0]);
   
    // when the user clicks a specific restuarant on the list, it will reset the currentRestaurant to the one they selected
    // the intro message will be removed
    // a request to foursqaure will revieve images of the place
    // the marker will be animated
	this.setRestaurant = function(place){

			self.currentRestaurant(place);
			requestFourSquare(place.location);
			if(self.visibleWelcome() === true){
				self.visibleWelcome(!self.visibleWelcome());
			}
			toggleBounce(markersArray[place.index]);
	 	 		
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


	//toggleMarkers();

};

function requestFourSquare(location){

	//FOUR SQUARE
	// first convert the place's lat long into usable ll format for request
    var latlong = location.lat + "," + location.lng;
    var url = 'https://api.foursquare.com/v2/venues/search';
    // keep a variable to store the place's id (which is needed to retreive photos)
    var venue_id;
      
        $.ajax({
          url: url,
          dataType: 'json',
          data: {
          	limit: '1',
            ll: latlong,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: VERSION,
            async: true
          },
          success: function(data) {
          	// once we get the place we need to store the id in order to get photos
          	// pass the id into the getPhotos()
          	venue_id = data.response.venues[0].id;
          	getPhotos(venue_id);
          }
        }).fail(function (e) {       
          alert("Sorry, but we are unable to retrieve photos right now");
          console.log(e);
        });

}


function getPhotos(id){

	// the length will hold the returned value of the number of images, the 'count'
	var length;
    var image;
    // variables to store the img urls
    var img_link;
    var img_href;
    var newImg;

	 $.ajax({
          url: 'https://api.foursquare.com/v2/venues/' + id + '/photos',
          dataType: 'json',
          data: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: VERSION,
            async: true
          },
          success: function(data) {
            length = data.response.photos.count;
            vm.restaurantPhoto([]);
            // for each retirevied image, loop through and get the url
            // store another url with size of 300 for the href
            // pass that with the index and make a fourSquare object
            // push that object into the restaurantPhoto list, which will update automatically since its an observable
          for(var i = 0; i < length; i++){
            	image = data.response.photos.items[i];
            	img_link = image.prefix+ "height100" + image.suffix;
            	img_href = img_link.replace("height100","height300");
            	newImg = new FourSquareImage(img_href, img_link, i);
            	vm.restaurantPhoto.push(newImg);          	       
	          }	        
	      }
        }).fail(function (e) {
          console.log(e);
          alert("Sorry, but we are unable to retrieve photos right now");
        });
	
}

// this creates an object out of each image from foursquare, it will also set the first image to active for the carousel
var FourSquareImage = function(v1, v2, i){

	this.img_href = v1;
	this.source = v2;
	if(i === 0){
		this.isActive = true;
	}else this.isActive = false;
};
	
/*
 * 	SETS UP THE INITIAL DISPLAY
 */

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

	// create the map using google.maps
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.2904, lng: -76.6122},
		zoom: 13,
		styles: styles,
		mapTypeControl: false
	});
		var largeInfoWindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();

		//loop through each restuarant and create a marker for each of them
		//then push it into a markers array
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
	    	//this will take all the markers and calculate the map's bounds
			bounds.extend(marker.position);
			markersArray.push(marker);
			// each marker will have a click listener, which when it is selected will bounce and then display it's street view
			marker.addListener('click', function(){
				toggleBounce(this);
				this.setAnimation(google.maps.Animation.BOUNCE);
				populateInfoWindow(this, largeInfoWindow);				
			});

    }


    /*
     *  This function is taken from the Udacity's video tutorials. It will create an info window with the google street view
     *  I modified it slightly to fit my design
     */

    function populateInfoWindow(marker, infowindow){

    	//set the images in the orange box
    	requestFourSquare(model.restaurants[marker.id].location);
    	//sets the place information in the orange box
    	vm.setRestaurant(model.restaurants[marker.id]);

    	if(infowindow.marker != marker){
    		infowindow.setContent('');
    		infowindow.marker = marker;   		
    		//make sure the marker property is cleared if the inforwindow is closed
    		infowindow.addListener('closeclick', function(){
    			infowindow.marker = null;
    		});

    		//get google street view
    		var streetViewService = new google.maps.StreetViewService();
    		var radius = 30;
    		streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    		
			var nearStreetViewLocation;
       		 var heading;
    		function getStreetView(data, status){
    			if(status == google.maps.StreetViewStatus.OK) {
    				nearStreetViewLocation= data.location.latLng;
    				heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
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
    //this will initially drop all the markers down
    toggleMarkers();	

}

/*
 *  This function is controlled by the toggle button (x or checked)
 *  The boolean value is either T or F - show the markers or don't show them
 *  Initially it is set to true and will change the icon when switched
 *  If the user chooses to X all of the markers then it will loop through each of them and set them to null
 */
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
		for(var k = 0; k < markersArray.length; k++){
			markersArray[k].setMap(null);
		}
		document.getElementById("btnIcon").className = "glyphicon glyphicon-ok";
		document.getElementById("toggleBtn").title = "Show Markers";
		showMarkers = true;
	}

}

/*
 *  If a restaurant from the list is clicked it will animate that specific marker
 */
 function toggleBounce(marker) {

 	marker.setAnimation(google.maps.Animation.BOUNCE);
    // the time begins immediately after the animation, it runs for 2.1 seconds then calls for the animation to stop. This should make the marker bound 3 times.  	         
  	setTimeout(function(){ 
  		marker.setAnimation(null);   
  	}, 2100);
}

//initMap is called once the google map api is retreived
//openNav() is called to automatically display the navBar
//ko.applyBuringings is called to set up the knockout observables
var vm = new ViewModel();
openNav();      
ko.applyBindings(vm);