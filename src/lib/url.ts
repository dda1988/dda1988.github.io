const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 给站内链接加上 base 前缀，兼容部署到 username.github.io/仓库名 的情况 */
export function path(p: string): string {
  return `${BASE}${p.startsWith('/') ? p : `/${p}`}`;
}
