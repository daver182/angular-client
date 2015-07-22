'use strict';

describe('Controller: DetalleevaluacionCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var DetalleevaluacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetalleevaluacionCtrl = $controller('DetalleevaluacionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
