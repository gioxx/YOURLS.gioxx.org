import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Github } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { getPlugin, plugins } from "@/data/plugins";
import { getRepoStats } from "@/lib/github.functions";

export const Route = createFileRoute("/plugins/$slug")({
  loader: async ({ params }) => {
    const plugin = getPlugin(params.slug);
    if (!plugin) throw notFound();
    const stats = await getRepoStats({ data: { slug: params.slug } });
    return { plugin, stats };
  },

  head: ({ loaderData }) => {
    const p = loaderData?.plugin;
    if (!p) return { meta: [{ title: "Plugin non trovato" }] };
    return {
      meta: [
        { title: `${p.name} — Plugin YOURLS` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Plugin YOURLS` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Plugin non trovato</h1>
        <p className="text-muted-foreground mb-6">Questo plugin non esiste o è stato rimosso.</p>
        <Link to="/" className="text-accent hover:underline">
          ← Torna alla home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Errore</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <Link to="/" className="text-accent hover:underline">
          ← Torna alla home
        </Link>
      </div>
    </div>
  ),
  component: PluginDetail,
});

function PluginDetail() {
  const { plugin, stats } = Route.useLoaderData() as {
    plugin: NonNullable<ReturnType<typeof getPlugin>>;
    stats: import("@/lib/github.functions").RepoStats | null;
  };
  const Icon = plugin.icon;
  const related = plugins.filter((p) => p.slug !== plugin.slug).slice(0, 3);
  const version = stats?.version ?? plugin.version;
  const stars = stats?.stars ?? plugin.stars;
  const downloadUrl = stats?.downloadUrl ?? plugin.download;
  const publishedAt = stats?.publishedAt
    ? new Date(stats.publishedAt).toLocaleDateString("it-IT", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;


  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-in"
        >
          <ArrowLeft className="size-4" />
          Tutti i plugin
        </Link>

        <header className="mb-16 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-14 bg-accent/5 rounded-xl flex items-center justify-center ring-1 ring-accent/10 text-accent">
              <Icon className="size-7" />
            </div>
            <div className="flex flex-wrap gap-2">
              {plugin.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono border border-border px-2 py-0.5 rounded uppercase text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                  plugin.status === "stable"
                    ? "bg-accent/10 text-accent"
                    : "bg-amber-500/10 text-amber-600"
                }`}
              >
                {plugin.status} · v{version}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase text-muted-foreground border border-border">
                ★ {stars}
              </span>
              {publishedAt && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase text-muted-foreground">
                  rilasciato {publishedAt}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4 leading-[1.05]">
            {plugin.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            {plugin.tagline}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          <div className="flex-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Panoramica
              </span>
            </div>
            <p className="text-muted-foreground mb-10 leading-relaxed">{plugin.description}</p>

            <h2 className="font-bold text-lg mb-4">Caratteristiche principali</h2>
            <ul className="space-y-4 mb-10">
              {plugin.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="text-accent mt-1.5">●</span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={plugin.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="size-4" />
                Repository GitHub
              </a>
              <a
                href={plugin.download}
                className="inline-flex items-center gap-2 px-5 py-3 ring-1 ring-border rounded-lg text-sm font-medium hover:bg-card transition-all"
              >
                <Download className="size-4" />
                Download .zip
              </a>
            </div>
          </div>

          <div className="lg:w-[420px] animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-[var(--code-bg)] rounded-xl overflow-hidden shadow-2xl ring-1 ring-foreground/10">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="size-2.5 rounded-full bg-red-500/30" />
                <div className="size-2.5 rounded-full bg-amber-500/30" />
                <div className="size-2.5 rounded-full bg-emerald-500/30" />
                <span className="ml-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Installazione rapida
                </span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                {plugin.install.map((line, i) => (
                  <div key={i} className="flex gap-4 mb-1">
                    <span className="text-white/30 select-none">{i + 1}</span>
                    <span className={line.startsWith("#") ? "text-white/40" : "text-white/90"}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-card ring-1 ring-border rounded-lg">
                <span className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                  YOURLS minimo
                </span>
                <span className="font-bold text-sm">{plugin.yourlsMin}</span>
              </div>
              <div className="p-4 bg-card ring-1 ring-border rounded-lg">
                <span className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                  PHP compat
                </span>
                <span className="font-bold text-sm">{plugin.phpCompat}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-border pt-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Altri plugin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/plugins/$slug"
                params={{ slug: p.slug }}
                className="group p-5 bg-card ring-1 ring-border rounded-xl hover:ring-accent/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <p.icon className="size-4 text-accent" />
                  <span className="font-bold text-sm">{p.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
