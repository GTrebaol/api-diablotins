module.exports = function (req, res, next) {
  let i18n = require('i18n');
  let jwt = app.get('jwt');
  //Check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  //Decode token
  if (token) {
    //Verify secret and check the expiration datetime
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ code: 403, message: i18n.__('token.expired') });
        }
        return res.status(403).json({ code: 403, message: i18n.__('token.failed') });
      } else {
        //Save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ code: 403, message: i18n.__('token.empty') });
  }
};