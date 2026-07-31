function add(a, b) {
   return a + b;
}

function subtract(a, b) {
   return a - b;
}

function multiply(a, b) {
   return a * b;
}

function divide(a, b) {
   return b === 0 ? 'WRONG' : a / b;
}

const operations = {
   '+': add,
   '-': subtract,
   '×': multiply,
   '÷': divide,
}

function operate(operator, a, b) {
   const operation = operations[operator]
   return operation(a, b)
}

const display = document.querySelector('#calculator-output p')

const digitButtons = document.querySelectorAll('button.digit')

const calculator = {
   firstNumber: null,
   operator: null,
   secondNumber: null,
   clearDisplay: true,
   
   clear() {
      this.firstNumber = null;
      this.operator = null;
      this.secondNumber = null;
      this.clearDisplay = true;
      display.textContent = '0'
   },

   updateDisplay(digit) {
      if (this.clearDisplay) {
         display.textContent = digit;
         this.clearDisplay = false;
      } else {
         display.textContent += digit;
      }
   }
}

const clearButton = document.querySelector('button:first-of-type')
clearButton.addEventListener('click', () => {
   calculator.clear();
})


digitButtons.forEach(button => {
   button.addEventListener('click', () => 
   calculator.updateDisplay(button.textContent)
   )
});

const operatorButtons = document.querySelectorAll('button.operator')
operatorButtons.forEach(button => {
   button.addEventListener('click', () => {
      if (calculator.firstNumber !== null && calculator.operator !== null) {
         calculator.secondNumber = parseFloat(display.textContent);
         const result = operate(calculator.operator, calculator.firstNumber, calculator.secondNumber);
         display.textContent = result;
         calculator.firstNumber = result;
      } else {
         calculator.firstNumber = parseFloat(display.textContent);
      }
      calculator.operator = button.textContent;
      calculator.clearDisplay = true;
   });
});

const equalsButton = document.querySelector('button.equal')
equalsButton.addEventListener('click', () => {
   calculator.secondNumber = parseFloat(display.textContent);
   const result = operate(calculator.operator, calculator.firstNumber, calculator.secondNumber);
   display.textContent = result;
   calculator.clearDisplay = true;
});

const decimalButton = document.querySelector('button.decimal')


decimalButton.addEventListener('click', () => {
   if (calculator.clearDisplay) {
      display.textContent = '0,';
      calculator.clearDisplay = false
   } else if (!display.textContent.includes(',')) {
      display.textContent += '.'
   }
})