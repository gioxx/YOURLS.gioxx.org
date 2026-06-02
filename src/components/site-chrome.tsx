import { Link } from "@tanstack/react-router";
import { GithubIcon } from "@/components/github-icon";
import { ThemeToggle } from "@/lib/theme";
import { LanguageToggle, useI18n } from "@/lib/i18n";

export function SiteNav() {
  const { t } = useI18n();
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold tracking-tighter text-lg uppercase">
            gioxx/YOURLS
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" hash="plugins" className="hover:text-foreground transition-colors">
              {t.nav.plugins}
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              {t.nav.about}
            </Link>
            <a
              href="https://yourls.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Download YOURLS
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="https://github.com/gioxx"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="size-8 grid place-items-center rounded-lg ring-1 ring-border hover:bg-foreground/5 transition-colors"
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
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <p className="text-sm font-bold tracking-tighter uppercase mb-1">gioxx/YOURLS</p>
            <p className="text-xs text-muted-foreground">{t.footer.tagline}</p>
          </div>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <a href="https://github.com/gioxx" target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <a href="https://yourls.org" target="_blank" rel="noreferrer" className="hover:text-foreground">
              Download YOURLS
            </a>
            <Link to="/about" className="hover:text-foreground">
              {t.footer.support}
            </Link>
          </div>
        </div>
        <div className="border-t border-border pt-6">
          <p className="text-[10px] font-mono text-muted-foreground mb-3">© {new Date().getFullYear()} GIOXX/YOURLS</p>
          <p className="text-[10px] leading-relaxed text-muted-foreground/70">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
