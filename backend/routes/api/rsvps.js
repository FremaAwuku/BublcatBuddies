const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {eventValidations} = require('../../utils/validations/events')
const {  requireAuth } = require('../../utils/auth');
const db = require('../../db/models');


router.get(
    '/',
    asyncHandler(async(req,res)=>{
        const events = await db.Rsvp.findAll()
        return res.json(events)
    })
)
router.get(
    "/:id(\\d+)",
    asyncHandler(async(req,res)=>{
        const rsvpId = req.params.id
        const rsvp = await db.Rsvp.findByPk(rsvpId)

         return res.json(rsvp)
    })
)

//post and put
//column are not showing 

router.delete(
    "/:id(\\d+)",
    requireAuth,
    asyncHandler(async(req,res)=>{
    const rsvpId = req.params.id

    const rsvp = await db.Rsvp.findByPk(rsvpId)

     await rsvp.destroy({
        where:{
            id: rsvpId
        }
    });
    return res.redirect(`${req.baseUrl}`)
    })
)


module.exports = router
