
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

    // 비밀번호 조건 체크리스트 (실시간)
    const passwordInput = document.getElementById('password');
    const pwRules = document.querySelectorAll('#pwRules li');

    const pwChecks = {
        length:  v => v.length >= 8,
        letter:  v => /[A-Za-z]/.test(v),
        number:  v => /[0-9]/.test(v),
        special: v => /[^A-Za-z0-9]/.test(v)
    };

    const validatePassword = () => {
        const value = passwordInput.value;
        let allValid = true;

        pwRules.forEach(li => {
            const valid = pwChecks[li.dataset.rule](value);
            const wasValid = li.classList.contains('valid');

            li.classList.toggle('valid', valid);
            if (valid !== wasValid) {
                li.querySelector('svg, i').outerHTML =
                    `<i data-lucide="${valid ? 'check-circle-2' : 'circle'}"></i>`;
            }
            if (!valid) allValid = false;
        });

        lucide.createIcons();
        return allValid;
    };

    passwordInput.addEventListener('input', validatePassword);

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

        const error = document.getElementById(id+'Error');
        error.textContent = msg || '';
        error.classList.toggle('show', msg);
        return !msg;
    };

    document.getElementById('signupForm').addEventListener('submit', e => {
        console.log('submit 핸들러 실행');   // ← 맨 첫 줄
        const userid  = document.getElementById('userid').value.trim();
        const name  = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const pw    = document.getElementById('password').value.trim();
        const pw2   = document.getElementById('passwordConfirm').value.trim();
        const agree1 = document.getElementById('terms_agree').checked;
        const agree2 = document.getElementById('privacy_agree').checked;
        const gender = document.querySelector('input[name="gender"]:checked');

        const results = [
            showError('userid', userid ? '' : '아이디를 입력해주세요.'),
            showError('name', name ? '' : '이름을 입력해주세요.'),
            showError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : '올바른 이메일 형식이 아닙니다.'),
            showError('password', validatePassword() ? '' : '비밀번호는 8자 이상, 영문·숫자·특수문자를 모두 포함해야 합니다.'),
            showError('passwordConfirm', pw === pw2 ? '' : '비밀번호가 일치하지 않습니다.'),
            showError('gender', gender ? '' : '성별을 선택해주세요'),
            showError('agree', agree1 && agree2 ? '' : '필수약관을 동의해주세요.'),

        ];
        //console.log(results)
        //!results.every(Boolean)하나라도 오류나면 e.preventDefault() 기본동작(sumit) 취소
        if (!results.every(Boolean)) e.preventDefault();
        console.log('제출 막음 여부:', e.defaultPrevented);   // ← 맨 끝
    });
});