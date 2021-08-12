const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

/** router.post('/')
 * handles user sign up by extracting user input from req body
 * uses User.signup(User Model static method) to sign up user
 * sets cookie Token
 * returns json of user
 */
router.post(
    '/',
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );






module.exports = router;
