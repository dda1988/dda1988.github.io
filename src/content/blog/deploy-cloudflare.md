---
title: 上线清单：推到 Cloudflare Pages
description: 从本地仓库到 https 可访问，一共六步。附上构建失败时最可能的四个原因。
pubDate: 2026-11-15
tags: ['deploy', 'cloudflare']
---

## 一、推到 GitHub

```bash
git init
git add .
git commit -m "init blog"
git branch -M main
git remote add origin git@github.com:你的用户名/仓库名.git
git push -u origin main
```

仓库可以是私有的，Cloudflare Pages 对私有仓库免费。

## 二、连接 Cloudflare Pages

进入 Cloudflare 控制台 → Workers & Pages → Create → Pages → Connect to Git，选择刚才的仓库，然后填三项：

| 配置项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

环境变量里加一条 `NODE_VERSION = 20`，避免平台默认 Node 版本太旧导致构建失败。

## 三、第一次构建

点击 Save and Deploy，两分钟内会拿到一个 `xxx.pages.dev` 的地址。先在这个地址上确认：

- 首页文章列表正常
- 点进文章，样式和代码高亮正常
- `/search/` 能搜出结果（索引只在构建时生成，本地 `npm run dev` 下搜不到是正常的）
- `/rss.xml` 返回 XML 而不是 404

## 四、绑定域名

Pages 项目 → Custom domains → 添加你的域名：

- 域名 NS 已托管在 Cloudflare：一键添加，自动加解析
- 域名在别处：手动加 CNAME 指向 `xxx.pages.dev`

HTTPS 证书会自动签发，通常几分钟内生效。

## 五、改域名相关的三处配置

绑定完域名后，回头改这三处并重新 push，否则 canonical、sitemap、RSS 里的地址还是旧的：

```text
src/consts.ts        SITE.url
astro.config.mjs     SITE_URL
public/robots.txt    Sitemap 那一行
```

## 六、验证

打开 `https://你的域名/sitemap-index.xml` 确认能访问，然后把站点提交给 Google Search Console 和 Bing Webmaster Tools。

## 构建失败时，先查这四个

1. **`base` 没配**：部署到 `用户名.github.io/仓库名` 这种子路径时，必须设置 `base`，否则样式和脚本全 404。
2. **Node 版本**：不加 `NODE_VERSION` 时可能用到平台默认的旧版本，`astro` 直接报引擎不匹配。
3. **大小写敏感**：Linux 构建机区分大小写，`Import Header from './header.astro'` 在 Windows 本地能跑，线上会失败。
4. **依赖没提交锁文件**：提交 `package-lock.json`，否则每次构建解析出的版本可能不同。

> 如果决定继续用 GitHub Pages 而不是 Cloudflare，把 `deploy/github-pages.yml` 移到 `.github/workflows/` 目录，并在 Pages 设置里把 Source 选成 GitHub Actions。
