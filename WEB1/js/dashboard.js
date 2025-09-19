// Dashboard JavaScript

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.querySelector('.main-content');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    loadDashboardData();
    initializeCharts();
});

function initializeDashboard() {
    // Check if user is logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'sign_in.html';
        return;
    }
    
    // Update user info in sidebar
    updateUserInfo(JSON.parse(currentUser));
    
    // Setup sidebar functionality
    setupSidebar();
    
    // Setup search functionality
    setupSearch();
    
    // Setup notifications
    setupNotifications();
}

function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Modal triggers
    const modalTriggers = document.querySelectorAll('[onclick*="showModal"]');
    modalTriggers.forEach(trigger => {
        const modalId = trigger.getAttribute('onclick').match(/'([^']+)'/)[1];
        trigger.removeAttribute('onclick');
        trigger.addEventListener('click', () => showModal(modalId));
    });
    
    // Theme toggle
    const themeToggle = document.querySelector('[onclick="toggleTheme()"]');
    if (themeToggle) {
        themeToggle.removeAttribute('onclick');
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
    
    // Outside click to close sidebar on mobile
    document.addEventListener('click', handleOutsideClick);
}

function updateUserInfo(user) {
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');
    const displayName = document.getElementById('displayName');
    
    if (userName) userName.textContent = user.name || 'User';
    if (userRole) userRole.textContent = user.role || 'Member';
    if (displayName) displayName.textContent = user.name || 'User';
}

function setupSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Handle navigation
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                // Handle section navigation within dashboard
                handleSectionNavigation(href.substring(1));
            }
        });
    });
}

function handleSectionNavigation(section) {
    // This would typically show/hide different dashboard sections
    console.log(`Navigating to section: ${section}`);
    
    // Example: Update page title
    const pageTitle = document.querySelector('.page-title');
    const sectionTitles = {
        dashboard: '대시보드',
        analytics: '분석',
        projects: '프로젝트',
        tasks: '작업',
        team: '팀',
        calendar: '일정',
        messages: '메시지',
        settings: '설정'
    };
    
    if (pageTitle && sectionTitles[section]) {
        pageTitle.textContent = sectionTitles[section];
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    
    // Adjust main content margin
    const isCollapsed = sidebar.classList.contains('collapsed');
    mainContent.style.marginLeft = isCollapsed ? '70px' : '280px';
    
    // Store state
    localStorage.setItem('sidebarCollapsed', isCollapsed);
}

function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    showSearchResults(query);
                }
            }
        });
    }
}

function performSearch(query) {
    // Debounced search implementation
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        console.log(`Searching for: ${query}`);
        // Implement actual search logic here
    }, 300);
}

function showSearchResults(query) {
    // Show search results modal or navigate to search page
    showNotification(`"${query}" 검색 결과를 표시합니다.`, 'info');
}

function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotificationPanel();
        });
    }
    
    // Simulate receiving notifications
    setTimeout(() => {
        updateNotificationBadge(3);
    }, 2000);
}

