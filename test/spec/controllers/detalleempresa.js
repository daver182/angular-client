'use strict';

describe('Controller: DetalleempresaCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var DetalleempresaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetalleempresaCtrl = $controller('DetalleempresaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
