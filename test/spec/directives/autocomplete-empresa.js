'use strict';

describe('Directive: autocompleteEmpresa', function () {

  // load the directive's module
  beforeEach(module('seedApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<autocomplete-empresa></autocomplete-empresa>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autocompleteEmpresa directive');
  }));
});
