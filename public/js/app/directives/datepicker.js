'use strict';

mrm.directive('datePicker', [function() {

  var datePickerOptions = {
    maxDate : 0,
    defaultDate : 0,
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy',
    yearRange: '-6:+6'
  };

  var onBlur = function(e) {
    var value = $(this).val();
    if (!value) return;
    var isDateValid = DateValidator.isValid(date);
    if (!isDateValid) $(this).val('');
  };

  var onBtnClick = function(e) {
    e && e.preventDefault();
    $(element).focus();
  };

  var linker = function (scope, element, attrs, ngModelCtrl) {

    var onSelect = function(date) {
      scope.$apply(function() {
        ngModelCtrl.$setViewValue(date);
        $(this).blur();
      });
    };

    if (attrs.options) {
      datePickerOptions = scope[attrs.options];
    }

    datePickerOptions.onSelect = onSelect;

    element
      .datepicker(datePickerOptions)
      .on('blur', onBlur)
      .prev('.btn').on('click', onBtnClick);

    $('.input-prepend, .input-append').on('focus, input', function() {
      $(this).closest('.control-group, form').addClass('focus');
    }).on('blur', 'input', function () {
      $(this).closest('.control-group, form').removeClass('focus');
    });
  };

  return {
    restrict: 'EA',
    require : 'ngModel',
    link : linker
  };

}]);
