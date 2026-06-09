import { Computer } from "./computer.js";

const computer = new Computer();

const test = document.getElementById("test")

setInterval(() => {
    computer.step();

    test.textContent = JSON.stringify(
        computer.getSnapshot(),
        null,
        2
    );
}, 1000);

test.textContent = JSON.stringify(
    computer.getSnapshot(),
    null,
    2
);