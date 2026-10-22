document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucide Icons 초기화
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. 비밀번호 숨기기/보이기 토글 기능
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            // eye / eye-off 아이콘 토글
            eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
            lucide.createIcons();
        });
    }

    // 3. 폼 제출 핸들러 (서버 연동 전 가상 핸들링)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('로그인이 시도되었습니다!');
        });
    }
});
/****************************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 비밀번호 보기/숨기기 (버튼마다 data-target 사용)
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            btn.innerHTML = `<i data-lucide="${show ? 'eye-off' : 'eye'}" style="width:18px;height:18px;"></i>`;
            lucide.createIcons();
        });
    });
// results 배열 아래쪽, agreed 검사 근처에 추가
    const genderChecked = !!document.querySelector('input[name="gender"]:checked');
    const genderError = document.getElementById('genderError');
    genderError.textContent = genderChecked ? '' : '성별을 선택해주세요.';
    genderError.classList.toggle('show', !genderChecked);
    // 전체 동의
    const agreeAll = document.getElementById('agreeAll');
    const agreeItems = document.querySelectorAll('.agree-item');
    agreeAll.addEventListener('change', () => {
        agreeItems.forEach(i => i.checked = agreeAll.checked);
    });
    agreeItems.forEach(i => i.addEventListener('change', () => {
        agreeAll.checked = [...agreeItems].every(x => x.checked);
    }));

    // 유효성 검사
    const showError = (id, msg) => {
        const input = document.getElementById(id);
        const error = document.querySelector(`.field-error[data-for="${id}"]`);
        input.classList.toggle('invalid', !!msg);
        error.textContent = msg || '';
        error.classList.toggle('show', !!msg);
        return !msg;
    };

    document.getElementById('signupForm').addEventListener('submit', e => {
        const name  = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const pw    = document.getElementById('passwordInput').value;
        const pw2   = document.getElementById('passwordConfirm').value;

        const results = [
            showError('nameInput', name ? '' : '이름을 입력해주세요.'),
            showError('emailInput', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : '올바른 이메일 형식이 아닙니다.'),
            showError('passwordInput', pw.length >= 8 ? '' : '비밀번호는 8자 이상이어야 합니다.'),
            showError('passwordConfirm', pw === pw2 ? '' : '비밀번호가 일치하지 않습니다.')
        ];

        const agreed = [...agreeItems].every(i => i.checked);
        const agreeError = document.getElementById('agreeError');
        agreeError.textContent = agreed ? '' : '필수 약관에 동의해주세요.';
        agreeError.classList.toggle('show', !agreed);
        if (!results.every(Boolean) || !genderChecked || !agreed) e.preventDefault();
        if (!results.every(Boolean) || !agreed) e.preventDefault();
    });
});