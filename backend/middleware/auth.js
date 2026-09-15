
  const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // user is logged in, proceed
    }
    
  return res.status(401).json({
    error: 'Authentication required'
  })
  }

  const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(); // guest, proceed
    }
    return res.status(403).json({
    error: 'You are already logged in'
  })
    
  }

  export {ensureAuth,ensureGuest}
