const Card = require('../models/Cards')  

module.exports = {
  getIndex: async (req, res) => {
    try {
      const totalCards = await Card.countDocuments()  // get total number of cards
      res.render('index', { totalCards })            // pass it to EJS
    } catch (err) {
      console.error(err)
      res.render('index', { totalCards: 0 })
    }
  }
}
