const express = require('express')
const router = express.Router();

const asyncHandler = require('express-async-handler');

const {  requireAuth } = require('../../utils/auth');
const db = require('../../db/models');


router.get(
    '/',
    asyncHandler(async(req,res)=>{
        const rsvps = await db.Rsvp.findAll()
        return res.json(rsvps)
    })
)

//
//get individual rsvp
router.get(
    "/:id(\\d+)",
    asyncHandler(async(req,res)=>{
        const rsvpId = req.params.id
        const rsvp = await db.Rsvp.findByPk(rsvpId)

         return res.json(rsvp)
    })
)

//PUT TO SPECiFIC RSVP
//CHANGE RSVP TO CONFIRMED
router.put(
    "/:id(\\d+)",
    requireAuth,
    asyncHandler(async(req,res)=>{
        const rsvpId = req.params.id
         const {
             userId,
             eventValidations,
             confirmation
         }=req.body
         const rsvp = await db.Rsvp.findByPk(rsvpId)
         rsvp.update({

                userId,
                eventValidations,
                confirmation
         })
         if(rsvp){
            await rsvp.save()
            return res.json
         }

    })
)


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
