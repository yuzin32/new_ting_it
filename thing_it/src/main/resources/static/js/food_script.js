const items = document.querySelectorAll('.disease-item');
items.forEach(item => {
    item.addEventListener('click', function () {

        // 카드 안의 체크박스
        const checkbox = this.querySelector('input[type="checkbox"]');

        // 체크 상태 변경
        checkbox.checked = !checkbox.checked;

        // 카드 디자인 변경
        this.classList.toggle('selected', checkbox.checked);
        
        //체크된값들 
        var selectedDiseases = []; 
        $('#diseaseGrid .disease-checkbox:checked').each(function() { 
          selectedDiseases.push($(this).val()); }); 
          document.getElementById('selectedText').textContent = selectedDiseases;

    });

});
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
/*// 지병 다중 선택 기능
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.disease-item');//받아온 키
  const selectedText = document.getElementById('selectedText');//써질 곳

const diseaseMap = {
    diabetes: "당뇨",
    liver: "지방간",
    heart: "고혈압",
    lipid: "고지혈증",
    kidney: "신장질환",
    stomach: "위염",
    colon: "대장질환"
};

  function updateSelectedText() {
    const selectedkey = Array.from(items)
      .filter(item => item.classList.contains('selected'))
      .map(item => item.dataset.key);
      console.log(selectedkey);
      

    if (selectedkey.length === 0) {
      selectedText.textContent = '선택된 지병이 없습니다';
    } else { 
      const selectedDiseaseNames = selectedkey.map(key => diseaseMap[key]);
      selectedText.textContent=selectedDiseaseNames.join(', ');
    }
  }

  items.forEach(item => {
    item.addEventListener('click', function () {
      item.classList.toggle('selected');
      updateSelectedText();
    });
  });

  // 최초 상태 반영 (기본 선택된 항목이 있을 경우)
  updateSelectedText();
});
*/