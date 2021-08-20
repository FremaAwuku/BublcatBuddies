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
        const events = await db.Event.findAll({include:{
            model:db.User}})
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
            include:{
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
            isPrivate,
            address,
            eventDate
        }= req.body

        const event = await db.Event.create({
            eventName,
            description,
            eventImageUrl,
            hostId,
            isPrivate,
            address,
            eventDate
        })
        const validationErrors = validationResult(req)
        if(validationErrors.isEmpty()){
            await event.save()
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
        isPrivate,
        address,
        eventDate
    }= req.body
     const event = await db.Event.findByPk(eventId)

    event.update({eventName,
    description,
    eventImageUrl,
    hostId,
    isPrivate,
    address,
    eventDate})

    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){
        await event.save()
        return res.json(event)
    }else{
        return res.redirect(`${req.baseUrl}/${event.id}/edit`)
    }


    }))

    router.delete(
        "/:id(\\d+)",
        requireAuth,
        asyncHandler(async(req,res)=>{
        const eventId = req.params.id

        const event = await db.Event.findByPk(eventId)
        console.log(event)
        await event.destroy({
            where:{
                id: eventId
            }
        });
        return res.redirect(`${req.baseUrl}`)
        })
    )

    //GET to all event's rsvps

    router.get(
        "/:id(\\d+)/rsvps",
        asyncHandler(async(req,res)=>{

            const rsvps = await db.Rsvp.findAll({where:{eventId:req.params.id}})
            return res.json(rsvps)

        })
    )

    //POST and rsvp to an event
    router.post(
        "/:id(\\d+)/rsvps",
        requireAuth ,
        asyncHandler(async(req,res)=>{
            const rsvp = await db.Rsvp.create(req.body)

            if(rsvp){
                rsvp.save()
                return res.json(rsvp)
            }

        })
    )


module.exports = router;
