import { GitCompare, Container, type LucideIcon } from "lucide-react";
import type { Localized } from "@/data/plugins";

export type CollateralItem = {
  slug: string;
  name: string;
  icon: LucideIcon;
  href: string;
  description: Localized<string>;
  features: Localized<string[]>;
  tags: string[];
};

export const collateralItems: CollateralItem[] = [
  {
    slug: "yourls-diff",
    name: "YOURLS-diff",
    icon: GitCompare,
    href: "https://github.com/gioxx/YOURLS-diff",
    description: {
      it: "Tool Python che genera un pacchetto ZIP minimale contenente solo i file cambiati tra due release di YOURLS, evitando il caricamento dell'intero archivio ad ogni aggiornamento.",
      en: "Python tool that builds a minimal ZIP package containing only the files changed between two YOURLS releases, avoiding the need to upload the entire archive on every update.",
    },
    features: {
      it: [
        "Confronto automatico tra due tag di release",
        "ZIP con soli i file nuovi, modificati o rimossi",
        "Script rsync/SSH e WinSCP per il deploy",
        "Patch giornaliere auto-generate via GitHub Actions",
      ],
      en: [
        "Automatic diff between any two release tags",
        "ZIP with only new, modified or removed files",
        "rsync/SSH and WinSCP scripts for deployment",
        "Daily patches auto-generated via GitHub Actions",
      ],
    },
    tags: ["Python", "CLI", "Update"],
  },
  {
    slug: "yourls-docker-custom",
    name: "YOURLS-DockerCustom",
    icon: Container,
    href: "https://github.com/gioxx/YOURLS-DockerCustom",
    description: {
      it: "Immagine Docker custom basata sull'immagine ufficiale YOURLS, con php-zip pre-installato, traduzioni ufficiali per 4 lingue incluse a bordo e Plugin Manager e Language Switcher pre-caricati e pronti all'attivazione.",
      en: "Custom Docker image based on the official YOURLS image, with php-zip pre-installed, official translations for 4 languages bundled, and Plugin Manager and Language Switcher included and ready to activate.",
    },
    features: {
      it: [
        "Estende yourls:latest con php-zip abilitato",
        "Traduzioni ufficiali per de_DE, es_ES, fr_FR, it_IT incluse a bordo",
        "Plugin Manager e Language Switcher pre-caricati nell'immagine",
        "Esempio di stack Docker Compose incluso",
      ],
      en: [
        "Extends yourls:latest with php-zip enabled",
        "Official translations for de_DE, es_ES, fr_FR, it_IT bundled in the image",
        "Plugin Manager and Language Switcher preloaded in the image",
        "Docker Compose stack example included",
      ],
    },
    tags: ["Docker", "PHP", "Dev"],
  },
];
