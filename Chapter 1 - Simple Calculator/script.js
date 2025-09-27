const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');
const operatorInput = document.getElementById('operator')
const calculateButton = document.getElementById('calculate');
const resultButton = document.getElementById('result');

function calculate() {
    const firstNumber = parseFloat(firstNumberInput.value);
    const secondNumber = parseFloat(secondNumberInput.value);
    const operator = operatorInput.value;
    let result;

    if(isNaN(firstNumber) || isNaN(secondNumber)) {
        resultButton.textContent = 'Please Enter a valid number';
        return;
    }

    if (operator === '+') {
        result = firstNumber + secondNumber;
    } else if (operator === '-') {
        result = firstNumber - secondNumber;
    } else if (operator === '*') {
        result = firstNumber * secondNumber;
    } else if (operator === '/') {
        if (secondNumber === 0){
            resultButton.textContent = 'Division by zero is not allowed';
            return;
        }
        result = firstNumber / secondNumber;
    }
    resultButton.textContent = 'Result : ' + result;
}

calculateButton.addEventListener('click', calculate);