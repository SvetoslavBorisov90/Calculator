const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display")

keys.addEventListener("click", (e) => {
    if (!e.target.closest("button")) return; // do nothing if you press the gap between buttons

    const key = e.target;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const type = key.dataset.type; // const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === "number") {
        if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "equal") {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent
        };
        Array.from(key.parentNode.children).forEach(k => k.dataset.state = "");
    };

    if (type === "operator") {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = "" });
        key.dataset.state = "selected";

        calculator.dataset.firstNumber = displayedNum;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type === "equal") {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayedNum;
        display.textContent = calculate(firstNumber, operator, secondNumber);
        Array.from(key.parentNode.children).forEach(k => k.dataset.state = "");
    }

    if (type === "decimal") {
        if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + ".";
        } else if (previousKeyType === "operator") {
            display.textContent = "0.";
        }
        calculator.dataset.previousKeyType = "decimal";
    }

    if (type === "clear") {
        Array.from(key.parentNode.children).forEach(k => k.dataset.state = "");
        display.textContent = "0";
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
    }

    calculator.dataset.previousKeyType = type;
})


function calculate(firstNumber, operator, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    if (operator === "plus") return firstNumber + secondNumber;
    if (operator === "minus") return firstNumber - secondNumber;
    if (operator === "times") return firstNumber * secondNumber;
    if (operator === "divide") return firstNumber / secondNumber;
}