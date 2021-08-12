const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


/*
router.post('/')
>extracts user input from req.body
uses static method found on User model
that takes input within specified 'loginUser' scope
and searches database with given information

if user is not found an error is found and passed to error handlers
found in root app.js

if user is found cookie is set and JSON is returned
*/
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
);

/*
router.delete('/')
>calls on response to clear persisted cookie token
>returns a json response indicating logout was successful
*/
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'logout successful' });
  }
);




module.exports = router;
