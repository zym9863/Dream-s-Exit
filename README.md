# 梦的出口 (Dream's Exit)

**[中文](README.md) | [English](README_EN.md)**

一个诗意的回忆记录与情感分享平台，让珍贵的回忆永恒，让瞬时的情感得到共鸣。

## 🌟 项目介绍

"梦的出口"是一个充满诗意的个人情感空间，灵感来源于对美好回忆的珍视和对情感共鸣的渴望。正如歌词中所唱："回忆太美，所以人才念旧"，这里为每个人提供了一个安全、私密的港湾。

## ✨ 核心功能

### 🔖 时光书简 (Chronoscroll)
- **私密的回忆记录空间**：创建属于你的"海市蜃楼"
- **多媒体支持**：文字、图片、背景音乐完美结合
- **精美界面**：优雅的卡片式布局，支持预览和详细查看
- **编辑功能**：随时修改和完善你的回忆
- **个人专属**：每个用户拥有独立的回忆空间

### 🎭 回音长廊 (Echo Gallery)  
- **匿名情感分享**：如"漫天蝶游"般自由表达
- **瞬时性**：所有回音24小时后自动消失
- **实时更新**：查看最新的情感回音
- **无声共鸣**：在他人的情感中找到慰藉
- **流逝美学**：体验"物是人非"的诗意

## 🛠 技术栈

- **前端框架**：React Router v7
- **包管理器**：pnpm
- **数据库**：Supabase (PostgreSQL)
- **样式框架**：Tailwind CSS
- **图标库**：Lucide React
- **日期处理**：date-fns
- **部署**：支持多种部署方式

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/zym9863/dreams-exit.git
cd dreams-exit
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 环境配置
创建 `.env` 文件并配置Supabase信息：
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 启动开发服务器
```bash
pnpm dev
```

访问 http://localhost:5173 即可体验应用。

## 📊 数据库结构

### 时光书简表 (chronoscroll_entries)
```sql
- id: UUID (主键)
- title: VARCHAR(255) (标题)
- content: TEXT (内容) 
- image_url: TEXT (图片链接)
- music_url: TEXT (音乐链接)
- music_title: VARCHAR(255) (音乐标题)
- created_at: TIMESTAMP (创建时间)
- updated_at: TIMESTAMP (更新时间)
- user_id: UUID (用户ID)
```

### 回音长廊表 (echo_entries)
```sql
- id: UUID (主键)
- content: TEXT (内容)
- created_at: TIMESTAMP (创建时间)
- expires_at: TIMESTAMP (过期时间，24小时后)
```

## 🎨 设计理念

### 视觉设计
- **渐变背景**：紫色到蓝色的梦幻渐变
- **玻璃形态**：毛玻璃效果的卡片设计
- **星空元素**：动态星点营造夜空氛围
- **优雅动画**：流畅的过渡和悬停效果

### 交互体验
- **直观导航**：清晰的功能分区
- **响应式设计**：适配各种设备尺寸
- **加载状态**：优雅的加载动画
- **错误处理**：友好的错误提示

## 🔐 隐私保护

- **本地用户ID**：使用localStorage生成随机用户标识
- **匿名回音**：回音长廊完全匿名
- **数据安全**：Supabase提供企业级安全保障
- **自动清理**：过期回音自动删除

## 📱 功能特色

### 时光书简
- ✅ 创建、编辑、删除回忆
- ✅ 图片预览和音乐播放
- ✅ 优雅的时间线展示
- ✅ 响应式网格布局

### 回音长廊  
- ✅ 匿名发送情感回音
- ✅ 实时显示剩余时间
- ✅ 自动过期清理
- ✅ 字符限制和输入验证

## 🚢 部署说明

### 生产构建
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### Docker部署
项目包含Dockerfile，支持容器化部署。

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

本项目采用 MIT 许可证。

## 💫 诗意注脚

> "回忆太美，所以人才念旧"  
> "谁不是流泪的旁观者，物是人非的见证者"

在这个快速变化的世界里，我们需要一个地方来保存那些珍贵的瞬间，需要一个空间来表达那些难以言喻的情感。梦的出口，就是为了这样的需要而诞生。

愿每个人都能在这里找到属于自己的诗意角落。✨!
