// 전역변수 사용을 피하기 위해 즉시실행 익명함수를 만든다
(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  // visible 클래스가 붙은 graphic-item 선언 후 맨 처음에 visible 붙임
  let currentItem = graphicElems[0];
  // data 속성 (data-로 시작) DOM에 저장한다.
  //   모든 step과 graphic-item에 data-index='$' 추가
  for (let i = 0; i < stepElems.length; i++) {
    // stepElems[i].setAttribute('data-index', i);
    // 혹은 아래와 같이 쓴다
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate() {
    currentItem.classList.add('visible');
  }

  function inactivate() {
    currentItem.classList.remove('visible');
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();
      //   console.log(boundingRect.top);
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        // console.log(step.dataset.index);
        // graphicElems[step.dataset.index].classList.add('visible');
        // 하지만 중첩되어 보일 것. 따라서 기존의 것을 삭제하기 위해
        // currentItem 변수를 새로 선언한다
        // 처음에는 currentItem이 없으므로 타입에러 발생
        // 따라서 if문에 넣어 currentItem이 있으면 지우도록 수정한다
        // if (currentItem) {
        inactivate();
        // } activate 활용으로 currentItem이 존재하는지 체크할 필요 없음
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  // 첫 번째 사진을 먼저 보여주기 위해 currentItem = graphicElem[0]을 주고
  // active()와 inactivate()을 따로 분리해내어
  // 이벤트 리스너 뒤에 새롭게 실행해준다.
  activate();
})();
