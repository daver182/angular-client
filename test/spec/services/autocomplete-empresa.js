'use strict';

describe('Service: AutocompleteEmpresa', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var AutocompleteEmpresa;
  beforeEach(inject(function (_AutocompleteEmpresa_) {
    AutocompleteEmpresa = _AutocompleteEmpresa_;
  }));

  it('should do something', function () {
    expect(!!AutocompleteEmpresa).toBe(true);
  });

});
