'use strict';

describe('Controller: DetallecontratoCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var DetallecontratoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetallecontratoCtrl = $controller('DetallecontratoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
