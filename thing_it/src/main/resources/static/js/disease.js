// =============================================================
//  전역 상태 변수 관리
// =============================================================
let currentOrganKey = null;            // 현재 선택된 부위
let currentDiseaseIndex = 0;           // 선택된 질병 인덱스
let currentLoadedDiseases = [];        // API로 로드된 질병 목록
const selectedDiseases = new Set();    // 사용자가 추가한 지병 목록 (중복 방지)

// =============================================================
//  DOM 요소 획득
// =============================================================
const organBtns = document.querySelectorAll('.organ-btn');
const organNameEl = document.getElementById('organ-name');
const organDescEl = document.getElementById('organ-desc');
const organIconEl = document.getElementById('organ-icon');
const totalCountEl = document.getElementById('total-count');
const diseasePillsEl = document.getElementById('disease-pills');
const diseaseBoxEl = document.getElementById('disease-box');
const summaryTrackEl = document.getElementById('summaryTrack');
const bannerFeaturesEl = document.getElementById('banner-features');

const initialPlaceholder = document.getElementById('initial-placeholder');
const diseaseDetailContainer = document.getElementById('disease-detail-container');

const addDiseaseBtn = document.getElementById('add-disease-btn');
const selectedChipsWrapper = document.getElementById('selected-chips-wrapper');
const goFoodBtn = document.getElementById('go-food-btn');

// =============================================================
//  부위별 기본 메타데이터
// =============================================================
const organMeta = {
    head: { name: "머리", icon: "fa-solid fa-brain", desc: "머리와 뇌는 인체의 중추신경계를 담당하여 인지, 기억, 감각, 운동 조절을 총괄합니다.", dbCategory: "머리" },
    lungs: { name: "폐", icon: "fa-solid fa-lungs", desc: "폐는 호흡을 통해 산소를 받아들이고 이산화탄소를 배출하는 가스 교환 기관입니다.", dbCategory: "폐" },
    liver: { name: "간", icon: "fa-solid fa-disease", desc: "간은 우리 몸에서 해독, 영양소 대사, 담즙 생성 등 다양한 역할을 수행하는 중요한 장기입니다.", dbCategory: "간" },
    kidney: { name: "신장", icon: "fa-solid fa-notes-medical", desc: "신장은 혈액 속 노폐물을 걸러내어 소변으로 배출하고 수분과 염분 균형을 조절합니다.", dbCategory: "신장" },
    joint: { name: "뼈/관절", icon: "fa-solid fa-bone", desc: "신체의 골격을 형성하고 신체를 지지하며 관절을 통해 원활한 운동을 돕습니다.", dbCategory: "뼈/관절" },
    heart: { name: "심장", icon: "fa-solid fa-heart", desc: "심장은 혈액 순환을 주도하여 온몸으로 산소와 영양소를 공급하는 펌프 역할을 합니다.", dbCategory: "심장" },
    stomach: { name: "위", icon: "fa-solid fa-apple-whole", desc: "위는 섭취한 음식물을 연동 운동과 위산 분비를 통해 소화시키는 주된 기관입니다.", dbCategory: "위" },
    intestine: { name: "장", icon: "fa-solid fa-disease", desc: "소장과 대장으로 구성되어 영양분 흡수와 수분 재흡수, 배설물 형성을 담당합니다.", dbCategory: "장" },
    women: { name: "여성질환", icon: "fa-solid fa-person-dress", desc: "여성 생식기계 및 호르몬 불균형과 관련된 다양한 건강 질환을 의미합니다.", dbCategory: "여성질환" },
    muscle: { name: "근육", icon: "fa-solid fa-child", desc: "수축과 이완을 통해 신체 움직임을 만들고 자세 유지와 장기 보호를 담당합니다.", dbCategory: "근육" },
    blood: { name: "피", icon: "fa-solid fa-droplet", desc: "동맥·정맥·모세혈관으로 구성되어 산소와 영양분을 전신에 공급하고 노폐물을 회수합니다.", dbCategory: "피" }
};

// =============================================================
//  초기화 실행
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    if (initialPlaceholder) initialPlaceholder.style.display = 'flex';
    if (diseaseDetailContainer) diseaseDetailContainer.style.display = 'none';

    initAllSummaryCards();
    initEventListeners();
    initSlider();
    renderSelectedChips();
});

