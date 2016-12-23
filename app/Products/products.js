/**
 * Created by Donia on 21/12/2015.
 */
'use strict';

angular.module('myApp.Products', ['ngRoute','ngResource','ngCordova','ngSocial'])

 


    .controller('ProductsCtrl', function($scope,ProductsFactory,CategoriesFactory) {
        $scope.products=ProductsFactory.query();
        $scope.categories=CategoriesFactory.query();
        console.log(ProductsFactory.query());
    })

    .controller('ProductsHomeCtrl', function($scope,ProductsByCategoryFactory,CategoriesFactory) {
        $scope.products=ProductsByCategoryFactory.get({id: '1'});
        $scope.categories=CategoriesFactory.query();
        
    })

    .controller('ProductsHighTechCtrl', function($scope,ProductsByCategoryFactory,CategoriesFactory) {
        $scope.products=ProductsByCategoryFactory.get({id: '1'});
    console.log(products);
        $scope.categories=CategoriesFactory.query();
        
    })

    .controller('ProductsComputersCtrl', function($scope,ProductsByCategoryFactory,CategoriesFactory) {
        $scope.products=ProductsByCategoryFactory.get({id: '2'});
        $scope.categories=CategoriesFactory.query();
        
    })
   
   
    .controller('ProductDetailsCtrl', function($scope,ProductDetailsFactory,$routeParams) {
      $scope.product=ProductDetailsFactory.get({id: $routeParams.id});
 
   
        //console.log(ProductDetailsFactory);
    $('.number-plus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)+1;
    	divUpd.text(newVal);
    });

    $('.number-minus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)-1;
    	if(newVal>=1) divUpd.text(newVal);
    });
    })


.controller('MyProductDetailsCtrl', function($scope,ProductDetailsFactory,$routeParams,$rootScope) {
        $scope.product=ProductDetailsFactory.get({id: $routeParams.id});
   
    
        console.log(ProductDetailsFactory);
        $rootScope.pId = $routeParams.id;
    
   
    console.log($rootScope.pId);
    
    /*var pName ;
    
    var name = ProductDetailsFactory.get({id: $routeParams.id},function(response){
     console.log(response.product_Name);
     pName = response.product_Name;
    });
    
    console.log(pName);
    
    */
       
    
    
    $('.number-plus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)+1;
    	divUpd.text(newVal);
    });

    $('.number-minus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)-1;
    	if(newVal>=1) divUpd.text(newVal);
    });
    })



    .controller('MyProductsCtrl', function($scope,MyProductsFactory,$routeParams,CategoriesFactory,$rootScope) {

    console.log($rootScope.currentUser.c.customer_Id);
    console.log($rootScope.currentUser.c);
        $scope.products=MyProductsFactory.query({id: $rootScope.currentUser.c.customer_Id});
    
    
    
        $scope.categories=CategoriesFactory.query();
        console.log(MyProductsFactory.query());
    
    
    })

.controller('AddProductCtrl', function($scope,CategoriesFactory,AddProductFactory,$rootScope,$location) {

        $scope.product=new AddProductFactory();
        $scope.categories=CategoriesFactory.query();
    var str="/img/";
   
    console.log($rootScope.currentUser);
     
    
    
        $scope.addProduct=function(){

            $scope.product.businessConsumer= $rootScope.currentUser.c;
    $scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.product.product_Image = str.concat(element.files[0]);
        });
    };
        
            $scope.product.$save();
            $location.path("/product");
        /*$scope.product.$save(function(){
           $state.go('app.myProducts');
        });*/
    }
    
})


//Update Product
.controller('updateProductCtrl', function($scope,CategoriesFactory,ProductDetailsFactory,$resource,$routeParams) {
    
    
     $scope.categories=CategoriesFactory.query();
    
    var res= $resource('http://localhost:18080/sprint.youbay-web/rest/managingProducts/:id/:name/:desc/:tag/:price/:qte', { id: '@id_Product', name:'@product_Name', desc:'@product_Description', tag:'@product_Tag', price:'@product_Price', qte:'@product_Quantity'}, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
     
});
    res.updateProduct({id_Product:$routeParams.id,
                       product_Name:$routeParams.name,
                       product_Description:$routeParams.desc,
                       product_Tag:$routeParams.tag,
                       product_Price:$routeParams.price,
                       product_Quantity:$routeParams.qte});
    
    $scope.loadProduct = function() { //Issues a GET request to /api/products/:id to get a product to update
    $scope.product = ProductDetailsFactory.get({ id: $routeParams.id });
  };

  $scope.loadProduct(); // Load a product which can be edited on UI
    
})

.controller('SocialCtrl', function($scope,$rootScope,ProductDetailsFactory) {
    
    var p = ProductDetailsFactory.get({id: $rootScope.pId},function(response){
     console.log(response.product_Name);
        $scope.current_title = p.product_Name;
        $scope.current_description = p.product_Description;
        $scope.data_url = "'http://127.0.0.1:3435/app/index.html#/detail-myProduct/'"+p.id_Product;
        $scope.data_image = p.product_Image;
    return response;
    });
    
            
        })
 


    .factory('ProductsFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts');

    })

   .factory('ProductsByCategoryFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts/category/:id');

    })
    .factory('MyProductsFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts/own/:id');

    })

 

    .factory('CategoriesFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingCategories');

    })

    .factory('ProductDetailsFactory', function($resource){
       
        //Resources
       var browsingProductsByCriteriaResource=$resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts/:id');
          return browsingProductsByCriteriaResource;
    })

    .factory('AddProductFactory', function($resource){
    
        //Resources
       var managingProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/managingProducts');
          return managingProductsResource;
    })

    .factory('addBusiness', function($resource){ 
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/addBusiness');
          
    })
    
;