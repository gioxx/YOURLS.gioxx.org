import { Link } from "@tanstack/react-router";
import { GithubIcon } from "@/components/github-icon";
import { ThemeToggle } from "@/lib/theme";
import { LanguageToggle, useI18n } from "@/lib/i18n";
import { plugins } from "@/data/plugins";
import { siteConfig } from "@/config/site";

function PluginMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" className={className} aria-hidden="true">
      <path d="M29.81,16H29V8.83a2,2,0,0,0-2-2H21A5.14,5.14,0,0,0,16.51,2,5,5,0,0,0,11,6.83H4a2,2,0,0,0-2,2V17H4.81A3.13,3.13,0,0,1,8,19.69,3,3,0,0,1,7.22,22,3,3,0,0,1,5,23H2v8.83a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V26h1a5,5,0,0,0,5-5.51A5.15,5.15,0,0,0,29.81,16Zm2.41,7A3,3,0,0,1,30,24H27v7.83H4V25H5a5,5,0,0,0,5-5.51A5.15,5.15,0,0,0,4.81,15H4V8.83h9V7a3,3,0,0,1,1-2.22A3,3,0,0,1,16.31,4,3.13,3.13,0,0,1,19,7.19V8.83h8V18h2.81A3.13,3.13,0,0,1,33,20.69,3,3,0,0,1,32.22,23Z" />
    </svg>
  );
}

export function SiteNav() {
  const { t } = useI18n();
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-semibold tracking-tight text-[15px] shrink-0"
          >
            <PluginMark className="size-5 text-accent shrink-0" />
            {siteConfig.name}
          </Link>
          <div className="hidden md:block w-px h-5 bg-border shrink-0" aria-hidden="true" />
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" hash="plugins" className="hover:text-foreground transition-colors">
              {t.nav.plugins}
            </Link>
            <Link to="/" hash="collateral" className="hover:text-foreground transition-colors">
              {t.nav.collateral}
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              {t.nav.about}
            </Link>
            <Link to="/donate" className="hover:text-foreground transition-colors">
              {t.footer.support}
            </Link>
            <a
              href={siteConfig.blogUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t.nav.blog}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={siteConfig.githubUserUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="size-8 grid place-items-center rounded-full ring-1 ring-border hover:ring-accent/50 hover:text-accent transition-colors"
          >
            <GithubIcon className="size-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  const topPlugins = plugins.slice(0, 5);
  return (
    <footer className="mt-24 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10">
          <div className="col-span-2 sm:col-span-1">
            <Link
              to="/"
              className="font-display font-semibold tracking-tight text-lg mb-1.5 inline-block"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {t.nav.plugins}
            </p>
            <ul className="space-y-2 text-sm">
              {topPlugins.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/plugins/$slug"
                    params={{ slug: p.slug }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/" hash="plugins" className="text-accent hover:underline">
                  {t.home.allRepos.replace(" →", "")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {t.footer.about}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer.support}
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.githubUserUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {t.footer.community}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.awesomeList.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {siteConfig.awesomeList.label}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.product.homeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Download {siteConfig.product.name}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.blogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.blog}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.author}
          </p>
          <p className="text-[10px] leading-relaxed text-muted-foreground/70 max-w-2xl">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
