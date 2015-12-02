describe('GitUserSearchController', function() {

  var ctrl;

  var _Search_ = {
    query: function(){
      return { then: function(cb) { cb({data: {items: items}});}};
    }
  };

  beforeEach(module('GitUserSearch'));
  beforeEach(module({Search: _Search_}));

  beforeEach(inject(function($controller){
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });


  describe('when searching for a user', function() {

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });
});
