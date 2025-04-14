const express = require("express");
const {
  createAnnonce,
  GetAnnonces,
  getAllActivities,
  deleteActivity,
} = require("../controllers/annonceController");

const router = express.Router();

router.post("/", createAnnonce);

router.get("/", GetAnnonces);

router.get("/activities", getAllActivities);

router.delete("/:annonceId/activity/:activityId", deleteActivity);
module.exports = router;
