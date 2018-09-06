'use strict';

angular.module('vtest').controller('mainController', function ($scope,$modal,$q ,$window, $routeParams, $timeout,config,$http,Hour) 
{
	$scope.submitted=false;
		
	
	$scope.UserInfo={};
	$scope.final={};
	
	
	
	/* TableData */
	
	var gethours = function () {
			var deferred = $q.defer();
			Hour.all($scope.Hours)
                    .success(function (data) {
						
                       $scope.result=deferred.resolve(data);
                    })
                      .error(function(error) {
						
						deferred.reject(data);
					  })
				return deferred.promise;
					};
	
				
	
	gethours().then(function(data){ $scope.result=data});
	
	/*  End TableData */
	
	/* Create Hour */
	
	$scope.save= function()
	{
		   
		  
		$scope.submitted = true;
		if ($scope.HoursInfo.$valid) {
			
			
			
			
		Hour.create($scope.Hours)
                    .success(function (data) {
                        $scope.submitted = false;
						
                        $scope.Hours = {};
						
                     
							alert(data.message)	
							gethours().then(function(data){ $scope.result=data});
				
                    })
                      .error(function(error) {
						
						if(error.message=="invalidaccess")
						{
							
						}
         	
		});}
		
		
		
		
		
	}
	
	/*End of Create Hour	*/
	
	/* Format time */
	$scope.format=function(hours,type)
	{ 
	var final_hours=0;
	
	var split_hours =
    [
        (hours > 0) ? Math.floor(hours) : Math.ceil(hours),
        hours % 1
    ];
	
	if(split_hours[1] > 0.59)
	{
		
	
	final_hours= split_hours[0]+1;
	console.log(type);
		if(type=='estimate')
		{
			$scope.Hours.est_hours= final_hours;
		}
		
		if(type=='actual')
		{
		$scope.Hours.act_hours= final_hours;
		}
	
	}
	
	}


	/* end of format time */
	
	
	/* Edit and Complete  Popup*/
	
	$scope.open = function (rs) {

	$scope.final=rs;
        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true, 
            windowClass: 'modal', 
            controller: function ($scope, $modalInstance, $log,rs) {
               $scope.final = rs;
			   
                $scope.submit = function (final) {
					
						final.completed=true;
                    	Hour.update(final)
                    .success(function (data) {
                       
                    })
                      .error(function(error) {
						
						if(error.message=="invalidaccess")
						{
							
						}
         	
				});
				  $modalInstance.dismiss('cancel'); 
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                rs: function () {
                    return rs;
                }
            }
        });//end of modal.open
    }; 
	
	
	$scope.edit = function (rs) {

	$scope.final=rs;
        $modal.open({
            templateUrl: 'edit.html',
            backdrop: true,
            windowClass: 'modal', 
            controller: function ($scope, $modalInstance, $log,rs) {
               $scope.UpdateHour = rs;
			   		$scope.chkdecimal=function(hours,type)
					{ 
	var final_hours=0;
	
	var split_hours =
    [
        (hours > 0) ? Math.floor(hours) : Math.ceil(hours),
        hours % 1
    ];
	
	if(split_hours[1] > 0.59)
	{
		
	
	final_hours= split_hours[0]+1;
	console.log(type);
		if(type=='estimate')
		{
			$scope.UpdateHour.est_hours= final_hours;
		}
		
		if(type=='actual')
		{
		$scope.UpdateHour.act_hours= final_hours;
		}
	
	}
	
	}

                $scope.submit = function (final) {
					
						final.completed=false;
                    	Hour.update(final)
                    .success(function (data) {
                       
                    })
                      .error(function(error) {
						
						if(error.message=="invalidaccess")
						{
							
						}
         	
				});
				  $modalInstance.dismiss('cancel'); 
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                rs: function () {
                    return rs;
                }
            }
        });
    }; 
	
	
	/* End of Edit and Complete  Popup*/

	
	
	
})
