document.addEventListener('DOMContentLoaded', () => {
    loadMyDiseases();
});

async function loadMyDiseases() {
    const tagsWrapper = document.getElementById('my-disease-tags');
    if (!tagsWrapper) return;

    try {
        // 서버에서 최신순(내림차순)으로 정렬된 나의 질병 목록을 가져옵니다.
        const response = await fetch('/api/my-diseases');
        if (!response.ok) throw new Error('데이터 로드 실패');

        const myDiseaseList = await response.json();

        if (myDiseaseList.length === 0) {
            tagsWrapper.innerHTML = `
                <p class="empty-msg">저장된 나의 질병 기록이 없습니다.</p>
                <button class="add-tag-btn" onclick="location.href='/disease'">+ 추가하러 가기</button>
            `;
            return;
        }

        tagsWrapper.innerHTML = '';

        // 태그 디자인 순환용 스타일 배열
        const tagStyles = [
            { class: 'red', icon: 'fa-solid fa-droplet' },
            { class: 'pink', icon: 'fa-solid fa-heart' },
            { class: 'orange', icon: 'fa-solid fa-wave-square' }
        ];

        // 받아온 데이터 순회하며 렌더링 (서버에서 이미 내림차순 정렬되어 옴)
        myDiseaseList.forEach((item, index) => {
            const style = tagStyles[index % tagStyles.length];
            const diseaseName = item.disease ? item.disease.name : '알 수 없는 질병';

            const tagDiv = document.createElement('div');
            tagDiv.className = `disease-tag ${style.class}`;
            tagDiv.innerHTML = `
                <span><i class="${style.icon}"></i> ${diseaseName}</span>
            `;

            tagsWrapper.appendChild(tagDiv);
        });

        // 맨 마지막에 '+ 추가하기' 버튼 배치
        const addBtn = document.createElement('button');
        addBtn.className = 'add-tag-btn';
        addBtn.innerHTML = '+ 추가하기';
        addBtn.onclick = () => { location.href = '/disease'; };
        tagsWrapper.appendChild(addBtn);

    } catch (error) {
        console.error('My Disease Load Error:', error);
        tagsWrapper.innerHTML = '<p class="error-msg">기록을 불러오는 데 실패했습니다.</p>';
    }
}