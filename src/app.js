import { Computer } from "./computer.js";

const computer = new Computer();

const test = document.getElementById("test")

computer.step();

test.textContent = JSON.stringify(
    computer.getSnapshot(),
    null,
    2
);