const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, BublcatBuddy } = require('../../db/models');


//uses express validator to check user inputs
//passes the handleValidationErrors
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

//GETS ALL USERS
//used in user search
router.get('/',
requireAuth,
asyncHandler(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}
))

//GET SPECIFIC USERS BUDDY LIST
router.get('/:id(\\d+)/bublcat-buddies',
// requireAuth,
asyncHandler(async (req, res) => {
  const buddyList = await BublcatBuddy.findAll({where:{userId:req.params.id}})
  return res.json(buddyList)
}
)
)

//add friend to buddies list
router.post('/:id(\\d+)/bublcat-buddies',
// requireAuth,
asyncHandler(async (req, res) => {
  const buddy = await BublcatBuddy.create(req.body)
   if(buddy){
     buddy.save()
     return res.json(buddy)
   }
}
)
)






/** router.post('/')
 * verify users inputs through validateSignup
 * handles user sign up by extracting user input from req body
 * uses User.signup(User Model static method) to sign up user
 * sets cookie Token
 * returns json of user
 */
 router.post(
  '/',
  validateSignup,
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
