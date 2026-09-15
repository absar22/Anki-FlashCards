// | Package           | Main job                                                      |
// | ----------------- | ------------------------------------------------------------- |
// | `passport`        | Authentication framework                                      |
// | `passport-local`  | Tells Passport **how to authenticate with username/password** |
// | `express-session` | Keeps the user **logged in across requests**                  |


import { Strategy as LocalStrategy } from 'passport-local'
import {User} from '../models/User.js'

 function configurePassport(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })

          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          const isMatch = await user.comparePassword(password)

          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' })
          }

          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)

      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}

export {configurePassport}
