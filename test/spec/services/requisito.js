'use strict';

describe('Service: Requisito', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Requisito;
  beforeEach(inject(function (_Requisito_) {
    Requisito = _Requisito_;
  }));

  it('should do something', function () {
    expect(!!Requisito).toBe(true);
  });

});
