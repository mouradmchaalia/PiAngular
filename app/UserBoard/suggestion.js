'use strict';

angular.module('myApp.Suggestions', ['ngRoute','ngResource'])

.factory('suggestCategoryFactory', function($resource){
       
        //Resources
       var managingCategoriesResource=$resource('http://localhost:18080/sprint.youbay-web/rest/categories/suggestCat');
          return managingCategoriesResource;
})

.controller('SuggestionCtrl', function($scope,suggestCategoryFactory) {
    
   
    
    $scope.status="";
    //suggestion
    $scope.suggestCategory=function(name)
    {
    
    var category =new suggestCategoryFactory;
    category.category_Name=name;
    //enregistrer
    
    category.$save();
    $scope.status="Your Suggestion has been successfully sent.";
    }
    
    /*
    //scroller
    setTimeout(function(){document.getElementById('scrollhere').scrollIntoView();},1000);
    */
})