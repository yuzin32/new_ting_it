// 부위별 정보 및 주요 질병 데이터 구조
const organData = {
    liver: {
        name: "간",
        icon: "fa-solid fa-disease",
        desc: "간은 우리 몸에서 해독, 영양소 대사, 담즙 생성 등 다양한 역할을 수행하는 중요한 장기입니다.",
        diseases: [
            {
                id: "fatty_liver",
                name: "지방간",
                enName: "Fatty Liver",
                icon: "fa-solid fa-disease",
                short: "간에 지방이 과도하게 축적된 상태를 말합니다.",
                desc: "간세포에 지방이 5% 이상 축적된 상태입니다. 초기에는 특별한 증상이 없지만, 방치하면 간염, 간섬유화, 간경변으로 진행될 수 있습니다.",
                causes: ["과도한 음주", "비만", "당뇨병", "고지혈증", "불규칙한 식습관"],
                care: [
                    { icon: "fa-solid fa-bowl-food", title: "균형 잡힌 식습관" },
                    { icon: "fa-solid fa-dumbbell", title: "꾸준한 운동" },
                    { icon: "fa-solid fa-weight-scale", title: "체중 관리" },
                    { icon: "fa-solid fa-ban", title: "절주/금주" }
                ]
            },
            {
                id: "hepatitis",
                name: "간염",
                enName: "Hepatitis",
                icon: "fa-solid fa-virus",
                short: "바이러스나 알코올 등으로 인해 간 조직에 염증이 생기는 질환입니다.",
                desc: "간세포가 파괴되고 염증반응이 일어나는 질환으로, A형, B형, C형 바이러스 감염이나 약물, 알코올이 주요 원인입니다.",
                causes: ["간염 바이러스(A·B·C형)", "과도한 음주", "약물 오남용", "자가면역 반응"],
                care: [
                    { icon: "fa-solid fa-syringe", title: "예방접종" },
                    { icon: "fa-solid fa-bed", title: "충분한 휴식" },
                    { icon: "fa-solid fa-ban", title: "금주 필수" },
                    { icon: "fa-solid fa-pills", title: "정기적 처방 복용" }
                ]
            },
            {
                id: "cirrhosis",
                name: "간경변",
                enName: "Cirrhosis",
                icon: "fa-solid fa-network-wired",
                short: "만성 염증으로 인해 간이 굳어지고 기능이 저하되는 상태입니다.",
                desc: "간의 정상 조직이 흉터 조직으로 변하며 굳어지는 질환으로, 간 기능 저하와 복수, 황달 등의 합병증을 유발합니다.",
                causes: ["만성 B/C형 간염", "지속적인 음주", "중증 지방간", "자가면역 질환"],
                care: [
                    { icon: "fa-solid fa-user-doctor", title: "정기 추적 검사" },
                    { icon: "fa-solid fa-prescription-bottle-medical", title: "합병증 관리" },
                    { icon: "fa-solid fa-apple-whole", title: "저염식 식단" },
                    { icon: "fa-solid fa-ban", title: "금주 유지" }
                ]
            },
            {
                id: "liver_cancer",
                name: "간암",
                enName: "Liver Cancer",
                icon: "fa-solid fa-dna",
                short: "간 세포에 악성 종양이 발생하는 질환입니다.",
                desc: "간의 대부분을 차지하는 간세포에서 발생하는 악성 종양입니다. 만성 간질환 환자에게서 발병 위험이 매우 높습니다.",
                causes: ["만성 B형/C형 간염", "간경변증", "아플라톡신(독소) 섭취", "과도한 흡연 및 음주"],
                care: [
                    { icon: "fa-solid fa-magnifying-glass", title: "조기 암 검진" },
                    { icon: "fa-solid fa-kit-medical", title: "적극적 항암 치료" },
                    { icon: "fa-solid fa-heart-pulse", title: "면역력 유지" },
                    { icon: "fa-solid fa-volcano", title: "금연 및 금주" }
                ]
            }
        ]
    },
    head: {
        name: "머리",
        icon: "fa-solid fa-brain",
        desc: "머리와 뇌는 인체의 중추신경계를 담당하여 인지, 기억, 감각, 운동 조절을 총괄합니다.",
        diseases: [
            {
                id: "stroke",
                name: "뇌졸중",
                enName: "Stroke",
                icon: "fa-solid fa-brain",
                short: "뇌혈관이 막히거나 터져서 뇌 손상이 발생하는 응급 질환입니다.",
                desc: "뇌에 혈액을 공급하는 혈관이 막히는 뇌경색이나 터지는 뇌출혈로 인해 뇌세포가 손상되는 질환입니다.",
                causes: ["고혈압", "당뇨병", "심장질환", "흡연 및 비만"],
                care: [
                    { icon: "fa-solid fa-heart-pulse", title: "혈압 관리" },
                    { icon: "fa-solid fa-person-running", title: "유산소 운동" },
                    { icon: "fa-solid fa-ban", title: "금연" },
                    { icon: "fa-solid fa-prescription-bottle-medical", title: "약물 복용" }
                ]
            },
            {
                id: "dementia",
                name: "치매",
                enName: "Dementia",
                icon: "fa-solid fa-head-side-virus",
                short: "뇌 기능 손상으로 인해 기억력과 인지 기능이 지속적으로 저하되는 상태입니다.",
                desc: "알츠하이머병이나 혈관성 치매 등으로 인해 일상생활을 혼자 수행하기 어려워지는 질환입니다.",
                causes: ["알츠하이머 병", "뇌혈관 질환", "고령", "유전적 요인"],
                care: [
                    { icon: "fa-solid fa-book", title: "뇌 자극 활동" },
                    { icon: "fa-solid fa-walk", title: "매일 산책" },
                    { icon: "fa-solid fa-utensils", title: "지중해식 식단" },
                    { icon: "fa-solid fa-users", title: "사회적 교류" }
                ]
            },
            {
                id: "headache",
                name: "두통",
                enName: "Headache",
                icon: "fa-solid fa-face-grimace",
                short: "머리 부분에서 느끼는 통증 및 불편감입니다.",
                desc: "긴장형 두통, 편두통, 군발 두통 등 다양한 원인에 의해 머리 근육이나 혈관이 자극되어 발생하는 통증입니다.",
                causes: ["스트레스 및 피로", "수면 부족", "자세 불균형", "카페인 오남용"],
                care: [
                    { icon: "fa-solid fa-bed", title: "규칙적 수면" },
                    { icon: "fa-solid fa-spa", title: "스트레스 해소" },
                    { icon: "fa-solid fa-water", title: "수분 섭취" },
                    { icon: "fa-solid fa-child-reaching", title: "자세 교정" }
                ]
            }
        ]
    },
    lungs: {
        name: "폐",
        icon: "fa-solid fa-lungs",
        desc: "폐는 호흡을 통해 산소를 받아들이고 이산화탄소를 배출하는 가스 교환 기관입니다.",
        diseases: [
            {
                id: "pneumonia",
                name: "폐렴",
                enName: "Pneumonia",
                icon: "fa-solid fa-lungs-virus",
                short: "세균이나 바이러스 감염으로 인해 폐 조직에 염증이 생기는 질환입니다.",
                desc: "폐포에 염증이 생겨 발열, 기침, 가래, 호흡곤란 등의 증상을 유발하며, 면역력이 약한 경우 위험할 수 있습니다.",
                causes: ["폐렴구균 등 세균 감염", "독감 바이러스", "미세먼지/유해물질", "면역력 저하"],
                care: [
                    { icon: "fa-solid fa-syringe", title: "폐렴구균 백신" },
                    { icon: "fa-solid fa-hand-sparkles", title: "손 씻기 생활화" },
                    { icon: "fa-solid fa-mask-face", title: "마스크 착용" },
                    { icon: "fa-solid fa-glass-water", title: "미온수 자주 마시기" }
                ]
            },
            {
                id: "asthma",
                name: "천식",
                enName: "Asthma",
                icon: "fa-solid fa-wind",
                short: "기관지가 좁아져 호흡곤란과 기침을 유발하는 만성 알레르기 질환입니다.",
                desc: "특정 자극 물질에 반응하여 기관지가 과민하게 축소되고 염증이 생기는 질환입니다.",
                causes: ["집먼지진드기/꽃가루", "대기오염/담배연기", "찬 공기", "유전적 알레르기"],
                care: [
                    { icon: "fa-solid fa-pump-medical", title: "흡입제 휴대" },
                    { icon: "fa-solid fa-broom", title: "실내 환경 청결" },
                    { icon: "fa-solid fa-temperature-arrow-down", title: "급격한 온도변화 방지" },
                    { icon: "fa-solid fa-ban", title: "간접흡연 피하기" }
                ]
            }
        ]
    },
    heart: {
        name: "심장",
        icon: "fa-solid fa-heart",
        desc: "심장은 혈액 순환을 주도하여 온몸으로 산소와 영양소를 공급하는 펌프 역할을 합니다.",
        diseases: [
            {
                id: "hypertension",
                name: "고혈압",
                enName: "Hypertension",
                icon: "fa-solid fa-heart-circle-bolt",
                short: "혈압이 지속적으로 높은 상태로 심혈관 질환의 주요 원인이 됩니다.",
                desc: "수축기 혈압 140mmHg 이상 또는 이완기 혈압 90mmHg 이상인 상태로, 방치 시 합병증을 유발합니다.",
                causes: ["나트륨 과다 섭취", "비만 및 운동 부족", "유전적 요인", "스트레스 및 흡연"],
                care: [
                    { icon: "fa-solid fa-bowl-rice", title: "저염식 섭취" },
                    { icon: "fa-solid fa-person-running", title: "유산소 운동" },
                    { icon: "fa-solid fa-weight-scale", title: "적정 체중 유효" },
                    { icon: "fa-solid fa-pills", title: "꾸준한 약 복용" }
                ]
            }
        ]
    },
    stomach: {
        name: "위",
        icon: "fa-solid fa-stomach",
        desc: "위는 섭취한 음식물을 연동 운동과 위산 분비를 통해 소화시키는 주된 기관입니다.",
        diseases: [
            {
                id: "gastritis",
                name: "위염",
                enName: "Gastritis",
                icon: "fa-solid fa-stomach",
                short: "위 점막에 염증이 생겨 속쓰림과 소화불량을 유발하는 질환입니다.",
                desc: "자극적인 음식, 스트레스, 헬리코박터균 감염 등으로 위 점막에 염증이 발생하는 질환입니다.",
                causes: ["자극적인 식습관", "과도한 스트레스", "헬리코박터 파일로리균", "진통제 오남용"],
                care: [
                    { icon: "fa-solid fa-utensils", title: "규칙적 식사" },
                    { icon: "fa-solid fa-pepper-hot", title: "자극적 음식 자제" },
                    { icon: "fa-solid fa-ban", title: "금주 및 금연" },
                    { icon: "fa-solid fa-spa", title: "스트레스 관리" }
                ]
            }
        ]
    },
    kidney: {
        name: "신장",
        icon: "fa-solid fa-kidneys",
        desc: "신장은 혈액 속 노폐물을 걸러내어 소변으로 배출하고 수분과 염분 균형을 조절합니다.",
        diseases: [
            {
                id: "chronic_kidney",
                name: "만성 신장 질환",
                enName: "Chronic Kidney Disease",
                icon: "fa-solid fa-kidneys",
                short: "신장의 기능이 오랜 기간에 걸쳐 서서히 저하되는 질환입니다.",
                desc: "혈액 청정 능력이 떨어져 체내 노폐물이 쌓이며 심할 경우 투석이나 이식이 필요할 수 있습니다.",
                causes: ["당뇨병", "고혈압", "만성 신구균염", "비만 및 고령"],
                care: [
                    { icon: "fa-solid fa-prescription-bottle", title: "단백질/나트륨 조절" },
                    { icon: "fa-solid fa-droplet", title: "수분 섭취 조절" },
                    { icon: "fa-solid fa-heart-pulse", title: "혈압·혈당 관리" },
                    { icon: "fa-solid fa-user-doctor", title: "정기적 정밀검사" }
                ]
            }
        ]
    },
    joint: {
        name: "뼈/관절",
        icon: "fa-solid fa-bone",
        desc: "신체의 골격을 형성하고 신체를 지지하며 관절을 통해 원활한 운동을 돕습니다.",
        diseases: [
            {
                id: "arthritis",
                name: "퇴행성 관절염",
                enName: "Osteoarthritis",
                icon: "fa-solid fa-bone",
                short: "관절 연골이 마모되어 통증과 염증이 발생하는 질환입니다.",
                desc: "관절을 보호하는 연골이 점차 손상되어 뼈와 뼈가 맞닿아 통증과 변형을 일으키는 질환입니다.",
                causes: ["노화 및 연골 마모", "비만으로 인한 과중한 부담", "과도한 관절 사용", "부상 이력"],
                care: [
                    { icon: "fa-solid fa-water", title: "수중 운동(수영)" },
                    { icon: "fa-solid fa-weight-scale", title: "체중 감량" },
                    { icon: "fa-solid fa-mattress-pillow", title: "관절 무리 방지" },
                    { icon: "fa-solid fa-person-walking", title: "허벅지 근력 강화" }
                ]
            }
        ]
    },
    intestine: {
        name: "장",
        icon: "fa-solid fa-disease",
        desc: "소장과 대장으로 구성되어 영양분 흡수와 수분 재흡수, 배설물 형성을 담당합니다.",
        diseases: [
            {
                id: "ibs",
                name: "과민성 장 증후군",
                enName: "IBS",
                icon: "fa-solid fa-disease",
                short: "특별한 질환 없이 만성적인 복통, 복부 팽만감, 변비나 설사를 유발합니다.",
                desc: "장이 과민하게 반응하여 장 운동 이상과 복통을 유발하며 스트레스와 식습관에 큰 영향을 받습니다.",
                causes: ["정신적 스트레스", "자극적인 음식", "장내 세균총 불균형", "불규칙한 생활"],
                care: [
                    { icon: "fa-solid fa-seedling", title: "고식이섬유 섭취" },
                    { icon: "fa-solid fa-face-smile", title: "스트레스 완화" },
                    { icon: "fa-solid fa-utensils", title: "포드맵(FODMAP) 제한" },
                    { icon: "fa-solid fa-capsules", title: "유산균 섭취" }
                ]
            }
        ]
    },
    women: {
        name: "여성질환",
        icon: "fa-solid fa-person-dress",
        desc: "여성 생식기계 및 호르몬 불균형과 관련된 다양한 건강 질환을 의미합니다.",
        diseases: [
            {
                id: "pcos",
                name: "다낭성 난소 증후군",
                enName: "PCOS",
                icon: "fa-solid fa-person-dress",
                short: "내분비 이상으로 생리 불순, 무월경 및 대사 장애를 유발하는 질환입니다.",
                desc: "난소에서 여러 개의 미성숙 난포가 자라나 정상적인 배란이 이루어지지 않는 질환입니다.",
                causes: ["호르몬 불균형", "인슐린 저항성", "유전적 요인", "비만 및 스트레스"],
                care: [
                    { icon: "fa-solid fa-person-running", title: "규칙적인 운동" },
                    { icon: "fa-solid fa-apple-whole", title: "저당 식단" },
                    { icon: "fa-solid fa-weight-scale", title: "체중 조절" },
                    { icon: "fa-solid fa-calendar-check", title: "정기 산부인과 검진" }
                ]
            }
        ]
    }
};

