'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'ngCordova',
        'myApp.Home',
        'myApp.Products',
        'myApp.ShoppingCart',
        'myApp.Order',
        'myApp.Contact',
        'myApp.Customer',
        'myApp.Deals',
        'myApp.Comments',
        'myApp.Suggestions',
        'myApp.Sales',
        'myApp.version'
    ])

.controller('AppCtrl', function($scope,ProductsIndexFactory,CategoriesIndexFactory,$rootScope) {
        $scope.products=ProductsIndexFactory.query();
        $scope.categories=CategoriesIndexFactory.query();
        console.log(ProductsIndexFactory.query());

    $rootScope.control = {
             showLogin: true,
             showLogout:false,
             showCart:false,
            showCurrency:false,
            showProfile:false,
             showProducts: false,
             showDeals:false,
             showSales:false
         
         };

    })

    .factory('ProductsIndexFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts');

    })
    .factory('CategoriesIndexFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingCategories');

    })
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        //donia
            .when('/home',{
                templateUrl:'Home/home.html',
                controller: 'HomeCtrl'
            })
        
            .when('/product',{
                templateUrl:'Products/products.html',
                controller:'ProductsCtrl'
            })
        .when('/login',{
                templateUrl:'Customer/login.html',
                controller:'LoginCtrl'
            })
        .when('/devise',{
              templateUrl:'Customer/devise.html',
              controller:'deviseCtrl'
              })
        .when('/loginFacebook',{
              templateUrl:'Customer/loginFacebook.html',
              controller:'fbController'
              })
        .when('/inscriptionCustomer',{
                templateUrl:'Customer/inscriptionCustomer.html',
                controller:'signupCustomerCtrl'
            })
        .when('/profile',{
                templateUrl:'Customer/profile.html',
                controller:'ManageCustomerCtrl'
            })
        .when('/inscriptionBusiness',{
                templateUrl:'Customer/inscriptionBusiness.html',
                controller:'signupBusinessCtrl'
            })
            .when('/my-products',{
                templateUrl:'Products/my-products.html',
                controller:'MyProductsCtrl'
            })
           .when('/add-product',{
                templateUrl:'Products/add-product.html',
                controller:'AddProductCtrl'
            })
        
        .when('/detail-product/:id',{
                templateUrl:'Products/product-details.html',
                controller:'ProductDetailsCtrl'
            })
        .when('/detail-myProduct/:id',{
                templateUrl:'Products/myProduct-details.html',
                controller:'MyProductDetailsCtrl'
            })
        .when('/edit-product/:id/:name/:desc/:tag/:price/:qte',{
                templateUrl:'Products/update-product.html',
                controller:'updateProductCtrl'
            })
       
     
        
        .when('/products-home',{
                 templateUrl:'Products/products-home.html',
                controller:'ProductsHomeCtrl'
            })
        
        .when('/products-hightech',{
                 templateUrl:'Products/product-hightech.html',
                controller:'ProductsHighTechCtrl'
            })
        
        .when('/products-computers',{
                 templateUrl:'Products/products-computers.html',
                controller:'ProductsComputersCtrl'
            })
        
        .when('/contact',{
                 templateUrl:'Contact/contact.html',
                controller:'ContactCtrl'
            })
        
        /*Fares*/
        
        .when('/deal',{
                templateUrl:'Deals/deals.html',
                controller:'DealsCtrl'
            })
        
        .when('/comment/:id',{
                templateUrl:'Comments/comments.html',
                controller:'CommentsCtrl'
            })

        .when('/addDeal',{
                templateUrl:'Deals/addDeal.html',
                controller:'AddDealCtrl'
            })
        /*end Fares*/
        
        /*Hazem*/
        .when('/myboard',{
                templateUrl:'UserBoard/navigation.html',
                controller: 'HomeCtrl'
            })
        
            .when('/suggest',{
                templateUrl:'UserBoard/suggestion.html',
                controller: 'SuggestionCtrl'
            })
            
            .when('/mysales',{
                templateUrl:'UserBoard/sales.html',
                controller: 'SalesCtrl'
            })
        
        /*end Hazem*/
             //rim
         .when('/cart',{
                templateUrl:'ShoppingCart/ShoppingCart.html',
                controller:'ShoppingCartCtrl'
            })
        
        .when('/listOrder',{
                templateUrl:'Order/ListOrder.html',
                controller:'ListOrderCtrl'
            })
        
        .when('/order/:total',{
                templateUrl:'Order/Order.html',
                controller:'OrderCtrl'
            })
        
        .when('/paypal/:idOrder/:total',{
                templateUrl:'Order/paypal.html',
                controller:'FindOrderCtrl'
            })
        
         .when('/updateQuantity/:idProd/:qte',{
                 templateUrl:'ShoppingCart/ShoppingCart.html',
                controller:'productsQuantityCtrl'
            })
        
        .when('/addLineItem/:id/:idshp/:qte',{
                 templateUrl:'ShoppingCart/ShoppingCart.html',
                controller:'LineItemCtrl'
            })
        
        .when('/vote/:id/:idsh/:vote',{
                 templateUrl:'ShoppingCart/ShoppingCart.html',
                controller:'RateController'
            })
        /*end rim*/
        
            .otherwise({redirectTo: '/home'});
    }])

;