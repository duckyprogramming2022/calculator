const buttons = document.querySelectorAll('button');

const operands = ['1','2','3','4','5','6','7','8','9','.']
const operators = ['x','/','+','-','=']
const special = ['Delete','Clear']


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

function checkOperands(num_part) {
    return operands.includes(num_part);
}

function checkDotIncluded(num) {
    return num.includes(".");
}

function checkNumPartPushable(num, num_part) {
    if (checkOperands(num_part)) {
        if (!checkDotIncluded(num)) {
            return true;
        } else if (checkDotIncluded(num) && num_part !== ".") {
            return true;
        } else {
            return false;
        }
    }
};




