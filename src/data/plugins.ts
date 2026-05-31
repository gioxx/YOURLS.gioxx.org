import {
  Image,
  Undo2,
  PackageSearch,
  Mail,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

export type Localized<T> = Record<Lang, T>;

export type Plugin = {
  slug: string;
  name: string;
  tagline: Localized<string>;
  description: Localized<string>;
  icon: LucideIcon;
  tags: string[];
  stars: string;
  version: string;
  status: "stable" | "beta";
  yourlsMin: string;
  phpCompat: string;
  github: string;
  download: string;
  features: Localized<string[]>;
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
    tagline: {
      en: "Install, update and manage YOURLS plugins directly from the admin panel.",
      it: "Installa, aggiorna e gestisci i plugin di YOURLS direttamente dal pannello admin.",
    },
    description: {
      en: "Plugin Manager brings a modern management workflow to YOURLS: search, install, update and remove plugins without touching FTP or the command line. Everything is controllable from an interface integrated in the admin area.",
      it: "Plugin Manager porta in YOURLS un flusso di gestione moderno: ricerca, installazione, aggiornamento e rimozione dei plugin senza più toccare FTP o riga di comando. Tutto controllabile da un'interfaccia integrata nell'area di amministrazione.",
    },
    icon: PackageSearch,
    tags: ["Core", "Admin", "DX"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-PluginManager"),
    download: dl("YOURLS-PluginManager"),
    features: {
      en: [
        "Install plugins directly from the admin interface.",
        "One-click updates when a new version is available.",
        "Safe deactivation and removal without filesystem access.",
        "Designed as a central hub for those managing multiple YOURLS instances.",
      ],
      it: [
        "Installazione di plugin direttamente dall'interfaccia admin.",
        "Aggiornamento con un click quando è disponibile una nuova versione.",
        "Disattivazione e rimozione sicura senza accesso al filesystem.",
        "Pensato come hub centrale per chi gestisce più istanze YOURLS.",
      ],
    },
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-PluginManager",
      "# Activate 'Plugin Manager' from the YOURLS admin panel",
    ],
  },
  {
    slug: "logo-suite",
    name: "Logo Suite",
    tagline: {
      en: "Customize the YOURLS admin panel with your own logo and title.",
      it: "Personalizza il pannello admin di YOURLS con il tuo logo e il tuo titolo.",
    },
    description: {
      en: "Logo Suite lets you replace YOURLS' default branding with your organization's logo, title and colors. Quick setup, no core modifications, perfect for white-label setups.",
      it: "Logo Suite permette di sostituire il branding di default di YOURLS con il logo, il titolo e i colori della tua organizzazione. Configurazione rapida, nessuna modifica al core, perfetto per setup white-label.",
    },
    icon: Image,
    tags: ["Branding", "UI"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-LogoSuite"),
    download: dl("YOURLS-LogoSuite"),
    features: {
      en: [
        "Custom logo in the admin panel.",
        "Configurable title and branding without touching the core.",
        "White-label setup for agencies and internal teams.",
        "Zero external dependencies.",
      ],
      it: [
        "Logo personalizzato nel pannello di amministrazione.",
        "Titolo e branding configurabili senza modificare il core.",
        "Setup white-label per agenzie e team interni.",
        "Zero dipendenze esterne.",
      ],
    },
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-LogoSuite",
      "# Activate 'Logo Suite' from the admin panel",
    ],
  },
  {
    slug: "url-fallback",
    name: "URL Fallback",
    tagline: {
      en: "Redirect visitors to a fallback URL when a short URL does not exist.",
      it: "Reindirizza i visitatori a un URL di fallback quando uno short URL non esiste.",
    },
    description: {
      en: "URL Fallback catches clicks on non-existing short URLs and visits to the YOURLS root, sending the user to a configurable page. Useful to avoid 404s, recover traffic and handle migrations.",
      it: "URL Fallback intercetta i click su short URL inesistenti e le visite alla root di YOURLS, indirizzando l'utente verso una pagina configurabile. Utile per evitare 404, recuperare traffico e gestire migrazioni.",
    },
    icon: Undo2,
    tags: ["Routing", "UX"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-URLFallback"),
    download: dl("YOURLS-URLFallback"),
    features: {
      en: [
        "Configurable fallback for missing short URLs.",
        "Custom redirect for the YOURLS root page.",
        "Recover traffic that would otherwise be lost on 404 pages.",
        "Simple admin configuration.",
      ],
      it: [
        "Fallback configurabile per short URL inesistenti.",
        "Redirect personalizzato per la root page di YOURLS.",
        "Recupera traffico altrimenti perso in pagine 404.",
        "Configurazione semplice dall'admin.",
      ],
    },
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-URLFallback",
      "# Set the fallback URL from the plugin panel",
    ],
  },
  {
    slug: "change-notifier",
    name: "Change Notifier",
    tagline: {
      en: "Instant email notifications for every change to your short URLs.",
      it: "Notifiche email istantanee per ogni modifica ai tuoi short URL.",
    },
    description: {
      en: "Change Notifier monitors creation, editing and deletion of short URLs and sends real-time email notifications. Ideal for teams and for anyone who needs a readable audit trail on every change.",
      it: "Change Notifier monitora creazione, modifica ed eliminazione degli short URL e invia notifiche email in tempo reale. Ideale per team e per chi ha bisogno di un audit trail leggibile su ogni cambiamento.",
    },
    icon: Mail,
    tags: ["Notifications", "Audit"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-ChangeNotifier"),
    download: dl("YOURLS-ChangeNotifier"),
    features: {
      en: [
        "Instant emails on every creation, change or deletion.",
        "Multiple configurable recipients.",
        "Readable audit trail across all changes.",
        "Minimal setup from the admin interface.",
      ],
      it: [
        "Email istantanee a ogni creazione, modifica o eliminazione.",
        "Destinatari multipli configurabili.",
        "Audit trail leggibile su tutti i cambiamenti.",
        "Setup minimale dall'interfaccia admin.",
      ],
    },
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-ChangeNotifier",
      "# Configure email recipients from the plugin panel",
    ],
  },
  {
    slug: "alternative-index",
    name: "Alternative Index",
    tagline: {
      en: "Turn the YOURLS root into a Linktree-style profile page.",
      it: "Trasforma la root di YOURLS in una pagina profilo in stile Linktree.",
    },
    description: {
      en: "Alternative Index replaces the default YOURLS root page with a customizable profile page: social links, featured content and custom branding. An elegant way to reuse your shortener's domain.",
      it: "Alternative Index sostituisce la pagina di default della root di YOURLS con una pagina profilo personalizzabile: link social, contenuti in evidenza e branding custom. Un modo elegante per riutilizzare il dominio del tuo shortener.",
    },
    icon: LayoutTemplate,
    tags: ["Landing", "Branding"],
    stars: "—",
    version: "",
    status: "stable",
    yourlsMin: "1.7.9+",
    phpCompat: "7.4 / 8.x",
    github: repo("YOURLS-AlternativeIndex"),
    download: dl("YOURLS-AlternativeIndex"),
    features: {
      en: [
        "Linktree-style profile page on the domain root.",
        "Configurable social links and featured content.",
        "Custom branding: logo, colors, copy.",
        "No external dependencies or third-party services.",
      ],
      it: [
        "Pagina profilo Linktree-style sulla root del dominio.",
        "Link social e contenuti in evidenza configurabili.",
        "Branding personalizzato: logo, colori, copy.",
        "Nessuna dipendenza esterna o servizio terzo.",
      ],
    },
    install: [
      "cd user/plugins",
      "git clone https://github.com/gioxx/YOURLS-AlternativeIndex",
      "# Activate 'Alternative Index' from the admin panel",
    ],
  },
];

export const getPlugin = (slug: string) => plugins.find((p) => p.slug === slug);
