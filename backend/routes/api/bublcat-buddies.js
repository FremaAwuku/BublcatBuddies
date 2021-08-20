const express = require("express");
const asyncHandler = require("express-async-handler");
const BublcatBuddiesRepo = require("../../db/bublcat-buddies-repository")

const router = express.Router();
router.delete('/:id(\\d+)',
//requireAuth,
asyncHandler(async (req, res) => {
  const buddyId = await BublcatBuddiesRepo.deleteBuddy(req.params.id);
  //not sure if we need to send back th
  return res.json({buddyId})

}
)
)
module.exports = router;
