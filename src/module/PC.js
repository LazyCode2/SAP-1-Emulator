class ProgramCounter {
	constructor () {
		this.value = 0x0
	}

	reset () {
		this.value = 0x0
	}

	/**
     * Updates the register state on a clock cycle trigger
     * @param {boolean} cp - Count increment active
    */
    tick (cp) {
    	if (cp == true) {
    		this.value = (this.value + 1) & 0x0F;
    	}	
    }

    drive (lp) {
    	if (lp == true) {
    		return this.value 
    	}
    }
}