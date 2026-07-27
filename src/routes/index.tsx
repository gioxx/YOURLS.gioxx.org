import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GitCompare, Container, ExternalLink } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PluginCard } from "@/components/plugin-card";
import { plugins } from "@/data/plugins";
import { getAllRepoStats } from "@/lib/github.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  loader: () => getAllRepoStats(),
  head: () => ({
    meta: [
      { title: "gioxx/YOURLS — My personal YOURLS Plugin Gallery" },
      {
        name: "description",
        content:
          "A curated collection of open-source YOURLS plugins: security, advanced analytics, performance and integrations.",
      },
      { property: "og:title", content: "gioxx/YOURLS — My personal YOURLS Plugin Gallery" },
      {
        property: "og:description",
        content:
          "Handcrafted extensions for your YOURLS ecosystem. Open-source plugins focused on performance, security and analytics.",
      },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: Index,
});

function Index() {
  const statsMap = Route.useLoaderData();
  const { lang, t } = useI18n();

  const categoryCount = useMemo(() => new Set(plugins.flatMap((p) => p.tags)).size, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="relative overflow-hidden mb-16 animate-fade-in">
          <div className="max-w-2xl relative z-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              {t.home.eyebrow}
            </span>
            <h1 className="font-display font-semibold tracking-tight text-3xl md:text-4xl text-balance mt-3 mb-4 leading-[1.15]">
              {t.home.title}
            </h1>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
              {t.home.subtitle}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {plugins.length} {t.home.statPlugins} · {categoryCount} {t.home.statCategories} · EN /
              IT
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="hidden md:block absolute right-12 lg:right-20 top-1/2 -translate-y-1/2 w-48 lg:w-60 h-auto text-accent opacity-40 dark:opacity-25 pointer-events-none z-0"
            aria-hidden="true"
          >
            <path
              d="M17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L8.10057 3.5508L17.0236 8.64967L21.0403 6.64132C20.3941 5.90949 19.3515 5.36234 17.5777 4.43152Z"
              fill="currentColor"
            />
            <path
              d="M21.7484 7.96434L17.75 9.96353V13C17.75 13.4142 17.4142 13.75 17 13.75C16.5858 13.75 16.25 13.4142 16.25 13V10.7135L12.75 12.4635V21.904C13.4679 21.7252 14.2848 21.2965 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C22 15.8458 22 14.5833 22 12.0585V11.9415C22 10.0489 22 8.86557 21.7484 7.96434Z"
              fill="currentColor"
            />
            <path
              d="M11.25 21.904V12.4635L2.25164 7.96434C2 8.86557 2 10.0489 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27062 18.4393 6.42228 19.5685L8.42229 20.618C9.71524 21.2965 10.5321 21.7252 11.25 21.904Z"
              fill="currentColor"
            />
            <path
              d="M2.95969 6.64132L12 11.1615L15.4112 9.4559L6.52456 4.37785L6.42229 4.43152C4.64855 5.36234 3.6059 5.90949 2.95969 6.64132Z"
              fill="currentColor"
            />
          </svg>
        </section>

        <section id="plugins" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {t.home.availableCount(plugins.length)}
            </h2>
            <a
              href="https://github.com/gioxx?tab=repositories&q=YOURLS-&type=&language=&sort="
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              {t.home.allRepos}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {plugins.map((p, i) => (
              <PluginCard key={p.slug} plugin={p} index={i} stats={statsMap[p.slug]} />
            ))}
          </div>

          <div id="collateral" className="mt-10 pt-10 scroll-mt-24">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              {t.home.collateralTitle}
            </p>
            <p className="text-muted-foreground mb-6 max-w-2xl text-sm">
              {t.home.collateralSubtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* YOURLS-diff */}
              <a
                href="https://github.com/gioxx/YOURLS-diff"
                target="_blank"
                rel="noreferrer"
                className="card-lift group bg-card ring-1 ring-border rounded-[var(--radius)] p-6 hover:ring-accent/40 flex flex-col"
              >
                <div className="icon-badge size-10 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                  <GitCompare className="size-5" />
                </div>
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="font-display font-semibold text-lg leading-tight">YOURLS-diff</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {lang === "it"
                    ? "Tool Python che genera un pacchetto ZIP minimale contenente solo i file cambiati tra due release di YOURLS, evitando il caricamento dell'intero archivio ad ogni aggiornamento."
                    : "Python tool that builds a minimal ZIP package containing only the files changed between two YOURLS releases, avoiding the need to upload the entire archive on every update."}
                </p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {(lang === "it"
                    ? [
                        "Confronto automatico tra due tag di release",
                        "ZIP con soli i file nuovi, modificati o rimossi",
                        "Script rsync/SSH e WinSCP per il deploy",
                        "Patch giornaliere auto-generate via GitHub Actions",
                      ]
                    : [
                        "Automatic diff between any two release tags",
                        "ZIP with only new, modified or removed files",
                        "rsync/SSH and WinSCP scripts for deployment",
                        "Daily patches auto-generated via GitHub Actions",
                      ]
                  ).map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-foreground/80">
                      <span className="text-accent mt-0.5 shrink-0">●</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Python", "CLI", "Update"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono border border-border px-2 py-0.5 rounded uppercase text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-full py-2.5 rounded-[var(--radius)] border border-border text-sm font-medium text-center group-hover:border-accent group-hover:text-accent transition-colors inline-flex items-center justify-center gap-2">
                  <ExternalLink className="size-3.5" />
                  {lang === "it" ? "Apri su GitHub" : "Open on GitHub"}
                </div>
              </a>

              {/* YOURLS-DockerCustom */}
              <a
                href="https://github.com/gioxx/YOURLS-DockerCustom"
                target="_blank"
                rel="noreferrer"
                className="card-lift group bg-card ring-1 ring-border rounded-[var(--radius)] p-6 hover:ring-accent/40 flex flex-col"
              >
                <div className="icon-badge size-10 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                  <Container className="size-5" />
                </div>
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="font-display font-semibold text-lg leading-tight">
                    YOURLS-DockerCustom
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {lang === "it"
                    ? "Immagine Docker custom basata sull'immagine ufficiale YOURLS, con php-zip pre-installato, traduzioni ufficiali per 4 lingue incluse a bordo e Plugin Manager e Language Switcher pre-caricati e pronti all'attivazione."
                    : "Custom Docker image based on the official YOURLS image, with php-zip pre-installed, official translations for 4 languages bundled, and Plugin Manager and Language Switcher included and ready to activate."}
                </p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {(lang === "it"
                    ? [
                        "Estende yourls:latest con php-zip abilitato",
                        "Traduzioni ufficiali per de_DE, es_ES, fr_FR, it_IT incluse a bordo",
                        "Plugin Manager e Language Switcher pre-caricati nell'immagine",
                        "Esempio di stack Docker Compose incluso",
                      ]
                    : [
                        "Extends yourls:latest with php-zip enabled",
                        "Official translations for de_DE, es_ES, fr_FR, it_IT bundled in the image",
                        "Plugin Manager and Language Switcher preloaded in the image",
                        "Docker Compose stack example included",
                      ]
                  ).map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-foreground/80">
                      <span className="text-accent mt-0.5 shrink-0">●</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Docker", "PHP", "Dev"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono border border-border px-2 py-0.5 rounded uppercase text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-full py-2.5 rounded-[var(--radius)] border border-border text-sm font-medium text-center group-hover:border-accent group-hover:text-accent transition-colors inline-flex items-center justify-center gap-2">
                  <ExternalLink className="size-3.5" />
                  {lang === "it" ? "Apri su GitHub" : "Open on GitHub"}
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
