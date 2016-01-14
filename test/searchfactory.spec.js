describe('factory: Search', function() {

  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .expectPOST("/?searchTerm=hello")
      .respond(items);
    }
  ));

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    search.query('hello')
      .then(function(response) {
        expect(response.data).toEqual(items);
      });
    httpBackend.flush();
  });

});
