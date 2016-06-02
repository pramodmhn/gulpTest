(function(){

	 var appCalendar= angular.module('appCalendar', ['ui.validate','ngSanitize','angular.filter','ngAnimate']);
	//ui.validate is for validating form; eg: formname.inputname.$error (check error object properties)
	//custom filter
	/*appCalendar.filter('capitalize', function() {
		return function(input) {
		  return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});*/
	
	
	
	//directives to add when click , html element is add-plus
	/*appCalendar.directive('addPlus',function(){
		return {
			link: function(scope,element, attrs){
				element.bind({
					click: function(){						
						$(element).append("+");
					}					
				})
			}
		};
	});*/
	
	//customoized date filter eg: 1st Jan 2016
	appCalendar.filter('dateWithSuffix',function(){
		
		return function timestampToDateTimeByFormat(timestamp, format) {						
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			var date = new Date(timestamp * 1000);
			var d = '', D = '', j = '', l = '', N = '', S = '', w = '', F = '', m = '', M = '', n = '', L = '', Y = '', y = '', a = '', A = '', g = '', G = '', h = '', H = '', i = '', s = '';
			if (format.indexOf('d') > -1) {
				d = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
			}
			if (format.indexOf('j') > -1) {
				j = date.getDate();
			}
			if (format.indexOf('D') > -1) {
				D = days[date.getDay()].substring(0, 3);
			}
			if (format.indexOf('l') > -1) {
				l = days[date.getDay()];
			}
			if (format.indexOf('N') > -1) {
				N = (date.getDay() == 0) ? 7 : date.getDay();
			}
			if (format.indexOf('S') > -1) {
				switch ((date.getDate() + '').slice(-1)) {
					case '1':
						S = 'st';
						break;
					case '2':
						S = 'nd';
						break;
					case '3':
						S = 'rd';
						break;
					default :
						S = 'th';
						break;
				}
				/**number between 11 - 19 **/
				var x = (date.getDate() + '').slice(-2);			
				switch (true) {
					case (x >10 && x <20):                
						S = 'th';
						break;
				}
			}
			if (format.indexOf('w') > -1) {
				w = date.getDay();
			}
			if (format.indexOf('F') > -1) {
				F = months[date.getMonth()];
			}
			if (format.indexOf('m') > -1) {
				m = date.getMonth() + 1;
				m = (m < 10) ? '0' + m : m;
			}
			if (format.indexOf('M') > -1) {
				M = months[date.getMonth()].substring(0, 3);
			}
			if (format.indexOf('n') > -1) {
				n = date.getMonth() + 1;
			}
			if (format.indexOf('L') > -1) {
				L = (date.getFullYear() % 4 == 0) ? 1 : 0;
			}
			if (format.indexOf('Y') > -1) {
				Y = date.getFullYear();
			}
			if (format.indexOf('y') > -1) {
				y = (date.getFullYear() + '').slice(-2);
			}
			if (format.indexOf('a') > -1) {
				a = (date.getHours() > 11) ? 'pm' : 'am';
			}
			if (format.indexOf('A') > -1) {
				A = (date.getHours() > 11) ? 'PM' : 'AM';
			}
			if (format.indexOf('g') > -1) {
				g = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
			}
			if (format.indexOf('G') > -1) {
				G = date.getHours();
			}
			if (format.indexOf('h') > -1) {
				h = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
				h = h < 10 ? '0' + h : h;
			}
			if (format.indexOf('H') > -1) {
				H = date.getHours();
				H = H < 10 ? '0' + H : H;
			}
			if (format.indexOf('i') > -1) {
				i = date.getMinutes();
				i = i < 10 ? '0' + i : i;
			}
			if (format.indexOf('s') > -1) {
				s = date.getSeconds();
				s = s < 10 ? '0' + s : s;
			}
			var formattedDate = '';
			for (var counter = 0; counter < format.length; counter++) {
				switch (format[counter]) {
					case 'd':
						formattedDate += d;
						break;
					case 'D':
						formattedDate += D;
						break;
					case 'j':
						formattedDate += j;
						break;
					case 'l':
						formattedDate += l;
						break;
					case 'N':
						formattedDate += N;
						break;
					case 'S':
						formattedDate += S;
						break;
					case 'w':
						formattedDate += w;
						break;
					case 'F':
						formattedDate += F;
						break;
					case 'm':
						formattedDate += m;
						break;
					case 'M':
						formattedDate += M;
						break;
					case 'n':
						formattedDate += n;
						break;
					case 'L':
						formattedDate += L;
						break;
					case 'Y':
						formattedDate += Y;
						break;
					case 'y':
						formattedDate += y;
						break;
					case 'a':
						formattedDate += a;
						break;
					case 'A':
						formattedDate += A;
						break;
					case 'g':
						formattedDate += g;
						break;
					case 'G':
						formattedDate += G;
						break;
					case 'h':
						formattedDate += h;
						break;
					case 'H':
						formattedDate += H;
						break;
					case 'i':
						formattedDate += i;
						break;
					case 's':
						formattedDate += s;
						break;
					default:
						formattedDate += format[counter];
						break;
				}
			}
			return formattedDate;
		}

	});//filter dateWithSuffix
	
}());