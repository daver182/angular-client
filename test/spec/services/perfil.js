'use strict';

describe('Service: perfil', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var perfil;
  beforeEach(inject(function (_perfil_) {
    perfil = _perfil_;
  }));

  it('should do something', function () {
    expect(!!perfil).toBe(true);
  });

});
