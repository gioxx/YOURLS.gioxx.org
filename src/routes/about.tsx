import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Github, Mail } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Archivio.ext" },
      {
        name: "description",
        content:
          "Lo sviluppatore dietro la collezione di plugin per YOURLS: filosofia, contributi e contatti.",
      },
      { property: "og:title", content: "About — Archivio.ext" },
      {
        property: "og:description",
        content: "Lo sviluppatore dietro la collezione di plugin per YOURLS.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">About</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-balance leading-[1.05]">
            Plugin pensati come strumenti, non come prodotti.
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              Archivio.ext è la vetrina personale di una serie di plugin sviluppati per{" "}
              <a
                href="https://yourls.org"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline decoration-accent/40 hover:decoration-accent"
              >
                YOURLS
              </a>
              , il celebre URL shortener self-hosted in PHP. Ogni plugin nasce da un problema reale,
              risolto nel modo più semplice e robusto possibile.
            </p>
            <p>
              Niente dipendenze pesanti, niente codice copiato da Stack Overflow senza capirlo.
              Tutto il codice è open-source, rilasciato sotto licenza MIT, e ospitato su GitHub.
            </p>
            <p>
              Se uno di questi plugin ti è utile, lascia una stella sul repository o apri una issue
              con feedback. Le pull request sono sempre benvenute.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-12">
            <a
              href="https://github.com/gioxx"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-5 py-3 ring-1 ring-border rounded-lg text-sm font-medium hover:bg-card transition-all"
            >
              <Mail className="size-4" />
              Contatti
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
