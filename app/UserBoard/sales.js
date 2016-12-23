
'use strict';

angular.module('myApp.Sales', ['ngRoute','ngResource'])

.controller("SalesCtrl", function($scope,$resource,$rootScope) {
  
   
    
    
    var salesRessource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/countSales/:paramId/:paramMonth');
    
    var monthData = [0,0,0,0,0,0,0,0,0,0,0,0];
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    months.forEach(function(entry)
                   {   
        var salesMonth = salesRessource.get({paramId:$rootScope.currentUser.c.customer_Id,paramMonth:entry},function(response)
                                      {   
            monthData[entry-1] = response.data;
            if(entry==12)
            {
                //morris
                 Morris.Area({
                     element: 'chart_done',
                     
                     data: [
                         { date: '01-01-2015', value: (monthData[0]) },
                         { date: '01-02-2015', value: monthData[1] },
                         { date: '01-03-2015', value: monthData[2] },
                         { date: '01-04-2015', value: monthData[3] },
                         { date: '01-05-2015', value: monthData[4] },
                         { date: '01-06-2015', value: monthData[5] },
                         { date: '01-07-2015', value: monthData[6] },
                         { date: '01-08-2015', value: monthData[7] },
                         { date: '01-09-2015', value: monthData[8] },
                         { date: '01-10-2015', value: monthData[9] },
                         { date: '01-11-2015', value: monthData[10] },
                         { date: '01-12-2015', value: monthData[11] }
                     ],
                     xkey: 'date',
                     ykeys: ['value'],
                     labels: ['Orders']
                 });
                
                console.log(monthData[0]);
                console.log(data);
                //end morris
             
            }                
            
        },function(errorResponse){
            
            console.log(errorResponse);
            
        });
        
                   }); 
    /*
     //scroller
    setTimeout(function(){document.getElementById('scrollhere').scrollIntoView();},1000);
    */
})

