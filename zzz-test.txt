# 个人博客骨架

Astro 构建的静态博客：Markdown 写作、零 JS 默认、构建时生成全文搜索索引、Giscus 评论、RSS 与 sitemap 全自动。
部署目标是 **GitHub Pages**，正式域名：`https://dda1988.github.io`。

视觉风格已选定 **「卡片志」**：浅灰背景、白色圆角卡片、深绿强调色，首页首篇通栏 + 其余两列，文章页与标签/搜索/关于/404 页统一使用白色内容面板。风格演示稿保留在 `design/styles.html`（底部胶囊可切换四种方案，仅供对照，不参与构建）。

## 技术栈

| 能力 | 方案 |
| --- | --- |
| 框架 | Astro 5（固定版本，避免上游大版本破坏构建） |
| 内容 | Markdown + Content Collections（frontmatter 类型校验） |
| 搜索 | Pagefind（构建时扫描 HTML 生成索引，纯前端运行） |
| 评论 | Giscus（存 GitHub Discussions，可关闭） |
| 订阅 | `@astrojs/rss` 生成 `/rss.xml` |
| SEO | canonical + OG 标签 + `@astrojs/sitemap` |
| 样式 | 卡片志：浅灰底 + 白色卡片 + 深绿强调，原生 CSS 无框架 |

## 快速开始

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 构建 + 生成搜索索引
npm run preview    # 预览构建产物（搜索只在这里生效）
```

## 站点配置（已填好，按需改）

域名、站名 DoHot、作者 DDA 均已配置完成：

- `src/consts.ts` — 站名字标 `brandBase`/`brandAccent`、副标题 `tagline`、简介、作者 `author`、GitHub 用户名
- `astro.config.mjs` — `SITE_URL = https://dda1988.github.io`
- `public/robots.txt` — `Sitemap:` 域名

改了域名时要同步这三处，保持一致。

## 目录结构

```text
src/
├─ consts.ts              站点与评论配置
├─ content.config.ts      frontmatter 的字段约束
├─ content/blog/*.md      文章（文件名即 URL）
├─ layouts/BaseLayout.astro
├─ components/            Header / Footer / PostList / Comments
├─ pages/
│  ├─ index.astro         首页文章列表
│  ├─ blog/[...slug].astro 文章页
│  ├─ tags/               标签索引与标签筛选
│  ├─ about.astro
│  ├─ search.astro        Pagefind 搜索
│  ├─ 404.astro
│  └─ rss.xml.ts
├─ lib/url.ts             base 路径处理
└─ styles/global.css      全部样式
public/                   favicon、robots.txt、_redirects、_headers
.github/workflows/
  └─ deploy-pages.yml     GitHub Pages 自动部署（push main 即发布）
deploy/github-pages.yml   同上文件的留档副本
```

## 写一篇文章

新建 `src/content/blog/my-post.md`：

```yaml
---
title: 文章标题
description: 一句话摘要，会用于列表页、RSS 和搜索结果
pubDate: 2026-11-24
tags: ['astro']
draft: false
---
```

文件名 `my-post.md` → 访问路径 `/blog/my-post/`。**发布后不要改文件名**，需要改就配合 `public/_redirects` 做 301。

标签会进入 URL（`/tags/astro/`），建议用英文小写。

## 部署到 GitHub Pages

域名 `dda1988.github.io` 是**用户站点**，仓库名必须严格叫 **`dda1988.github.io`**（用户名 + `.github.io`，一个账号只能有一个，覆盖根路径，因此不需要设 `base`）。若仓库当前叫别的名字（如 `dohot.github.io`），需先在仓库 Settings → General → Repository name 改为 `dda1988.github.io`。

1. 把仓库改名为 `dda1988.github.io`，保持公开
2. 把本项目文件推到该仓库的 `main` 分支（旧的 index.html / logo.svg / style.css 会被清掉）
3. 仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**
4. 推送后 `.github/workflows/deploy-pages.yml` 自动构建发布，几分钟后访问 `https://dda1988.github.io`

> 免费账号的 GitHub Pages 只能来自公开仓库。若想私有源码，需改部署到 Cloudflare Pages（可免费私有部署）。
> 本项目 workflow 用 `withastro/action@v3` + `actions/deploy-pages@v4`，Node 20，Astro 5 兼容。

## 备选：改用 Cloudflare Pages

若在意国内访问速度或需要私有仓库，可改用 Cloudflare Pages：控制台 → Workers & Pages → Pages → Connect to Git，构建命令 `npm run build`、输出目录 `dist`、环境变量 `NODE_VERSION=20`，再绑域名。此时可删除 `.github/workflows/deploy-pages.yml`。

## 启用评论

1. 仓库 Settings → Features 勾选 Discussions
2. 打开 https://giscus.app，填入仓库，生成配置
3. 把 `repo`、`repoId`、`categoryId` 填进 `src/consts.ts` 的 `GISCUS`

未填写时文章页显示配置提示，不影响其他功能。

## 已知限制

- 搜索索引来自构建产物，`npm run dev` 下搜索页会提示索引未生成，属正常现象。
- 图片放 `public/` 会原样复制、不做优化；图片较多时建议用对象存储或图床，避免仓库体积超出托管限制。
- 站内链接统一通过 `src/lib/url.ts` 的 `path()` 生成，新增链接时请沿用，否则设置 `base` 后会 404。
