import EliminationStage from "./stages/EliminationStage.js";
import GroupStage from "./stages/GroupStage.js";

class Tournament {
  constructor() {
    this.groupStage = new GroupStage();
    this.quaterFinal = new EliminationStage("Cetvrtfinale");
    this.semiFinal = new EliminationStage("Polufinale");
    this.thirdPlaceMatch = new EliminationStage("Utakmica za trece mesto");
    this.final = new EliminationStage("Finale");

    this.groupStage.addNextStage(this.quaterFinal);
    this.quaterFinal.addNextStage(this.semiFinal);
    this.semiFinal.addNextStage(this.thirdPlaceMatch);
    this.semiFinal.addNextStage(this.final);
  }

  #printMedals() {
    const goldTeam = this.final.getWinners()[0];
    const silverTeam = this.final.getLosers()[0];
    const bronzeTeam = this.thirdPlaceMatch.getWinners()[0];

    const medalsTeam = [goldTeam, silverTeam, bronzeTeam];

    console.log("Medalje:");
    medalsTeam.forEach((medalTeam, i) =>
      console.log(`    ${i + 1}. ${medalTeam.name}`)
    );

    console.log();
  }

  start() {
    this.groupStage.init();
    this.groupStage.simulate();
  }

  print() {
    this.groupStage.print();
    this.#printMedals();
  }
}

export default Tournament;
