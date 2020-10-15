// // <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// // <⚠️ /DONT DELETE THIS ⚠️>
const calResult = document.querySelector('.calResult'),
    cancelBtn = document.querySelector('.cancleBtn'),
    equalBtn = document.querySelector('.equalBtn'),
    numBtn = document.querySelectorAll('.numBtn'),
    operatorBtn = document.querySelectorAll('.operatorBtn');
let calculating,
    operating,
    isNewInput;

// numBtn 클릭하면 result에 뜨도록
function inputNum(num) {
    let numbers = calResult.innerText;
    // if (numbers === '0') {
    //     numbers = '';
    // }
    // if (operating !== null) {
    //     numbers 
    // }
    if (isNewInput) {
        numbers = '';
    }
    calResult.innerText = numbers + num;
    isNewInput = false;
}

// clear
function clearResult() {
    
    calResult.innerText = '0';
    isNewInput = true;
    operating = '';
    calculating = 0;
}

// 연산자 이용 계산
function calculate(operator) {
    let nums = parseFloat(calResult.innerText);
    if (operating == '') {
        calculating = nums;
    } else {
        if (!isNewInput) {
            if ( operating == '+') {
                calculating += nums;
            } else if(operating == '-') {
                calculating -= nums;
            } else if (operating == '*') {
                calculating *= nums;
            } else if (operating == '/') {
                if (nums == '0') {return;}
                calculating /= nums;
            }
        }
    }
    calResult.innerText = calculating;
    operating = operator;
    isNewInput = true;
}

function equal() {
    let nums = parseFloat(calResult.innerText);
    if (operating == '') {
        calculating = nums;
    } else {
        if (!isNewInput) {
            if ( operating == '+') {
                calculating += nums;
            } else if(operating == '-') {
                calculating -= nums;
            } else if (operating == '*') {
                calculating *= nums;
            } else if (operating == '/') {
                if (nums == '0') {return;}
                calculating /= nums;
            }
        }
    }
    calResult.innerText = calculating;
    operating = '';
    isNewInput = true;
}

function init() {
    calculating = 0;
    operating = '';
    isNewInput = true;
}

init();

