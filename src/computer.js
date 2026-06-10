import { ProgramCounter } from "./module/PC.js"
import { MAR , RandomAccessMemory } from "./module/Memory.js"
import { InstructionRegister , RegisterAccumulator , RegisterBuffer } from "./module/Register.js"

export class Computer {
	constructor() {
		this.bus = 0x00;
		this.output = 0x0
		this.halted = false

		this.pc = new ProgramCounter();
		this.mar = new MAR();
		this.memory = new RandomAccessMemory();
		this.ir = new InstructionRegister();
		this.a = new RegisterAccumulator();
		this.b = new RegisterBuffer();

		// TEST PROGRAM
		this.memory.write(true,0,0b10110001);
		this.memory.write(true,3,0b01000000);
		this.memory.write(true,1,0x06);
		this.memory.write(true,5,0x05);
		this.currentTstate = 1;
	}

	reset() {
      this.bus = 0x00;
      this.currentTstate = 1;
  }

  step() {
  	this.bus = 0x00;
  	
  	if (!this.halted) {
	  	// TODO: Add better instruction excution 
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
					this.ir.load(true,this.bus);
					break
				case 4:
					// Microstep
			 		this.bus = this.ir.getOperand();
			        this.mar.load(true, this.bus);
					break;
				case 5:
					// Microstep
					switch(this.ir.getOpcode()){
						// LOAD
						case 0xB:
					        this.bus = this.memory.drive(true, this.mar.value);
					        this.a.load(true, this.bus);
					        break;
						// ADD
						case 0x5:
							this.bus = this.memory.drive(true, this.mar.value);
					        this.b.load(true, this.bus);
					        break;
					    // SUB
					    case 0x7:
					    	this.bus = this.memory.drive(true, this.mar.value);
					        this.b.load(true, this.bus);
					        break;
					    // OUT
					    case 0x0:
					    	this.bus = this.a.value;
					    	this.output = this.bus;
					    break;
					    // HLT
					   	case 0x4:
					   		this.halted = true;
					   	break;
					}
					break;
				case 6:
					// Microstep
					switch(this.ir.getOpcode()){
						// ADD
						case 0x5:
					        this.bus = this.a.value + this.b.value;
					        this.a.load(true, this.bus);
					        break;

					    // SUB
						case 0x7:
					        this.bus = this.a.value - this.b.value;
					        this.a.load(true, this.bus);
					        break;
					}
					break
		}
	  	this.currentTstate++;
	  	if (this.currentTstate > 6) {
	        this.currentTstate = 1;
	    }
  	}
  }

  // For testing
  getSnapshot() {
	  return {
	      bus: this.bus,
	      tState: this.currentTstate,
	      pc: this.pc.value,
	      ir: this.ir.value,
	      a: this.a.value,
	      b: this.b.value,
	      mar: this.mar.value,
	      memory: this.memory
	  };
  }
}