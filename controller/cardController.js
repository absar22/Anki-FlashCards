
const Card = require('../models/Cards')   

module.exports = {
  // Show form
  showCreateForm: (req, res) => {
    res.render('newCard')
  },

  // Handle form submit
  createCard: async (req, res) => {
    try {
      const { front, back, deck } = req.body

      // Create a new card document
      await Card.create({
        question: front,
        answer: back,
        tag: deck || 'general'
      })

      res.redirect('/')  // after saving, go back home
    } catch (err) {
      console.error(err)
      res.status(500).send('Error creating card')
    }
  }
}
