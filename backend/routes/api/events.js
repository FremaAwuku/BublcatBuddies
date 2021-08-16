const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const db = require('../../db/models');
//GET /api/events
//any user has access to all events
router.get(
    '/',
    asyncHandler(async(req,res)=>{
        const events = await db.Event.findAll()
        return res.json(events)
    })
)
//GET /api/events/:eventId
//any user has access to an individual event
router.get(
    "/:id(\\d+)",
    asyncHandler(async(req,res)=>{
        const eventId = req.params.id
        const event = await db.Event.findByPk(eventId,{
            include:{ model:db.Rsvp,
            model:db.User}
        })


        return res.json(event)
    })
)

module.exports = router;
