// // <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// // <⚠️ /DONT DELETE THIS ⚠️>

// range의 값에 따라 숫자가 변하게 만들기
const inputRange = document.querySelector('#inputRange'),
setRangeNum = document.querySelector('.setRangeNum'),
formNum = document.querySelector('.formNum'),
inputNum = document.querySelector('.inputNum'),
userSelect = document.querySelector('.userSelect'),
machineSelect = document.querySelector('.machineSelect'),
gameResult = document.querySelector('.gameResult');

// range 설정
function selectRange() {
    let rangeNum = inputRange.value;
    setRangeNum.innerText = `${rangeNum}`;
}

// 유저가 숫자 입력하면 아래 숫자 표시
// 숫자 선택 없이 게임 시작 불가
function userPlay(event) {
    event.preventDefault();
    let userNum = inputNum.value;
    let rangeNum = inputRange.value;
    if (userNum.trim() === '' || userNum*1 > rangeNum || userNum*1 < 0) {
        userSelect.innerText = `Write a number between 0 and ${rangeNum}`;
        userSelect.style.color = 'red';
        machineSelect.innerText = ``;
        gameResult.innerText = ``;
        return;
    }
    userSelect.style.color = 'black';
    userSelect.innerText = `You chose: ${userNum}`
    machinePlay();
}

// 머신이 0~inputRange.value 사이의 숫자를 랜덤 선택
// if문을 활용해서 inputNum과 비교한다. 다를 경우 lost, 같으면 won
function machinePlay() {
    let rangeNum = inputRange.value*1 + 1;
    console.log(rangeNum);
    let machineNum = Math.floor(Math.random() * rangeNum)
    machineSelect.innerText = `, and the machine chose: ${machineNum}`;
    if (machineNum == inputNum.value) {
        gameResult.innerText = `You won!`;
    } else {
        gameResult.innerText = `You lost!`;
    }
}

(function init() {
    inputRange.addEventListener('change', selectRange);
    formNum.addEventListener('submit', userPlay);
})();
