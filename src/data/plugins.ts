import {
  Image,
  Undo2,
  PackageSearch,
  Mail,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";

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

const GH_USER = "gioxx";
const repo = (name: string) => `https://github.com/${GH_USER}/${name}`;
const dl = (name: string) =>
  `https://github.com/${GH_USER}/${name}/archive/refs/heads/main.zip`;

export const plugins: Plugin[] = [
  {
    slug: "plugin-manager",
    name: "Plugin Manager",
    tagline:
      "Installa, aggiorna e gestisci i plugin di YOURLS direttamente dal pannello admin.",
    description:
      "Plugin Manager porta in YOURLS un flusso di gestione moderno: ricerca, installazione, aggiornamento e rimozione dei plugin senza più toccare FTP o riga di comando. Tutto controllabile da un'interfaccia integrata nell'area di amministrazione.",
    icon: PackageSearch,
    tags: ["Core", "Admin", "DX"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-PluginManager"),
    download: dl("YOURLS-PluginManager"),
    features: [
      "Installazione di plugin direttamente dall'interfaccia admin.",
      "Aggiornamento con un click quando è disponibile una nuova versione.",
      "Disattivazione e rimozione sicura senza accesso al filesystem.",
      "Pensato come hub centrale per chi gestisce più istanze YOURLS.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-PluginManager",
      "# Attiva 'Plugin Manager' dal pannello admin di YOURLS",
    ],
  },
  {
    slug: "logo-suite",
    name: "Logo Suite",
    tagline:
      "Personalizza il pannello admin di YOURLS con il tuo logo e il tuo titolo.",
    description:
      "Logo Suite permette di sostituire il branding di default di YOURLS con il logo, il titolo e i colori della tua organizzazione. Configurazione rapida, nessuna modifica al core, perfetto per setup white-label.",
    icon: Image,
    tags: ["Branding", "UI"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-LogoSuite"),
    download: dl("YOURLS-LogoSuite"),
    features: [
      "Logo personalizzato nel pannello di amministrazione.",
      "Titolo e branding configurabili senza modificare il core.",
      "Setup white-label per agenzie e team interni.",
      "Zero dipendenze esterne.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-LogoSuite",
      "# Attiva 'Logo Suite' dal pannello admin",
    ],
  },
  {
    slug: "url-fallback",
    name: "URL Fallback",
    tagline:
      "Reindirizza i visitatori a un URL di fallback quando uno short URL non esiste.",
    description:
      "URL Fallback intercetta i click su short URL inesistenti e le visite alla root di YOURLS, indirizzando l'utente verso una pagina configurabile. Utile per evitare 404, recuperare traffico e gestire migrazioni.",
    icon: Undo2,
    tags: ["Routing", "UX"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-URLFallback"),
    download: dl("YOURLS-URLFallback"),
    features: [
      "Fallback configurabile per short URL inesistenti.",
      "Redirect personalizzato per la root page di YOURLS.",
      "Recupera traffico altrimenti perso in pagine 404.",
      "Configurazione semplice dall'admin.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-URLFallback",
      "# Imposta l'URL di fallback dal pannello plugin",
    ],
  },
  {
    slug: "change-notifier",
    name: "Change Notifier",
    tagline:
      "Notifiche email istantanee per ogni modifica ai tuoi short URL.",
    description:
      "Change Notifier monitora creazione, modifica ed eliminazione degli short URL e invia notifiche email in tempo reale. Ideale per team e per chi ha bisogno di un audit trail leggibile su ogni cambiamento.",
    icon: Mail,
    tags: ["Notifications", "Audit"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-ChangeNotifier"),
    download: dl("YOURLS-ChangeNotifier"),
    features: [
      "Email istantanee a ogni creazione, modifica o eliminazione.",
      "Destinatari multipli configurabili.",
      "Audit trail leggibile su tutti i cambiamenti.",
      "Setup minimale dall'interfaccia admin.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-ChangeNotifier",
      "# Configura i destinatari email dal pannello plugin",
    ],
  },
  {
    slug: "alternative-index",
    name: "Alternative Index",
    tagline:
      "Trasforma la root di YOURLS in una pagina profilo in stile Linktree.",
    description:
      "Alternative Index sostituisce la pagina di default della root di YOURLS con una pagina profilo personalizzabile: link social, contenuti in evidenza e branding custom. Un modo elegante per riutilizzare il dominio del tuo shortener.",
    icon: LayoutTemplate,
    tags: ["Landing", "Branding"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-AlternativeIndex"),
    download: dl("YOURLS-AlternativeIndex"),
    features: [
      "Pagina profilo Linktree-style sulla root del dominio.",
      "Link social e contenuti in evidenza configurabili.",
      "Branding personalizzato: logo, colori, copy.",
      "Nessuna dipendenza esterna o servizio terzo.",
    ],
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-AlternativeIndex",
      "# Attiva 'Alternative Index' dal pannello admin",
    ],
  },
];

export const getPlugin = (slug: string) => plugins.find((p) => p.slug === slug);
