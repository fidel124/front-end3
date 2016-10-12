
var app = angular.module('salesStore', ["ngRoute"]);

    app.config(['$routeProvider', function($routeProvider){
  		  $routeProvider
  			    .when("/templates", { controller: "TemplatesCtrl",
  			                          templateUrl: "templates/templates.html"
  			                        })  
            .when("/templates/:templateId", { controller: "TemplatesDetailsCtrl",
                                  templateUrl: "templates/template-details.html"
                                }) 			
  			    .when("/", { redirectTo: "/templates" })
  			
  		    	.otherwise({ redirectTo: "/templates" });
  	}]);    

    app.controller('TemplatesCtrl',['$scope', '$http',  function($scope, $http){
       $http.get('json/templates.json').success(function(data){
        $scope.templates = data;
       });
    }]);

    app.controller('TemplatesDetailsCtrl',['$scope','$http','$routeParams','$filter',  function($scope, $http, $routeParams, $filter){
        var tempId = $routeParams.templateId;
        $http.get('json/templates.json').success(function(data){
        $scope.template = $filter('filter')(data, function(d){
          return d.id == tempId;
        })[0];
        $scope.theImage = $scope.template.images[0].name;
       });
        $scope.setImage = function(image){
           $scope.theImage = image.name;
        }
    }]);

   

   
  
    