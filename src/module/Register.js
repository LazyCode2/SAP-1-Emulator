export class InstructionRegister {
	constructor () {
		this.value = 0x00;
	}

	reset () {
		this.value = 0x00;
	}

	/**
	 * Loads a byte from the bus into the IR if load signal is active.
	 * @param {boolean} li - Load Instruction Register signal
	 * @param {number} busValue - Value from the W-Bus
	 */
	load (li, busValue) {
		if (li) {
			this.value = busValue;
		}
	}

	/**
	 * Outputs the lower 4 bits of the IR onto the bus if enabled.
	 * @param {boolean} ei - Enable Instruction Register output
	 * @returns {number|undefined}
	 */
	drive (ei) {
		if (ei == true) {
			return this.value & 0x0F;
		}
	}

	/**
	 * Returns the opcode (upper 4 bits of IR).
	 * @returns {number}
	 */
	getOpcode() {
		return (this.value >> 4) & 0x0F;
	}

	/**
	 * Returns the operand (lower 4 bits of IR).
	 * @returns {number}
	 */
	getOperand() {
		return this.value & 0x0F;
	}
}

export class RegisterAccumulator {
	constructor () {
		this.value = 0x00;
	}

	/**
	 * Loads a value from the bus into the accumulator.
	 * @param {boolean} la - Load Accumulator signal
	 * @param {number} busValue - Value from the W-Bus
	 */
	load (la, busValue) {
		if (la) {
			this.value = busValue;
		}
	}
}

export class RegisterBuffer {
	constructor () {
		this.value = 0x00;
	}

	/**
	 * Loads a value from the bus into the buffer register.
	 * @param {boolean} lb - Load Buffer signal
	 * @param {number} busValue - Value from the W-Bus
	 */
	load (lb, busValue) {
		if (lb) {
			this.value = busValue;
		}
	}
}