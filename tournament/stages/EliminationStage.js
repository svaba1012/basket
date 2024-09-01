import Stage from "./Stage.js";
import Match from "../Match.js";

class EliminationStage extends Stage {
  constructor(label) {
    super();
    this.label = label;
  }

  init(teamList) {
    this.teamList = teamList;
    this.matches = [];
  }

  getWinners() {
    return this.matches.map((el) => el.getWinner());
  }

  getLosers() {
    return this.matches.map((el) => el.getLoser());
  }

  simulate() {
    for (let i = 0; i < this.teamList.length; i += 2) {
      const team1 = this.teamList[i];
      const team2 = this.teamList[i + 1];
      const match = new Match(team1, team2);
      match.simulate();
      this.matches.push(match);
    }
    let winners = this.matches.map((el) => el.getWinner());
    if (this.matches.length == 2) {
      let losers = this.matches.map((el) => el.getLoser());
      this.nextStages[0].init(losers);
      this.nextStages[1].init(winners);
    } else if (this.matches.length > 1) {
      this.nextStages[0].init(winners);
    }
    this.simulateNext();
  }

  print() {
    const matchesText = this.matches.reduce((prev, el, idx) => {
      let prefix = "\n    ";
      if (idx % 2 == 0 && idx > 0) {
        prefix = "\n\n    ";
      }
      return prev + prefix + el.toString();
    }, `${this.label}:`);
    console.log(matchesText);
    console.log("\n");
    this.printNext();
  }
}

export default EliminationStage;
