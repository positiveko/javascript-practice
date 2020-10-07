(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0];
  let ioIndex;

  // 무의미하게 전체 elem을 for문으로 돌릴 필요 없이
  // intersection observer 활용
  // 현재 화면에서 보이는 요소인지 아닌지 구별
  // 요소가 보이거나 사라질 때 콜백함수가 실행
  const io = new IntersectionObserver((entries, observer) => {
    // console.log(entries[0].target.dataset.index);
    // 현재 보이고 사라지는 elem의 index가 표시
    ioIndex = entries[0].target.dataset.index * 1;
    // 하지만 console창에 검정색으로 뜨는 것 스트링이라는 것
    // 따라서 숫자로 바꾸기 위해 * 1을 해준다
    // 콘솔에 파란색으로 뜬다
    // console.log(ioIndex);
  });

  for (let i = 0; i < stepElems.length; i++) {
    // observer가 관찰하도록 등록
    io.observe(stepElems[i]);
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

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      // 첫 elem의 인덱스가 0이므로 -1이 나와 에러가 남
      // 따라서 if문으로 step의 값이 없을 때 continue 하도록 처리
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  activate();
})();
