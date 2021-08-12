const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

//uses express check to verify if login credentials are valid
//based on models/user.js sequelize restrictions
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];


/**
 * router.get('/')
 * restore user's session if user is authorized
 * returns JSON
 */
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);



/*
router.post('/')
>extracts user input from req.body
>validates user input with validateLogin middleware
uses static method found on User model
that takes input within specified 'loginUser' scope
and searches database with given information

if user is not found an error is found and passed to error handlers
found in root app.js

if user is found cookie is set and JSON is returned
*/
router.post(
  '/',
  validateLogin,
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
