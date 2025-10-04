const Card = require('../models/Cards');

module.exports = {
  getIndex: async (req, res) => {
    try {
      const totalCards = await Card.countDocuments({ user: req.user._id }); // only user's cards
      res.render('index', { 
        totalCards,
        userName: req.user.userName // greet the logged-in user
      });
    } catch (err) {
      console.error(err);
      res.render('index', { totalCards: 0, userName: '' });
    }
  }
};
