import Team from "./Team.js";
import gaussianRandom from "../utils/gaussianRandom.js";

class Match {
  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
    this.score1 = 0;
    this.score2 = 0;
  }

  #getStatisticalResult() {
    const temp =
      Math.log(this.team1.fibaRanking + 1) -
      Math.log(this.team2.fibaRanking + 1);

    const midPoints = gaussianRandom(85, 2);

    const expected1 = midPoints - 3 * temp + this.team1.form * 0.1;
    const expected2 = midPoints + 3 * temp + this.team2.form * 0.1;

    return [expected1, expected2];
  }

  #getFormChange(expectedDiff) {
    const formChange = this.score1 - this.score2 - expectedDiff;
    // console.log(
    //   `Form change - ${formChange} for : ${this.team1.name} - ${
    //     this.team2.name
    //   }  expectedDif = ${expectedDiff}, realDiff = ${this.score1 - this.score2}`
    // );

    return formChange;
  }

  simulate() {
    const [expected1, expected2] = this.#getStatisticalResult();
    const expectedDiff = expected1 - expected2;

    this.score1 = Math.round(gaussianRandom(expected1, 4));
    while (this.score2 <= 0 || this.score2 == this.score1) {
      this.score2 = Math.round(gaussianRandom(expected2, 4));
    }

    const formChange = this.#getFormChange(expectedDiff);
    this.team1.update(this, formChange);
    this.team2.update(this, -formChange);
  }

  setPlayed(score1, score2) {
    this.score1 = score1;
    this.score2 = score2;
    const [expected1, expected2] = this.#getStatisticalResult();
    const expectedDiff = expected1 - expected2;
    const formChange = this.#getFormChange(expectedDiff);
    this.team1.update(this, formChange);
  }

  getWinner() {
    if (this.score1 > this.score2) {
      return this.team1;
    }
    return this.team2;
  }

  getLoser() {
    if (this.score2 > this.score1) {
      return this.team1;
    }
    return this.team2;
  }

  getTeamScore(team) {
    if (team == this.team1) {
      return this.score1;
    } else {
      return this.score2;
    }
  }

  getTeamReceived(team) {
    if (team == this.team1) {
      return this.score2;
    } else {
      return this.score1;
    }
  }

  toString() {
    return `${this.team1.name} - ${this.team2.name} (${this.score1}:${this.score2})`;
  }
}

export default Match;
