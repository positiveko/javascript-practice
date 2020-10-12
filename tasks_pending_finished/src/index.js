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
    // 공백 방지
    if (text.trim() === '') {
        alert('Write something!');
        return;
    }
    paintPending(text, 0);
    todoInput.value='';
}

// value를 li로 만들기
function paintPending(text, originalId) {
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    let newId = new Date().getTime();
    // pending과 finished 이동 시 id값 새로 부여
    if(originalId != 0) {
        newId = originalId;
    }
    li.id = newId;
    const todoObj = {
        text: text,
        id: newId
    };
    checkBtn.innerText = '✔';
    checkBtn.addEventListener('click', finishToDo);
    delBtn.innerText = '✖';
    delBtn.addEventListener('click', deletePending);
    pendingList.appendChild(li);
    PENDING.push(todoObj);
    savePending();
}

// pending에서 finished로 보내기
function paintFinished(text, originalId) {
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    finishedList.appendChild(li);
    let newId = new Date().getTime();
    if(originalId != 0){
        newId = originalId;
    }
    li.id = newId;
    const todoObj = {
        text: text,
        id: newId
    };
    checkBtn.innerText = '👈';
    checkBtn.addEventListener('click', reopenToDo);
    delBtn.innerText = '✖';
    delBtn.addEventListener('click', deleteFinished);
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
    paintFinished(text, 0);
}

// li를 finished에서 pending로 보내기
function reopenToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    const text = li.querySelector('span').innerText;
    deleteFromFinished(li);
    paintPending(text, 0);
}

// Pending과 Finished 배열에서 todo li 제거
function deletePending(event) {
    const delBtn = event.target;
    const li = delBtn.parentNode;
    deleteFromPending(li);
}
function deleteFinished(event) {
    const delBtnn = event.target;
    const li = delBtnn.parentNode;
    deleteFromFinished(li);
}

// Local Storage에 각각 저장
function savePending() {
    localStorage.setItem(pending_LS, JSON.stringify(PENDING));
}
function saveFinished() {
    localStorage.setItem(finished_LS, JSON.stringify(FINISHED));
}

// 새로고침 시에 Local Storage에서 불러오기
function loadToPending() {
    const loadedToPending = localStorage.getItem(pending_LS);
    if (loadedToPending !== null) {
        const parsedToDo = JSON.parse(loadedToPending);
        parsedToDo.forEach((toDo) => {
            paintPending(toDo.text, toDo.id);
        });
    }
}
function loadToFinished() {
    const loadedToFinished = localStorage.getItem(finished_LS);
    if (loadedToFinished !== null) {
        const parsedToDo = JSON.parse(loadedToFinished);
        parsedToDo.forEach((toDo) => {
            paintFinished(toDo.text, toDo.id);
        });
    }
}


(function init() {
    loadToPending();
    loadToFinished();
    todoForm.addEventListener('submit', handleSubmit);
})();
