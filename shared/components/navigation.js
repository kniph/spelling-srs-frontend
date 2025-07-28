/**
 * 共用導航組件
 */

function createNavigation() {
  return `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-title">SRS 管理後台</div>
        <div class="sidebar-subtitle">Spelling & Vocabulary</div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-item">
          <a href="/pages/dashboard.html" class="nav-link" data-page="dashboard">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span>儀表板</span>
          </a>
        </div>
        
        <div class="nav-item">
          <a href="/pages/users.html" class="nav-link" data-page="users">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zm-4 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>使用者管理</span>
          </a>
        </div>
        
        <div class="nav-item">
          <a href="/pages/organizations.html" class="nav-link" data-page="organizations">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
            <span>機構管理</span>
          </a>
        </div>
        
        <div class="nav-item">
          <a href="/pages/classes.html" class="nav-link" data-page="classes">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            <span>班級管理</span>
          </a>
        </div>
        
        <div class="nav-item">
          <a href="/pages/analytics.html" class="nav-link" data-page="analytics">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span>學習分析</span>
          </a>
        </div>
        
        <div class="nav-item">
          <a href="/pages/settings.html" class="nav-link" data-page="settings">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
            <span>系統設定</span>
          </a>
        </div>
      </nav>
    </div>
  `;
}

function createTopbar(title = '儀表板') {
  // 嘗試從 localStorage 獲取用戶資訊
  let userName = '載入中...';
  let userRole = '系統管理員';
  
  try {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // 解析 JWT token 獲取用戶資訊
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName = payload.username || '管理員';
      
      // 角色名稱對應
      const roleNames = {
        'super_admin': '超級管理員',
        'branch_admin': '分校管理員', 
        'teacher': '教師',
        'student': '學生'
      };
      userRole = roleNames[payload.role] || '系統管理員';
    }
  } catch (error) {
    console.log('無法解析用戶資訊，使用預設值');
  }
  
  return `
    <div class="topbar">
      <div class="topbar-title">${title}</div>
      <div class="user-menu">
        <div class="user-info">
          <div class="user-name">${userName}</div>
          <div class="user-role">${userRole}</div>
        </div>
        <button id="logout-btn" class="btn btn-secondary btn-sm">登出</button>
      </div>
    </div>
  `;
}

function initializeNavigation(currentPage, pageTitle) {
  const body = document.body;
  
  // 設置基本布局
  body.innerHTML = `
    <div class="admin-layout">
      ${createNavigation()}
      <div class="main-content">
        ${createTopbar(pageTitle)}
        <div class="content-area" id="content-area">
          <!-- 頁面內容將插入這裡 -->
        </div>
      </div>
    </div>
  `;

  // 設置當前頁面為活動狀態
  setActiveNavItem(currentPage);
  
  // 綁定登出按鈕事件
  setTimeout(() => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (typeof logout === 'function') {
          logout();
        } else {
          localStorage.removeItem('admin_token');
          window.location.href = '/admin.html';
        }
      });
    }
  }, 100);
  
  // 返回內容區域元素，供頁面插入內容
  return document.getElementById('content-area');
}

// 匯出函數
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createNavigation,
    createTopbar,
    initializeNavigation
  };
}