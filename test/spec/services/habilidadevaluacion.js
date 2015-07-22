'use strict';

describe('Service: Habilidadevaluacion', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Habilidadevaluacion;
  beforeEach(inject(function (_Habilidadevaluacion_) {
    Habilidadevaluacion = _Habilidadevaluacion_;
  }));

  it('should do something', function () {
    expect(!!Habilidadevaluacion).toBe(true);
  });

});
