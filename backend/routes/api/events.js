const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {eventValidations} = require('../../utils/validations/events')
const {  requireAuth } = require('../../utils/auth');
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
//POST /api/events
//AUTHORIZED users has access to add an event
const eventValidators = [
    check('eventName')
        .exists({ checkFalsy: true })
        .withMessage('Event Name Can Not Be Empty')
        .isLength({ max: 255 })
        .withMessage('Event Name must not be more than 255 characters long'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide Event Description'),
    check('eventImageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide Image URL'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address Can Not Be Empty')
        .isLength({ max: 255 })
        .withMessage('Address must not be more than 255 characters long'),
    check('eventDate')
        .isDate()
        .withMessage('Must be a Valid Date')
        .exists({ checkFalsy: true })
        .withMessage('Event Date Can Not Be Empty'),
];

router.post(
    '/',
     requireAuth,
    eventValidators,
    handleValidationErrors,
    asyncHandler(async(req,res)=>{
        const {
            eventName,
            description,
            eventImageUrl,
            hostId,
            private,
            address,
            eventDate
        }= req.body

        const event = await db.Event.create({
            eventName,
            description,
            eventImageUrl,
            hostId,
            private,
            address,
            eventDate
        })
        const validationErrors = validationResult(req)
        if(validationErrors.isEmpty()){
            await event.save
            return res.redirect(`${req.baseUrl}/${event.id}`)
        }else{
            return res.redirect(`/signup`)
        }




    })

)
 router.put(
 "/:id(\\d+)",
 requireAuth,
 eventValidators,
 handleValidationErrors,
 asyncHandler(async(req,res)=>{
     const eventId = req.params.id
    const {
        eventName,
        description,
        eventImageUrl,
        hostId,
        private,
        address,
        eventDate
    }= req.body
     const event = await db.Event.findByPk(eventId)

    event.update({eventName,
    description,
    eventImageUrl,
    hostId,
    private,
    address,
    eventDate})
     return res.json(event)
    }))

    router.delete(
        "/:id(\\d+)",
        requireAuth,
        asyncHandler(async(req,res)=>{
        const eventId = req.params.id

        const event = await db.Event.findByPk(eventId)
        await event.destroy();
        return res.redirect(`${req.baseUrl}/${eventId}`)
        })
    )


module.exports = router;
