'use strict';

var DateValidator = {

  isValid: function(date) {
    var now = moment(), isDateValid = true, isDateFormatValid = true;
    if (!this.value) return false;

    isDateValid = this.value.length == 10;
    if (!isDateValid) return false;

    isDateFormatValid = moment(this.value, ['DD/MM/YYYY']).isValid();
    if (!isDateFormatValid) return false;

    var momentDateValue = moment(this.value);
    isDateValid = now.diff(momentDateValue, 'days', true) >= 0; //validating day equal of before today (never after)
    return isDateValid;
  }

};
