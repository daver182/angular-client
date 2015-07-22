'use strict';

describe('Service: Buscarempresa', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Buscarempresa;
  beforeEach(inject(function (_Buscarempresa_) {
    Buscarempresa = _Buscarempresa_;
  }));

  it('should do something', function () {
    expect(!!Buscarempresa).toBe(true);
  });

});
