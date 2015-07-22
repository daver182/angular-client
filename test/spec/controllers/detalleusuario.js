'use strict';

describe('Controller: DetalleusuarioCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var DetalleusuarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetalleusuarioCtrl = $controller('DetalleusuarioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
