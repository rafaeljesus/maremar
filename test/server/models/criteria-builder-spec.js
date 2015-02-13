'use strict';

var CriteriaBuilder  = require('../../../app/models/criteria-builder')
  , expect           = require('chai').expect
  , moment           = require('moment');

describe('CriteriaBuilderSpec', function() {

  it('when empty criteria then build query date range with current date', function() {
    var query = CriteriaBuilder.build({});
    expect(query.createdAt.$gte).to.deep.equal(moment().startOf('day').toDate());
    expect(query.createdAt.$lt).to.deep.equal(moment().endOf('day').toDate());
  });

  it('when sesrch criteria given then build query', function() {
    var date = '2015-1-1';
    var query = CriteriaBuilder.build({ createdAt: date });
    expect(query.createdAt.$gte).to.deep.equal(moment(date).startOf('day').toDate());
    expect(query.createdAt.$lt).to.deep.equal(moment(date).endOf('day').toDate());
  });

});
