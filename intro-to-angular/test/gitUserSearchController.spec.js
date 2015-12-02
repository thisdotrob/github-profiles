describe('GitUserSearchController', function() {

  var ctrl;
  var scope;
  var searchSpy = jasmine.createSpyObj('searchSpy', ['query']);

  console.log(searchSpy);

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function($rootScope, $controller, $q){
    scope = $rootScope.$new();
    ctrl = $controller('GitUserSearchController', {
      $scope: scope,
      Search: searchSpy
    });
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });


  describe('when searching for a user', function() {

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      inject(function($q) {
        searchSpy.query.and.returnValue($q.when({data:{items: items}}));
      });
      ctrl.doSearch();
      scope.$apply();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });
});
