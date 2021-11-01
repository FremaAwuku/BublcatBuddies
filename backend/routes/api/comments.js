const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {  requireAuth } = require('../../utils/auth');
const db = require('../../db/models');


const commentValidators =[
    check('content')
    .exists({ checkFalsy: true })
    .withMessage('Event Name Can Not Be Empty')
]

router.put(
    "/:id(\\d+)",
    requireAuth,
    commentValidators,
    handleValidationErrors,
    asyncHandler(async(req,res)=>{
        const commentId = req.params.id
        const{
            content
        }=req.body

        const comment = await db.Comment.findByPK(commentId)
        comment.update({
            content
        })

        const validationErrors = validationResult(req)
        if(validationErrors.isEmpty()){
            await comment.save()
            return res.json(comment)
        }

    }
))

router.delete(
    "/:id(\\d+)",
    requireAuth,
    asyncHandler(async(req,res)=>{
    const {commentId }= req.body


    const comment = await db.Comment.findByPk(commentId)

    await comment.destroy();
    return res.json({commentId})
    })
)
module.exports = router;
