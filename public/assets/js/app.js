var app = angular.module('miscApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
    $routeProvider.when('/', {templateUrl: '/views/home.html'});
    $routeProvider.when('/blog', {templateUrl: '/views/blog.html', controller: 'BlogCltr'});
    $routeProvider.when('/blog/:slug', {templateUrl: function(url){console.log(url.slug);return '/views/blog-details.html';}, controller: 'BlogDetailsCltr'});
    $routeProvider.when('/contacts', {templateUrl: '/views/contact.html', controller: 'ContactCltr'});
});

app.controller('NavCltr', function($scope, $location){
    $scope.getClass = function (path) {
        return ($location.path() === path) ? 'active' : '';
    };
});

app.controller('ContactCltr', function($scope, $http){
    var refresh = function(){
        $http.get('/contactList').success(function(response){
            $scope.contactList = response;
            $scope.contact = "";
        });
    };
    
    refresh();
    
    $scope.addContact = function(){
        $http.post('/contactList', $scope.contact).success(function(response){
            refresh();
        });
    };
    
    $scope.remove = function(id){
        $http.delete('/contactList/' + id).success(function(response){
            refresh();
        });
    };
    
    $scope.modify = function(id){
        $http.get('/contactList/' + id).success(function(response){
            $scope.contact = response;
        });
    };
    
    $scope.updateContact = function(){
        $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
        });
    };
});

app.controller('BlogCltr', function($scope, $http){
    $http.get('/blog').success(function(response){
        $scope.blogs = response;
    });
});

app.controller('BlogDetailsCltr', function($scope, $http, $location){
    var slug = $location.path().substr($location.path().lastIndexOf('/') + 1);
    $http.get('/blog/' + slug).success(function(response){
        $scope.blog = response;
    });
});