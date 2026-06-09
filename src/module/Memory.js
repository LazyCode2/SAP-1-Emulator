import { ProgramCounter } from "./PC.js"

var pc = new ProgramCounter();

class MAR {
	constructor () {
		this.value = 0x0;
	}

	load (lm) {
		if (lm == true) {
			this.value = pc.value;
		}
	}
}