const express = require("express");

const roundsController = require("../controllers/rounds-controllers");

const router = express.Router();

router.get("/", roundsController.getRounds);

router.post("/", roundsController.postRounds);

router.patch("/:rid", roundsController.updateRounds);

module.exports = router;
