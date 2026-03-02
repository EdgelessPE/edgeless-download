# Edgeless Download 项目功能文档

## 1. 项目概述

**项目名称**: Edgeless Download  
**项目类型**: React + shadcn/ui + TypeScript + Vite 单页应用  
**主要功能**: Edgeless Hub 桌面应用程序下载页面，提供启动盘制作工具的下载入口  
**目标用户**: Windows 10/11 64位系统用户

---

## 2. 技术栈

### 核心框架
- **React 19.x** - 渐进式前端框架
- **TypeScript 5.x** - 类型安全
- **Vite 7.x** - 构建工具

### UI组件库
- **shadcn/ui** - 基于Radix UI的组件库
- **Tailwind CSS 4.x** - 原子化CSS框架

### 常用组件 (shadcn/ui)
- `Alert` - 公告横幅
- `Button` - 按钮
- `Drawer` - 底部抽屉 (Post Download弹窗)
- `DropdownMenu` - 下拉菜单
- `Badge` - 版本标签
- `Tooltip` - 提示信息
- `Card` - 结果展示 (替代Result)
- `Flex` - 间距布局

### 工具库
- **axios** - HTTP客户端
- **ua-parser-js** - User-Agent解析
- **class-variance-authority** - 组件变体管理 (shadcn/ui依赖)

### 开发工具
- **Biome** - 代码规范 + 格式化 (lint + format)

---

## 3. 核心功能

### 3.1 用户系统检测

**功能描述**: 根据用户访问设备的UA信息，判断是否允许下载Hub客户端

**检测逻辑**:
1. **移动端检测**: iOS/Android用户显示提示，建议使用PC访问
2. **Windows版本检测**: 
   - Windows 10/11: 允许下载
   - 低于Windows 10: 提示系统过旧，引导手动制作启动盘
3. **系统位数检测**:
   - 64位系统: 允许下载
   - 32位系统: 提示不支持，引导手动制作或升级系统
4. **非Windows系统**: 提示需要手动制作启动盘

**相关代码**: 组件内 `uaConfig` 方法，使用 ua-parser-js 解析 navigator.userAgent

---

### 3.2 Hub版本与下载地址获取

**功能描述**: 从API获取Hub客户端的最新版本号和下载地址

**API调用**:
- **URL**: `https://legacy.edgeless.top/api/v2/info/hub`
- **方法**: GET
- **超时**: 5000ms
- **响应数据格式**:
  ```json
  {
    "miniupdate_pack_addr": "https://legacy.edgeless.top/api/v2/redirect?path=/Socket/Hub/Update/miniupdate.7z",
    "update_pack_addr": "https://legacy.edgeless.top/api/v2/redirect?path=/Socket/Hub/Update/update.7z",
    "full_update_redirect": "https://down.edgeless.top",
    "update_info": {
      "dependencies_requirement": "2.28",
      "wide_gaps": ["2.28"]
    },
    "version": "2.32",
    "address": "https://legacy.edgeless.top/api/v2/redirect?path=Socket/Hub/Edgeless Hub_Beta_2.32.7z"
  }
  ```

**关键字段**:
- `version`: 版本号 (如 "2.32")
- `address`: 下载地址 (需通过 redirect 获取实际文件)

**失败处理**: 超时或请求失败时显示错误提示"似乎无法连接到服务器"

**相关代码**: React组件 useEffect 中调用 axios.get

---

### 3.3 公告系统

**功能描述**: 从服务器获取并显示公告信息

**API调用**:
- **URL**: `https://legacy.edgeless.top/api/v2/info/notice`
- **方法**: GET
- **响应数据格式**:
  ```json
  [
    {
      "id": "250705",
      "channel": "Down",
      "a_type": "info",
      "show_icon": true,
      "message": "Edgeless Hub 更新告示",
      "description": "由于镜像站调整更新，请尽快将 Edgeless Hub 更新至 2.30 及以上版本，以免影响使用。",
      "close_text": "我知道了",
      "lower_than": "0"
    }
  ]
  ```

**字段说明**:
- `id`: 公告ID
- `channel`: 频道 (Down/Hub)
- `a_type`: 提示类型 (info/warning/error/success)
- `show_icon`: 是否显示图标
- `message`: 公告标题
- `description`: 公告内容
- `close_text`: 关闭按钮文字
- `lower_than`: 版本号低于此值时显示 (0表示始终显示)

**功能特性**:
- 根据channel参数筛选公告（本项目使用"Down"频道）
- 根据lower_than字段判断是否需要显示（版本号低于该值时显示）
- 用户关闭公告后，记录公告ID到localStorage，不再显示相同公告

**相关代码**: Notice组件，调用 localStorage 存储忽略ID

---

### 3.4 下载功能与Post Download弹窗

**功能描述**: 提供多种下载方式入口

**下载方式**:
1. **立即下载**: 符合条件的用户显示此按钮，点击后打开下载链接
2. **手动制作**: 不符合条件的用户显示此按钮，引导至Wiki手动制作教程
3. **下载ISO镜像**: 下拉菜单选项，跳转到ISO下载页面
4. **访问网页版**: 下拉菜单选项，跳转到在线版

**Post Download弹窗 (下载后提示抽屉)**:
- 组件类型: shadcn/ui Drawer
- 位置: 底部弹出
- 标题: "感谢下载Edgeless Hub"
- 可关闭: 是

