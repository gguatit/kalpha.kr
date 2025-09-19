// Profile Page JavaScript

let isEditMode = false;
let originalFormData = {};

// Initialize Profile Page
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupEventListeners();
    loadProfileData();
});

function initializeProfile() {
    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'sign_in.html';
        return;
    }
    
    // Load user data
    const userData = JSON.parse(currentUser);
    populateProfileData(userData);
    
    // Setup form validation
    setupFormValidation();
    
    // Setup skill tags
    setupSkillTags();
    
    // Setup avatar upload
    setupAvatarUpload();
}

function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            this.removeAttribute('onclick');
            switchTab(tabName);
        });
    });
    
    // Form submissions
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', handlePersonalInfoUpdate);
    }
    
    // Toggle switches
    setupToggleSwitches();
    
    // Theme selection
    setupThemeSelection();
    
    // Activity filter
    setupActivityFilter();
}

function populateProfileData(userData) {
    // Update profile display
    const displayName = document.getElementById('displayName');
    const displayTitle = document.getElementById('displayTitle');
    const displayEmail = document.getElementById('displayEmail');
    
    if (displayName) displayName.textContent = userData.name || 'User';
    if (displayTitle) displayTitle.textContent = 'Senior Developer'; // Default title
    if (displayEmail) displayEmail.textContent = userData.email || '';
    
    // Update form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    
    if (userData.name) {
        const nameParts = userData.name.split(' ');
        if (firstName) firstName.value = nameParts[0] || '';
        if (lastName) lastName.value = nameParts.slice(1).join(' ') || '';
    }
    
    if (email) email.value = userData.email || '';
}

function loadProfileData() {
    // Simulate loading additional profile data
    setTimeout(() => {
        // Update stats
        animateProfileStats();
        
        // Load activity data
        loadActivityData();
    }, 500);
}

function animateProfileStats() {
    const statNumbers = document.querySelectorAll('.profile-stats .stat-number');
    
    statNumbers.forEach((stat, index) => {
        const finalValue = parseFloat(stat.textContent);
        const isDecimal = stat.textContent.includes('.');
        const duration = 1500;
        const increment = finalValue / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < finalValue) {
                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = isDecimal ? finalValue.toFixed(1) : finalValue;
            }
        };
        
        setTimeout(() => updateStat(), index * 200);
    });
}

// Tab Management
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    const selectedButton = document.querySelector(`[onclick*="${tabName}"]`) || 
                          Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
                              btn.textContent.includes(getTabTitle(tabName)));
    
    const selectedContent = document.getElementById(tabName + 'Tab');
    
    if (selectedButton) selectedButton.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

function getTabTitle(tabName) {
    const titles = {
        personal: '개인정보',
        security: '보안',
        preferences: '환경설정',
        activity: '활동 기록'
    };
    return titles[tabName] || tabName;
}

// Edit Mode Management
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editButton = document.querySelector('[onclick="toggleEditMode()"]');
    const editButtonText = document.getElementById('editButtonText');
    const formInputs = document.querySelectorAll('#personalForm input, #personalForm textarea, #personalForm select');
    const formActions = document.getElementById('formActions');
    const skillInput = document.getElementById('skillInput');
    const avatarOverlay = document.getElementById('avatarOverlay');
    
    if (isEditMode) {
        // Enter edit mode
        if (editButtonText) editButtonText.textContent = '취소';
        if (editButton) editButton.className = 'btn-secondary';
        
        // Store original data
        originalFormData = {};
        formInputs.forEach(input => {
            originalFormData[input.id] = input.value;
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
        });
        
        if (formActions) formActions.style.display = 'flex';
        if (skillInput) skillInput.style.display = 'block';
        if (avatarOverlay) avatarOverlay.style.display = 'flex';
        
    } else {
        // Exit edit mode
        if (editButtonText) editButtonText.textContent = '편집';
        if (editButton) editButton.className = 'btn-primary';
        
        // Restore original data
        formInputs.forEach(input => {
            if (originalFormData[input.id] !== undefined) {
                input.value = originalFormData[input.id];
            }
            input.setAttribute('readonly', 'readonly');
            if (input.tagName === 'SELECT') {
                input.setAttribute('disabled', 'disabled');
            }
        });
        
        if (formActions) formActions.style.display = 'none';
        if (skillInput) skillInput.style.display = 'none';
        if (avatarOverlay) avatarOverlay.style.display = 'none';
    }
}

function cancelEdit() {
    if (confirm('변경사항을 취소하시겠습니까?')) {
        toggleEditMode();
    }
}

// Form Handling
function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '저장 중...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Exit edit mode
        toggleEditMode();
        
        // Show success message
        showNotification('프로필이 성공적으로 업데이트되었습니다!', 'success');
        
        // Update display values
        updateDisplayValues();
        
    }, 1500);
}

