// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const pendingList = document.querySelector('.pendingList'),
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
    paintToPending(text, 0);
    todoInput.value='';
}

// value를 li로 만들기
function paintToPending(text, originalId) {
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
    delBtn.addEventListener('click', deletePending);
    const span = document.createElement('span');
    
    //const newId = PENDING.length + 1;
    let newId = new Date().getTime();
    if(originalId != 0){
        newId = originalId;
    }
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

function paintToFinished(text, originalId) {
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    checkBtn.innerText = '⏪';
    checkBtn.addEventListener('click', reopenToDo);
    delBtn.innerText = '❎';
    delBtn.addEventListener('click', deleteFinished);
    const span = document.createElement('span');
    span.innerText = text;
    //const newId = FINISHED.length + 1;
    
    let newId = new Date().getTime();
    if(originalId != 0){
        newId = originalId;
    }
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    finishedList.appendChild(li);
    li.id = newId;
    const todoObj = {
        text: text,
        id: newId
    };
    FINISHED.push(todoObj);
    saveFinished();
}

function deleteFromPending(li){
    const cleanPending = PENDING.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanPending;
    savePending();
    pendingList.removeChild(li);
}

function deleteFromFinished(li){
    const cleanFinished = FINISHED.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanFinished;
    saveFinished();
    finishedList.removeChild(li);
}

// li를 pending에서 finished로 보내기
function finishToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    const text = li.querySelector('span').innerText;
    
    deleteFromPending(li);
    paintToFinished(text, 0);
}

// li를 finished에서 pending로 보내기
function reopenToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    const text = li.querySelector('span').innerText;

    deleteFromFinished(li);
    paintToPending(text, 0);
}

function deletePending(event) {
    const delBtn = event.target;
    console.log(delBtn);
    const li = delBtn.parentNode;
    deleteFromPending(li);
}

function deleteFinished(event) {
    const delBtnn = event.target;
    console.log(delBtnn);

    const li = delBtnn.parentNode;

    deleteFromFinished(li);
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
            paintToPending(toDo.text, toDo.id);
        });
    }
}
function loadToFinished() {
    const loadedToFinished = localStorage.getItem(finished_LS);
    if (loadedToFinished !== null) {
        const parsedToDo = JSON.parse(loadedToFinished);
        parsedToDo.forEach((toDo) => {
            paintToFinished(toDo.text, toDo.id);
        });
    }
}



function init() {
    loadToPending();
    loadToFinished();
    todoForm.addEventListener('submit', handleSubmit);
}

init();