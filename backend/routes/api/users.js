const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, BublcatBuddy, Rsvp } = require('../../db/models');


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
    check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a First Name with at least 2 characters.'),
    check('profileImgUrl')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Profile Image URL.'),
  handleValidationErrors,
];

//GETS ALL USERS
//used in user search
router.get('/',
asyncHandler(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}
))

router.get('/:id(\\d+)',

requireAuth,
asyncHandler(async (req, res) => {

  const user = await User.findByPk(req.params.id)
  return res.json(user)
}
))

//--------------------BUBLCAT BUDDIES-----------------------------

//GET SPECIFIC USERS BUDDY LIST
router.get('/:id(\\d+)/bublcat-buddies',
requireAuth,
asyncHandler(async (req, res) => {
  const buddyList = await BublcatBuddy.findAll({where:{userId:req.params.id}})
  return res.json(buddyList)
}
)
)

//add friend to buddies list
router.post('/:id(\\d+)/bublcat-buddies',
requireAuth,
asyncHandler(async (req, res) => {

  const buddy = await BublcatBuddy.create(req.body)
   if(buddy){
     buddy.save()
     return res.json(buddy)
   }
}
)
)

router.delete('/:id(\\d+)/bublcat-buddies',
 requireAuth,
asyncHandler(async (req, res) => {
  const {
    userId,
    buddyId
  }=req.body

  const buddy = await BublcatBuddy.findOne({where:{userId, buddyId}})
  // const buddyId = await BublcatBuddiesRepo.deleteBuddy(req.params.id);

      await BublcatBuddy.destroy({where:{userId,buddyId}})

      //will       VVVVthis    be pulled from the req body??
  return res.json({buddyId:buddy.id})

}
)
)



//---------------------------RSVPS-------------------------------------



//GET ALL USERS RSVPS
//Found on User profile page
router.get('/:id(\\d+)/rsvps',
   requireAuth,
  asyncHandler(async (req, res) => {
    const userRsvps = await Rsvp.findAll({where:{userId:req.params.id}})
    return res.json(userRsvps)
  }
  )

)



//--------------------------SIGN UP-----------------------

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
    const { email, password, username , profileImgUrl, firstName} = req.body;
    const user = await User.signup({ email, username, password , profileImgUrl,firstName});

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);





module.exports = router;
