
import { Card }  from '../models/Cards.js'


  const getIndex =  async function (req, res) {
    try {
      const totalCards = await Card.countDocuments({ user: req.user._id }); // only user's cards
      res.status(200).json({
        totalCards,
        userName : req.user.userName // greet the logged-in user
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
      error: 'Error loading dashboard'
    })
    }
  }
export {getIndex}
