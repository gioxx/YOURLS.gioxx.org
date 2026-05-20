import { Link } from "@tanstack/react-router";
import type { Plugin } from "@/data/plugins";
import type { RepoStats } from "@/lib/github.functions";

export function PluginCard({
  plugin,
  index = 0,
  stats,
}: {
  plugin: Plugin;
  index?: number;
  stats?: RepoStats | null;
}) {
  const Icon = plugin.icon;
  const stars = stats?.stars ?? plugin.stars;
  const version = stats?.version ?? plugin.version;
  return (
    <Link
      to="/plugins/$slug"
      params={{ slug: plugin.slug }}
      className="group relative bg-card ring-1 ring-border rounded-xl p-6 hover:ring-accent/40 hover:-translate-y-0.5 transition-all duration-300 animate-fade-in flex flex-col"
      style={{ animationDelay: `${100 + index * 50}ms` }}
    >
      <div className="size-10 bg-accent/5 rounded-lg flex items-center justify-center mb-6 ring-1 ring-accent/10 text-accent">
        <Icon className="size-5" />
      </div>
      <div className="flex justify-between items-start mb-2 gap-3">
        <h3 className="font-bold text-lg leading-tight">{plugin.name}</h3>
        <span className="font-mono text-[11px] text-muted-foreground shrink-0 mt-1">
          ★ {stars}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed flex-1">{plugin.tagline}</p>
      {version && (
        <div className="font-mono text-[10px] text-muted-foreground mb-4">v{version}</div>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {plugin.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono border border-border px-2 py-0.5 rounded uppercase text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="w-full py-2.5 rounded-lg bg-foreground text-background text-sm font-medium text-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        Esplora dettagli
      </div>
    </Link>
  );
}
