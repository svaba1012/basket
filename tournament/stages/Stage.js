class Stage {
  constructor() {
    if (this.constructor == Stage) {
      throw new Error("Class is abstract");
    }
    if (this.init == undefined) {
      throw new Error("init must be implemented");
    }

    if (this.simulate == undefined) {
      throw new Error("simulate must be implemented");
    }
    if (this.print == undefined) {
      throw new Error("print must be implemented");
    }
    this.nextStages = [];
  }

  addNextStage(stage) {
    this.nextStages.push(stage);
  }

  simulateNext() {
    if (this.nextStages.length == 0) {
      return;
    }
    this.nextStages.forEach((stage) => {
      stage.simulate();
    });
  }

  printNext() {
    if (this.nextStages.length == 0) {
      return;
    }
    this.nextStages.forEach((stage) => {
      stage.print();
    });
  }
}

export default Stage;
