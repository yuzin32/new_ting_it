document.addEventListener('DOMContentLoaded', () => {
  // 1. 하트(좋아요) 토글 기능
  const heartBtns = document.querySelectorAll('.heart-btn');

  heartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const icon = btn.querySelector('i');
      if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#e5484d'; // 빨간색 하트
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '#ccc';
      }
    });
  });

  // 2. localStorage에서 지병 데이터 불러오기 (없으면 기본값 설정)
  const diseaseContainer = document.querySelector('.disease-tags');
  const addTagBtn = document.querySelector('.add-tag-btn');

  let savedDiseases = JSON.parse(localStorage.getItem('userSelectedDiseases')) || ['당뇨', '지방간', '고혈압'];

  function renderMypageDiseases() {
    // 기존에 있던 .disease-tag 태그들만 모두 제거 (+ 추가하기 버튼은 유지)
    const existingTags = diseaseContainer.querySelectorAll('.disease-tag');
    existingTags.forEach(tag => tag.remove());

    // 저장된 지병들을 순회하며 DOM에 추가
    savedDiseases.forEach((disease, index) => {
      const newTag = document.createElement('div');
      newTag.className = 'disease-tag red';
      newTag.innerHTML = `
        <i class="fa-solid fa-circle-info"></i> 
        <span>${disease}</span>
        <button type="button" class="mypage-remove-btn" data-index="${index}" style="background:none; border:none; color:#999; margin-left:6px; cursor:pointer;">&times;</button>
      `;

      // 삭제 버튼 이벤트
      newTag.querySelector('.mypage-remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        savedDiseases.splice(index, 1);
        localStorage.setItem('userSelectedDiseases', JSON.stringify(savedDiseases));
        renderMypageDiseases();
      });

      diseaseContainer.insertBefore(newTag, addTagBtn);
    });
  }

  // 초기 렌더링 실행
  renderMypageDiseases();

  // 3. 마이페이지 내에서 '+ 추가하기' 버튼 누를 때 액션
  if (addTagBtn) {
    addTagBtn.addEventListener('click', () => {
      const newDisease = prompt('추가할 질병 이름을 입력하세요:');
      if (newDisease && newDisease.trim() !== '') {
        const trimmed = newDisease.trim();
        if (!savedDiseases.includes(trimmed)) {
          savedDiseases.push(trimmed);
          localStorage.setItem('userSelectedDiseases', JSON.stringify(savedDiseases));
          renderMypageDiseases();
        } else {
          alert('이미 존재하는 질병입니다.');
        }
      }
    });
  }
});