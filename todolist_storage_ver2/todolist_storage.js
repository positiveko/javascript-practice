// html id 정리
const toDoForm = document.querySelector('.toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.toDoList');

//function loadToDos
const TODOS_LS = 'toDos';

// array로 저장해서 paintToDo할 때마다 배열에 추가되도록 함
let toDos = [];

// 객체로 이뤄진 toDos 배열을 localStorage에 string으로 저장
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

// 리스트 클릭하면 체크 심볼 추가
toDoList.addEventListener(
  'click',
  function (event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('checked');
    }
  },
  false
);

// handleSubmit으로 받은 value로 리스트 추가와 동시에 delBtn 생성
function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerText = 'X';
  delBtn.addEventListener('click', deleteToDo);
  const span = document.createElement('span');
  const newId = toDos.length + 1; // 리스트와 toDos 객체에 id 추가
  span.innerText = text; // submit으로 받은 text를 span에 넣음
  li.appendChild(span); // 정의한 span과 delBtn을 li안에 넣음
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li); // li를 ul에 넣어줌
  // localStorage에 저장할 객체 생성
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); // 객체로 만든 걸 배열에 넣음
  saveToDos();
}

// toDoForm에서 제출하면 실행하는 이벤트
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

// 로컬 스토리지에 있는 todos 불러오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // string이기 때문에 JSON으로 객체로 만듦
    const parsedToDos = JSON.parse(loadedToDos);
    // 로드 해 온 것들을 paint 해 줌
    parsedToDos.forEach(function (toDo) {
      // 객체 각각의 요소를 function 실행
      paintToDo(toDo.text); // toDo의 text 값만을 페인트 해줌
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
