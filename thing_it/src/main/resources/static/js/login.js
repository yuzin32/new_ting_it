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