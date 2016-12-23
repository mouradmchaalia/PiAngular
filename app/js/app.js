

var myRoute= function($routeProvider){
    $routeProvider.when('/',{templateUrl:'index-fullwidth-left.html'})
        .when('/shop',{templateUrl:'shop.html'})
      .when('/product',{templateUrl:'product.html'})
     .when('/cart',{templateUrl:'cart.html'})
    .when('/contact',{templateUrl:'contact.html'})
    .when('/login',{templateUrl:'login.html'})
        .otherwise({redirectTo:'/'});
}
      
var app=angular.module('myModule',['ngRoute']);

app.config(myRoute);