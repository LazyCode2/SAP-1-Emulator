export class MAR {
	constructor () {
		this.value = 0x0;
	}

	/**
     * loads the lower 4 bits of the bus if lm is active
     * @param {boolean} lm - Load MAR signal
     * @param {number} busValue - Current state of the W-Bus
     */
	load (lm, busValue) {
		if (lm == true) {
			this.value = busValue & 0x0F;
		}
	}
}

export class RandomAccessMemory {
	constructor () {
		this.memory = new Uint8Array(16);
	}

	reset () {
		this.memory.fill(0x00);
	}

	/**
     * Drives data onto the W-Bus if CE (Ram Enable) is active
     * @param {boolean} ce - Count Enable / RAM Output Out to Bus
     * @param {number} currentAddress - The raw address exposed by MAR
     * @returns {number|null} 
    */
    drive(ce, currentAddress) {
        if (ce) {
            return this.memory[currentAddress];
        }
        return null;
    }

    /**
     * Writes to memory if the RAM load signal is active.
     * @param {boolean} ramWrite - Write enable active
     * @param {number} currentAddress - Current target address from the MAR line
     * @param {number} busValue - The data byte to store from the W-Bus
     */
    write(rw, currentAddress, busValue) {
    	if (rw) {
            this.memory[currentAddress] = busValue & 0xFF;
        }
    }
}