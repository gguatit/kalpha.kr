// Authentication JavaScript

// DOM Elements
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const submitBtn = document.getElementById('submitBtn');
const loginBtn = document.getElementById('loginBtn');

// Password strength indicators
const strengthLevels = {
    weak: { text: '약함', class: 'weak' },
    fair: { text: '보통', class: 'fair' },
    good: { text: '좋음', class: 'good' },
    strong: { text: '강함', class: 'strong' }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
    setupEventListeners();
});

function initializeAuthForms() {
    // Setup form validation
    if (signupForm) {
        setupSignupValidation();
    }
    
    if (signinForm) {
        setupSigninValidation();
    }
    
    // Setup password strength meter
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        setupPasswordStrength(passwordInput);
    }
    
    // Setup phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        setupPhoneFormatting(phoneInput);
    }
    
    // Setup password toggle functionality
    setupPasswordToggle();
    
    // Setup social login buttons
    setupSocialLogin();
    
    // Setup demo accounts
    setupDemoAccounts();
}

function setupEventListeners() {
    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Signin form submission
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
    
    // Checkbox validation for submit button
    const requiredCheckboxes = document.querySelectorAll('#agreeTerms, #agreePrivacy');
    requiredCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateSubmitButton);
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
}

// Form Validation Functions
function setupSignupValidation() {
    const inputs = signupForm.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearErrorMessage(input));
    });
    
    // Real-time password confirmation
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswordConfirmation);
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }
}

function setupSigninValidation() {
    const inputs = signinForm.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearErrorMessage(input));
    });
}

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '이 필드는 필수입니다.';
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (value && value.length < 2) {
                isValid = false;
                errorMessage = '최소 2글자 이상 입력해주세요.';
            }
            break;
            
        case 'email':
            if (value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = '올바른 이메일 형식이 아닙니다.';
            }
            break;
            
        case 'password':
            if (value && value.length < 8) {
                isValid = false;
                errorMessage = '비밀번호는 최소 8자 이상이어야 합니다.';
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                isValid = false;
                errorMessage = '올바른 전화번호 형식이 아닙니다.';
            }
            break;
            
        case 'birthDate':
            if (value && !isValidAge(value)) {
                isValid = false;
                errorMessage = '만 14세 이상만 가입 가능합니다.';
            }
            break;
    }
    
    showFieldError(input, isValid ? '' : errorMessage);
    return isValid;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Simulate email availability check
        setTimeout(() => {
            if (Math.random() > 0.8) { // 20% chance of email being taken
                showFieldError(emailInput, '이미 사용 중인 이메일입니다.');
            } else {
                showFieldError(emailInput, '');
                emailInput.parentElement.classList.add('success');
            }
        }, 500);
    }
}

function validatePasswordConfirmation() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');
    const isMatch = password === confirmPassword.value;
    
    showFieldError(confirmPassword, isMatch ? '' : '비밀번호가 일치하지 않습니다.');
    return isMatch;
}

function validateSubmitButton() {
    const agreeTerms = document.getElementById('agreeTerms');
    const agreePrivacy = document.getElementById('agreePrivacy');
    
    if (submitBtn) {
        const isValid = agreeTerms?.checked && agreePrivacy?.checked;
        submitBtn.disabled = !isValid;
    }
}

// Validation Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
}

function isValidAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age >= 14;
}

function showFieldError(input, message) {
    const errorElement = document.getElementById(input.name + 'Error') || 
                        document.getElementById(input.id + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        
        if (message) {
            input.classList.add('error');
            input.parentElement.classList.remove('success');
        } else {
            input.classList.remove('error');
        }
    }
}

function clearErrorMessage(input) {
    const errorElement = document.getElementById(input.name + 'Error') || 
                        document.getElementById(input.id + 'Error');
    
    if (errorElement && input.value.trim()) {
        errorElement.textContent = '';
        input.classList.remove('error');
    }
}

// Password Strength Meter
function setupPasswordStrength(passwordInput) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthUI(strength);
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character type checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Common patterns penalty
    if (/^[0-9]+$/.test(password) || /^[a-zA-Z]+$/.test(password)) score -= 1;
    if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
    
    // Return strength level
    if (score <= 2) return 'weak';
    if (score <= 4) return 'fair';
    if (score <= 5) return 'good';
    return 'strong';
}

function updatePasswordStrengthUI(strength) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (strengthBar && strengthText) {
        const strengthInfo = strengthLevels[strength];
        
        strengthBar.className = `strength-bar ${strengthInfo.class}`;
        strengthText.textContent = `비밀번호 강도: ${strengthInfo.text}`;
    }
}

// Phone Number Formatting
function setupPhoneFormatting(phoneInput) {
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length >= 3) {
            if (value.length <= 7) {
                value = value.replace(/(\d{3})(\d+)/, '$1-$2');
            } else {
                value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
            }
        }
        
        this.value = value;
    });
}

