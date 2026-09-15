import {Card }from '../models/Cards.js'

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}


// Create Card
const createCard = async (req, res) => {
  try {
    const { front, back, deck } = req.body

    const card = await Card.create({
      question: front,
      answer: back,
      tag: deck || 'general',
      user: req.user._id
    })

    res.status(201).json({
      message: 'Card created successfully',
      card
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Error creating card'
    })
  }
}


// Get All Cards
const showAllCards = async (req, res) => {
  try {
    const cards = await Card.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    })

    res.status(200).json({
      message: 'Cards fetched successfully',
      cards
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Error fetching cards'
    })
  }
}


// Delete Card
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    })

    if (!card) {
      return res.status(404).json({
        error: 'Card not found'
      })
    }

    res.status(200).json({
      message: 'Card deleted successfully'
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Error deleting card'
    })
  }
}


// Update Card
const updateCard = async (req, res) => {
  try {
    const { front, back, deck } = req.body

    const card = await Card.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        question: front,
        answer: back,
        tag: deck
      },
      {
        new: true
      }
    )

    if (!card) {
      return res.status(404).json({
        error: 'Card not found'
      })
    }

    res.status(200).json({
      message: 'Card updated successfully',
      card
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Error updating card'
    })
  }
}


// Study Mode
const getStudy = async (req, res) => {
  try {
    let cards = await Card.find({
      user: req.user._id
    })
      .select('question answer')
      .lean()

    cards = shuffle(cards)

    res.status(200).json({
      message: 'Study cards fetched successfully',
      cards
    })

  } catch (err) {
    console.error(`Error loading study mode: ${err}`)

    res.status(500).json({
      error: 'Error loading study mode'
    })
  }
}


export {  createCard,showAllCards,deleteCard,updateCard,getStudy}