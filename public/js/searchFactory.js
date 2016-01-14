githubUserSearch.factory('Search', ['$http', function($http) {

  return {
    query: function(searchTerm) {
      return $http({
        url: '/',
        method: 'POST',
        params: {
          'searchTerm': searchTerm
        }
      });
    }
  };
  
}]);
