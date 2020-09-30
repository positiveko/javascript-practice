// html id값 선언 우선
const toDoForm = document.querySelector('.toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

// localStorage에 string 형태로 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 클릭 시 toDos에서 li 지우기
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// 리스트 추가와 delBtn 만들기
function paintToDo(text) {
  const delBtn = document.createElement('button');
  const li = document.createElement('li');
  delBtn.innerText = '✖';
  delBtn.addEventListener('click', deleteToDo);
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

// input 디폴트 해제, paintToDo 실행 및 인풋바 새로고침
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

// localStorage에 저장된 todos 불러오기
function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  console.log(loadedToDos);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    console.log(parsedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
      console.log(toDo.text);
    });
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
