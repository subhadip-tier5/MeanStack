var app = angular.module('contactApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
    $routeProvider.when('/', {templateUrl: '/views/contact.html'});
    $routeProvider.when('/blog', {templateUrl: '/views/blog.html'});
});

app.controller('NavCltr', function($scope, $location){
    $scope.getClass = function (path) {
        return ($location.path() === path) ? 'active' : '';
    };
});

app.controller('AppCltr', function($scope, $http){
    var refresh = function(){
        $http.get('/contactList').success(function(response){
            console.log('Client get a response');
            $scope.contactList = response;
            $scope.contact = "";
        });
    };
    
    refresh();
    
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact).success(function(response){
            console.log(response);
            refresh();
        });
    };
    
    $scope.remove = function(id){
        console.log(id);
        $http.delete('/contactList/' + id).success(function(response){
            console.log(response);
            refresh();
        });
    };
    
    $scope.modify = function(id){
        console.log(id);
        $http.get('/contactList/' + id).success(function(response){
            console.log(response);
            $scope.contact = response;
        });
    };
    
    $scope.updateContact = function(){
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
            console.log(response);
            refresh();
        });
    };
});