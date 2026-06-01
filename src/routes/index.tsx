import { createFileRoute } from "@tanstack/react-router";
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="mb-24 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {t.home.eyebrow}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6 leading-[1.05]">
                {t.home.title}
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                {t.home.subtitle}
              </p>
            </div>
            <div className="hidden lg:block lg:flex-1 max-w-md">
              <div className="relative">
                <div className="bg-[var(--code-bg)] rounded-xl overflow-hidden ring-1 ring-foreground/10 shadow-2xl opacity-75">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="size-2.5 rounded-full bg-red-500/40" />
                    <div className="size-2.5 rounded-full bg-amber-500/40" />
                    <div className="size-2.5 rounded-full bg-emerald-500/40" />
                    <span className="ml-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                      my-plugin.php
                    </span>
                  </div>
                  <div className="p-6 font-mono text-xs leading-loose select-none">
                    <div className="text-white/30 mb-2">{"<?php"}</div>
                    <div className="text-white/30 mb-4">{"/*"}</div>
                    <div className="flex gap-3 mb-1">
                      <span className="text-white/30 w-4 shrink-0">·</span>
                      <span className="text-white/40">Plugin Name: <span className="text-accent/80">My YOURLS Plugin</span></span>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <span className="text-white/30 w-4 shrink-0">·</span>
                      <span className="text-white/40">Author: <span className="text-white/60">gioxx</span></span>
                    </div>
                    <div className="text-white/30 mb-6">{"*/"}</div>
                    <div className="mb-4">
                      <span className="text-accent/70">yourls_add_action</span>
                      <span className="text-white/50">{"("}</span>
                    </div>
                    <div className="flex gap-3 mb-1">
                      <span className="text-white/20 w-4 shrink-0">·</span>
                      <span className="text-emerald-400/60">'admin_init'</span>
                      <span className="text-white/30">,</span>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <span className="text-white/20 w-4 shrink-0">·</span>
                      <span className="text-emerald-400/60">'my_plugin_init'</span>
                    </div>
                    <div className="text-white/50 mb-6">{")"}</div>
                    <div className="mb-2">
                      <span className="text-accent/50">function </span>
                      <span className="text-white/50">my_plugin_init</span>
                      <span className="text-white/30">{"() {"}</span>
                    </div>
                    <div className="flex gap-3 mb-1">
                      <span className="text-white/20 w-4 shrink-0">·</span>
                      <span className="text-accent/50">yourls_add_option</span>
                      <span className="text-white/30">{"("}</span>
                    </div>
                    <div className="flex gap-3 mb-1">
                      <span className="text-white/20 w-4 shrink-0" />
                      <span className="text-white/20 w-4 shrink-0">·</span>
                      <span className="text-emerald-400/40">'enabled'</span>
                      <span className="text-white/20">, true</span>
                    </div>
                    <div className="flex gap-3 mb-2">
                      <span className="text-white/20 w-4 shrink-0">·</span>
                      <span className="text-white/30">{")"}</span>
                    </div>
                    <div className="text-white/30">{"}"}</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent rounded-b-xl pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <section id="plugins" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t.home.availableCount(plugins.length)}
            </h2>
            <a
              href="https://github.com/gioxx?tab=repositories&q=YOURLS-&type=&language=&sort="
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.home.allRepos}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((p, i) => (
              <PluginCard key={p.slug} plugin={p} index={i} stats={statsMap[p.slug]} />
            ))}

          </div>
        </section>

        <section className="mt-24 pt-16 border-t border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.home.collateralTitle}
            </span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            {t.home.collateralSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://github.com/gioxx/YOURLS-diff"
              target="_blank"
              rel="noreferrer"
              className="group bg-card ring-1 ring-border rounded-xl p-6 hover:ring-accent/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <div className="size-10 bg-accent/5 rounded-lg flex items-center justify-center mb-6 ring-1 ring-accent/10 text-accent">
                <GitCompare className="size-5" />
              </div>
              <h3 className="font-bold text-lg leading-tight mb-2">YOURLS-diff</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                {lang === "it"
                  ? "Confronta velocemente file e directory tra istanze YOURLS per identificare differenze in configurazioni e codice personalizzato."
                  : "Quickly compare files and directories across YOURLS instances to spot differences in configurations and custom code."}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                <ExternalLink className="size-4" />
                {lang === "it" ? "Apri su GitHub" : "Open on GitHub"}
              </div>
            </a>
            <a
              href="https://github.com/gioxx/YOURLS-DockerCustom"
              target="_blank"
              rel="noreferrer"
              className="group bg-card ring-1 ring-border rounded-xl p-6 hover:ring-accent/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <div className="size-10 bg-accent/5 rounded-lg flex items-center justify-center mb-6 ring-1 ring-accent/10 text-accent">
                <Container className="size-5" />
              </div>
              <h3 className="font-bold text-lg leading-tight mb-2">YOURLS-DockerCustom</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                {lang === "it"
                  ? "Container Docker personalizzato per YOURLS con configurazioni ottimizzate per ambienti di sviluppo e produzione."
                  : "Custom Docker container for YOURLS with optimized configurations for development and production environments."}
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                <ExternalLink className="size-4" />
                {lang === "it" ? "Apri su GitHub" : "Open on GitHub"}
              </div>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
