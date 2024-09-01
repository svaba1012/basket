class GroupStanding {
  constructor(team, group) {
    this.group = group;
    this.team = team;
    this.wins = 0;
    this.loses = 0;
    this.pts = 0;
    this.scored = 0;
    this.received = 0;
    this.diff = 0;

    const startId = team.matchHistory.length - 3;
    for (let i = 0; i < 3; i++) {
      let match = team.matchHistory[startId + i];
      this.scored += match.getTeamScore(team);
      this.received += match.getTeamReceived(team);
      if (match.getWinner() == team) {
        this.wins++;
      } else {
        this.loses++;
      }
    }

    this.pts = this.wins * 2 + this.loses;
    this.diff = this.scored - this.received;
  }

  toString() {
    return `${this.team.name}\t${this.wins} / ${this.loses} / ${this.pts} / ${this.scored} / ${this.received} / ${this.diff}`;
  }
}

export default GroupStanding;