function updateDisplayValues() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const jobTitle = document.getElementById('jobTitle').value;
    
    const displayName = document.getElementById('displayName');
    const displayTitle = document.getElementById('displayTitle');
    const displayEmail = document.getElementById('displayEmail');
    
    if (displayName) displayName.textContent = `${firstName} ${lastName}`;
    if (displayTitle) displayTitle.textContent = jobTitle;
    if (displayEmail) displayEmail.textContent = email;
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
        showNotification('새 비밀번호가 일치하지 않습니다.', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('비밀번호는 최소 8자 이상이어야 합니다.', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '변경 중...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        e.target.reset();
        
        // Show success message
        showNotification('비밀번호가 성공적으로 변경되었습니다!', 'success');
        
    }, 2000);
}

// Skill Tags Management
function setupSkillTags() {
    const skillInput = document.getElementById('skillInput');
    const skillTags = document.getElementById('skillTags');
    
    if (skillInput) {
        skillInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkillTag(this.value.trim());
                this.value = '';
            }
        });
    }
    
    // Add remove functionality to existing tags
    skillTags.querySelectorAll('.skill-tag').forEach(tag => {
        addRemoveButton(tag);
    });
}

function addSkillTag(skill) {
    if (!skill) return;
    
    const skillTags = document.getElementById('skillTags');
    const existingTags = Array.from(skillTags.querySelectorAll('.skill-tag')).map(tag => tag.textContent.trim());
    
    if (existingTags.includes(skill)) {
        showNotification('이미 추가된 기술입니다.', 'warning');
        return;
    }
    
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    
    addRemoveButton(tag);
    skillTags.appendChild(tag);
}

function addRemoveButton(tag) {
    if (tag.querySelector('.remove')) return; // Already has remove button
    
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove';
    removeBtn.innerHTML = '×';
    removeBtn.addEventListener('click', function() {
        tag.remove();
    });
    
    tag.appendChild(removeBtn);
}

// Avatar Upload
function setupAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarOverlay = document.getElementById('avatarOverlay');
    const profileImage = document.getElementById('profileImage');
    
    if (avatarOverlay) {
        avatarOverlay.addEventListener('click', function() {
            avatarInput.click();
        });
    }
    
    if (avatarInput) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    showNotification('프로필 사진이 업데이트되었습니다.', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Toggle Switches
function setupToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.id;
            const enabled = this.checked;
            
            // Simulate saving setting
            setTimeout(() => {
                showNotification(`${getSettingName(setting)} 설정이 ${enabled ? '활성화' : '비활성화'}되었습니다.`, 'info');
            }, 200);
        });
    });
}

function getSettingName(settingId) {
    const names = {
        smsAuth: 'SMS 인증',
        emailAuth: '이메일 인증',
        emailNotifications: '이메일 알림',
        pushNotifications: '푸시 알림',
        marketingNotifications: '마케팅 알림'
    };
    return names[settingId] || settingId;
}

// Theme Selection
function setupThemeSelection() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Apply theme
            const theme = this.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
}

function applyTheme(theme) {
    if (theme === 'auto') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.body.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
    showNotification(`${getThemeName(theme)} 테마가 적용되었습니다.`, 'success');
}

function getThemeName(theme) {
    const names = {
        light: '라이트',
        dark: '다크',
        auto: '자동'
    };
    return names[theme] || theme;
}

// Activity Filter
function setupActivityFilter() {
    const activityFilter = document.getElementById('activityFilter');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    
    if (activityFilter) {
        activityFilter.addEventListener('change', function() {
            filterActivity(this.value);
        });
    }
    
    if (startDate || endDate) {
        [startDate, endDate].forEach(input => {
            if (input) {
                input.addEventListener('change', function() {
                    filterActivityByDate();
                });
            }
        });
    }
}

function filterActivity(type) {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        if (type === 'all') {
            item.style.display = 'flex';
        } else {
            // This would filter based on activity type
            // For demo, we'll show all items
            item.style.display = 'flex';
        }
    });
    
    showNotification(`${getActivityTypeName(type)} 활동으로 필터링되었습니다.`, 'info');
}

function getActivityTypeName(type) {
    const names = {
        all: '모든',
        projects: '프로젝트',
        tasks: '작업',
        login: '로그인',
        settings: '설정 변경'
    };
    return names[type] || type;
}

function filterActivityByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate && endDate) {
        showNotification(`${startDate}부터 ${endDate}까지의 활동으로 필터링되었습니다.`, 'info');
    }
}

function loadActivityData() {
    // Simulate loading activity data
    const timeline = document.querySelector('.activity-timeline');
    if (timeline) {
        // Activity data is already in HTML, but we could load it dynamically here
        console.log('Activity data loaded');
    }
}

// Form Validation
function setupFormValidation() {
    const personalForm = document.getElementById('personalForm');
    
    if (personalForm) {
        const inputs = personalForm.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearInputError(this);
            });
        });
    }
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '이 필드는 필수입니다.';
    }
    
    if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = '올바른 이메일 형식이 아닙니다.';
    }
    
    showInputError(input, isValid ? '' : errorMessage);
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showInputError(input, message) {
    // Remove existing error
    clearInputError(input);
    
    if (message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
}

function clearInputError(input) {
    input.classList.remove('error');
    
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Notification system (reused from other files)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-triangle' : 
                 type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}" style="margin-right: 8px;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                document.body.removeChild(this);
            }
        }, 300);
    });
}

// Initialize saved preferences
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update theme selection
    const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeOption) {
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        themeOption.classList.add('active');
    }
});