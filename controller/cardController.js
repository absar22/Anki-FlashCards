
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
  },

//   Show All the cards
   
  showAllCards: async (req, res) => {
    try {
      const cards = await Card.find().sort({createdAt: -1})
      res.render('allCards', {cards})
    } catch (err) {
      console.error(err)
      res.status(500).send('Error fetching cards')
    }
  },

  // Delete cards
  deleteCard: async (req,res) => {
    try{
      const cards = await Card.findByIdAndDelete(req.params.id)
      console.log('Card deleted')
      res.redirect('/cards')   // go back to all cards page

    }catch(err){

       console.error(err)
      res.redirect('/cards')
    }
  },

  // Update Card


updateCard: async (req, res) => {
  try {
    const { front, back, deck } = req.body
    await Card.findByIdAndUpdate(req.params.id, {
      question: front,
      answer: back,
      tag: deck
    })
    res.redirect('/cards') // back to all cards page
  } catch (err) {
    console.error(err)
    res.status(500).send('Error updating card')
  }
},


showEditCardForm: async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) return res.status(404).send('Card not found')
    res.render('editCard', { card })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error loading edit form')
  }
}


}
