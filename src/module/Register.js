export class InstructionRegister {
	constructor () {
		this.value = 0x00;
	}

	reset () {
		this.value = 0x00;
	}

	load (li,busValue) {
		if (li) {
			this.value = busValue
		}
	}

	drive (ei) {
    	if (ei == true) {
    		return this.value & 0x0F;
    	}
    }

    getOpcode() {
    	return (this.value >> 4) & 0x0F;
	}

	getOperand() {
	    return this.value & 0x0F;
	}
}