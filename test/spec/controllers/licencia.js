'use strict';

describe('Controller: LicenciaCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var LicenciaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LicenciaCtrl = $controller('LicenciaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
