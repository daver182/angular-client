'use strict';

describe('Controller: EvaluacionCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var EvaluacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvaluacionCtrl = $controller('EvaluacionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
