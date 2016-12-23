'use strict';

angular.module('myApp.Deals', ['ngRoute','ngResource'])


.controller('AddDealCtrl', function($scope,AddDealFactory) {

        $scope.deal=new AddDealFactory();        
        $scope.addDeal=function(){

        
        
            $scope.deal.$save();
            $location.path("/deal");
        /*$scope.product.$save(function(){
           $state.go('app.myProducts');
        });*/
    }
    
})

.controller('DealsCtrl', function($scope,DealsListFactory) {
    
  $scope.deals=DealsListFactory.query();       
        
})

.factory('DealsListFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/deals');

    })

.factory('AddDealFactory', function($resource){
    
        //Resources
       var managingDeals=$resource('http://localhost:18080/sprint.youbay-web/rest/deals');
          return managingDeals;
    })

;