'use strict';

describe('Service: Habilidad', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Habilidad;
  beforeEach(inject(function (_Habilidad_) {
    Habilidad = _Habilidad_;
  }));

  it('should do something', function () {
    expect(!!Habilidad).toBe(true);
  });

});
