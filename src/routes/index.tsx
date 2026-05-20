import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PluginCard } from "@/components/plugin-card";
import { plugins } from "@/data/plugins";
import { getAllRepoStats } from "@/lib/github.functions";


export const Route = createFileRoute("/")({
  loader: () => getAllRepoStats(),
  head: () => ({
    meta: [
      { title: "Archivio.ext — Plugin per YOURLS" },
      {
        name: "description",
        content:
          "Una collezione curata di plugin open-source per YOURLS: sicurezza, analytics avanzate, performance e integrazioni.",
      },
      { property: "og:title", content: "Archivio.ext — Plugin per YOURLS" },
      {
        property: "og:description",
        content:
          "Estensioni artigianali per il tuo ecosistema YOURLS. Plugin open-source focalizzati su prestazioni, sicurezza e analisi.",
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="max-w-2xl mb-24 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Plugin Suite per YOURLS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6 leading-[1.05]">
            Estensioni artigianali per il tuo ecosistema YOURLS.
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Una collezione curata di plugin open-source focalizzati su prestazioni, sicurezza e
            analisi avanzata dei dati. Codice pulito, zero dipendenze inutili.
          </p>
        </section>

        <section id="plugins" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Plugin disponibili · {plugins.length}
            </h2>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Tutti i repository →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((p, i) => (
              <PluginCard key={p.slug} plugin={p} index={i} stats={statsMap[p.slug]} />
            ))}

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
