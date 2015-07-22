'use strict';

describe('Controller: NominasCtrl', function () {

  // load the controller's module
  beforeEach(module('seedApp'));

  var NominasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NominasCtrl = $controller('NominasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
