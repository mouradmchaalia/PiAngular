'use strict';

angular.module('myApp.ShoppingCart', ['ngRoute','ngResource'])

.controller('ShoppingCartCtrl', function($scope,ProductSHPFactory,LineItemQteFactory,OrderFactory,$routeParams) {
  
    $scope.myproducts=ProductSHPFactory.query(); 
    $scope.lineitems=LineItemQteFactory.query(); 
    
        $scope.total = function() {
        var total = 0;
        angular.forEach($scope.myproducts, function(product) {
        total += product.product_Price * product.product_Quantity;
      
        })
        return total;
         
        }
        $scope.removeItem = function(index) {
        $scope.myproducts.splice(index, 1);
        };
   
    
      })

.factory('ProductSHPFactory', function($resource,$rootScope){
     var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findLineItems/'+$rootScope.currentUser.shoppingCartId);
          return browsingShCartProductsResource;
})

.factory('LineItemQteFactory', function($resource){
     var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findLineItemsQte/1');
          return browsingShCartProductsResource;
})

 .controller('productsQuantityCtrl', function($scope,$resource,$routeParams) {
  
    var res= $resource('http://localhost:18080/sprint.youbay-web/rest/sales/updateQuantity/:id/:qte', { id: '@id_Product',qte:'@product_Quantity' }, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
     
});
    res.updateProduct({id_Product:$routeParams.idProd,product_Quantity:$routeParams.qte});
})



.factory('OrderFactory', function($resource){
       
        //Resources
          var OrderResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/OrderProduct');
          return OrderResource;
})   

.controller('RateController',function($resource,$routeParams){

var res=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/vote/1/1?vote=:vote',{ id: '@id_Product',vote:'@vote' }, {
    updateLineItem: {
      method: 'GET' // this method issues a PUT request
    }
     
});
    res.updateLineItem({id:$routeParams.id,idsh:$routeParams.idsh,vote:$routeParams.vote
                      
                      })
})


.controller('productsQuantityCtrl', function($scope,$resource,$routeParams) {
  
    var res= $resource('http://localhost:18080/sprint.youbay-web/rest/sales/updateQuantity/:id/:qte', { id: '@id_Product',qte:'@product_Quantity' }, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
     
});
    res.updateProduct({id_Product:$routeParams.idProd,product_Quantity:$routeParams.qte});
  
})
.controller('LineItemCtrl', function($scope,$routeParams,$location,$resource) {
    
    //$scope.lineitem=new LineItemFactory();
    //$scope.addToCart=function(){ 

    //$scope.lineitem.$save();
     var res= $resource('http://localhost:18080/sprint.youbay-web/rest/sales/addLineItem/:id/?qte=:qte', { id: '@id_Product',qte:'@product_Quantity' }, {
    addProduct: {
      method: 'POST' // this method issues a PUT request
    }
     
});
 
    res.query().$promise.then(function(data) {
 res.addProduct({id_Product:$routeParams.id,product_Quantity:$routeParams.qte});
}, function(error) {
    alert("ce produit existe dejà dans votre shoppingCart");
});
  // $location.path("/cart").replace();
    //$scope.$apply();        
  // }
      })

.factory('LineItemFactory', function($resource){
     var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/addLineItem/:id/1?qte=:qte');
          return browsingShCartProductsResource;
})


.factory('RateFactory', function($resource){
     var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/addLineItem/id/1?qte=:qte');
          return browsingShCartProductsResource;
})




