'use strict';

describe('Service: Estadorequisito', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Estadorequisito;
  beforeEach(inject(function (_Estadorequisito_) {
    Estadorequisito = _Estadorequisito_;
  }));

  it('should do something', function () {
    expect(!!Estadorequisito).toBe(true);
  });

});
