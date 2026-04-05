/* 🚀 Logic: Japanese Finance Login Service (Mock) */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🔒';
    });

    // Form Handling
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset Error Messages
        clearErrors();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. Validation Logic
        let hasError = false;

        if (!username) {
            showError('username', 'ユーザーIDまたはメールアドレスを入力してください。');
            hasError = true;
        }

        if (!password) {
            showError('password', 'パスワードを入力してください。');
            hasError = true;
        } else if (password.length < 8) {
            showError('password', 'パスワードは8文字以上で入力してください。');
            hasError = true;
        }

        if (hasError) return;

        // 2. Mock Authentication Phase
        setLoading(true);

        // Giả lập độ trễ mạng (Network Latency)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock Credentials: admin / password123
        if (username === 'admin' && password === 'password123') {
            handleSuccess('認証に成功しました。少々お待ちください...');
        } else {
            handleError('ユーザーIDまたはパスワードが正しくありません。');
        }

        setLoading(false);
    });

    // Helper Functions
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}Error`);
        input.classList.add('error');
        errorSpan.textContent = message;
    }

    function clearErrors() {
        const inputs = document.querySelectorAll('input');
        const errorSpans = document.querySelectorAll('.error-msg');
        inputs.forEach(input => input.classList.remove('error'));
        errorSpans.forEach(span => span.textContent = '');
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    function handleSuccess(message) {
        // Trong môi trường Enterprise thật, chúng ta sẽ chuyển hướng (Redirect)
        alert(`✅ ${message}`);
        window.location.reload(); // Quay lại màn hình Login (giả lập xong quy trình)
    }

    function handleError(message) {
        // Hiển thị lỗi chung cho cả form theo chuẩn bảo mật (không chỉ rõ User hay Pass sai)
        showError('password', message);
        passwordInput.value = ''; // Clear mật khẩu vì lý do bảo mật
    }
});
