class Draw {
  #standings;
  #teamsArranged;

  constructor() {
    this.#standings = [];
    this.#teamsArranged = [];
  }

  mix(standings) {
    this.#standings = standings;
    const res1 = this.#mixTeams(this.#standings, [0, 1], [6, 7]);
    const res2 = this.#mixTeams(this.#standings, [2, 3], [4, 5]);

    this.#teamsArranged = [
      res1[0][0],
      res1[0][1],
      res2[0][0],
      res2[0][1],
      res2[1][0],
      res2[1][1],
      res1[1][0],
      res1[1][1],
    ];

    return this.#teamsArranged;
  }

  #mixTeams(st, teamPos1, teamPos2) {
    let teamPos2A = teamPos2;
    let teamPos2B = [teamPos2[1], teamPos2[0]];
    let teamPos2Res = teamPos2A;
    let teamPos2Alt = teamPos2B;

    if (Math.random() > 0.5) {
      teamPos2Res = teamPos2B;
      teamPos2Alt = teamPos2A;
    }

    teamPos2 = teamPos2Res;
    let isSameGroup = false;
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        if (st[teamPos1[i]].group == st[teamPos2[i]].group) {
          isSameGroup = true;
          break;
        }
      }
      if (!isSameGroup) {
        break;
      }
      isSameGroup = false;
      teamPos2 = teamPos2Alt;
    }

    if (isSameGroup) {
      throw new Error(
        "Zreb ne moze da se izvede, timovi iz istih grupa se ne smeju sresti u cetvrtfinalu"
      );
    }

    let firstSideId = 0;
    let secondSideId = 1;
    if (Math.random() > 0.5) {
      firstSideId = 1;
      secondSideId = 0;
    }

    let team1 = st[teamPos1[firstSideId]].team;
    let team2 = st[teamPos2[firstSideId]].team;
    let team3 = st[teamPos1[secondSideId]].team;
    let team4 = st[teamPos2[secondSideId]].team;

    return [
      [team1, team2],
      [team3, team4],
    ];
  }

  print() {
    let hatLetters = ["D", "E", "F", "G"];

    console.log("\nSesiri:");
    for (let i = 0; i < this.#standings.length; i += 2) {
      console.log(`    Sesir ${hatLetters[i / 2]}`);
      console.log(`        ${this.#standings[i].team.name}`);
      console.log(`        ${this.#standings[i + 1].team.name}`);
    }

    console.log("\nEliminaciona faza:");
    for (let i = 0; i < this.#teamsArranged.length; i += 2) {
      console.log(
        `    ${this.#teamsArranged[i].name} - ${
          this.#teamsArranged[i + 1].name
        }`
      );
      if (i == 2) {
        console.log("");
      }
    }

    console.log("");
  }
}

export default Draw;
