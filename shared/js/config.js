// 環境配置管理
const Config = {
    // API 基礎地址 - 根據環境自動切換
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'  // 本地開發
        : 'https://spelling-srs-backend-production.up.railway.app',  // 生產環境 (Railway)
    
    // 其他配置
    APP_NAME: 'SRS 學習系統',
    VERSION: '1.0.0',
    
    // API 端點
    ENDPOINTS: {
        // 認證
        LOGIN: '/api/auth/login',
        ADMIN_LOGIN: '/api/admin/auth/login',
        
        // 管理功能
        USERS: '/api/admin/users',
        ORGANIZATIONS: '/api/admin/organizations', 
        CLASSES: '/api/admin/classes',
        
        // 學習分析
        ANALYTICS: '/api/analytics',
        
        // 系統設定
        SETTINGS: '/api/settings'
    },
    
    // 取得完整 API URL
    getApiUrl: (endpoint) => {
        return Config.API_BASE_URL + (Config.ENDPOINTS[endpoint] || endpoint);
    }
};

// 全域可用
window.Config = Config;