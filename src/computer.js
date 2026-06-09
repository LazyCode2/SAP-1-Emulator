import { ProgramCounter } from "./module/PC.js"

class Computer {
	constructor() {
		this.bus = 0x00;

		this.pc = new ProgramCounter();

		this.currentTstate = 1;
	}

	reset() {
      this.bus = 0x00;
      his.currentTState = 1;
  }

  step() {
  	this.bus = 0x00;
  	this.pc.tick(true);
  }

  // For testing
  getSnapshot() {
	  return {
	      bus: this.bus,
	      tState: this.currentTState,
	      pc: this.pc.value
	  };
  }
}