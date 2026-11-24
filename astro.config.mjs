import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 正式域名（结尾不要带斜杠）
const SITE_URL = 'https://dda1988.github.io';

export default defineConfig({
  site: SITE_URL,

  // 如果你部署到项目站点（用户名.github.io/仓库名），取消下面一行注释
  // base: '/仓库名',

  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },

  build: {
    // 文章页输出为 /blog/slug/index.html，URL 更干净
    format: 'directory',
  },
});
