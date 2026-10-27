# React + TypeScript + Vite

## 下载站访问性能

- 演示图使用 808px / 1616px 的 WebP，通过 `picture`、`srcset` 和 `sizes` 适配屏幕；保留 JPEG 回退。更换图片时需同步更新这三个资源。
- `index.html` 预加载首屏演示图，选图规则与 `DownloadCard` 保持一致；图片设置宽高以预留布局空间。
- 图片由 Vite 输出带内容哈希的路径。部署时建议对 `/assets/` 设置 `Cache-Control: public, max-age=31536000, immutable`，对 HTML 使用 `Cache-Control: no-cache`。
- 服务端/CDN 建议启用 Brotli 或 gzip 压缩 HTML、JS、CSS；构建日志中的 gzip 大小用于对比，不代表服务器已开启压缩。
- 下载后提示抽屉在首次下载时加载；接口使用原生 Fetch API，超时为 5 秒。

使用 `pnpm install --frozen-lockfile` 安装依赖，`pnpm build` 构建，`pnpm preview` 验证生产产物。线上性能还需在部署后检查响应头、接口延迟与 LCP/CLS 指标。

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
