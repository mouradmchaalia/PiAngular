'use strict';

angular.module('myApp.Contact', ['ngRoute','ngResource','ngCordova'])
 
.controller('ContactCtrl', function($scope,$cordovaGeolocation) {
        
        
     /////////////////////MAP//////////////////////
   // $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });
    
    
    //////////////////////////////////////////////////

})
;