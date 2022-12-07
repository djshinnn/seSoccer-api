const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roundsSchema = new Schema({
  round: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  homeTeam: { type: String, required: true },
  homeTeamScore: { type: Number, required: true },
  awayTeam: { type: String, required: true },
  awayTeamScore: { type: Number, required: true },
  homeTeamVote: { type: Number, required: true },
  awayTeamVote: { type: Number, required: true },
  drawVote: { type: Number, required: true },
  homeTeamImg: { type: String, required: true },
  awayTeamImg: { type: String, required: true },
});

module.exports = mongoose.model("Round", roundsSchema);
