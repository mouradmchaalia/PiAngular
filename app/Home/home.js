'use strict';

angular.module('myApp.Home', ['ngRoute'])

.controller('HomeCtrl', function($scope,ProductsFactory,CategoriesFactory) {
        $scope.products=ProductsFactory.query();
        $scope.categories=CategoriesFactory.query();
        $scope.numLimit = 4;
        console.log(ProductsFactory.query());
        console.log(CategoriesFactory.query());
    })

    .factory('ProductsFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts');

    })
    .factory('CategoriesFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/browsingCategories');

    })

;