// Password Toggle Functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Form Submission Handlers
async function handleSignup(e) {
    e.preventDefault();
    
    // Validate all fields
    const inputs = signupForm.querySelectorAll('input[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Check password confirmation
    if (!validatePasswordConfirmation()) {
        isFormValid = false;
    }
    
    // Check required checkboxes
    const agreeTerms = document.getElementById('agreeTerms');
    const agreePrivacy = document.getElementById('agreePrivacy');
    
    if (!agreeTerms.checked || !agreePrivacy.checked) {
        alert('이용약관과 개인정보처리방침에 동의해주세요.');
        return;
    }
    
    if (!isFormValid) {
        return;
    }
    
    // Collect form data
    const formData = new FormData(signupForm);
    const userData = Object.fromEntries(formData.entries());
    
    try {
        // Simulate API call
        await simulateSignup(userData);
        
        // Show success modal
        showModal('successModal');
        
        // Store user data (for demo purposes)
        storeUserData(userData);
        
    } catch (error) {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error('Signup error:', error);
    }
}

async function handleSignin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showModal('errorModal');
        return;
    }
    
    try {
        // Show loading
        showModal('loadingModal');
        
        // Simulate API call
        const result = await simulateSignin(email, password);
        
        // Hide loading
        closeModal('loadingModal');
        
        if (result.success) {
            // Store session data
            if (rememberMe) {
                localStorage.setItem('rememberUser', email);
            }
            
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showModal('errorModal');
        }
        
    } catch (error) {
        closeModal('loadingModal');
        showModal('errorModal');
        console.error('Signin error:', error);
    }
}

// Demo Account Functions
function fillDemoAccount(type) {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (type === 'admin') {
        emailInput.value = 'admin@kalpha.kr';
        passwordInput.value = 'admin123!';
    } else {
        emailInput.value = 'user@kalpha.kr';
        passwordInput.value = 'user123!';
    }
    
    // Clear any existing errors
    clearErrorMessage(emailInput);
    clearErrorMessage(passwordInput);
}

// Social Login Handler
function handleSocialLogin(e) {
    const platform = e.currentTarget.textContent.includes('Google') ? 'google' : 
                    e.currentTarget.textContent.includes('카카오') ? 'kakao' : 'naver';
    
    alert(`${platform} 로그인 기능은 데모 버전에서는 지원되지 않습니다.`);
}

// Simulation Functions (for demo purposes)
async function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random failure (10% chance)
            if (Math.random() < 0.1) {
                reject(new Error('Network error'));
            } else {
                resolve({ success: true, userId: Date.now() });
            }
        }, 2000);
    });
}

async function simulateSignin(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Check demo accounts
            const validAccounts = [
                { email: 'admin@kalpha.kr', password: 'admin123!', role: 'admin' },
                { email: 'user@kalpha.kr', password: 'user123!', role: 'user' }
            ];
            
            // Check stored users
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const allAccounts = [...validAccounts, ...storedUsers];
            
            const user = allAccounts.find(u => u.email === email && u.password === password);
            
            if (user) {
                resolve({
                    success: true,
                    user: {
                        email: user.email,
                        role: user.role || 'user',
                        name: user.firstName ? `${user.firstName} ${user.lastName}` : 'User'
                    }
                });
            } else {
                resolve({ success: false });
            }
        }, 1500);
    });
}

// Data Storage Functions
function storeUserData(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        birthDate: userData.birthDate,
        role: 'user',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('users', JSON.stringify(users));
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Redirect Functions
function redirectToLogin() {
    window.location.href = 'sign_in.html';
}

function showForgotPassword() {
    closeModal('errorModal');
    window.location.href = 'forgot-password.html';
}

// Initialize remembered user
document.addEventListener('DOMContentLoaded', function() {
    const rememberedUser = localStorage.getItem('rememberUser');
    const loginEmailInput = document.getElementById('loginEmail');
    
    if (rememberedUser && loginEmailInput) {
        loginEmailInput.value = rememberedUser;
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Input animations and effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Additional helper functions
function setupPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

function setupSocialLogin() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google-btn') ? 'Google' : 
                           this.classList.contains('kakao-btn') ? 'Kakao' : 'Naver';
            
            showNotification(`${provider} 로그인은 현재 개발 중입니다.`, 'info');
        });
    });
}

function setupDemoAccounts() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountType = this.textContent.includes('관리자') ? 'admin' : 'user';
            
            if (accountType === 'admin') {
                const emailInput = document.getElementById('loginEmail');
                const passwordInput = document.getElementById('loginPassword');
                if (emailInput) emailInput.value = 'admin@kalpha.kr';
                if (passwordInput) passwordInput.value = 'admin123';
            } else {
                const emailInput = document.getElementById('loginEmail');
                const passwordInput = document.getElementById('loginPassword');
                if (emailInput) emailInput.value = 'demo@example.com';
                if (passwordInput) passwordInput.value = 'demo123';
            }
            
            showNotification('데모 계정 정보가 입력되었습니다.', 'success');
        });
    });
}