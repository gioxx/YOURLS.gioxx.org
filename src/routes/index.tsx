import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PluginCard } from "@/components/plugin-card";
import { plugins } from "@/data/plugins";
import { getAllRepoStats } from "@/lib/github.functions";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/config/site";
import { collateralItems } from "@/data/collateral";
import { LINK_MARK_PATH } from "@/components/link-mark";

export const Route = createFileRoute("/")({
  loader: () => getAllRepoStats(),
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — My personal ${siteConfig.product.name} Plugin Gallery` },
      {
        name: "description",
        content: `A curated collection of open-source ${siteConfig.product.name} plugins: security, advanced analytics, performance and integrations.`,
      },
      {
        property: "og:title",
        content: `${siteConfig.name} — My personal ${siteConfig.product.name} Plugin Gallery`,
      },
      {
        property: "og:description",
        content: `Handcrafted extensions for your ${siteConfig.product.name} ecosystem. Open-source plugins focused on performance, security and analytics.`,
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
            <path d={LINK_MARK_PATH} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </section>

        <section id="plugins" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {t.home.availableCount(plugins.length)}
            </h2>
            <a
              href={siteConfig.reposSearchUrl}
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
              {collateralItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.slug}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-lift group bg-card ring-1 ring-border rounded-[var(--radius)] p-6 hover:ring-accent/40 flex flex-col"
                  >
                    <div className="icon-badge size-10 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <h3 className="font-display font-semibold text-lg leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description[lang]}
                    </p>
                    <ul className="space-y-1.5 mb-6 flex-1">
                      {item.features[lang].map((f) => (
                        <li key={f} className="flex gap-2 text-xs text-foreground/80">
                          <span className="text-accent mt-0.5 shrink-0">●</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag) => (
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
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
