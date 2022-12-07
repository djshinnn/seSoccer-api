const HttpError = require("../models/http-error");

const roundsOfMatch = require("../models/rounds.js");

const getRounds = async (req, res, next) => {
  let rounds;
  try {
    rounds = await roundsOfMatch.find();
  } catch (err) {
    const error = new HttpError(
      "데이터를 불러오는데 실패하셨습니다, 다시 시도해주세요.",
      500
    );
    return next(error);
  }
  res.json({
    rounds: rounds.map((round) => round.toObject({ getters: true })),
  });
};

const postRounds = async (req, res, next) => {
  const {
    round,
    date,
    time,
    homeTeam,
    homeTeamScore,
    awayTeam,
    awayTeamScore,
    homeTeamVote,
    awayTeamVote,
    drawVote,
    homeTeamImg,
    awayTeamImg,
  } = req.body;
  const createdRounds = new roundsOfMatch({
    round,
    date,
    time,
    homeTeam,
    homeTeamScore,
    awayTeam,
    awayTeamScore,
    homeTeamVote,
    awayTeamVote,
    drawVote,
    homeTeamImg,
    awayTeamImg,
  });
  try {
    await createdRounds.save();
  } catch (err) {
    const error = new HttpError("데이터 저장에 실패하셨습니다.", 500);
    return next(error);
  }
  res.status(201).json({ rounds: createdRounds.toObject({ getters: true }) });
};

exports.getRounds = getRounds;
exports.postRounds = postRounds;
