

'use strict';

angular.module('myApp.Comments', ['ngRoute','ngResource'])

/*.controller('CommentsCtrl', function($scope,CommentsListFactory) {
    
  $scope.comments=CommentsListFactory.query();
        
        console.log(CommentsListFactory.query());
})*/


.controller('CommentsCtrl', function($scope,CommentsListFactory,$routeParams,$resource) {
    
    console.log("test");
    var c= $resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts/:id');
          var comm=c.get({id: $routeParams.id},function(response){
              console.log(comm);
        console.log(response.comments);
    $scope.comments = response.comments;
    });
        
    
    
    })



/*.factory('CommentsListFactory', function($resource){
        //Resource
        return $resource('http://localhost:18080/sprint.youbay-web/rest/comments');

    })*/




.factory('CommentsListFactory', function($resource){
       
        //Resources
       var browsingCommentsByProduct=$resource('http://localhost:18080/sprint.youbay-web/rest/comments/:id');
          return browsingCommentsByProduct;
    })



   
;