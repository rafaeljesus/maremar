'use strict';

function DateSerializer() {

  this.SERVER_SIDE_FORMAT = 'YYYY-MM-DD';
  this.CLIENT_SIDE_FORMAT = 'DD/MM/YYYY';

  this.toServer = function(date) {
    if (!date) return null;
    if (date == moment(date, this.SERVER_SIDE_FORMAT).format(this.SERVER_SIDE_FORMAT)) return date;
    return moment(date + ' 23:59:59', this.CLIENT_SIDE_FORMAT + ' HH:mm:ss').format(this.SERVER_SIDE_FORMAT);//year + dateSeparator + month + dateSeparator + day;
  }

  this.toClient = function(date) {
    if (!date) return null;
    if (date == moment(date, this.CLIENT_SIDE_FORMAT).format(this.CLIENT_SIDE_FORMAT)) return date;
    return moment(date + ' 23:59:59', this.SERVER_SIDE_FORMAT + ' HH:mm:ss').format(this.CLIENT_SIDE_FORMAT);//year + dateSeparator + month + dateSeparator + day;
  }

}
