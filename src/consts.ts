export const SITE = {
  // ↓↓↓ 这四行改成你自己的
  title: 'DoHot',
  // 字标拆两段：前半深色，后半绿色并加下划线（D 方案）
  brandBase: 'Do',
  brandAccent: 'Hot',
  tagline: '写点代码，也写点别的',
  description: '一个用来记录技术、阅读与日常的个人博客。',
  author: 'DDA',

  url: 'https://dda1988.github.io',
  lang: 'zh-CN',
  github: 'dda1988',
  startYear: 2026,
};

// Giscus 评论：filling 这两个值之前，文章页会显示配置提示
// 获取地址：https://giscus.app  （需要仓库是公开的，并开启 Discussions）
export const GISCUS = {
  repo: '',        // 例：'yourname/blog'
  repoId: '',      // 例：'R_kgDOLxxxxxx'
  category: 'Comments',
  categoryId: '',
  mapping: 'pathname',
  lang: 'zh-CN',
};
