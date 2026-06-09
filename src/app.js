import { Computer } from "./computer.js";

const computer = new Computer();

const test = document.getElementById("test")

test.value = computer.getSnapshot()
