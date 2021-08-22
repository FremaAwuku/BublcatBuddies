const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
//DELETE EVENT
    router.delete(
        "/:id(\\d+)",
        requireAuth,
        asyncHandler(async(req,res)=>{
        const eventId = req.params.id

        const event = await db.Event.findByPk(eventId)

        await event.destroy();
        return res.json({})
        })
    )




    //RSVPS
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
            //TODO Query to check if rsvp exisit
            //IF exiist update if it doesnt create

                const {
                    eventId,
                    userId,
                    confirmed
                }= req.body

                const rsvp = await db.Rsvp.findOne({where:{eventId, userId}})

                if(!rsvp){
                    const newRsvp = await db.Rsvp.create({eventId,userId,confirmed})


                        newRsvp.save()
                        return res.json(newRsvp)


                }else{

                   const updatedRsvp = await rsvp.update({
                        eventId,
                        userId,
                        confirmed
                    })

                    updatedRsvp.save()

                    return res.json(updatedRsvp)
                }

        })
    )


router.delete(
    "/:id(\\d+)/rsvps",
     requireAuth,
    asyncHandler(async(req,res)=>{
        const {
            eventId,
            userId,
        }= req.body

        const rsvp = await db.Rsvp.findOne({where:{eventId, userId}})

        await db.Rsvp.destroy({where:{eventId, userId}})

    return res.json({rsvpId:rsvp.id})
    })
)


module.exports = router;
