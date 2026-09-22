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

  // 2. 추가하기 버튼 누를 때 간편 질병 추가 액션
  const addTagBtn = document.querySelector('.add-tag-btn');
  const diseaseContainer = document.querySelector('.disease-tags');

  if (addTagBtn) {
    addTagBtn.addEventListener('click', () => {
      const newDisease = prompt('추가할 질병 이름을 입력하세요:');
      if (newDisease && newDisease.trim() !== '') {
        const newTag = document.createElement('div');
        newTag.className = 'disease-tag red';
        newTag.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${newDisease.trim()}`;
        
        // 추가 버튼 바로 앞에 삽입
        diseaseContainer.insertBefore(newTag, addTagBtn);
      }
    });
  }
});