

const pending = document.querySelector('.pending'),
pendingList = document.querySelector('.pendingList'),
finishedList = document.querySelector('.finishedList'),
todoInput = document.querySelector('.todoInput'),
todoForm = document.querySelector('.todoForm');

let PENDING = [];
let FINISHED = [];
const pending_LS = 'PENDING';
const finished_LS = 'FINISHED';


// input의 value를 paint로 보내고 input 초기화
function handleSubmit(event) {
    event.preventDefault();
    const text = todoInput.value;
    paintToDo(text);
    todoInput.value='';
}

// value를 li로 만들기
function paintToDo(text) {
    if (text.trim() === '') {
        alert('Write something!');
        return;
    }
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    checkBtn.innerText = '✅';
    checkBtn.addEventListener('click', finishToDo);
    delBtn.innerText = '❎';
    delBtn.addEventListener('click', deleteToDo);
    const span = document.createElement('span');
    // new Date().getDate() 하면 계속 새로고침 에러
    const newId = PENDING.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    PENDING.push(todoObj);
    savePending();
}

// li를 pending에서 finished로 보내기
function finishToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    checkBtn.innerText = '⏪';
    checkBtn.addEventListener('click', reopenToDo);
    const cleanToDo = PENDING.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanToDo;
    const toDo = li.querySelector('span').innerText;
    id = li.id;
    const todoObj = {
        text: toDo,
        id: id
    };
    FINISHED.push(todoObj);
    savePending();
    saveFinished();
}

function reopenToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    finishedList.removeChild(li);
    pendingList.appendChild(li);
    checkBtn.innerText = '✅';
    checkBtn.addEventListener('click', finishToDo);
}

function deleteToDo(event) {
    const delBtn = event.target;
    const li = delBtn.parentNode;
    pendingList.removeChild(li);
    const cleanToDo = PENDING.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanToDo;
    savePending();
}


function savePending() {
    localStorage.setItem(pending_LS, JSON.stringify(PENDING));
}

function saveFinished() {
    localStorage.setItem(finished_LS, JSON.stringify(FINISHED));
}

function loadToPending() {
    const loadedToPending = localStorage.getItem(pending_LS);
    if (loadedToPending !== null) {
        const parsedToDo = JSON.parse(loadedToPending);
        parsedToDo.forEach((toDo) => {
            paintToDo(toDo.text);
        });
    }
}
function loadToFinished() {
    const loadedToFinished = localStorage.getItem(finished_LS);
    if (loadedToFinished !== null) {
        const parsedToDo = JSON.parse(loadedToFinished);
        parsedToDo.forEach((toDo) => {
            paintToDo(toDo.text);
        });
    }
}



function init() {
    loadToPending();
    loadToFinished();
    todoForm.addEventListener('submit', handleSubmit);
}

init();