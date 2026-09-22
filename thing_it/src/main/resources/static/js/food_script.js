function check_disease(event) {
    const checkbox = event.target;
    if (!checkbox.classList.contains('disease-checkbox')) return;
    //클릭한체크박스 체크
    const item = checkbox.closest('.disease-item');
    item.classList.toggle('selected', checkbox.checked);

    //클릭한 체크박스
    const selectedDiseases = [];
    document.querySelectorAll('.disease-checkbox:checked').forEach(function (checkedBox) {
        const diseaseName = checkedBox
            .closest('.disease-item')
            .querySelector('span')
            .textContent
            .trim();
        selectedDiseases.push(diseaseName);
    });
    document.getElementById('selectedText').textContent =
        selectedDiseases.length > 0
            ? selectedDiseases.join(', ')
            : '선택된 지병이 없습니다';
}
///////////////////////////////////////////
function btn_analyze() {

    // 체크된 질병 체크박스 가져오기
    const checkedDiseases = document.querySelectorAll(
        '.disease-checkbox:checked'
    );

    // 선택하지 않았으면 중단
    if (checkedDiseases.length === 0) {
        alert('질병을 하나 이상 선택해주세요.');
        return;
    }

    // disease_id 배열 만들기
    const diseaseIds = Array.from(checkedDiseases).map(
        checkbox => Number(checkbox.value)
    );

    //console.log('선택한 질병 ID:', diseaseIds);

    // 서버로 전송
    fetch('/api/foods/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            diseaseIds: diseaseIds
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 요청에 실패했습니다.');
            }

            return response.json();
        })
        .then(data => {

            console.log('질병별 추천 결과:', data);
/*
            // 질병별 이름 + 음식 목록 출력
            data.forEach(item => {
                console.log(
                    `질병: ${item.diseaseName} (id: ${item.diseaseId})`,
                    `음식: [${item.foods.join(', ')}]`
                );
            });*/
            renderVenn(data);
            renderFoodTabs(data);
        })
        .catch(error => {
            console.error('추천 조회 오류:', error);
        });
}
/////////////////////////////////////
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(function(tab) {

    tab.addEventListener('click', function() {

        // 모든 탭 비활성화
        tabs.forEach(function(tab) {
            tab.classList.remove('active');
        });

        // 클릭한 탭 활성화
        this.classList.add('active');

        // 모든 내용 숨기기
        contents.forEach(function(content) {
            content.classList.remove('active');
        });

        // 클릭한 탭의 data-target 가져오기
        const target = this.dataset.target;

        // 해당 div 보여주기
        document.getElementById(target).classList.add('active');
    });

});

///////////////////////////////////
function fillList(ul, items, emptyText) {
    ul.innerHTML = '';
    const list = items.length > 0 ? items : [{ foodName: emptyText }];
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.foodName;   // 필요하면 item.foodEffect 등도 같이 표시 가능
        ul.appendChild(li);
    });
}

function renderVenn(data) {
    const venn = document.getElementById('venn');
    const msg  = document.getElementById('vennMsg');

    // 벤 다이어그램은 질병 2개일 때만 표시
    if (data.length !== 2) {
        venn.style.display = 'none';
        msg.style.display = '';
        msg.textContent = `벤 다이어그램은 질병을 2개 선택했을 때 볼 수 있습니다. (현재 ${data.length}개)`;
        return;
    }
    msg.style.display = 'none';
    venn.style.display = '';

    const [a, b] = data;

    // foodName 기준으로 Set 구성 (객체는 참조가 달라서 직접 비교 불가)
    const setA = new Set(a.foods.map(f => f.foodName));
    const setB = new Set(b.foods.map(f => f.foodName));

    const common = a.foods.filter(f => setB.has(f.foodName));
    const onlyA  = a.foods.filter(f => !setB.has(f.foodName));
    const onlyB  = b.foods.filter(f => !setA.has(f.foodName));

    document.getElementById('vennLeftTitle').textContent  = `${a.diseaseName}에 좋은 식재료`;
    document.getElementById('vennRightTitle').textContent = `${b.diseaseName}에 좋은 식재료`;

    fillList(document.getElementById('vennLeftList'),   onlyA,  '해당 식재료 없음');
    fillList(document.getElementById('vennRightList'),  onlyB,  '해당 식재료 없음');
    fillList(document.getElementById('vennCenterList'), common, '공통 식재료 없음');

    //fitVenn();   // 내용이 바뀌었으니 원 크기 다시 계산
}
// 모든 선택 질병에 공통으로 들어있는 음식 추출
function computeCommonFoods(data) {
    if (data.length < 2) return [];
    const foodMaps = data.map(d => new Map(d.foods.map(f => [f.foodName, f])));
    const [first, ...rest] = foodMaps;
    const common = [];
    for (const [name, food] of first) {
        if (rest.every(map => map.has(name))) {
            common.push(food);
        }
    }
    return common;
}

function foodCardHtml(food, badgeText, isCommon) {
    return `
        <div class="food-card">
            <div class="food-img">
                <span class="badge ${isCommon ? 'common' : ''}">${badgeText}</span>
                <span class="heart-fav">♡</span>
            </div>
            <div class="food-body">
                <h4>${food.foodName}</h4>
                <div class="effect"><b>효과</b>${food.foodEffect ?? ''}</div>
                <div class="nutri-label">주요 영양성분</div>
                <div class="nutri-val">${food.foodNutrient ?? ''}</div>
            </div>
        </div>
    `;
}

function renderFoodTabs(data) {
    const tabsWrap = document.querySelector('.tabs');
    const scrollWrap = document.querySelector('.food-scroll');

    const commonFoods = computeCommonFoods(data);

    let tabsHtml = `<div class="tab active" data-target="commonFood">공통 추천 (${commonFoods.length})</div>`;
    let contentHtml = `<div class="food-grid tab-content active" id="commonFood">
        ${commonFoods.map(f => foodCardHtml(f, '공통 추천', true)).join('')}
    </div>`;

    data.forEach(disease => {
        const targetId = `disease_${disease.diseaseId}`;
        tabsHtml += `<div class="tab" data-target="${targetId}">${disease.diseaseName} 맞춤 (${disease.foods.length})</div>`;
        contentHtml += `<div class="food-grid tab-content" id="${targetId}">
            ${disease.foods.map(f => foodCardHtml(f, `${disease.diseaseName} 맞춤`, false)).join('')}
        </div>`;
    });

    tabsWrap.innerHTML = tabsHtml;
    scrollWrap.innerHTML = contentHtml;

    bindTabEvents();   // 탭을 새로 만들었으니 클릭 이벤트도 다시 바인딩
}

function bindTabEvents() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));

            const target = this.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });
}