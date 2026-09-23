let currentInput = '';
let previousInput = '';
let activeOperator = null;
const screen = document.getElementById('screen');

// 1. Core Explicit Mathematical Functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

// 2. Typing Numbers
function appendValue(num) {
    // Avoid double decimals in the current working number
    if (num === '.' && currentInput.includes('.')) return;

    currentInput += num;
    updateDisplay();
}

// 3. Picking an Operator (+, -, *, /)
function setOperator(operator) {
    if (currentInput === '' && previousInput === '') return;

    // Switch operator if they click a different one before typing next number
    if (currentInput === '' && activeOperator) {
        activeOperator = operator;
        updateDisplay();
        return;
    }

    // If a user clicks an operator after completing a previous equation
    if (currentInput !== '' && previousInput !== '' && activeOperator) {
        calculate();
    }

    activeOperator = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

// 4. Updating the Display Screen
function updateDisplay() {
    if (activeOperator) {
        // Renders the explicit "1 + 1" style layout visually
        screen.value = previousInput + ' ' + activeOperator + ' ' + currentInput;
    } else {
        screen.value = currentInput || '0';
    }
}

// 5. Executing the Explicit Calculation
function calculate() {
    if (previousInput === '' || currentInput === '' || !activeOperator) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    // Direct execution using your standalone math functions
    switch (activeOperator) {
        case '+': result = add(num1, num2); break;
        case '-': result = subtract(num1, num2); break;
        case '*': result = multiply(num1, num2); break;
        case '/': result = divide(num1, num2); break;
        default: return;
    }

    screen.value = result;
    currentInput = result.toString();
    previousInput = '';
    activeOperator = null;
}

// 6. System Utilities
function clearScreen() {
    currentInput = '';
    previousInput = '';
    activeOperator = null;
    screen.value = '0';
}

function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    } else if (activeOperator) {
        activeOperator = null;
        currentInput = previousInput;
        previousInput = '';
    }
    updateDisplay();
}
