class Calculator {
  constructor(previousOperandTextEl, currentOperandTextEl) {
    this.previousOperandTextEl = previousOperandTextEl;
    this.currentOperandTextEl = currentOperandTextEl;
    this.reset();
  }

  reset() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.previousOperandTextEl.innerText = this.previousOperand;
    if (this.operation !== undefined) {
      this.previousOperandTextEl.innerText = `${this.previousOperand} ${this.operation}`;
    }
    this.currentOperandTextEl.innerText = this.currentOperand;
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const resetBtn = document.querySelector("[data-reset]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandTextEl = document.querySelector("[data-previous-operand]");
const currentOperandTextEl = document.querySelector("[data-current-operand]");
const bodyEl = document.querySelector("body");
const themeSelectRadioBtns = document.querySelectorAll('input[name="theme"]');

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);

numberBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  })
);

operationBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  })
);

resetBtn.addEventListener("click", function () {
  calculator.reset();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

// Change themes
themeSelectRadioBtns.forEach((btn) => {
  btn.addEventListener("change", function (e) {
    const theme = e.target.value;
    bodyEl.className = "";
    if (theme === "theme-1") return;
    if (theme === "theme-2") bodyEl.classList.add("theme-2");
    if (theme === "theme-3") bodyEl.classList.add("theme-3");
  });
});
