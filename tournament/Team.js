import fs from "fs";
import Match from "./Match.js";

const teamMap = new Map();
const exibitionsDataJSON = fs.readFileSync("./exibitions.json");
const exibitionsData = JSON.parse(exibitionsDataJSON);

class Team {
  constructor(teamObj) {
    this.name = teamObj.Team;
    this.isoCode = teamObj.ISOCode;
    this.fibaRanking = teamObj.FIBARanking;
    this.matchHistory = [];
    this.form = 0.0;
    teamMap.set(this.isoCode, this);
  }

  init() {
    exibitionsData[this.isoCode].forEach((exData) => {
      const opponentIso = exData.Opponent;
      const opponentTeam = teamMap.get(opponentIso);
      const [score1Str, score2Str] = exData.Result.split("-");
      const exMatch = new Match(this, opponentTeam);
      exMatch.setPlayed(parseInt(score1Str), parseInt(score2Str));
    });
  }

  update(match, formChange) {
    this.form *= 0.1;
    this.form += 0.9 * formChange;
    this.matchHistory.push(match);
  }
}

export default Team;
