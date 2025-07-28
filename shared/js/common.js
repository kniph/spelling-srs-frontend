/**
 * SRS 學習系統 - 共用JavaScript函數
 */

// 全域變數
let currentUser = null;

/**
 * 認證相關函數
 */
function getAuthToken() {
  return localStorage.getItem('admin_token');
}

function isAuthenticated() {
  const authToken = getAuthToken();
  return authToken && authToken !== 'null' && authToken !== 'undefined';
}

function redirectToLogin() {
  localStorage.removeItem('admin_token');
  window.location.href = '/admin.html';
}

function logout() {
  localStorage.removeItem('admin_token');
  window.location.href = '/admin.html';
}

/**
 * API 請求封裝
 */
async function apiRequest(url, options = {}) {
  // 如果 URL 不是完整路徑，則加上 API 基礎地址
  const fullUrl = url.startsWith('http') ? url : Config.API_BASE_URL + url;
  
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };

  const authToken = getAuthToken();
  if (authToken) {
    defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options
  };

  try {
    const response = await fetch(fullUrl, config);
    
    // 處理認證錯誤
    if (response.status === 401) {
      redirectToLogin();
      return null;
    }

    return response;
  } catch (error) {
    console.error('API請求錯誤:', error);
    throw error;
  }
}

/**
 * 載入用戶資料
 */
async function loadUserProfile() {
  if (!isAuthenticated()) {
    redirectToLogin();
    return;
  }

  try {
    const response = await apiRequest('/api/admin/auth/profile');
    if (response && response.ok) {
      const data = await response.json();
      currentUser = data.user;
      updateUserInfo();
    }
  } catch (error) {
    console.error('載入用戶資料失敗:', error);
  }
}

/**
 * 更新用戶資訊顯示
 */
function updateUserInfo() {
  if (!currentUser) return;

  const userNameElement = document.querySelector('.user-name');
  const userRoleElement = document.querySelector('.user-role');

  if (userNameElement) {
    userNameElement.textContent = currentUser.full_name || currentUser.username;
  }
  
  if (userRoleElement) {
    const roleNames = {
      'super_admin': '超級管理員',
      'branch_admin': '分校管理員',
      'teacher': '教師',
      'student': '學生'
    };
    userRoleElement.textContent = roleNames[currentUser.role] || currentUser.role;
  }
}

/**
 * 顯示提示訊息
 */
function showAlert(message, type = 'info', duration = 3000) {
  // 移除現有的提示
  const existingAlert = document.querySelector('.alert-notification');
  if (existingAlert) {
    existingAlert.remove();
  }

  // 創建新的提示
  const alert = document.createElement('div');
  alert.className = `alert-notification alert-${type}`;
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  // 設置顏色
  const colors = {
    'success': '#43e97b',
    'error': '#ff5252',
    'warning': '#ff9800',
    'info': '#2196F3'
  };
  alert.style.backgroundColor = colors[type] || colors.info;

  alert.textContent = message;
  document.body.appendChild(alert);

  // 動畫顯示
  setTimeout(() => {
    alert.style.transform = 'translateX(0)';
  }, 10);

  // 自動隱藏
  setTimeout(() => {
    alert.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 300);
  }, duration);
}

/**
 * 防抖函數
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 載入狀態管理
 */
function showLoading(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element);
  }
  
  if (element) {
    element.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <div style="display: inline-block; width: 24px; height: 24px; border: 3px solid var(--gray-300); border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <div style="margin-top: 1rem;">載入中...</div>
      </div>
    `;
  }
}

function hideLoading(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element);
  }
  
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * 導航功能
 */
function setActiveNavItem(page) {
  // 移除所有活動狀態
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // 設置當前頁面為活動狀態
  const currentNavLink = document.querySelector(`[href*="${page}"]`);
  if (currentNavLink) {
    currentNavLink.classList.add('active');
  }
}

/**
 * 時間格式化
 */
function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const timeDiff = Math.floor((now - date) / 1000);

  if (timeDiff < 60) {
    return '剛才';
  } else if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)} 分鐘前`;
  } else if (timeDiff < 86400) {
    return `${Math.floor(timeDiff / 3600)} 小時前`;
  } else {
    return `${Math.floor(timeDiff / 86400)} 天前`;
  }
}

/**
 * 數字格式化
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * 頁面初始化輔助函數
 */
function initializeCommonFeatures() {
  // 暫時跳過 loadUserProfile，避免 API 認證問題
  // if (isAuthenticated()) {
  //   loadUserProfile();
  // }

  // 強化登出按鈕綁定
  setTimeout(() => {
    const logoutBtn = document.getElementById('logout-btn');
    console.log('尋找登出按鈕:', logoutBtn); // Debug
    if (logoutBtn) {
      // 移除舊的事件監聽器
      logoutBtn.removeEventListener('click', logout);
      // 添加新的事件監聽器
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('登出按鈕被點擊'); // Debug
        logout();
      });
      console.log('登出按鈕事件已綁定'); // Debug
    } else {
      console.log('找不到登出按鈕元素'); // Debug
    }
  }, 200); // 延遲綁定，確保 DOM 已載入
}

/**
 * 添加旋轉動畫CSS
 */
function addSpinAnimation() {
  if (!document.querySelector('#spin-animation')) {
    const style = document.createElement('style');
    style.id = 'spin-animation';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * 響應式導航
 */
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
}

// 匯出給其他模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    apiRequest,
    showAlert,
    debounce,
    showLoading,
    hideLoading,
    formatTimeAgo,
    formatNumber,
    setActiveNavItem,
    isAuthenticated,
    redirectToLogin,
    logout
  };
}