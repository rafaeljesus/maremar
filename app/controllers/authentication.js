module.exports = function(app){

  var User = app.models.user;

  var AuthController = {

    authenticate: function(req, res) {
      User.authenticate(req.body.user, function(err, user) {
        if (err) return res.json(403, err);
        req.session.user = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        res.json(req.session.user);
      });
    },

    register: function(req, res) {
      User.register(req.body.user, function(err, user) {
        if (err) return res.json(401, err);
        req.session.user = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        res.json(req.session.user);
      });
    },

    changePassword: function(req, res) {
      var userId = req.body.user.id
      , newPassword = req.body.user.password;
      User.changePassword(userId, newPassword, function(err, user) {
        if (err) return res.json(401, err);
        res.json(200);
      });
    }
  };

  return AuthController;
};
