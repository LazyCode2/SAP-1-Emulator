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
  	
  	switch(this.currentTstate) {
  		case 1:
  			this.pc.reset();
  			this.pc.drive(true);
  			this.mar.load(true);
  		
  		case 2:
  			this.pc.tick(true);
  		
  		this.currentTstate++;
  	}
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