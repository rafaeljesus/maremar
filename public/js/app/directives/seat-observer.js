mrm.directive('seatObserver', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, el, attrs) {
      scope.$watch(attrs.seatObserver, function(value) {
			  console.log(value);
			},true);
    }
  };
});
