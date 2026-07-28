// Central place to swap identity/branding when reusing this site as a template
// for a different plugin/product gallery. Prose copy lives in src/lib/i18n.tsx
// and per-item content lives in src/data/*.ts — this file only holds the
// identifiers and URLs that repeat verbatim across components and routes.

export const siteConfig = {
  name: "gioxx/YOURLS",
  author: "Gioxx",
  githubUser: "gioxx",
  githubUserUrl: "https://github.com/gioxx",
  blogUrl: "https://gioxx.org/tag/yourls/",
  contactUrl: "https://gioxx.org/about/#giovanni_contattami",
  reposSearchUrl: "https://github.com/gioxx?tab=repositories&q=YOURLS-&type=&language=&sort=",
  product: {
    name: "YOURLS",
    homeUrl: "https://yourls.org",
  },
  awesomeList: {
    label: "Awesome YOURLS",
    url: "https://github.com/YOURLS/awesome",
  },
  donate: {
    githubSponsors: "https://github.com/sponsors/gioxx",
    kofi: "https://ko-fi.com/gioxx",
    buyMeACoffee: "https://www.buymeacoffee.com/gioxx",
  },
} as const;
