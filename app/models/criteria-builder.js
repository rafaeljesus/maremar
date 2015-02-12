'use strict';

var _         = require('lodash')
  , moment    = require('moment');

exports.build = function(criteria) {
  var query = {};
  if (_.keys(criteria).length === 0) {
    query.createdAt = {
      $gte: moment().startOf('day').toDate(),
      $lt: moment().endOf('day').toDate()
    };
  } else {
    query.createdAt = {
      $gte: moment(criteria.createdAt).startOf('day').toDate(),
      $lt: moment(criteria.createdAt).endOf('day').toDate()
    };
  }
  return query;
};
