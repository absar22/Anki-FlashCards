
module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // user is logged in, proceed
    }
    res.redirect('/login'); // not logged in, redirect to login
  },

  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(); // guest, proceed
    }
    res.redirect('/'); // already logged in, go home
  }
};
