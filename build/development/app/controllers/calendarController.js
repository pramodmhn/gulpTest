(function(){
   
	calendarController=function($scope,$filter,$log,calendarFactory){	
			$scope.loading =true; 
			
       		//factory call from calenderService.js			
			calendarFactory.getCalendarEvents()
			.success(function (response) {
				$scope.data=response.data;
				$log.info($scope.data);				
				addNewObject($scope.data);                
            })           
             .catch(function(err){
				$log.info(err);
			 })
			 .finally(function(){
				 $scope.loading = false;
			});		
			
			
			//unique value
			function onlyUnique(value, index, self) { 
				return self.indexOf(value) === index;
			}
			/**clear filter on first option select and view all events button*/ 
			 $scope.clearTopic = function(){
				 //console.log($scope.query.Topic);
				if($scope.query.Topic == null)
					$scope.query.Topic="";
			};
			$scope.clearRegion = function(){
				if($scope.query.Region == null)
					$scope.query.Region = "";
			};
			$scope.clearFilter = function(){
				$scope.query = {};
				$scope.name="";
			};
			
			 $scope.isObject = function (value) {				
				return Object.keys($value).length;
			};
			
			//form
			$scope.formSubmit = function(){	
					
				if($scope.register_form.$valid){
					console.log(angular.toJson($scope.user));
					alert("form submitted");
				}
				else{
					angular.forEach($scope.register_form,function(obj,key){
						angular.forEach(obj,function(o,k){
							//console.log(obj);
							obj.$pristine=false						
						});						
					});
					
				}
				
			};
			
			$scope.ifchecked = function(){
				var option_cheked = false;					
				angular.forEach($scope.user.option,function(obj,key){						
					if(obj)	{				
						option_cheked = true;																
					}
				});
				if(option_cheked){
					delete $scope.register_form.chk_name.$error.required;								
				}
				else
					$scope.register_form.chk_name.$error.required = true;
				$scope.register_form.chk_name.$valid=option_cheked;
				console.log($scope.register_form.$valid+":"+$scope.register_form.chk_name.$valid);				
			};
			/****oderBy***/			
			$scope.predicate = 'name';
			$scope.index ="";
			$scope.reverse = false;
			$scope.order = function(predicate,index){				
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;			
				$scope.predicate = predicate;
				$scope.index = index;
			};		
			
			/**Time greater or equal to today  **/
			$scope.todayDate = Math.floor(Date.now() / 1000);			
			$scope.greaterEqualThan = function(prop){	//function(prop,val){				
				return function(item){//item return calendarData.events objects
					//console.log(item);	
					return item[prop] >= $scope.todayDate;//item[val];
				}
				
			}
			
			/**add new Object in collection**/
			function addNewObject(data){
				$scope.calendarData=data;
				//adding new formatted date object
				angular.forEach($scope.calendarData.events, function(obj,key){									
					obj.monthYear = $filter('dateWithSuffix')(obj.schedule_stamp,'F Y');	//using filter											
				}); 
				
				//adding new unique Topic case insensitive
				/*$scope.calendarData.collections.uniqueTopic= [];
				angular.forEach($scope.calendarData.collections.Topic, function(obj,key){						
					$scope.calendarData.collections.uniqueTopic.push(obj.toLowerCase());					
				});
				 $scope.calendarData.collections.uniqueTopic=$scope.calendarData.collections.uniqueTopic.filter(onlyUnique);  */
				
			}
			
	};	
	
	calendarController.$inject=['$scope','$filter','$log','calendarFactory'];	
	angular.module('appCalendar')
	.controller('calendarController',calendarController);
	
}());
