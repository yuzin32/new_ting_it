let currentOrganKey = "liver";
let currentDiseaseIndex = 0;

const organBtns = document.querySelectorAll('.organ-btn');
const summaryItems = document.querySelectorAll('.summary-item');
const organNameEl = document.getElementById('organ-name');
const organDescEl = document.getElementById('organ-desc');
const organIconEl = document.getElementById('organ-icon');
const totalCountEl = document.getElementById('total-count');
const diseasePillsEl = document.getElementById('disease-pills');
const diseaseBoxEl = document.getElementById('disease-box');

// DB 테이블 th_disease의 category 컬럼값과 정확히 매핑
const organMeta = {
    liver: { name: "간", icon: "fa-solid fa-disease", desc: "간은 우리 몸에서 해독, 영양소 대사, 담즙 생성 등 다양한 역할을 수행하는 중요한 장기입니다.", dbCategory: "간질환" },
    head: { name: "머리", icon: "fa-solid fa-brain", desc: "머리와 뇌는 인체의 중추신경계를 담당하여 인지, 기억, 감각, 운동 조절을 총괄합니다.", dbCategory: "뇌·신경질환" },
    lungs: { name: "폐", icon: "fa-solid fa-lungs", desc: "폐는 호흡을 통해 산소를 받아들이고 이산화탄소를 배출하는 가스 교환 기관입니다.", dbCategory: "호흡기질환" },
    heart: { name: "심장", icon: "fa-solid fa-heart", desc: "심장은 혈액 순환을 주도하여 온몸으로 산소와 영양소를 공급하는 펌프 역할을 합니다.", dbCategory: "심장질환" },
    stomach: { name: "위", icon: "fa-solid fa-stomach", desc: "위는 섭취한 음식물을 연동 운동과 위산 분비를 통해 소화시키는 주된 기관입니다.", dbCategory: "위장질환" },
    kidney: { name: "신장", icon: "fa-solid fa-kidneys", desc: "신장은 혈액 속 노폐물을 걸러내어 소변으로 배출하고 수분과 염분 균형을 조절합니다.", dbCategory: "신장질환" },
    joint: { name: "뼈/관절", icon: "fa-solid fa-bone", desc: "신체의 골격을 형성하고 신체를 지지하며 관절을 통해 원활한 운동을 돕습니다.", dbCategory: "관절·뼈질환" },
    intestine: { name: "장", icon: "fa-solid fa-disease", desc: "소장과 대장으로 구성되어 영양분 흡수와 수분 재흡수, 배설물 형성을 담당합니다.", dbCategory: "장질환" },
    women: { name: "여성질환", icon: "fa-solid fa-person-dress", desc: "여성 생식기계 및 호르몬 불균형과 관련된 다양한 건강 질환을 의미합니다.", dbCategory: "여성질환" }
};

document.addEventListener('DOMContentLoaded', () => {
    renderOrganDetail(currentOrganKey);
    initEventListeners();
    initSlider();
});

function initEventListeners() {
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

    summaryItems.forEach(item => {
        item.addEventListener('click', () => {
            const organKey = item.getAttribute('data-organ');
            if (organKey) {
                currentOrganKey = organKey;
                currentDiseaseIndex = 0;
                updateActiveStates(organKey);
                renderOrganDetail(organKey);
                document.querySelector('.content-grid')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateActiveStates(organKey) {
    organBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-organ') === organKey));
    summaryItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-organ') === organKey));
}

async function renderOrganDetail(organKey) {
    const meta = organMeta[organKey] || { name: organKey, icon: "fa-solid fa-notes-medical", desc: "", dbCategory: organKey };

    if (organNameEl) organNameEl.textContent = meta.name;
    if (organDescEl) organDescEl.textContent = meta.desc;
    if (organIconEl) organIconEl.innerHTML = `<i class="${meta.icon}"></i>`;

    try {
        const response = await fetch(`/api/diseases/${encodeURIComponent(meta.dbCategory)}`);
        if (!response.ok) throw new Error('데이터 로드 실패');

        const diseases = await response.json();
        if (totalCountEl) totalCountEl.textContent = `총 ${diseases.length}개`;

        if (diseasePillsEl) {
            diseasePillsEl.innerHTML = '';
            diseases.forEach((disease, index) => {
                const button = document.createElement('button');
                button.className = `pill-btn ${index === currentDiseaseIndex ? 'active' : ''}`;
                // [object Object] 방지: disease.name 명시적 읽기
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
}

function initSlider() {
    const summaryWrapper = document.getElementById('summaryWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (!summaryWrapper || !prevBtn || !nextBtn) return;
    prevBtn.addEventListener('click', () => summaryWrapper.scrollBy({ left: -200, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => summaryWrapper.scrollBy({ left: 200, behavior: 'smooth' }));
}