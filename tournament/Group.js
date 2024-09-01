import Match from "./Match.js";
import Team from "./Team.js";
import GroupStanding from "./GroupStanding.js";

class Group {
  constructor(groupName, teamList) {
    this.groupName = groupName;
    this.teamList = teamList;
    this.matches = [];
    this.groupStanding = [];
  }

  simulate() {
    for (let i = 0; i < this.teamList.length; i++) {
      let team1 = this.teamList[i];
      // team1.init();
      for (let j = i + 1; j < this.teamList.length; j++) {
        let team2 = this.teamList[j];
        let match = new Match(team1, team2);
        match.simulate();
        this.matches.push(match);
      }
      this.groupStanding.push(new GroupStanding(team1, this));
    }
    this.groupStanding.sort((st1, st2) => {
      if (st1.pts == st2.pts) {
        if (st1.diff == st2.diff) {
          return st2.scored - st2.scored;
        }
        return st2.diff - st1.diff;
      }
      return st2.pts - st1.pts;
    });
  }

  printRound(round) {
    const firstMatch = this.matches[round];
    const secondMatch = this.matches[this.matches.length - round - 1];
    console.log(
      `    Grupa ${this.groupName}:
        ${firstMatch.toString()}
        ${secondMatch.toString()}`
    );
  }

  printStandings() {
    console.log(
      `    Grupa ${this.groupName} (Ime - pobede/porazi/bodovi/postignuti koševi/primljeni koševi/koš razlika):`
    );
    this.groupStanding.forEach((st, i) => {
      console.log(`        ${i + 1}. ${st.toString()}`);
    });
  }
}

export default Group;
