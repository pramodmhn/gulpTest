!function(){calendarController=function(e,r,n,a){function o(n){e.calendarData=n,angular.forEach(e.calendarData.events,function(e,n){e.monthYear=r("dateWithSuffix")(e.schedule_stamp,"F Y")})}e.loading=!0,a.getCalendarEvents().success(function(r){e.data=r.data,n.info(e.data),o(e.data)})["catch"](function(e){n.info(e)})["finally"](function(){e.loading=!1}),e.clearTopic=function(){null==e.query.Topic&&(e.query.Topic="")},e.clearRegion=function(){null==e.query.Region&&(e.query.Region="")},e.clearFilter=function(){e.query={},e.name=""},e.isObject=function(e){return Object.keys($value).length},e.formSubmit=function(){e.register_form.$valid?(console.log(angular.toJson(e.user)),alert("form submitted")):angular.forEach(e.register_form,function(e,r){angular.forEach(e,function(r,n){e.$pristine=!1})})},e.ifchecked=function(){var r=!1;angular.forEach(e.user.option,function(e,n){e&&(r=!0)}),r?delete e.register_form.chk_name.$error.required:e.register_form.chk_name.$error.required=!0,e.register_form.chk_name.$valid=r,console.log(e.register_form.$valid+":"+e.register_form.chk_name.$valid)},e.predicate="name",e.index="",e.reverse=!1,e.order=function(r,n){e.reverse=e.predicate===r?!e.reverse:!1,e.predicate=r,e.index=n},e.todayDate=Math.floor(Date.now()/1e3),e.greaterEqualThan=function(r){return function(n){return n[r]>=e.todayDate}}},calendarController.$inject=["$scope","$filter","$log","calendarFactory"],angular.module("appCalendar").controller("calendarController",calendarController)}();