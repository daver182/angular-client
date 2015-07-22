'use strict';

describe('Service: Toast', function () {

  // load the service's module
  beforeEach(module('seedApp'));

  // instantiate service
  var Toast;
  beforeEach(inject(function (_Toast_) {
    Toast = _Toast_;
  }));

  it('should do something', function () {
    expect(!!Toast).toBe(true);
  });

});
