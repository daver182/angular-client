'use strict';

describe('Service: Recursos', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Recursos;
  beforeEach(inject(function (_Recursos_) {
    Recursos = _Recursos_;
  }));

  it('should do something', function () {
    expect(!!Recursos).toBe(true);
  });

});
