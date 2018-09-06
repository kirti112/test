		'use strict';

angular.module('vtest')
    .service('Hour', function($http) {
      return {
            all :function() {
                var url = '/hours/all';
                var encoded_url = encodeURI(url);
                 return $http.get(encoded_url);
            },
            create : function(hourData) {	
                var url = '/hours/save';
                var encoded_url = encodeURI(url);
                return $http.post(encoded_url,hourData);

              //  return $http.post('/users/', useData);
            },
            
             
            update:function(hourData) {
                var url = '/hours/update/';
                var encoded_url = encodeURI(url);
                return $http.post(encoded_url,hourData);
            },
            
          

        }
       });
