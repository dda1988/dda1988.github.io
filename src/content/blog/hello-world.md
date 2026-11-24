---
title: 开始在这里写字
description: 这个博客的地基已经打好：Astro 构建、Markdown 写作、纯静态托管。这篇说明它由什么组成，以及你只需要改哪几行。
pubDate: 2026-11-24
tags: ['astro', 'notes']
---

这套站点的目标很简单：**打开快、改起来简单、十年后还能编译**。没有数据库，没有后台，没有需要续费的服务，你现在看到的每个页面都是构建时生成的静态 HTML。

## 它由什么组成

- **内容层**：`src/content/blog/` 下的 Markdown 文件。frontmatter 有类型校验，字段写错会在构建时报错，而不是上线后才发现列表空了。
- **模板层**：`src/layouts/` 与 `src/components/`，负责页头、页脚、列表、评论。
- **页面层**：`src/pages/`，每个文件对应一个路由，`[...slug].astro` 负责把 Markdown 渲染成一篇文章。
- **构建层**：`astro build` 产出 `dist/`，随后 Pagefind 扫描 `dist/` 生成全文索引。

## 你只需要改三个地方

| 位置 | 改什么 |
| --- | --- |
| `src/consts.ts` | 站名、站点简介、作者、GitHub 用户名、Giscus 配置 |
| `astro.config.mjs` | `SITE_URL` 换成你的真实域名 |
| `public/robots.txt` | 底部 `Sitemap:` 那一行的域名 |

其余都是可以慢慢调的设计细节。

## 日常写作流程

```bash
npm run dev      # 本地预览，改文件即时刷新
npm run build    # 构建 + 生成搜索索引
npm run preview  # 预览构建产物（搜索要在这里才生效）
```

新增一篇文章就是在 `src/content/blog/` 里新建 `some-slug.md`，然后 `git push`。文件名就是 URL：

```text
src/content/blog/learn-astro.md  →  /blog/learn-astro/
```

## 为什么不直接用现成的博客平台

> 平台的价值在于让你少配置，代价是你不拥有它。账号、域名、数据都在别人手里，改一个细节要等对方发版。

静态站把控制权拿回来了：文章是本地文件，样式是你自己的 CSS，部署是一个免费的 CDN。唯一失去的是「在线编辑器」——但你本来就在用编辑器写代码。

## 一个提醒

先写够十篇，再回来调视觉。顺序反过来的人，通常一篇都没写完。
