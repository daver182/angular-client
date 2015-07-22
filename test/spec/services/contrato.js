'use strict';

describe('Service: Contrato', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Contrato;
  beforeEach(inject(function (_Contrato_) {
    Contrato = _Contrato_;
  }));

  it('should do something', function () {
    expect(!!Contrato).toBe(true);
  });

});