// DOM 요소 획득
const organBtns = document.querySelectorAll('.organ-btn');
const summaryItems = document.querySelectorAll('.summary-item');
const organNameEl = document.getElementById('organ-name');
const organDescEl = document.getElementById('organ-desc');
const organIconEl = document.getElementById('organ-icon');
const totalCountEl = document.getElementById('total-count');
const diseasePillsEl = document.getElementById('disease-pills');
const diseaseBoxEl = document.getElementById('disease-box');

let currentOrganKey = "liver";
let currentDiseaseIndex = 0;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderOrganDetail(currentOrganKey);
    initEventListeners();
});

// 이벤트 리스너 등록
function initEventListeners() {
    // 좌측 인체 부위 버튼 클릭
    organBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const organKey = btn.getAttribute('data-organ');
            if (organKey && organData[organKey]) {
                currentOrganKey = organKey;
                currentDiseaseIndex = 0;
                updateActiveStates(organKey);
                renderOrganDetail(organKey);
            }
        });
    });

    // 하단 요약 카드 클릭
    summaryItems.forEach(item => {
        item.addEventListener('click', () => {
            const organKey = item.getAttribute('data-organ');
            if (organKey && organData[organKey]) {
                currentOrganKey = organKey;
                currentDiseaseIndex = 0;
                updateActiveStates(organKey);
                renderOrganDetail(organKey);

                // 선택 영역으로 스크롤 이동
                document.querySelector('.content-grid').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// active 클래스 일괄 업데이트
function updateActiveStates(organKey) {
    organBtns.forEach(btn => {
        if (btn.getAttribute('data-organ') === organKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    summaryItems.forEach(item => {
        if (item.getAttribute('data-organ') === organKey) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 부위 데이터 렌더링
function renderOrganDetail(organKey) {
    const data = organData[organKey];
    if (!data) return;

    // 상단 부위 정보 업데이트
    organNameEl.textContent = data.name;
    organDescEl.textContent = data.desc;
    organIconEl.innerHTML = `<i class="${data.icon}"></i>`;
    totalCountEl.textContent = `총 ${data.diseases.length}개`;

    // 주요 질병 탭 버튼 생성
    diseasePillsEl.innerHTML = '';
    data.diseases.forEach((disease, index) => {
        const button = document.createElement('button');
        button.className = `pill-btn ${index === currentDiseaseIndex ? 'active' : ''}`;
        button.innerHTML = `<i class="${disease.icon}"></i><span>${disease.name}</span>`;
        button.addEventListener('click', () => {
            currentDiseaseIndex = index;
            renderDiseasePillActive();
            renderDiseaseDetail(disease);
        });
        diseasePillsEl.appendChild(button);
    });

    // 세부 질병 정보 렌더링
    if (data.diseases.length > 0) {
        renderDiseaseDetail(data.diseases[currentDiseaseIndex]);
    }
}

// Pill 버튼 active 클래스 갱신
function renderDiseasePillActive() {
    const pillBtns = diseasePillsEl.querySelectorAll('.pill-btn');
    pillBtns.forEach((btn, index) => {
        if (index === currentDiseaseIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 질병 세부 정보 박스 렌더링
function renderDiseaseDetail(disease) {
    const causesHtml = disease.causes.map(c => `<li>${c}</li>`).join('');
    const careHtml = disease.care.map(c => `
    <div class="care-card">
      <i class="${c.icon}"></i>
      <span>${c.title}</span>
    </div>
  `).join('');

    diseaseBoxEl.innerHTML = `
    <div class="disease-box-header">
      <div>
        <h3 class="disease-name">${disease.name} <span class="en-name">(${disease.enName})</span></h3>
        <p class="disease-short">${disease.short}</p>
      </div>
      <div class="disease-icon-lg"><i class="${disease.icon}"></i></div>
    </div>

    <div class="info-block">
      <h5>어떤 질병인가요?</h5>
      <p>${disease.desc}</p>
    </div>

    <div class="info-block">
      <h5>주요 원인</h5>
      <ul class="inline-bullet-list">
        ${causesHtml}
      </ul>
    </div>

    <div class="info-block">
      <h5>관리 방법</h5>
      <div class="care-cards">
        ${careHtml}
      </div>
    </div>
  `;

    // Sub Tab 클릭 이벤트 추가
    const tabItems = diseaseBoxEl.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}


// 자바스크립트 기존 이벤트 처리 함수 내 추가 또는 아래 코드 통합

document.addEventListener('DOMContentLoaded', () => {
    renderOrganDetail(currentOrganKey);
    initEventListeners();
    initSlider(); // 슬라이더 초기화 함수 실행
});

// 슬라이더 이동 기능 초기화
function initSlider() {
    const summaryWrapper = document.getElementById('summaryWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!summaryWrapper || !prevBtn || !nextBtn) return;

    // 버튼 클릭 시 이동할 너비 (카드 1개 너비 + gap)
    const scrollAmount = 200;

    // 왼쪽(<) 버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        summaryWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // 오른쪽(>) 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        summaryWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}