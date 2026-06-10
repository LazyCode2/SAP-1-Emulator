import { Computer } from "./computer.js";

const computer = new Computer();

const regs = document.getElementById("regs");
const memTable = document.getElementById("memTable");

const stepBtn = document.getElementById("stepBtn");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");

const addrInput = document.getElementById("addr");
const valInput = document.getElementById("val");
const writeBtn = document.getElementById("writeBtn");

let running = false;
let interval = null;

function render() {
    const snap = computer.getSnapshot();

    // Registers
    regs.textContent = `
PC:   ${snap.pc}
IR:   ${snap.ir.toString(2).padStart(8, "0")}
A:    ${snap.a}
B:    ${snap.b}
MAR:  ${snap.mar}
T:    ${snap.tState}
BUS:  ${snap.bus}
    `;

    // Memory
    let html = "<tr><th>Addr</th><th>Value</th></tr>";

    for (let i = 0; i < 16; i++) {
        const val = computer.memory.memory[i];
        html += `
            <tr>
                <td>${i}</td>
                <td>${val.toString(2).padStart(8, "0")}</td>
            </tr>
        `;
    }

    memTable.innerHTML = html;
}

stepBtn.onclick = () => {
    computer.step();
    render();
};

runBtn.onclick = () => {
    running = !running;

    if (running) {
        interval = setInterval(() => {
            computer.step();
            render();
        }, 500);
    } else {
        clearInterval(interval);
    }
};

resetBtn.onclick = () => {
    computer.reset();
    render();
};

writeBtn.onclick = () => {
    const addr = Number(addrInput.value);
    const val = Number(valInput.value);

    if (addr >= 0 && addr < 16) {
        computer.memory.write(true, addr, val);
        render();
    }
};

render();