// =============================================================
//  이벤트 리스너 등록
// =============================================================
function initEventListeners() {
    // 1. 인체 부위 버튼 클릭
    organBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const organKey = btn.getAttribute('data-organ');
            if (organKey) {
                currentOrganKey = organKey;
                currentDiseaseIndex = 0;
                updateActiveStates(organKey);
                renderOrganDetail(organKey);
            }
        });
    });

    // 2. [지병 추가하기] 버튼 클릭
    if (addDiseaseBtn) {
        addDiseaseBtn.addEventListener('click', () => {
            if (currentLoadedDiseases.length > 0 && currentLoadedDiseases[currentDiseaseIndex]) {
                const diseaseObj = currentLoadedDiseases[currentDiseaseIndex];
                const diseaseName = typeof diseaseObj === 'object' ? diseaseObj.name : diseaseObj;

                if (diseaseName) {
                    addDiseaseChip(diseaseName);
                }
            } else {
                alert('추가할 질병 정보가 없습니다.');
            }
        });
    }

    // 3. [관련 식재료 보기] 버튼 클릭
    if (goFoodBtn) {
        goFoodBtn.addEventListener('click', () => {
            const diseaseList = Array.from(selectedDiseases).join(',');
            if (diseaseList) {
                location.href = `/food?diseases=${encodeURIComponent(diseaseList)}`;
            } else {
                location.href = '/food';
            }
        });
    }
}

function updateActiveStates(organKey) {
    organBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-organ') === organKey));
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-organ') === organKey));
}

// =============================================================
//  질병 데이터 렌더링 (API)
// =============================================================
async function renderOrganDetail(organKey) {
    if (initialPlaceholder) initialPlaceholder.style.display = 'none';
    if (diseaseDetailContainer) diseaseDetailContainer.style.display = 'block';

    const meta = organMeta[organKey] || { name: organKey, icon: "fa-solid fa-notes-medical", desc: "", dbCategory: organKey };

    if (organNameEl) organNameEl.textContent = meta.name;
    if (organDescEl) organDescEl.textContent = meta.desc;
    if (organIconEl) organIconEl.innerHTML = `<i class="${meta.icon}"></i>`;

    try {
        const response = await fetch(`/api/diseases/${encodeURIComponent(meta.dbCategory)}`);
        if (!response.ok) throw new Error('데이터 로드 실패');

        const diseases = await response.json();
        currentLoadedDiseases = diseases;

        if (totalCountEl) totalCountEl.textContent = `총 ${diseases.length}개`;

        if (diseasePillsEl) {
            diseasePillsEl.innerHTML = '';
            diseases.forEach((disease, index) => {
                const button = document.createElement('button');
                button.className = `pill-btn ${index === currentDiseaseIndex ? 'active' : ''}`;
                const diseaseName = typeof disease === 'object' ? disease.name : disease;
                button.innerHTML = `<i class="${meta.icon}"></i><span>${diseaseName}</span>`;

                button.addEventListener('click', () => {
                    currentDiseaseIndex = index;
                    renderDiseasePillActive();
                    renderDiseaseDetail(disease);
                });

                diseasePillsEl.appendChild(button);
            });
        }

        if (diseaseBoxEl) {
            if (diseases.length > 0) {
                renderDiseaseDetail(diseases[currentDiseaseIndex]);
            } else {
                diseaseBoxEl.innerHTML = '<p class="no-data">등록된 질병 정보가 없습니다.</p>';
                if (bannerFeaturesEl) bannerFeaturesEl.innerHTML = '';
            }
        }
    } catch (error) {
        console.error('Data fetch error:', error);
        if (diseaseBoxEl) diseaseBoxEl.innerHTML = '<p class="error-msg">데이터를 불러오는 중 오류가 발생했습니다.</p>';
    }
}

function renderDiseasePillActive() {
    if (!diseasePillsEl) return;
    const pillBtns = diseasePillsEl.querySelectorAll('.pill-btn');
    pillBtns.forEach((btn, index) => btn.classList.toggle('active', index === currentDiseaseIndex));
}

function renderDiseaseDetail(disease) {
    if (!diseaseBoxEl || !disease) return;

    const causes = disease.cause ? disease.cause.split(',').map(s => s.trim()).filter(Boolean) : [];
    const habits = disease.eating_habits ? disease.eating_habits.split(',').map(s => s.trim()).filter(Boolean) : [];
    const cares = disease.care_guide ? disease.care_guide.split(',').map(s => s.trim()).filter(Boolean) : [];

    const causesHtml = causes.map(c => `<li>${c}</li>`).join('');
    const habitsHtml = habits.map(h => `<div class="habit-card"><i class="fa-solid fa-utensils"></i><span>${h}</span></div>`).join('');
    const careHtml = cares.map(c => `<div class="care-card"><i class="fa-solid fa-notes-medical"></i><span>${c}</span></div>`).join('');

    diseaseBoxEl.innerHTML = `
    <div class="disease-box-header">
      <div>
        <h3 class="disease-name">${disease.name || ''}</h3>
        <p class="disease-short">${disease.description || ''}</p>
      </div>
      <div class="disease-icon-lg"><i class="fa-solid fa-stethoscope"></i></div>
    </div>
    <div class="info-block">
      <h5>주요 원인</h5>
      <ul class="inline-bullet-list">${causesHtml.length > 0 ? causesHtml : '<li>등록된 원인 정보가 없습니다.</li>'}</ul>
    </div>
    <div class="info-block">
      <h5>추천 식습관</h5>
      <div class="habit-cards">${habitsHtml.length > 0 ? habitsHtml : '<p class="no-info">등록된 식습관 정보가 없습니다.</p>'}</div>
    </div>
    <div class="info-block">
      <h5>관리 방법</h5>
      <div class="care-cards">${careHtml.length > 0 ? careHtml : '<p class="no-info">등록된 관리 가이드가 없습니다.</p>'}</div>
    </div>`;

    if (bannerFeaturesEl) {
        bannerFeaturesEl.innerHTML = `
        <div class="feature-item">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <div>
            <strong>원인 관리</strong>
            <p>${causes[0] || '정기적인 검진으로 건강을 관리하세요.'}</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-seedling"></i>
          <div>
            <strong>추천 식습관</strong>
            <p>${habits[0] || '균형 잡힌 식사가 예방의 핵심입니다.'}</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fa-solid fa-person-running"></i>
          <div>
            <strong>관리 가이드</strong>
            <p>${cares[0] || '꾸준한 생활습관 개선이 필요합니다.'}</p>
          </div>
        </div>`;
    }
}

