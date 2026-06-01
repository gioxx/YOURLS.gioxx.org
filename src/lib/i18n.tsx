import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "it";
const STORAGE_KEY = "archivio-lang";

type Dict = {
  nav: { plugins: string; about: string; github: string };
  badge: { stableSuffix: string };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    availableCount: (n: number) => string;
    allRepos: string;
    explore: string;
    collateralTitle: string;
    collateralSubtitle: string;
  };
  card: { explore: string };
  detail: {
    back: string;
    overview: string;
    features: string;
    repo: string;
    download: string;
    changelog: string;
    openRelease: string;
    others: string;
    quickInstall: string;
    yourlsMin: string;
    phpCompat: string;
    releasedOn: string;
    notFoundTitle: string;
    notFoundBody: string;
    backHome: string;
    errorTitle: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1Pre: string;
    p1Mid: string;
    p1Post: string;
    p2: string;
    p3: string;
    github: string;
    contact: string;
  };
  footer: { tagline: string; support: string; disclaimer: string };
  theme: { label: string; light: string; dark: string; system: string };
  language: { label: string };
};

const dicts: Record<Lang, Dict> = {
  en: {
    nav: { plugins: "Plugins", about: "About", github: "GitHub" },
    badge: { stableSuffix: "stable" },
    home: {
      eyebrow: "Plugin Suite for YOURLS",
      title: "Handcrafted extensions for your YOURLS ecosystem.",
      subtitle:
        "A curated collection of open-source plugins focused on performance, security and advanced data analysis. Clean code, zero useless dependencies.",
      availableCount: (n) => `Available plugins · ${n}`,
      allRepos: "All repositories →",
      explore: "Explore details",
    },
    card: { explore: "Explore details" },
    detail: {
      back: "All plugins",
      overview: "Overview",
      features: "Key features",
      repo: "GitHub repository",
      download: "Download .zip",
      changelog: "Changelog",
      openRelease: "Open release on GitHub",
      others: "Other plugins",
      quickInstall: "Quick install",
      yourlsMin: "YOURLS min",
      phpCompat: "PHP compat",
      releasedOn: "released",
      notFoundTitle: "Plugin not found",
      notFoundBody: "This plugin does not exist or has been removed.",
      backHome: "← Back to home",
      errorTitle: "Error",
    },
    about: {
      eyebrow: "About",
      title: "Plugins meant as tools, not products.",
      p1Pre: "Archivio.ext is the personal showcase of a set of plugins built for ",
      p1Mid: "YOURLS",
      p1Post:
        ", the well-known self-hosted PHP URL shortener. Every plugin is born from a real problem, solved in the simplest and most robust way possible.",
      p2: "No heavy dependencies, no code blindly copied from Stack Overflow. All code is open-source, released under the MIT license, and hosted on GitHub.",
      p3: "If one of these plugins is useful to you, leave a star on the repository or open an issue with feedback. Pull requests are always welcome.",
      github: "GitHub",
      contact: "Contact",
    },
    footer: {
      tagline: "Crafted with care for the open-source community.",
      support: "Support",
      disclaimer:
        "All trademarks mentioned are the property of their respective owners. Third-party trademarks, product names, trade names, corporate names and companies mentioned may be trademarks of their respective owners or registered trademarks of other companies and have been used for explanatory purposes only and for the benefit of the owner, without any intent to infringe existing copyright.",
    },
    theme: { label: "Theme", light: "Light", dark: "Dark", system: "System" },
    language: { label: "Language" },
  },
  it: {
    nav: { plugins: "Plugin", about: "About", github: "GitHub" },
    badge: { stableSuffix: "stabile" },
    home: {
      eyebrow: "Plugin Suite per YOURLS",
      title: "Estensioni artigianali per il tuo ecosistema YOURLS.",
      subtitle:
        "Una collezione curata di plugin open-source focalizzati su prestazioni, sicurezza e analisi avanzata dei dati. Codice pulito, zero dipendenze inutili.",
      availableCount: (n) => `Plugin disponibili · ${n}`,
      allRepos: "Tutti i repository →",
      explore: "Esplora dettagli",
    },
    card: { explore: "Esplora dettagli" },
    detail: {
      back: "Tutti i plugin",
      overview: "Panoramica",
      features: "Caratteristiche principali",
      repo: "Repository GitHub",
      download: "Download .zip",
      changelog: "Changelog",
      openRelease: "Apri la release su GitHub",
      others: "Altri plugin",
      quickInstall: "Installazione rapida",
      yourlsMin: "YOURLS minimo",
      phpCompat: "PHP compat",
      releasedOn: "rilasciato",
      notFoundTitle: "Plugin non trovato",
      notFoundBody: "Questo plugin non esiste o è stato rimosso.",
      backHome: "← Torna alla home",
      errorTitle: "Errore",
    },
    about: {
      eyebrow: "About",
      title: "Plugin pensati come strumenti, non come prodotti.",
      p1Pre: "Archivio.ext è la vetrina personale di una serie di plugin sviluppati per ",
      p1Mid: "YOURLS",
      p1Post:
        ", il celebre URL shortener self-hosted in PHP. Ogni plugin nasce da un problema reale, risolto nel modo più semplice e robusto possibile.",
      p2: "Niente dipendenze pesanti, niente codice copiato da Stack Overflow senza capirlo. Tutto il codice è open-source, rilasciato sotto licenza MIT, e ospitato su GitHub.",
      p3: "Se uno di questi plugin ti è utile, lascia una stella sul repository o apri una issue con feedback. Le pull request sono sempre benvenute.",
      github: "GitHub",
      contact: "Contatti",
    },
    footer: {
      tagline: "Sviluppato con cura per la community open source.",
      support: "Sostieni",
      disclaimer:
        "Tutti i marchi citati appartengono ai legittimi proprietari; marchi di terzi, nomi di prodotti, nomi commerciali, nomi corporativi e società citati possono essere marchi di proprietà dei rispettivi titolari o marchi registrati d'altre società e sono stati utilizzati a puro scopo esplicativo ed a beneficio del possessore, senza alcun fine di violazione dei diritti di Copyright vigenti.",
    },
    theme: { label: "Tema", light: "Chiaro", dark: "Scuro", system: "Sistema" },
    language: { label: "Lingua" },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; locale: string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "it") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  };

  return (
    <I18nCtx.Provider
      value={{ lang, setLang, t: dicts[lang], locale: lang === "it" ? "it-IT" : "en-US" }}
    >
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const next: Lang = lang === "en" ? "it" : "en";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={`${t.language.label}: ${lang.toUpperCase()} (switch to ${next.toUpperCase()})`}
      title={`${t.language.label}: ${lang.toUpperCase()}`}
      className="h-8 px-2 grid place-items-center rounded-lg ring-1 ring-border hover:bg-foreground/5 transition-colors font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
    >
      {lang}
    </button>
  );
}

export function pickLocalized<T>(value: T | Record<Lang, T>, lang: Lang): T {
  if (value && typeof value === "object" && !Array.isArray(value) && "en" in (value as object)) {
    return (value as Record<Lang, T>)[lang];
  }
  return value as T;
}
