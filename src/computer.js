class Computer {
	constructor () {
		this.bus = 0x00;
		this.currentTstate = 1;
	}

	reset() {
        this.bus = 0x00;
        this.currentTState = 1;
    }
}