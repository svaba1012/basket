import fs from "fs";
import Stage from "./Stage.js";
import Group from "../Group.js";
import Team from "../Team.js";
import Draw from "../Draw.js";

class GroupStage extends Stage {
  constructor() {
    super();
    this.draw = new Draw();
  }

  init() {
    const groupDataJSON = fs.readFileSync("./groups.json");
    let groupData = JSON.parse(groupDataJSON);

    const groupLabels = Object.keys(groupData);
    let allTeams = [];
    this.groups = groupLabels.map((grLabel) => {
      const teamListData = groupData[grLabel];
      let teamList = teamListData.map((tData) => {
        let team = new Team(tData);
        return team;
      });

      allTeams = [...allTeams, ...teamList];

      return new Group(grLabel, teamList);
    });

    allTeams.forEach((team) => team.init());

    this.standings = [];
  }

  #standingCompare(st1, st2) {
    if (st1.pts == st2.pts) {
      if (st1.diff == st2.diff) {
        return st2.scored - st2.scored;
      }
      return st2.diff - st1.diff;
    }
    return st2.pts - st1.pts;
  }

  simulate() {
    this.groups.forEach((gr) => gr.simulate());

    let standingsFirst = [];
    let standingsSecond = [];
    let standingsThird = [];

    this.groups.forEach((gr) => {
      // gr.printStandings();
      standingsFirst.push(gr.groupStanding[0]);
      standingsSecond.push(gr.groupStanding[1]);
      standingsThird.push(gr.groupStanding[2]);
    });

    standingsFirst.sort(this.#standingCompare);
    standingsSecond.sort(this.#standingCompare);
    standingsThird.sort(this.#standingCompare);
    standingsThird.pop();

    this.standings = [...standingsFirst, ...standingsSecond, ...standingsThird];

    const mixedTeams = this.draw.mix(this.standings);

    this.nextStages[0].init(mixedTeams);

    this.simulateNext();
  }

  print() {
    let roundRomanNum = "";
    for (let i = 0; i < 3; i++) {
      roundRomanNum += "I";
      console.log(`Grupna faza - ${roundRomanNum} kolo:`);
      this.groups.forEach((gr) => gr.printRound(i));
      console.log(``);
    }

    console.log(`Konačan plasman u grupama:`);

    this.groups.forEach((gr) => {
      gr.printStandings();
    });

    this.draw.print();

    this.printNext();
  }
}

export default GroupStage;