// =============================================================
//  질병 칩(Tag) 추가/삭제 및 카운트 업데이트
// =============================================================
function addDiseaseChip(diseaseName) {
    if (selectedDiseases.has(diseaseName)) {
        alert(`'${diseaseName}'은(는) 이미 추가되어 있습니다.`);
        return;
    }

    selectedDiseases.add(diseaseName);
    renderSelectedChips();
}

function removeDiseaseChip(diseaseName) {
    selectedDiseases.delete(diseaseName);
    renderSelectedChips();
}

function renderSelectedChips() {
    // 1. [지병 추가하기] 버튼 옆 "선택된 지병 : N개" 업데이트
    const countBadge = document.getElementById('selected-count-text');
    if (countBadge) {
        countBadge.textContent = `선택된 지병 : ${selectedDiseases.size}개`;
    }

    if (!selectedChipsWrapper) return;

    // 2. 추가된 지병이 없으면 기본 안내 문구 표시
    if (selectedDiseases.size === 0) {
        selectedChipsWrapper.innerHTML = '<span class="empty-msg">추가된 지병이 없습니다.</span>';
        return;
    }

    // 3. 버튼 아랫줄(#selected-chips-wrapper)에 칩태그 렌더링
    selectedChipsWrapper.innerHTML = '';
    selectedDiseases.forEach(name => {
        const chip = document.createElement('div');
        chip.className = 'disease-chip';
        chip.innerHTML = `
            <span>${name}</span>
            <button class="chip-remove-btn" aria-label="${name} 삭제"><i class="fa-solid fa-xmark"></i></button>
        `;

        chip.querySelector('.chip-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeDiseaseChip(name);
        });

        selectedChipsWrapper.appendChild(chip);
    });
}

// =============================================================
//  하단 슬라이더 로직
// =============================================================
async function initAllSummaryCards() {
    if (!summaryTrackEl) return;
    summaryTrackEl.innerHTML = '';

    for (const [organKey, meta] of Object.entries(organMeta)) {
        try {
            const response = await fetch(`/api/diseases/${encodeURIComponent(meta.dbCategory)}`);
            const diseases = response.ok ? await response.json() : [];

            const summaryItem = document.createElement('div');
            summaryItem.className = `summary-item ${organKey === currentOrganKey ? 'active' : ''}`;
            summaryItem.setAttribute('data-organ', organKey);

            const diseaseListHtml = diseases.length > 0
                ? diseases.map(d => `<li>${d.name || d}</li>`).join('')
                : '<li>등록된 질병 없음</li>';

            summaryItem.innerHTML = `
                <div class="summary-head">
                    <i class="${meta.icon}"></i>
                    <h4>${meta.name}</h4>
                </div>
                <ul>${diseaseListHtml}</ul>
            `;

            summaryItem.addEventListener('click', () => {
                currentOrganKey = organKey;
                currentDiseaseIndex = 0;
                updateActiveStates(organKey);
                renderOrganDetail(organKey);
                document.querySelector('.content-grid')?.scrollIntoView({ behavior: 'smooth' });
            });

            summaryTrackEl.appendChild(summaryItem);
        } catch (error) {
            console.error(`Summary card fetch error [${organKey}]:`, error);
        }
    }
}

function initSlider() {
    const slider = document.getElementById('summaryWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slider) return;

    const scrollAmount = 350;

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        slider.style.scrollBehavior = 'auto';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    const stopDragging = () => {
        if (!isDown) return;
        isDown = false;
        slider.style.cursor = 'pointer';
        slider.style.scrollBehavior = 'smooth';
    };

    slider.addEventListener('mouseleave', stopDragging);
    slider.addEventListener('mouseup', stopDragging);

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
}