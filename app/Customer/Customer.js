/**
 * Created by guesmi.
 */
'use strict';

angular.module('myApp.Customer', ['ngRoute','ngResource'])
.controller('fbController',function($scope){
    $scope.name="test";
    $scope.FBLogin=function(){
        FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
         console.log(response);
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});
    };
})
 

.controller('signupBusinessCtrl', function($scope,addBusiness,$location) {
    
    
	$scope.add=function(address,email,first_Name,lastName,login,password,phone){
		var business = new addBusiness;
		business.address=address;
		business.email=email;
		business.first_Name=first_Name;
		business.lastName=lastName;
		business.login=login;
        business.password=password;
        business.phone=phone;
		business.$save();
        $location.path("#/login")
        
	}

})
.controller('signupCustomerCtrl', function($scope,addCustomer,$location) {

    
	$scope.add=function(address,email,first_Name,lastName,login,password,phone){
		var customer = new addCustomer;
		customer.address=address;
		customer.email=email;
		customer.first_Name=first_Name;
		customer.lastName=lastName;
		customer.login=login;
        customer.password=password;
        customer.phone=phone;
		customer.$save();
         $location.path("#/login")
        
	}

})
.controller('ManageCustomerCtrl', function($scope, $resource,$rootScope,$location) {
    
    
    $scope.data = {};
    
    $scope.update = function(){ 
        
         var updateResource = $resource('http://localhost:18080/sprint.youbay-web/rest/account/updateCustomer/:id/:first_Name/:lastName/:address/:phone/:email/:login/:password');
        
        $scope.data = updateResource.get({first_Name:$scope.data.first_Name,lastName:$scope.data.lastName,
                                         address:$scope.data.address,phone:$scope.data.phone,email:$scope.data.email,
                                         login:$scope.data.login,password:$scope.data.password,id:$scope.currentUser.customer_Id
                                         },
                                         
                                         $location.path("#/login"),
                                         
                                        
        function (errorResponse) {
            
            window.alert("cannot update this account") ;
            console.log(errorResponse);
        });
        
     }
    $scope.delete = function(){ 
        
         var deleteResource = $resource('http://localhost:18080/sprint.youbay-web/rest/account/deleteCustomer/:id');
        
        $scope.data = deleteResource.get({id:$scope.currentUser.customer_Id
                                         },
            deleteResource.$remove,                             
         $location.path("#/login"),                                
                                        
        function (errorResponse) {
            
           window.alert("cannot delete this account") ;
            console.log(errorResponse);
        });
        
     }
    
 
        
   
    
})
.controller('deviseCtrl', function($scope, $timeout,$resource,$rootScope,$location) {
    
    var BourseResource=$resource('http://bassemchagra.com/bourse.php');
	 
    $scope.bourses=BourseResource.query();})

 .controller('LoginCtrl', function($scope, $timeout,$resource,$rootScope,$location) {
    
    $scope.FBLogin=function(){
        FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
         console.log(response);
        
         $location.path("#/home");
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});
    };
    
    
    $scope.data = {};
    
    $scope.doLogIn = function(){     
         var loginResource = $resource('http://localhost:18080/sprint.youbay-web/rest/account/loginCustomer/:login/:password');
        $scope.data = loginResource.get({login:$scope.data.login,password:$scope.data.password}, function (response) {
            
          
         
            
            if(response.lastName!=Error) {
                $rootScope.currentUser = response;
                console.log($rootScope.currentUser.type);
                console.log($rootScope.currentUser);
                $location.path("#/home")
                        if($rootScope.currentUser.type=="customer"){
                        $rootScope.control = {
                            showLogin: false,
                            showLogout:true,
                            showCart:true,
                            showCurrency:true,
                            showProfile:true,
                            showProducts: false,
                            showDeals:false,
                            showSales:false
                        };          

                        }
                else if($rootScope.currentUser.type=="business"){
                $rootScope.control = {
                            showLogin: false,
                            showLogout:true,
                            showCart:true,
                    showCurrency:true,
                    showProfile:true,
                            showProducts: true,
                            showDeals:true,
                            showSales:true
                        };          
                }
                
                
               
            } else {
                window.alert("fauuuu") ; 
                 console.log($rootScope.currentUser.lastName);
                $location.path("#/login");
            
            }
        },
        function (errorResponse) {
            $scope.erreur="incorrect login or password";
            console.log(errorResponse);
        });
        
     }
 
    
})



   
.factory('addBusiness', function($resource){
       
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/addBusiness');
          
})
.factory('addCustomer', function($resource){
       
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/addCustomer');
          
})
    
    
;

window.fbAsyncInit = function() {
    FB.init({
      appId      : '565043313651863',
      xfbml      : true,
      version    : 'v2.5',
        oauth : true
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
