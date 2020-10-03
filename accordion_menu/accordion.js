let panelQuestion = document.querySelectorAll('.panel-question');
/* 모든 패널의 active를 제거하고 해당 panel에만 active 추가 */
let collapseBtn = document.querySelector('#btn-collapse');

function closeAll() {
  for (let j = 0; j < panelQuestion.length; j++) {
    panelQuestion[j].classList.remove('active');
  }
}

for (let i = 0; i < panelQuestion.length; i++) {
  panelQuestion[i].addEventListener('click', function () {
    closeAll();
    this.classList.add('active');
  });
}

collapseBtn.addEventListener('click', function () {
  closeAll();
});
