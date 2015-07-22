'use strict';

describe('Service: Tipousuario', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Tipousuario;
  beforeEach(inject(function (_Tipousuario_) {
    Tipousuario = _Tipousuario_;
  }));

  it('should do something', function () {
    expect(!!Tipousuario).toBe(true);
  });

});
