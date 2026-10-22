function setSelectedDiseasesFromUrl() {

    const params = new URLSearchParams(window.location.search);

    // ?diseases=23,24,33
    const diseaseParam = params.get('diseases');

    if (!diseaseParam) {
        return;
    }

    // "23,24,33" → ["23", "24", "33"]
    const diseaseIds = diseaseParam.split(',');

    diseaseIds.forEach(id => {

        const checkbox = document.querySelector(
            `.disease-checkbox[value="${id}"]`
        );

        if (checkbox) {
            checkbox.checked = true;

            const item = checkbox.closest('.disease-item');

            if (item) {
                item.classList.add('selected');
            }
        }
    });

    // 선택된 질병 이름도 화면에 표시
    updateSelectedDiseaseText();
}
function updateSelectedDiseaseText() {

    const selectedDiseases = [];

    document.querySelectorAll('.disease-checkbox:checked')
        .forEach(function (checkedBox) {

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
function check_disease(event) {

    const checkbox = event.target;

    if (!checkbox.classList.contains('disease-checkbox')) return;

    const item = checkbox.closest('.disease-item');

    item.classList.toggle('selected', checkbox.checked);

    updateSelectedDiseaseText();
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
// CSRF 토큰 가져오기
    const csrfToken =
        document.querySelector('meta[name="_csrf"]')?.content;

    const csrfHeader =
        document.querySelector('meta[name="_csrf_header"]')?.content;

    const headers = {
        'Content-Type': 'application/json'
    };

// 토큰이 존재하면 요청 헤더에 추가
    if (csrfToken && csrfHeader) {
        headers[csrfHeader] = csrfToken;
    }
    //console.log('선택한 질병 ID:', diseaseIds);

    // 서버로 전송
    fetch('/api/foods/recommend', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            diseaseIds: diseaseIds
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP ${response.status}: ${text}`);
                });
            }

            return response.json();
        })
        .then(data => {

            //console.log('질병별 추천 결과:', data);
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
            document.getElementById('content-hidden').classList.remove('hidden-div');
        })
        .catch(error => {
            console.error('추천 조회 오류:', error);
        });

}
/////////////////////////////////////


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

///////////////////////////////////
function computeCommonFoods(data) {
    //console.log("공통 계산에 들어온 data:", data);
    const foodMap = new Map();
    const commMap = new Map();

    data.forEach(disease => {

        // foodMap이 비어있다면
        if (foodMap.size === 0) {
            disease.foods.forEach(food => {
                foodMap.set(food.foodId, {
                    ...food,
                    diseaseId: [disease.diseaseId],
                    diseaseName: [disease.diseaseName]
                });

            });
        } else {
            disease.foods.forEach(food => {
                const exfoodId = food.foodId;
            if (foodMap.has(exfoodId)) {
                const cmmfood = foodMap.get(exfoodId);
                cmmfood.diseaseId.push(disease.diseaseId);
                cmmfood.diseaseName.push(disease.diseaseName);
            }else {
                foodMap.set(food.foodId, {
                    ...food,
                    diseaseId: [disease.diseaseId],
                    diseaseName: [disease.diseaseName]
                });
            }
            });

        }
    });

    //console.log("foodMap:", foodMap);
    return Array.from(foodMap.values())
        .filter(food => food.diseaseId.length >= 2);
}
/*
// 모든 선택 질병에 공통으로 들어있는 음식 추출
function computeCommonFoods(data) {
    console.log("공통 계산에 들어온 data:", data);
    const foodMap = new Map();
    const commMap = new Map();

    data.forEach(disease => {

        disease.foods.forEach(food => {

            const foodId = food.foodId;
            //foodMap에들어있는것과 foodId 비교후 안들어있으면 foodMap에저장 ?
            if (!foodMap.has(foodId)) {
                foodMap.set(foodId, {
                    ...food,
                    diseases: []
                });
            }
            // foodId 를
            const foodData = foodMap.get(foodId);

            // 같은 질병이 중복으로 들어가지 않도록 확인
            if (!foodData.diseases.includes(disease.diseaseName)) {
                foodData.diseases.push(disease.diseaseName);
            }
        });
    });

    // 2개 이상의 질병에 포함된 식재료만 공통 추천
    return Array.from(foodMap.values())
        .filter(food => food.diseases.length >= 2);
}*/
function foodCardHtml(food, badgeText, isCommon) {

    const commonDiseaseHtml = isCommon
        ? `
            <div class="common-disease">
                <b>공통 질병</b>
                ${food.diseaseName.join(' · ')}
            </div>
          `
        : '';

    return `
        <div class="food-card">

            <div class="food-img">
                <span class="badge ${isCommon ? 'common' : ''}">
                    ${badgeText}
                </span>

                <span class="heart-fav">♡</span>
            </div>

            <div class="food-body">

                <h4>${food.foodName}</h4>

                ${commonDiseaseHtml}

                <div class="effect">
                    <b>효과</b>
                    ${food.foodEffect ?? ''}
                </div>

                <div class="nutri-label">
                    주요 영양성분
                </div>

                <div class="nutri-val">
                    ${food.foodNutrient ?? ''}
                </div>

            </div>
        </div>
    `;
}

function renderFoodTabs(data) {

    const tabsWrap = document.querySelector('.tabs2');
    const scrollWrap = document.querySelector('.food-scroll');

    const commonFoods = computeCommonFoods(data);

    let tabsHtml = `
        <div class="tab active" data-target="commonFood">
            공통 추천 (${commonFoods.length})
        </div>
    `;

    let contentHtml = `
        <div class="food-grid tab-content active" id="commonFood">
            ${commonFoods
        .map(f => foodCardHtml(f, '공통 추천', true))
        .join('')}
        </div>
    `;

    data.forEach(disease => {

        const targetId = `disease_${disease.diseaseId}`;

        tabsHtml += `
            <div class="tab" data-target="${targetId}">
                ${disease.diseaseName} 맞춤 (${disease.foods.length})
            </div>
        `;

        contentHtml += `
            <div class="food-grid tab-content" id="${targetId}">
                ${disease.foods
            .map(f => foodCardHtml(
                f,
                `${disease.diseaseName} 맞춤`,
                false
            ))
            .join('')}
            </div>
        `;
    });

    tabsWrap.innerHTML = tabsHtml;
    scrollWrap.innerHTML = contentHtml;

    bindTabEvents();
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

document.addEventListener('DOMContentLoaded', function () {

    setSelectedDiseasesFromUrl();
    const tabs = document.querySelectorAll('#categoryTabs .tab');
    const diseases = document.querySelectorAll('.disease-item');

    // Category 클릭
    tabs.forEach(function (tab) {

        tab.addEventListener('click', function () {

            const selectedCategory = this.dataset.category;

            // 선택된 탭 표시
            tabs.forEach(function (tab) {
                tab.classList.remove('active');
            });

            this.classList.add('active');

            // 해당 Category의 질병만 표시
            diseases.forEach(function (disease) {

                if (disease.dataset.category === selectedCategory) {
                    disease.style.display = '';
                } else {
                    disease.style.display = 'none';
                }

            });
        });

    });


    // 첫 번째 Category를 기본 선택
    if (tabs.length > 0) {
        tabs[0].click();
    }

});