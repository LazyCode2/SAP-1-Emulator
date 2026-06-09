class MAR {
	constructor () {
		this.value = 0x0;
	}

	load (lm, busValue) {
		if (lm == true) {
			this.value = busValue & 0x0F;
		}
	}
}