//selectors
const buttons = document.querySelectorAll('button');
const displays = document.querySelectorAll('.output');
const display1_entry = document.querySelector('.entry1');
const display2_entry = document.querySelector('.entry2');

//check for classification
const operands = ['1','2','3','4','5','6','7','8','9','.']
const operators = ['x','/','+','-']
const special_operators = ['=']
const specials = ['Delete','Clear']

//all vars

//strings
let click = '';
let click_name = '';
let type = '';
let num1 = '';
let num2 = '';
let operation = '';
let result = '';
//arrays
let display_arr = [];
let display1_arr = [];
let display2_arr = [];
let num_arr1 = [];
let num_arr2 = [];
//bools
let empty = true;
let empty1 = true;
let empty2 = true;
let hasOperands = true;
let hasOperands1 = true;
let hasOperands2 = true;
let hasOperators = true;
let hasOperators1 = true;
let hasOperators2 = true;
let hasDot = true;
let hasDot1 = true;
let hasDot2 = true;

//manages calculator
buttons.forEach(btn => btn.addEventListener('click', event => {
    click = event.target.textContent;
    click_name = event.target.classList.value;
    type = checkOperandOperatorSpecial(click);
    console.log(type);
    display1_arr = display1_entry.textContent.split('');
    display2_arr = display2_entry.textContent.split('');
    empty1 = checkEmpty(display1_arr);
    empty2 = checkEmpty(display2_arr);
    hasOperands1 = checkOperand(display1_arr);
    hasOperands2 = checkOperand(display2_arr);
    hasOperators1 = checkOperator(display1_arr);
    hasOperators2 = checkOperator(display2_arr);
    hasDot1 = checkDot(display1_arr);
    hasDot2 = checkDot(display2_arr);
    switch(type) {
        case 'operands':
            if (!hasOperators1) {
                if (empty1) {
                    if (click !== ".") {
                        num_arr1.push(click);
                    };
                } else if (click !== '.') {
                    num_arr1.push(click);
                } else if (!hasDot1) {
                    num_arr1.push(click);
                }
            } else if (!empty1 && hasOperators1) {
                if (empty2) {
                    if (click !== ".") {
                        num_arr2.push(click);
                    };
                } else if (click !== '.') {
                    num_arr2.push(click);
                } else if (!hasDot2) {
                    num_arr2.push(click);
                }
            }
            display1_entry.textContent = num_arr1.join('');
            display2_entry.textContent = num_arr2.join('');
            break;
        case 'operators':
            if (!empty1) {
                if (!hasOperators1) {
                    num_arr1.push(` ${click}`);
                } else {
                    num_arr1.pop()
                    num_arr1.push(` ${click}`);
                }
            }
            operation = event.target.classList.value;
            display1_entry.textContent = num_arr1.join('')
            display1_entry.textContent  = num_arr1.join('');
            break;
        case 'specials':
            if (click_name === 'delete') {
                if (!empty2) {
                    num_arr2.pop()
                } else {
                    num_arr1.pop()                    
                }
            } else {
                num_arr1 = [];
                num_arr2 = [];    
            }
            display2_entry.textContent = num_arr2.join('');
            display1_entry.textContent = num_arr1.join('');
            break;
        case 'special_operator':
            num1 = parseFloat(display1_entry.textContent.split(' ')[0])
            num2 = parseFloat(display2_entry.textContent.split(' ')[0])
            result = operations(operation, num1, num2);
            display1_entry.textContent = result;
            display2_entry.textContent = '';
            console.log(result)
            num_arr1 = display1_entry.textContent.split('');
            num_arr2 = [];
            break;
        }}));

//check if empty
function checkEmpty(arr) {
    empty = arr.every(ele => ele === '');
    return empty;
}

//checks if operand is defined in display
function checkOperand(arr) {
    hasOperands = arr.some(ele => operands.includes(ele));
    return hasOperands;    
}

//checks if operator is defined in display
function checkOperator(arr) {
    hasOperators = arr.some(ele => operators.includes(ele));
    return hasOperators;
}

//checks if dot included in text
function checkDot(arr) {
    hasDot = arr.some(ele => ele === '.');
    return hasDot;
}

//defines click category
function checkOperandOperatorSpecial(click) {
    if (operands.includes(click)) {
        return 'operands';
    } else if (operators.includes(click)) {
        return 'operators';
    } else if (specials.includes(click)) {
        return 'specials';
    } else {
        return 'special_operator';
    }
};


function operations(operation, num1, num2) {
    switch (operation) {
        case 'add':
            return num1 + num2;
        case 'sub':
            return num1 - num2;
        case 'division':
            return num1/num2;
        case 'mul':
            return num1*num2;
        default:
            console.log('whooops something went wrong')
    };
};