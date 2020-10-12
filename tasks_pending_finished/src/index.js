// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const pending = document.querySelector('.pending'),
pendingList = document.querySelector('.pendingList'),
finishedList = document.querySelector('.finishedList'),
todoInput = document.querySelector('.todoInput'),
todoForm = document.querySelector('.todoForm');

let toDos = [];
const pending_LS = 'toDos';

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
    const newId = new Date().getTime();
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
    toDos.push(todoObj);
    saveToDo();
}

function deleteToDo(event) {
    const delBtn = event.target;
    const li = delBtn.parentNode;
    pendingList.removeChild(li);
    const cleanToDo = toDos.filter((toDo) => {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDo;
    saveToDo();
}

function finishToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    checkBtn.innerText = '⏪';
    checkBtn.addEventListener('click', reopenToDo);
}

function reopenToDo(event) {
    const checkBtn = event.target;
    const li = checkBtn.parentNode;
    finishedList.remove(li);
    pendingList.appendChild(li);
    checkBtn.innerText = '✅';
}


function saveToDo() {
    localStorage.setItem(pending_LS, JSON.stringify(toDos));
}

function loadToDo() {
    const loadedToDo = localStorage.getItem(pending_LS);
    if (loadedToDo !== null) {
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach((toDo) => {
            paintToDo(toDo.text);
        });
    }
}



function init() {
    loadToDo();
    todoForm.addEventListener('submit', handleSubmit);
}

init();