**弹窗内容**:
- 提示文字: "我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能"
- 按钮: "好" (主按钮)
- 按钮行为: 点击后跳转到 https://wiki.edgeless.top/v2/required.html (当前页面跳转)

**下载流程**:
1. 用户点击"立即下载"
2. 设置 open = true 显示Drawer
3. 同时调用 window.location.href = address 开始下载
4. 用户阅读提示后点击"好"按钮关闭弹窗并跳转Wiki

**相关代码**: 
- Drawer组件: shadcn/ui Drawer组件
- onClickHubDownload方法: 处理函数

---

### 3.5 外部链接导航

**功能描述**: 顶部导航栏提供外部链接跳转

**导航项**:
| 菜单项 | 链接 | 打开方式 |
|--------|------|----------|
| 首页 | https://home.edgeless.top | 新标签页 |
| 文档 | https://wiki.edgeless.top | 新标签页 |
| 下载 | 当前页面 | - |

**相关代码**: Header组件中的导航链接

---

### 3.6 备份站跳转

**功能描述**: 支持URL参数`backup=1`或`backup=2`触发跳转提示

**参数说明**:
- `backup=1`: 跳转到备用站(路人甲)
- `backup=2`: 跳转到天翼云盘

**相关代码**: useEffect 中解析 window.location.search

---

## 4. 页面结构

```
┌─────────────────────────────────────────────────┐
│  Header (白色背景)                               │
│  [Logo] Edgeless    [首页] [文档] [下载]        │
├─────────────────────────────────────────────────┤
│  Content                                         │
│  ┌─────────────────────────────────────────┐   │
│  │  [公告横幅 - 条件显示]                    │   │
│  ├─────────────────────────────────────────┤   │
│  │                                          │   │
│  │         Edgeless Hub Beta v1.x.x        │   │
│  │                                          │   │
│  │    [使用Edgeless聚合客户端制作...]      │   │
│  │                                          │   │
│  │            [演示图片]                    │   │
│  │                                          │   │
│  │  [立即下载] [访问网页版 ▼]              │   │
│  │                                          │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Footer: Copyright © 202X Edgeless Project       │
└─────────────────────────────────────────────────┘
```

---

## 5. API接口汇总

| 接口 | URL | 用途 |
|------|-----|------|
| Hub信息 | `https://legacy.edgeless.top/api/v2/info/hub` | 获取版本和下载地址 |
| 公告 | `https://legacy.edgeless.top/api/v2/info/notice` | 获取公告列表 |
| ISO地址 | `https://legacy.edgeless.top/api/v2/info/iso_addr` | 获取ISO镜像地址 |

---

## 6. 外部资源

- **Favicon**: https://home.edgeless.top/favicon.ico
- **Logo图片**: https://home.edgeless.top/favicon.ico
- **演示图片**: ./public/demo.jpg (本地)

---

## 7. 目录结构建议

```
src/
├── components/
│   ├── ui/                    # shadcn/ui 组件
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tag.tsx
│   │   ├── tooltip.tsx
│   │   └── space.tsx (自定义或使用Flex)
│   ├── Header.tsx            # 顶部导航
│   ├── Notice.tsx            # 公告组件
│   ├── DownloadCard.tsx      # 下载卡片
│   └── PostDownloadDrawer.tsx # 下载后提示抽屉
├── lib/
│   ├── utils.ts               # 工具函数 (cn等)
│   └── api.ts                 # API调用封装
├── hooks/
│   └── useUserAgent.ts        # UA检测逻辑
├── types/
│   └── index.ts               # TypeScript类型定义
├── App.tsx                    # 主应用组件
├── main.tsx                   # 入口文件
└── index.css                  # 全局样式 (Tailwind)
```

---

## 8. 构建与部署

### 开发环境
```bash
npm install
npm run dev
```

### 生产构建
```bash
npm run build
# 输出到 dist/ 目录
```

### 代码规范检查
```bash
npm run lint
```

---

## 9. 注意事项

1. **兼容性**: 仅支持Windows 10/11 64位系统完整功能
2. **存储**: 使用localStorage存储公告忽略ID，无过期时间
3. **超时处理**: API请求设置5000ms超时
4. **错误处理**: API失败时显示友好错误提示
5. **URL编码**: 跳转URL使用encodeURIComponent处理

---

## 10. 重构要点总结

### 从Vue到React的迁移

| Vue 2 | React 19 |
|-------|----------|
| `data()` | `useState` |
| `methods` | 普通函数 |
| `created` | `useEffect` |
| `v-if` | 条件渲染 `{condition && <Component>}` |
| `@click` | `onClick` |
| `v-model` | 受控组件 |
| `ua-device` | `ua-parser-js` |
| Ant Design Vue | shadcn/ui + Tailwind CSS |

### shadcn/ui 组件映射

| Ant Design Vue | shadcn/ui |
|----------------|------------|
| `<a-alert>` | `<Alert>` |
| `<a-button>` | `<Button>` |
| `<a-drawer>` | `<Drawer>` |
| `<a-dropdown-button>` + `<a-menu>` | `<DropdownMenu>` |
| `<a-tag>` | `<Badge variant="outline">` |
| `<a-tooltip>` | `<Tooltip>` |
| `<a-space>` | Flex布局或`<Stack>` |
| `<a-result>` | 自定义或`<Card>` |
