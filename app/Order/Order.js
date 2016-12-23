'use strict';

angular.module('myApp.Order', ['ngRoute','ngResource'])

.controller('OrderCtrl', function($scope,ProductSHPFactory,OrderFactory,$routeParams,$location,$rootScope) {
  
        $scope.myproducts=ProductSHPFactory.query(); 
        $scope.total = function() {
        var total = 0;
        angular.forEach($scope.myproducts, function(product) {
        total += product.product_Price  * product.product_Quantity;
      
        })
        return total;  
        }
        $scope.removeItem = function(index) {
        $scope.myproducts.splice(index, 1);
        };
   //ajouter total ds l objet ordre
    $scope.order=new OrderFactory();
    $scope.order.total=$routeParams.total;
    $scope.order.ordered="2015-12-02";
    
    $scope.addOrder=function(){
    $scope.order.$save();
    $location.path("/cart").replace();
    $scope.$apply();
    }
    
      })

//get orders by shpCart
.controller('ListOrderCtrl', function($scope,ListOrdersFactory,$routeParams,$resource,$rootScope) {
    /*var x=$routeParams.idsh;*/

 $scope.orders=$resource("http://localhost:18080/sprint.youbay-web/rest/sales/orders/"+$rootScope.currentUser.shoppingCartId).query();

      })
//get order by ID
.controller('FindOrderCtrl', function($scope,GetOrderFactory,$routeParams,$resource) {
   var y=$routeParams.idOrder;

 $scope.order=$resource("http://localhost:18080/sprint.youbay-web/rest/sales/findOrder/"+y).get({idOrder: $routeParams.idOrder});

      })



//services

.factory('ProductSHPFactory', function($resource){
     var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findLineItems/1');
          return browsingShCartProductsResource;
})


.factory('OrderFactory', function($resource){
       
        //Resources
       var OrderResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/OrderProduct');
          return OrderResource;
})




.factory('ListOrdersFactory', function($resource){
       
        //Resources
       var ordResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/orders/:idsh');
          return ordResource;
})

.factory('GetOrderFactory', function($resource){
       
        //Resources
       var orResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findOrder/:idOrder');
          return orResource;
})







 .directive('paypalButton', function($routeParams) {
    return {
      restrict: 'E',
      scope: {},
      compile: function(element, attrs) {
        var languageCodes = [ // PayPal allowed language codes
          'en_US',
          'es_ES',
          'fr_FR',
          'it_IT',
          'de_DE'
        ];
        var currencyCodes = [ // PayPal allowed currency codes
          'AUD',
          'CAD',
          'CZK',
          'DKK',
          'EUR',
          'HKD',
          'HUF',
          'ILS',
          'JPY',
          'MXN',
          'NOK',
          'NZD',
          'PHP',
          'PLN',
          'GBP',
          'RUB',
          'SGD',
          'SEK',
          'CHF',
          'TWD',
          'THB',
          'USD'
        ];
        var buttonSizes = [ // PayPal allowed button sizes
          'SM', // small
          'LG' // large
        ];
        var name = this.name;
        function err(reason) {
          element.replaceWith('<span style="background-color:red; color:black; padding:.5em;">' + name + ': ' + reason + '</span>');
          console.log(element.context);
        }
        var action = attrs.action || 'https://www.paypal.com/us/cgi-bin/webscr';
        var business = attrs.business;
        var languageCode = attrs.languageCode || 'en_US';
        var currencyCode = attrs.currencyCode || 'USD';
        var itemName = attrs.itemName;
        var amount = parseFloat($routeParams.total);
        var buttonSize = attrs.buttonSize || 'SM';
        var imgAlt = attrs.imgAlt || 'Make payments with PayPal - it\'s fast, free and secure!';
        if (!business) { return err('business not specified!'); }
        if (!itemName) { return err('item name not specified!'); }
        if (!amount) { return err('amount not specified!'); }
        if (isNaN(amount)) { return err('amount is not a number!'); }
        if (languageCodes.indexOf(languageCode) < 0) { return err('unforeseen language code!'); }
        if (currencyCodes.indexOf(currencyCode) < 0) { return err('unforeseen currency code!'); }
        if (buttonSizes.indexOf(buttonSize) < 0) { return err('unforeseen button size!'); }
        var imgSrc = 'http://www.paypalobjects.com/' + languageCode + '/i/btn/btn_buynow_' + buttonSize + '.gif';
        var template =
          '<form name="_xclick" action="' + action + '" method="post">' +
          '<input type="hidden" name="cmd" value="_xclick">' +
          '<input type="hidden" name="business" value="' + business + '">' +
          '<input type="hidden" name="currency_code" value="' + currencyCode + '">' +
          '<input type="hidden" name="item_name" value="' + itemName + '">' +
          '<input type="hidden" name="amount" value="' + amount + '">' +
          '<input type="image" src="' + imgSrc + '" border="0" name="submit" alt="' + imgAlt + '">' +
          '</form>';
        //element.replaceWith(template);
        element.append(template);
      }
    };
  })

