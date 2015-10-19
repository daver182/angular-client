'use strict';

describe('Service: fechas', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var fechas;
  beforeEach(inject(function (_fechas_) {
    fechas = _fechas_;
  }));

  it('should do something', function () {
    expect(!!fechas).toBe(true);
  });

});
