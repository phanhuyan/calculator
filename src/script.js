let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";
function clear() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "0";
  updateDisplay();
}
function updateDisplay() {
  document.getElementById("display").textContent = displayValue;
}
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Error";
      }
      return a / b;
    default:
      return "Error";
  }
}

function handleOperationButtonClick(e) {
  const operation = e.target.textContent;

  if (firstNumber === null) {
    firstNumber = parseFloat(displayValue);
    operator = operation;
    displayValue = "0";
  } else {
    // If both firstNumber are set, calculate the result
    firstNumber = operate(operator, firstNumber, secondNumber);
    operator = operation;
    secondNumber = null;
    displayValue = firstNumber;
  }
  updateDisplay();
}
function handleIntegerButtonClick(e) {
  const digit = e.target.textContent;
  if (displayValue === "0" || displayValue === "Error") {
    displayValue = digit;
  } else if (firstNumber !== null && secondNumber === null){
    displayValue = digit;
  } else {
    displayValue += digit;
  }
  if (firstNumber !== null) {
    secondNumber = parseFloat(displayValue);}
  updateDisplay();
}
function handleClearButtonClick() {
  // Handle the clear button click
  clear();
}

function handleEqualsButtonClick() {
  if (firstNumber !== null && operator !== null && secondNumber !== null) {
    firstNumber = operate(operator, firstNumber, parseFloat(displayValue));
    operator = null;
    secondNumber = null;
    displayValue = String(firstNumber);
    updateDisplay();
  }
}

const buttonContainer = document.getElementById("button-container");

// Loop to create and append buttons from 0 to 9
for (let i = 0; i <= 9; i++) {
  const button = document.createElement("button");
  button.textContent = i;
  button.className = "integer-button";
  button.id = i.toString(); // Set the ID to the button's value
  buttonContainer.appendChild(button);
}

// Add event listeners to the integer buttons
const integerButtons = document.querySelectorAll(".integer-button");
integerButtons.forEach((button) => {
  button.addEventListener("click", handleIntegerButtonClick);
});
const operationButtons = document.querySelectorAll("#operation-buttons button");
operationButtons.forEach((button) => {
  button.addEventListener("click", handleOperationButtonClick);
});
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

clearButton.addEventListener("click", handleClearButtonClick);
equalsButton.addEventListener("click", handleEqualsButtonClick);
