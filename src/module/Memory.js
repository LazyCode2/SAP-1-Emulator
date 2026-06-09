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