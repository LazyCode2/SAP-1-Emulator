import { ProgramCounter } from "./module/PC.js"
import { MAR , RandomAccessMemory } from "./module/Memory.js"
import { InstructionRegister } from "./module/Register.js"

export class Computer {
	constructor() {
		this.bus = 0x00;

		this.pc = new ProgramCounter();
		this.mar = new MAR();
		this.memory = new RandomAccessMemory();
		this.ir = new InstructionRegister();

		this.memory.write(true,0,1)
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
  			this.bus = this.pc.value;
  			this.mar.load(true,this.bus);
  			break
  		
  		case 2:
  			this.pc.tick(true);
  			break
			
			case 3:
				this.bus = this.memory.drive(true,this.mar.value);
				this.ir.load(true,this.bus)
				break

  	}
  	this.currentTstate++;
  	if (this.currentTstate > 3) {
        this.currentTstate = 1;
    }
  }

  // For testing
  getSnapshot() {
	  return {
	      bus: this.bus,
	      tState: this.currentTstate,
	      pc: this.pc.value,
	      ir: this.ir.value,
	      mar: this.mar.value,
	      memory: this.memory
	  };
  }
}