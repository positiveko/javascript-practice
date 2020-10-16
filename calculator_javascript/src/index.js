
const calResult = document.querySelector(".calResult");
// let calculating, operating, isNewInput;
let calculating = 0,
operating = "",
isNewInput = true;

// numBtn 클릭하면 result에 뜨도록
function inputNum(num) {
  let numbers = calResult.innerText;
  if (numbers === '0') {
      numbers = '';
  }
  if (isNewInput) {
    numbers = "";
  }
  calResult.innerText = numbers + num;
  isNewInput = false;
}

// clear
function clearResult() {
  calResult.innerText = "0";
  isNewInput = true;
  operating = "";
  calculating = 0;
}

// 연산자 이용 계산
function calculate(operator) {
  let nums = parseFloat(calResult.innerText);
  if (operating == "") {
    calculating = nums;
  } else {
    if (!isNewInput) {
      if (operating == "+") {
        calculating += nums;
      } else if (operating == "-") {
        calculating -= nums;
      } else if (operating == "*") {
        calculating *= nums;
      } else if (operating == "/") {
        if (nums == "0") {
          return;
        }
        calculating /= nums;
      }
    }
  }
  calResult.innerText = calculating;
  operating = operator;
  isNewInput = true;
}

// equalBtn 구현
function equal() {
  let nums = parseFloat(calResult.innerText);
  if (operating == "") {
    calculating = nums;
  } else {
    if (!isNewInput) {
     if (operating == "+") {
        calculating += nums;
        } else if (operating == "-") {
        calculating -= nums;
      } else if (operating == "*") {
        calculating *= nums;
      } else if (operating == "/") {
        if (nums == "0") {
          return;
        }
        calculating /= nums;
      }
    }
  }
  calResult.innerText = calculating;
  operating = "";
  isNewInput = true;
}
