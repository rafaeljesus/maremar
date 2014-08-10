"use strict";

mrm.directive('datepicker', function() {

  return {
    restrict: 'AE',
    link: function(scope, el, attrs) {
      el.datepicker();
      scope.$watch('trip.date', function(newVal, oldVal) {
        if (!scope.trip) return;
        scope.trip.date = moment(newVal).format('DD/MM/YYYY');
      });
    }
  }

});
