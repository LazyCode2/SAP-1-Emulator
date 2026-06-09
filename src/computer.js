import { ProgramCounter } from "./module/PC.js"
import { MAR } from "./module/Memory.js"


export class Computer {
	constructor() {
		this.bus = 0x00;

		this.pc = new ProgramCounter();
		this.mar = new MAR();

		this.currentTstate = 1;
	}

	reset() {
      this.bus = 0x00;
      this.currentTstate = 1;
  }

  step() {
  	this.bus = 0x00;
  	this.pc.tick(true);
  }

  // For testing
  getSnapshot() {
	  return {
	      bus: this.bus,
	      tState: this.currentTstate,
	      pc: this.pc.value
	  };
  }
}