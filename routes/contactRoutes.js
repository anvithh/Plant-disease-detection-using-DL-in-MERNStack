const express = require("express")
const router = express.Router()
const { getTrial, getTrials, postTrial, putTrial, deleteTrial } = require("../controllers/trialController")
const validateToken = require("../middleware/validateTokenHandler")


router.use(validateToken)


//GET ALL USERS AND CREATE USER
router.route('/').get(getTrials).post(postTrial)


//UPDATE, DELETE USER AND GET SINGLE USER
router.route('/:id').put(putTrial).delete(deleteTrial).get(getTrial);

 
module.exports = router;