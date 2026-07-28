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
              d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
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
