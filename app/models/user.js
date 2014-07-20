module.exports = function(app) {

  var db = require('../../lib/db_connect')()
  , Schema = require('mongoose').Schema
  , crypto = require('crypto')
  ;

  var User = Schema({
    name: { type: String, required: true }
    , email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
        index: { unique: true }
      }
    , password: { type: String, require: true }
    , createdAt: Date
    , updatedAt: Date
  });

  User.statics.register = function(user, cb) {
    var shaSum = crypto.createHash('sha256');
      shaSum.update(user.password);
      var attrs = {
        name: user.name,
        email: user.email,
        password: shaSum.digest('hex')
      };
      return this.create(attrs, function(err, doc) {
        if (err) return cb(err);
        cb(null, doc);
      });
  };

  User.statics.authenticate = function(user, cb) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(user.password);
    return this.findOne({ email: user.email, password: shaSum.digest('hex') }, function(err, doc) {
      if (err) return cb(err);
      cb(null, doc);
    });
  };

  User.statics.changePassword = function(userId, newPassword, cb) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(newPassword);
    var hashedPassword = shaSum.digest('hex');
    return this.update({ _id: userId }, { $set: { password: hashedPassword } }, { upsert: false }, function(err, numberAffected) {
      if (err) return cb(err);
      cb(null, { numberAffected: numberAffected });
    });
  };

  User.statics.forgotPassword = function(email, resetPasswordUrl, cb) {
    return this.findOne({ email: email }, function(err, doc) {
      if (err) return cb(err);
      /*var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
      resetPasswordUrl += '?account=' + doc._id;
      smtpTransport.sendMail({
        from: 'thisapp@example.com',
        to: doc.email,
        subject: 'Maremar Password Request',
        text: 'Click here to reset your password: ' + resetPasswordUrl
      }, function(err) {
        if (err) {
          cb(err);
        } else {
          cb(null);
        }
      });*/
    });
  };

  User.pre('save', function(next) {
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

  return db.model('users', User);
};

/*
passeio
- veiculo
- horario ida
- horario volta
- createdAt
- lastupdatedAt*/
