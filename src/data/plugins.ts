import { ShieldCheck, Globe2, Bell, Database, KeyRound, BarChart3, type LucideIcon } from "lucide-react";

export type Plugin = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  stars: string;
  version: string;
  status: "stable" | "beta";
  yourlsMin: string;
  phpCompat: string;
  github: string;
  download: string;
  features: string[];
  install: string[];
};

export const plugins: Plugin[] = [
  {
    slug: "auth-shield",
    name: "Auth-Shield",
    tagline: "2FA e permessi granulari per il pannello admin di YOURLS.",
    description:
      "Auth-Shield aggiunge un livello di sicurezza completo al pannello di amministrazione: autenticazione a due fattori, log di audit, rilevamento di anomalie geografiche e supporto per chiavi hardware moderne come WebAuthn.",
    icon: ShieldCheck,
    tags: ["Security", "Core"],
    stars: "1.2k",
    version: "1.4.0",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "8.1 / 8.2 / 8.3",
    github: "https://github.com/your-username/yourls-auth-shield",
    download: "https://github.com/your-username/yourls-auth-shield/archive/refs/heads/main.zip",
    features: [
      "Integrazione nativa con YubiKey, TouchID e WebAuthn.",
      "Log di sistema esportabili in formato JSON e CSV.",
      "Rilevamento anomalie geografiche sui tentativi di login.",
      "Nessuna dipendenza esterna o libreria pesante.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-auth-shield",
      "# Attiva dal pannello admin di YOURLS",
    ],
  },
  {
    slug: "geo-insights",
    name: "Geo-Insights",
    tagline: "Mappatura in tempo reale dei click con risoluzione cittadina.",
    description:
      "Geo-Insights estende le statistiche di YOURLS con dati geografici dettagliati, dashboard interattive e analisi ISP, mantenendo la redirezione veloce grazie a query asincrone non bloccanti.",
    icon: Globe2,
    tags: ["Analytics", "Maps"],
    stars: "840",
    version: "2.1.0",
    status: "stable",
    yourlsMin: "1.8.0+",
    phpCompat: "8.0 / 8.1 / 8.2 / 8.3",
    github: "https://github.com/your-username/yourls-geo-insights",
    download: "https://github.com/your-username/yourls-geo-insights/archive/refs/heads/main.zip",
    features: [
      "Mappa interattiva con risoluzione a livello cittadino.",
      "Database MaxMind GeoLite2 integrato e aggiornabile via cron.",
      "Analisi ISP e tipo di connessione per ogni click.",
      "Esportazione dei report in CSV e JSON.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-geo-insights",
      "php yourls-cli activate geo-insights",
    ],
  },
  {
    slug: "slack-bridge",
    name: "Slack-Bridge",
    tagline: "Notifiche push istantanee sui canali Slack quando un link decolla.",
    description:
      "Slack-Bridge monitora i tuoi shortlink e invia messaggi formattati ai canali Slack quando vengono raggiunte soglie di click, errori o eventi personalizzati. Configurazione completa via UI, nessuna riga di codice richiesta.",
    icon: Bell,
    tags: ["Webhook", "Social"],
    stars: "420",
    version: "0.9.2",
    status: "beta",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: "https://github.com/your-username/yourls-slack-bridge",
    download: "https://github.com/your-username/yourls-slack-bridge/archive/refs/heads/main.zip",
    features: [
      "Trigger configurabili per soglie di click ed errori.",
      "Template di messaggio personalizzabili con variabili dinamiche.",
      "Supporto per Slack, Discord e webhook generici.",
      "Rate limiting integrato per evitare flooding.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-slack-bridge",
      "# Configura il webhook URL dal pannello plugin",
    ],
  },
  {
    slug: "redis-cache",
    name: "Redis Cache",
    tagline: "Riduce i tempi di risposta scaricando le query su Redis.",
    description:
      "Redis Cache trasforma YOURLS in un'infrastruttura ad alte prestazioni: cache trasparente delle query più frequenti, invalidazione intelligente e supporto cluster per ambienti enterprise.",
    icon: Database,
    tags: ["Performance", "Caching"],
    stars: "650",
    version: "1.2.0",
    status: "stable",
    yourlsMin: "1.8.0+",
    phpCompat: "8.0 / 8.1 / 8.2 / 8.3",
    github: "https://github.com/your-username/yourls-redis-cache",
    download: "https://github.com/your-username/yourls-redis-cache/archive/refs/heads/main.zip",
    features: [
      "Cache trasparente delle query più frequenti.",
      "Invalidazione intelligente alla creazione di nuovi link.",
      "Supporto Redis cluster e Sentinel.",
      "Metriche hit/miss esposte nel pannello admin.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-redis-cache",
      "# Imposta REDIS_HOST nel config",
    ],
  },
  {
    slug: "api-keys",
    name: "API Keys",
    tagline: "Gestione granulare di token API con scope e scadenza.",
    description:
      "Sostituisce il sistema di signature legacy di YOURLS con token API moderni: scope granulari per endpoint, scadenza automatica, revoca immediata e log di utilizzo per ogni chiave.",
    icon: KeyRound,
    tags: ["Security", "API"],
    stars: "510",
    version: "1.0.1",
    status: "stable",
    yourlsMin: "1.8.0+",
    phpCompat: "8.0 / 8.1 / 8.2 / 8.3",
    github: "https://github.com/your-username/yourls-api-keys",
    download: "https://github.com/your-username/yourls-api-keys/archive/refs/heads/main.zip",
    features: [
      "Scope granulari per ogni endpoint API.",
      "Scadenza automatica e revoca immediata dei token.",
      "Log di utilizzo per audit e debugging.",
      "Compatibilità retroattiva con il sistema signature.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-api-keys",
      "# Genera la prima chiave dal pannello admin",
    ],
  },
  {
    slug: "click-charts",
    name: "Click Charts",
    tagline: "Dashboard moderne con grafici interattivi sui tuoi link.",
    description:
      "Click Charts sostituisce le statistiche statiche di YOURLS con dashboard interattive basate su grafici a linee, heatmap orarie, breakdown referrer e confronti tra periodi.",
    icon: BarChart3,
    tags: ["Analytics", "UI"],
    stars: "380",
    version: "0.8.0",
    status: "beta",
    yourlsMin: "1.7.9+",
    phpCompat: "8.0 / 8.1 / 8.2 / 8.3",
    github: "https://github.com/your-username/yourls-click-charts",
    download: "https://github.com/your-username/yourls-click-charts/archive/refs/heads/main.zip",
    features: [
      "Grafici a linee con confronto tra periodi.",
      "Heatmap orarie per ottimizzare il timing delle campagne.",
      "Breakdown referrer, browser e dispositivo.",
      "Export PNG e SVG dei grafici.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/your-username/yourls-click-charts",
      "# Attiva dal pannello admin",
    ],
  },
];

export const getPlugin = (slug: string) => plugins.find((p) => p.slug === slug);
