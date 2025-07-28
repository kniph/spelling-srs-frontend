# SRS 中文單字學習系統 - 前端

間隔重複系統 (Spaced Repetition System) 中文單字學習平台的前端應用。

## ✨ 功能特色

- 🎯 **間隔重複學習**: 科學化的記憶曲線算法
- 📊 **學習分析**: 詳細的學習進度和表現分析  
- 👥 **多租戶架構**: 支援多機構、多班級管理
- 📱 **響應式設計**: 適配各種設備螢幕
- 🔐 **權限管理**: 完整的用戶角色權限系統

## 🚀 快速開始

### 環境需求
- Node.js 18+
- 現代瀏覽器 (Chrome, Firefox, Safari, Edge)

### 本地開發
```bash
# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env.local

# 啟動開發服務器
npm run dev
```

### 部署到 Netlify
1. 將專案推送到 GitHub
2. 在 Netlify 中連接 GitHub repository
3. 設定環境變數 `VITE_API_BASE_URL`
4. 自動部署完成

## 📁 專案結構

```
spelling-srs-frontend/
├── index.html              # 學生端登入頁面
├── admin.html              # 管理員登入頁面
├── pages/                  # 功能頁面
│   ├── dashboard.html      # 儀表板
│   ├── analytics.html      # 學習分析
│   ├── users.html          # 用戶管理
│   ├── organizations.html  # 機構管理
│   ├── classes.html        # 班級管理
│   └── settings.html       # 系統設定
├── shared/                 # 共用資源
│   ├── css/                # 樣式表
│   ├── js/                 # JavaScript
│   └── components/         # 組件
├── assets/                 # 靜態資源
└── docs/                   # 文檔
```

## 🔧 API 整合

前端透過 REST API 與後端服務通信：
- **後端服務**: Railway 部署
- **資料庫**: PostgreSQL
- **認證**: JWT Token

主要 API 端點：
- `/api/auth/*` - 認證相關
- `/api/admin/*` - 管理功能
- `/api/analytics/*` - 學習分析
- `/api/settings/*` - 系統設定

## 📊 技術棧

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **圖表**: Chart.js
- **樣式**: 自定義 CSS + Flexbox/Grid
- **部署**: Netlify
- **版本控制**: Git + GitHub

## 🌍 部署架構

```
GitHub → Netlify (前端)
              ↓
         Railway (後端 + PostgreSQL)
```

## 📈 商用特性

- ✅ 多租戶 SaaS 架構
- ✅ 可擴展的雲端基礎設施
- ✅ 商業友好的 MIT 授權
- ✅ 完整的分析和報告功能
- ✅ 企業級安全性配置

## 📞 聯絡方式

如有問題或建議，請透過 GitHub Issues 聯繫。

---

**© 2025 SRS Learning System. Licensed under MIT.**