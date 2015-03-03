'use strict';

describe('Service: Trabajador', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Trabajador;
  beforeEach(inject(function (_Trabajador_) {
    Trabajador = _Trabajador_;
  }));

  it('should do something', function () {
    expect(!!Trabajador).toBe(true);
  });

});
