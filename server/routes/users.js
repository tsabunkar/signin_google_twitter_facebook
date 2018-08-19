var express = require('express');
var router = express.Router();

//Middleware to secure the routes
router.use('/', (req, resp, next) => {
  if (!req.user) {
    resp.redirect('/'); //If user is signed-in but directly trying to hardcode the url as [http://localhost:3000/users/] then redirect to -> [http://localhost:3000/] login page
    return
  }
  next(); //if condition is not executed then contiue with the process,This middleware wont interfier
})

router.get('/', function (req, res, next) {
  res.render('users', {
    user: {
      // name: req.user.displayName,
      // image: req.user._json.image.url
      name: req.user.name,
      image: req.user.imageUrl
    }
  });
});


module.exports = router;