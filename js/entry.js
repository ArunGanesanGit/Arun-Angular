var angular = require('angular');
var angularRoute = require('angular-route');



	            function test(){
	            	console.log('Enter key - Testing Eval');
	            }

angular
	.module('myApp', [angularRoute])	
	.component('testTemplate', {
		templateUrl: '../view/testtemplate.html',
		bindings: { name: '@' },
		controller: function() {
        	this.myName = 'Alain';
      	}
	})
	.directive('tabs', function() {
		return {
			transclude: true,
			template: '<label>List of names:</label><div ng-transclude></div>'
		};
	})
	.directive('validateInput', function() {
		return {
			link: function (scope, element, attrs) {
	            element.bind('click', function () {
	                //element.html('You clicked me!');
	                console.log('I am clicked');
	            });
	        }
		};
	})
	.directive('capitalize', function() {
	    return {
	      require: 'ngModel',
	      link: function(scope, element, attrs, modelCtrl) {
	        var capitalize = function(inputValue) {
	          if (inputValue == undefined) inputValue = '';
	          var capitalized = inputValue.toUpperCase();
	          if (capitalized !== inputValue) {
	            modelCtrl.$setViewValue(capitalized);
	            modelCtrl.$render();
	          }
	          return capitalized;
	        }        
	        modelCtrl.$parsers.push(capitalize);
	        capitalize(scope[attrs.ngModel]); // capitalize initial value
	      }
	    };
	})
	.directive('validatePattern', function() {
	    return {
	      require: 'ngModel',
	      link: function(scope, element, attrs, modelCtrl) {
	        var validatePattern = function(inputValue) {
	          if (inputValue == undefined) inputValue = '';

	          var regex = new RegExp(attrs.pattern);
	          if (!regex.test(inputValue)) {
	          		inputValue = inputValue.slice(0, -1);
	          		modelCtrl.$setViewValue(inputValue);
	            	modelCtrl.$render();
	          }
	          return inputValue;
	        }        
	        modelCtrl.$parsers.push(validatePattern);
	        validatePattern(scope[attrs.ngModel]); // Pattern match Initial value
	      }
	    };
	})
	.config(function($routeProvider) {
		$routeProvider
			.when('/main', {
				controller: 'MyController as myCtrl',
				templateUrl: '../view/myview.html'
			})
			.when('/test', {
				controller: 'TestController as testCtrl',
				templateUrl: '../view/testview.html'	
			})
			.otherwise({
		      redirectTo:'/main'
		    });
	})
	.controller('MyController', function($location) {

		var myCtrl = this;
		myCtrl.name = "From Controller";
		myCtrl.names = ['Arun', 'Test', 'Work', 'Coding', 'Angular'];

		myCtrl.onSubmit = function() {
			myCtrl.name = myCtrl.yourName;	
			$location.path('/test');
		};

	})
	.controller('TestController', function($location) {

		var testCtrl = this;

		testCtrl.onSubmit = function() {
			$location.path('/main');
		};

	});