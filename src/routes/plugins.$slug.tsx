import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Github, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { getPlugin, plugins } from "@/data/plugins";
import { getRepoStats } from "@/lib/github.functions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/plugins/$slug")({
  loader: async ({ params }) => {
    const plugin = getPlugin(params.slug);
    if (!plugin) throw notFound();
    const stats = await getRepoStats({ data: { slug: params.slug } });
    return { plugin, stats };
  },

  head: ({ loaderData }) => {
    const p = loaderData?.plugin;
    if (!p) return { meta: [{ title: "Plugin not found" }] };
    const tagline = p.tagline.en;
    return {
      meta: [
        { title: `${p.name} — YOURLS Plugin` },
        { name: "description", content: tagline },
        { property: "og:title", content: `${p.name} — YOURLS Plugin` },
        { property: "og:description", content: tagline },
      ],
    };
  },
  notFoundComponent: () => <NotFoundView />,
  errorComponent: ({ error }) => <ErrorView message={error.message} />,
  component: PluginDetail,
});

function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{t.detail.notFoundTitle}</h1>
        <p className="text-muted-foreground mb-6">{t.detail.notFoundBody}</p>
        <Link to="/" className="text-accent hover:underline">
          {t.detail.backHome}
        </Link>
      </div>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{t.detail.errorTitle}</h1>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Link to="/" className="text-accent hover:underline">
          {t.detail.backHome}
        </Link>
      </div>
    </div>
  );
}

function PluginDetail() {
  const { lang, locale, t } = useI18n();
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
    ? new Date(stats.publishedAt).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const releaseBody = stats?.releaseBody;
  const releaseUrl = stats?.releaseUrl;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 animate-fade-in"
        >
          <ArrowLeft className="size-4" />
          {t.detail.back}
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
                  {t.detail.releasedOn} {publishedAt}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4 leading-[1.05]">
            {plugin.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            {plugin.tagline[lang]}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          <div className="flex-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {t.detail.overview}
              </span>
            </div>
            <p className="text-muted-foreground mb-10 leading-relaxed">{plugin.description[lang]}</p>

            <h2 className="font-bold text-lg mb-4">{t.detail.features}</h2>
            <ul className="space-y-4 mb-10">
              {plugin.features[lang].map((f) => (
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
                {t.detail.repo}
              </a>
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-2 px-5 py-3 ring-1 ring-border rounded-lg text-sm font-medium hover:bg-card transition-all"
              >
                <Download className="size-4" />
                {t.detail.download}
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
                  {t.detail.quickInstall}
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
                  {t.detail.yourlsMin}
                </span>
                <span className="font-bold text-sm">{plugin.yourlsMin}</span>
              </div>
              <div className="p-4 bg-card ring-1 ring-border rounded-lg">
                <span className="block font-mono text-[10px] text-muted-foreground uppercase mb-1">
                  {t.detail.phpCompat}
                </span>
                <span className="font-bold text-sm">{plugin.phpCompat}</span>
              </div>
            </div>
          </div>
        </div>

        {releaseBody && (
          <section className="mb-20 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {t.detail.changelog}
              </span>
            </div>
            <div className="bg-card ring-1 ring-border rounded-xl p-6 md:p-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h3>,
                  p: ({ children }) => <p className="text-sm text-foreground/90 leading-relaxed mb-3 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-sm text-foreground/90 leading-relaxed">{children}</li>,
                  pre: ({ children }) => <pre className="bg-[var(--code-bg)] text-white/80 rounded-lg p-4 overflow-x-auto mb-3 font-mono text-xs">{children}</pre>,
                  code: ({ children }) => <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono text-accent">{children}</code>,
                  hr: () => <hr className="border-border my-4" />,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:underline">{children}</a>,
                  blockquote: ({ children }) => <blockquote className="border-l-2 border-accent/40 pl-4 italic text-muted-foreground mb-3">{children}</blockquote>,
                }}
              >
                {releaseBody}
              </ReactMarkdown>
              {releaseUrl && (
                <div className="mt-6 pt-6 border-t border-border">
                  <a
                    href={releaseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                  >
                    <ExternalLink className="size-4" />
                    {t.detail.openRelease}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="border-t border-border pt-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {t.detail.others}
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
                <p className="text-xs text-muted-foreground leading-relaxed">{p.tagline[lang]}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
