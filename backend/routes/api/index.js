const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter)





//testing api JSON response from database
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   })

//testing demo user's ability to have cookie set in browser
//testing setTokenCookie function from utils/auth.js
//>>>> returns value of setTokenCookie's scope with correct insensitive information
//>>>>{id & username}
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

//testing restoreUser function from utils/auth.js
  //>>>> returns value of restoreUser's scope with correct insensitive information
  //>>>{id,username,email,created/updated}
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

//testing requireAuth function from utils/auth.js
//returns value of restoreUser's scope {id,username,email,created/updated}
//ONLY IF COOKIE TOKEN has previously been set
//returns "Unauthorized" Error if cookie token has not been set


router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;
