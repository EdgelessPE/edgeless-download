# Edgeless Download 项目功能文档

## 1. 项目概述

**项目名称**: Edgeless Download  
**项目类型**: Vue 2 + Ant Design Vue 单页应用  
**主要功能**: Edgeless Hub 桌面应用程序下载页面，提供启动盘制作工具的下载入口  
**目标用户**: Windows 10/11 64位系统用户

---

## 2. 技术栈

### 核心框架
- **Vue 2.6.11** - 渐进式前端框架
- **Ant Design Vue 1.7.3** - UI组件库
- **axios 0.18.0** - HTTP客户端
- **vue-cookies 1.7.4** - Cookie管理
- **ua-device 0.1.10** - User-Agent解析

### 开发工具
- **@vue/cli-service 4.5.0** - Vue CLI脚手架
- **@vue/cli-plugin-babel 4.5.0** - Babel编译器

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

**相关代码**: `src/App.vue` 第226-267行 `uaConfig()` 方法

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
    "version": "x.x.x",
    "address": "https://xxx.com/hub.exe"
  }
  ```

**失败处理**: 超时或请求失败时显示错误提示"似乎无法连接到服务器"

**相关代码**: `src/App.vue` 第276-288行

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
      "id": "string",
      "channel": "Down",
      "message": "公告标题",
      "description": "公告内容",
      "a_type": "info|warning|error|success",
      "show_icon": true,
      "close_text": "关闭按钮文字"
    }
  ]
  ```

**功能特性**:
- 根据channel参数筛选公告（本项目使用"Down"频道）
- 用户关闭公告后，记录公告ID到Cookie
- 30天内不再显示相同公告

**相关代码**: `src/Notice.vue`

---

### 3.4 下载功能与Post Download弹窗

**功能描述**: 提供多种下载方式入口

**下载方式**:
1. **立即下载**: 符合条件的用户显示此按钮，点击后打开下载链接
2. **手动制作**: 不符合条件的用户显示此按钮，引导至Wiki手动制作教程
3. **下载ISO镜像**: 下拉菜单选项，跳转到ISO下载页面
4. **访问网页版**: 下拉菜单选项，跳转到在线版

**Post Download弹窗 (下载后提示抽屉)**:
- 组件类型: Ant Design Vue Drawer
- 位置: 底部弹出 (placement: bottom)
- 标题: "感谢下载Edgeless Hub"
- 可关闭: 是 (closable: true)
- 关闭回调: onCloseDrawer (设置 drawerVisible = false)

**弹窗内容**:
- 提示文字: "我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能"
- 按钮: "好" (主按钮 type="primary")
- 按钮行为: 点击后跳转到 https://wiki.edgeless.top/v2/required.html (当前页面跳转，非新标签页)

**下载流程**:
1. 用户点击"立即下载"
2. 触发 onClickHubDownload 方法
3. 设置 drawerVisible = true 显示抽屉
4. 同时调用 goto(address) 开始下载
5. 用户阅读提示后点击"好"按钮关闭弹窗并跳转Wiki

**相关代码**: 
- Drawer组件: `src/App.vue` 第3-19行
- onClickHubDownload方法: `src/App.vue` 第193-196行

---

### 3.5 外部链接导航

**功能描述**: 顶部导航栏提供外部链接跳转

**导航项**:
| 菜单项 | 链接 | 打开方式 |
|--------|------|----------|
| 首页 | https://home.edgeless.top | 新标签页 |
| 文档 | https://wiki.edgeless.top | 新标签页 |
| 下载 | 当前页面 | - |

**相关代码**: `src/App.vue` 第25-41行

---

### 3.6 备份站跳转

**功能描述**: 支持URL参数`backup=1`或`backup=2`触发跳转提示

**参数说明**:
- `backup=1`: 跳转到备用站(路人甲)
- `backup=2`: 跳转到天翼云盘

**相关代码**: `src/App.vue` 第290-307行

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

## 7. 关键文件说明

| 文件 | 功能 |
|------|------|
| `src/main.js` | Vue应用入口，注册Ant Design和VueCookies |
| `src/App.vue` | 主页面组件，包含系统检测、下载等功能 |
| `src/Notice.vue` | 公告组件，负责获取和展示公告 |
| `src/plugins/axios.js` | Axios插件配置 |
| `public/index.html` | HTML模板 |

---

## 8. 构建与部署

### 开发环境
```bash
yarn install
yarn serve
```

### 生产构建
```bash
yarn build
# 输出到 dist/ 目录
```

### 代码规范检查
```bash
yarn lint
```

---

## 9. 注意事项

1. **兼容性**: 仅支持Windows 10/11 64位系统完整功能
2. **Cookie**: 使用Cookie存储公告忽略ID，过期时间30天
3. **超时处理**: API请求设置5000ms超时
4. **错误处理**: API失败时显示友好错误提示
5. **URL编码**: 跳转URL使用`encodeURI`处理

---

## 10. 重构建议

1. 考虑升级到Vue 3 + Vite
2. 将API地址提取到配置文件
3. 添加单元测试
4. 考虑使用TypeScript重写
5. 添加PWA支持以实现离线缓存
