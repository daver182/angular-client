'use strict';

describe('Controller: ContratoCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var ContratoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContratoCtrl = $controller('ContratoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
