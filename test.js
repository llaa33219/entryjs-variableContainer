(function watchAndSetEntryVar(){
  // 1) iframe 준비 대기
  const iframe = document.querySelector('iframe');
  if (!iframe) {
    console.log('🕒 iframe 대기 중...');
    setTimeout(watchAndSetEntryVar, 500);
    return;
  }

  // 2) Entry + 변수 컨테이너 준비 대기
  const ed = iframe.contentWindow;
  if (!ed.Entry || !ed.Entry.variableContainer) {
    console.log('🕒 Entry 로드 대기 중...');
    setTimeout(watchAndSetEntryVar, 500);
    return;
  }

  // 3) 감지할 변수 가져오기
  const varName = 'Name';  
  const entryVar = ed.Entry.variableContainer.getVariableByName(varName);
  if (!entryVar) {
    console.error(`❌ 변수 "${varName}"를 찾을 수 없습니다.`);
    return;
  }

  // 4) 초기 값 저장
  let lastValue = entryVar.value_;
  console.log(`초기 ${varName} 값:`, lastValue);

  // 5) 값 변화 감지 (500ms마다 체크)
  setInterval(() => {
    const curr = entryVar.value_;
    if (curr !== lastValue) {
      console.log(`🔄 ${varName} 값 변경 감지:`, lastValue, '→', curr);
      lastValue = curr;
    }
  }, 500);

  // 6) 값 강제로 변경해 보기 (5초 뒤)
  setTimeout(() => {
    const newValue = lastValue === 1 ? 0 : 1;
    entryVar.value_ = newValue;
    console.log(`✏️ ${varName} 값을 강제로 ${newValue}로 설정했습니다.`);
  }, 5000);

})();