function showNotificationPanel() {
    // Create and show notification panel
    const panel = document.createElement('div');
    panel.className = 'notification-panel';
    panel.innerHTML = `
        <div class="notification-header">
            <h3>알림</h3>
            <button onclick="closeNotificationPanel()" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-list">
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">새 팀 멤버</div>
                    <div class="notification-text">김개발님이 팀에 합류했습니다.</div>
                    <div class="notification-time">5분 전</div>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-check"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">작업 완료</div>
                    <div class="notification-text">UI 디자인 작업이 완료되었습니다.</div>
                    <div class="notification-time">1시간 전</div>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-comment"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">새 댓글</div>
                    <div class="notification-text">프로젝트에 새 댓글이 달렸습니다.</div>
                    <div class="notification-time">2시간 전</div>
                </div>
            </div>
        </div>
        <div class="notification-footer">
            <a href="#" onclick="markAllAsRead()">모두 읽음 처리</a>
        </div>
    `;
    
    panel.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        width: 350px;
        max-height: 500px;
        background: var(--background);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        z-index: 1000;
        overflow: hidden;
    `;
    
    document.body.appendChild(panel);
    
    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeOnOutside(e) {
            if (!panel.contains(e.target) && !e.target.closest('.notification-btn')) {
                closeNotificationPanel();
                document.removeEventListener('click', closeOnOutside);
            }
        });
    }, 100);
}

function closeNotificationPanel() {
    const panel = document.querySelector('.notification-panel');
    if (panel) {
        panel.remove();
    }
}

function markAllAsRead() {
    updateNotificationBadge(0);
    closeNotificationPanel();
    showNotification('모든 알림을 읽음 처리했습니다.', 'success');
}

function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function loadDashboardData() {
    // Simulate loading dashboard data
    animateStatNumbers();
    loadRecentActivity();
}

function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < finalValue) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = finalValue;
            }
        };
        
        updateStat();
    });
}

function loadRecentActivity() {
    // Simulate loading recent activity
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        // Activity items are already in HTML, but we could load them dynamically here
        console.log('Recent activity loaded');
    }
}

function initializeCharts() {
    // Initialize Chart.js charts
    const progressChart = document.getElementById('progressChart');
    const distributionChart = document.getElementById('distributionChart');
    
    if (progressChart && typeof Chart !== 'undefined') {
        new Chart(progressChart, {
            type: 'line',
            data: {
                labels: ['월', '화', '수', '목', '금', '토', '일'],
                datasets: [{
                    label: '완료된 작업',
                    data: [12, 19, 3, 5, 2, 3, 9],
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    if (distributionChart && typeof Chart !== 'undefined') {
        new Chart(distributionChart, {
            type: 'doughnut',
            data: {
                labels: ['완료', '진행중', '대기'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'rgb(16, 185, 129)',
                        'rgb(99, 102, 241)',
                        'rgb(245, 158, 11)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('[onclick="toggleTheme()"] i');
    if (themeIcon) {
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    showNotification(`${newTheme === 'light' ? '라이트' : '다크'} 테마로 변경되었습니다.`, 'info');
}

// User menu functionality
function toggleUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberUser');
        window.location.href = 'sign_in.html';
    }
}

// Modal functions for dashboard
function createProject() {
    const form = document.getElementById('newProjectForm');
    const formData = new FormData(form);
    const projectData = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
        closeModal('newProjectModal');
        showNotification('새 프로젝트가 생성되었습니다!', 'success');
        form.reset();
        
        // Add to recent activity
        addToRecentActivity('새 프로젝트 생성', `"${projectData.name || '새 프로젝트'}" 프로젝트가 생성되었습니다.`, '방금 전');
    }, 1000);
}

function createTask() {
    const form = document.getElementById('newTaskForm');
    const formData = new FormData(form);
    const taskData = Object.fromEntries(formData.entries());
    
    // Simulate API call
    setTimeout(() => {
        closeModal('newTaskModal');
        showNotification('새 작업이 추가되었습니다!', 'success');
        form.reset();
        
        // Add to recent activity
        addToRecentActivity('작업 추가', `새 작업이 추가되었습니다.`, '방금 전');
    }, 1000);
}

function addToRecentActivity(title, description, time) {
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-plus"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${title}</div>
                <div class="activity-description">${description}</div>
                <div class="activity-time">${time}</div>
            </div>
        `;
        
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Remove last item if more than 4 items
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 4) {
            activityList.removeChild(items[items.length - 1]);
        }
    }
}

// Responsive handlers
function handleResize() {
    if (window.innerWidth <= 1024) {
        sidebar.classList.add('mobile');
        mainContent.style.marginLeft = '0';
    } else {
        sidebar.classList.remove('mobile');
        const isCollapsed = sidebar.classList.contains('collapsed');
        mainContent.style.marginLeft = isCollapsed ? '70px' : '280px';
    }
}

function handleOutsideClick(e) {
    if (window.innerWidth <= 1024) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = e.target.closest('.sidebar-toggle');
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
    }
    
    // Close user menu on outside click
    const userMenu = document.getElementById('userMenuDropdown');
    const userMenuBtn = document.querySelector('.user-menu-btn');
    
    if (userMenu && userMenu.classList.contains('show')) {
        if (!userMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
            userMenu.classList.remove('show');
        }
    }
}

// Modal functions (reused from main.js)
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

// Notification system (reused from main.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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
                 type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
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
    
    // Apply saved sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '70px';
    }
    
    // Set initial resize state
    handleResize();
});

// Close modals on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
        
        const userMenu = document.getElementById('userMenuDropdown');
        if (userMenu && userMenu.classList.contains('show')) {
            userMenu.classList.remove('show');
        }
        
        closeNotificationPanel();
    }
});