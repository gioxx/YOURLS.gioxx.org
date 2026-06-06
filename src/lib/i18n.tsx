import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "it";
const STORAGE_KEY = "archivio-lang";

type Dict = {
  nav: { plugins: string; about: string; collateral: string; github: string; blog: string };
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
    sshTitle: string;
    sshIntro: string;
    sshAlt: string;
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
    contactNote: string;
  };
  footer: { tagline: string; support: string; disclaimer: string };
  theme: { label: string; light: string; dark: string; system: string };
  language: { label: string };
};

const dicts: Record<Lang, Dict> = {
  en: {
    nav: { plugins: "Plugins", about: "About", collateral: "Tools", github: "GitHub", blog: "Blog" },
    badge: { stableSuffix: "stable" },
    home: {
      eyebrow: "Plugin Suite for YOURLS",
      title: "Handcrafted plugins for your YOURLS instance.",
      subtitle:
        "A curated collection of open-source plugins that will allow you to customize and enhance your YOURLS experience. Clean code, zero unnecessary dependencies, simple installation and intuitive usage.",
      availableCount: (n) => `Available plugins · ${n}`,
      allRepos: "All repositories →",
      explore: "Explore details",
      collateralTitle: "Side projects",
      collateralSubtitle: "Utilities and tooling around the YOURLS ecosystem.",
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
      sshTitle: "Can't install via Plugin Manager?",
      sshIntro:
        'If YOURLS doesn\'t have write permissions on the plugins directory, Plugin Manager will show an error like “Automatic installation is not possible because YOURLS cannot write to …/user/plugins”. In that case you can install manually over SSH — run these commands inside your plugins directory:',
      sshAlt:
        "Alternatively, download the ZIP above, extract it locally and upload the folder via FTP/SFTP.",
    },
    about: {
      eyebrow: "About",
      title: "Plugins meant as tools, not products.",
      p1Pre: "gioxx/YOURLS is my personal gallery of plugins and side projects built for ",
      p1Mid: "YOURLS",
      p1Post:
        ", the well-known self-hosted PHP URL shortener. Every plugin is born from a real problem, solved in the simplest and most robust way possible.",
      p2: "All code is open-source, released under MIT license and hosted on GitHub. Helped by AI? Yes, but never on autopilot, with the goal of improving productivity and code quality. If this bothers you, feel free to look away, there's nothing shameful in using tools that help you do a better and more efficient job.",
      p3: "If one of these plugins is useful to you, leave a star on the repository or open an issue with feedback. Pull requests are always welcome.",
      github: "GitHub",
      contact: "Contact form",
      contactNote: "For support or questions about a specific plugin, open an issue directly on its GitHub repository. As a last resort, you can reach me via my contact form.",
    },
    footer: {
      tagline: "❤️ Lovingly developed by the usually-on-vacation brain cell of Gioxx.",
      support: "Donate",
      disclaimer:
        "All trademarks mentioned are the property of their respective owners. Third-party trademarks, product names, trade names, corporate names and companies mentioned may be trademarks of their respective owners or registered trademarks of other companies and have been used for explanatory purposes only and for the benefit of the owner, without any intent to infringe existing copyright.",
    },
    theme: { label: "Theme", light: "Light", dark: "Dark", system: "System" },
    language: { label: "Language" },
  },
  it: {
    nav: { plugins: "Plugin", about: "About", collateral: "Strumenti", github: "GitHub", blog: "Blog" },
    badge: { stableSuffix: "stabile" },
    home: {
      eyebrow: "Suite di plugin per YOURLS",
      title: "Estensioni artigianali per la tua istanza di YOURLS.",
      subtitle:
        "Una collezione curata di plugin open-source che ti permetteranno di personalizzare e migliorare la tua esperienza d'uso di YOURLS. Codice pulito, zero dipendenze inutili, installazione semplice e utilizzo intuitivo.",
      availableCount: (n) => `Plugin disponibili · ${n}`,
      allRepos: "Tutti i repository →",
      explore: "Esplora dettagli",
      collateralTitle: "Progetti collaterali",
      collateralSubtitle: "Utilità e strumenti attorno all'ecosistema YOURLS.",
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
      sshTitle: "Non riesci ad installare tramite Plugin Manager?",
      sshIntro:
        "Se YOURLS non ha i permessi di scrittura nella directory dei plugin, Plugin Manager mostrerà un errore del tipo \"L'installazione automatica non è possibile perché YOURLS non può scrivere in …/user/plugins\". In quel caso puoi installare manualmente via SSH — esegui questi comandi all'interno della directory dei plugin:",
      sshAlt:
        "In alternativa, scarica il pacchetto ZIP qui sopra, estrailo in locale e carica la cartella via FTP/SFTP.",
    },
    about: {
      eyebrow: "About",
      title: "Plugin pensati come strumenti, non come prodotti.",
      p1Pre: "gioxx/YOURLS è la mia galleria personale di plugin e progetti collaterali sviluppati per ",
      p1Mid: "YOURLS",
      p1Post:
        ", il celebre URL shortener self-hosted in PHP. Ogni plugin nasce da un problema reale, risolto nel modo più semplice e robusto possibile.",
      p2: "Tutto il codice è open-source, rilasciato sotto licenza MIT e ospitato su GitHub. Aiutato dall'intelligenza artificiale? Sì, ma mai con il pilota automatico, con l'obiettivo di migliorare produttività e qualità del codice. Se questo ti disturba, passa pure oltre, non c'è nulla di cui vergognarsi nell'usare strumenti che ti aiutano a fare un lavoro migliore e più efficiente.",
      p3: "Se uno di questi plugin ti è utile, lascia una stella sul repository o apri una issue con feedback. Le pull request sono sempre benvenute.",
      github: "GitHub",
      contact: "Modulo di contatto",
      contactNote: "Per supporto o domande su uno specifico plugin, apri una Issue direttamente nel suo repository GitHub. In ultima istanza, puoi contattarmi tramite il mio modulo di contatto.",
    },
    footer: {
      tagline: "❤️ Sviluppato con amore dall’unico neurone funzionante di Gioxx (quando non è in vacanza).",
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
