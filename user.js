document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Kayıt işlemi başarılı (demo)!');
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Giriş işlemi başarılı (demo)!');
});

// Şifre göster/gizle fonksiyonu
function setupShowPassword(passwordInputId, checkboxId) {
    const passwordInput = document.getElementById(passwordInputId);
    const checkbox = document.getElementById(checkboxId);
    if (passwordInput && checkbox) {
        checkbox.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
}
setupShowPassword('register-password', 'register-show-password');
setupShowPassword('login-password', 'login-show-password');

// İnsan doğrulama kontrolü
function setupHumanCheck(formId, humanCheckboxId, message) {
    const form = document.getElementById(formId);
    const humanCheckbox = document.getElementById(humanCheckboxId);
    if (form && humanCheckbox) {
        form.addEventListener('submit', function(e) {
            if (!humanCheckbox.checked) {
                e.preventDefault();
                alert(message);
            }
        });
    }
}
setupHumanCheck('register-form', 'register-human', 'Lütfen "Ben robot değilim" kutucuğunu işaretleyin.');
setupHumanCheck('login-form', 'login-human', 'Lütfen "Ben robot değilim" kutucuğunu işaretleyin.'); 