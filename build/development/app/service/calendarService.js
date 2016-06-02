(function(){
  
	calendarFactory = function($http,$httpParamSerializerJQLike){
		var factory = {};		
		
			//$_GET
			var parts = window.location.search.substr(1).split("&");
			var $_GET = {};
			for (var i = 0; i < parts.length; i++) {
				var temp = parts[i].split("=");
				$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
			}
						
             var $postData = {
                't3account_id': 'zzzz4f5456669e7c8339',//Canteloupe
				//'zzzz5341f60cd5f47709'Fair Trading
				'calendar_name': '',//Event Calendar  Name in settting "Folder"
				'filter': {
					//'folder_id': 6373,
					/*'ev_start_date': {
                    "start": parseInt(new Date("2015/3/1 15:34:00").getTime()/ 1000),
                    "end": parseInt(new Date("2017/9/6 15:34:00").getTime()/ 1000)
                },*/
					'ev_closure_date': {
						//"start": Math.floor(Date.now() / 1000)
						//parseInt(new Date("2016/5/11").getTime() / 1000)
						//"end": parseInt(new Date("2016/5/24").getTime() / 1000)
					}
				}
                
            };//$postData
			
			  if (typeof $_GET['calendar'] != 'undefined' && $_GET['calendar'].trim() != '') {
				$postData.calendar_name = $_GET['calendar'];
			}
			
			//t3account_id
			 if (typeof $_GET['t3id'] != 'undefined' && $_GET['t3id'].trim() != '') {
				$postData.t3account_id = $_GET['t3id'];
			}
		
		factory.getCalendarEvents = function(){
			//var params = $httpParamSerializerJQLike($postData);	
			return $http({
				url: 'https://events.fairtrading.nsw.gov.au/scripts/EventCalendar/calendar_v2.php',
				method: "POST",	
				
				//params:$postData,
				//paramSerializer:'$httpParamSerializerJQLike',
				data:$httpParamSerializerJQLike($postData),							
				headers: {
					Accept: "*/*",
					"Content-Type": "application/x-www-form-urlencoded",
					"charset" :"UTF-8"
				}
			});
			
		};
		
		return factory;
	};
	
	calendarFactory.$inject=['$http','$httpParamSerializerJQLike'];
	angular.module('appCalendar')
	.factory('calendarFactory',calendarFactory);
	
}());

