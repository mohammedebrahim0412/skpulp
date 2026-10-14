/**
 * Media registry — genuine SK PULP & FIBRE factory footage and photography,
 * processed by scripts/process-media.mjs from the files in "images videos/".
 *
 * To add or replace a photo: add it to PHOTOS in the pipeline script (or drop
 * `<name>-1600.jpg` and `<name>-800.jpg` into public/media/), then register it here.
 * `illustrative: true` adds an "Illustrative" tag for any non-factory imagery.
 */

export type Still = {
  /** Base path without the "-1600.jpg" / "-800.jpg" suffix */
  src: string;
  alt: string;
  width: number;
  height: number;
  illustrative: boolean;
};

const photo = (name: string, alt: string, orientation: "landscape" | "portrait" | "wide" = "landscape"): Still => ({
  src: `/media/${name}`,
  alt,
  width: 1600,
  height: orientation === "portrait" ? 2133 : orientation === "wide" ? 900 : 1200,
  illustrative: false,
});

export const srcSet = (s: Still) => `${s.src}-800.jpg 800w, ${s.src}-1600.jpg 1600w`;
export const src = (s: Still, w: 800 | 1600 = 1600) => `${s.src}-${w}.jpg`;

/** The factory process film (shown in the "Watch Our Process" section). */
export const processFilm = {
  mp4: "/media/hero-1280.mp4",
  poster: photo("hero-poster", "", "wide"),
};

/**
 * Portrait of the company contact (used in About Us and the company section).
 * Files: public/media/portrait-1000.jpg and portrait-600.jpg. Set to null to show the logo instead.
 */
export const portraitPhoto: { base: string; width: number; height: number } | null = {
  base: "/media/portrait",
  width: 1000,
  height: 1200,
};

export const stills = {
  /** Hero image: the SK PULP & FIBRE factory floor (source: "images videos/hero-source.webp"). */
  heroFactory: {
    src: "/media/hero-floor",
    alt: "SK PULP & FIBRE factory floor: the team at the pulp sheet machine beside stacks of finished pulp sheets",
    width: 1600,
    height: 900,
    illustrative: false,
  } as Still,
  /** About Us image: the pulp sheet machine (source: "images videos/about-source.webp"). */
  aboutMachine: {
    src: "/media/about-machine",
    alt: "SK PULP & FIBRE pulp sheet machine: rollers and drive wheel forming pulp sheets as water drains away",
    width: 1600,
    height: 900,
    illustrative: false,
  } as Still,
  loaderRaw: photo("loader-raw", "Tractor loader carrying secondary fibre raw material into the factory"),
  loaderTipping: photo("loader-tipping", "Loader tipping a bucket of raw material onto the stockpile"),
  loaderFeeding: photo("loader-feeding", "Loader feeding raw material into a pulper tank", "portrait"),
  pulpers: photo("pulpers", "Row of concrete pulper tanks inside the SK PULP & FIBRE shed"),
  pulperHall: photo("pulper-hall", "Pulper tanks and the pulp machine line inside the factory"),
  pulperAgitator: photo("pulper-agitator", "Agitator turning wet fibre pulp inside a pulper"),
  machineOperator: photo("machine-operator", "Operator at the pulp sheet machine"),
  machineDetail: photo("machine-detail", "Rollers and pressing section of the pulp sheet machine"),
  machineFloor: photo("machine-floor", "Workers handling freshly formed sheets on the machine floor"),
  dryingField: photo("drying-field", "Pulp sheets laid out to dry in the open field beside stacked bundles"),
  dryingStacks: photo("drying-stacks", "Sun-dried pulp sheets stacked in the drying yard"),
  warehouseRow: photo("warehouse-row", "Long row of stacked pulp sheets inside the warehouse"),
  warehouseStacks: photo("warehouse-stacks", "Finished pulp sheet stacks in the warehouse near the loading door"),
  warehouseWide: photo("warehouse-wide", "Wide view of the SK PULP & FIBRE factory shed"),
  detailSheetEdges: photo("detail-sheet-edges", "Close-up of layered pulp sheet edges in a tied stack"),
  detailStack: photo("detail-stack", "Close-up of finished pulp sheets stacked in the warehouse"),
  detailPulp: photo("detail-pulp", "Close-up of wet fibre pulp being mixed in the pulper"),
};

export type Stage = {
  n: string;
  key: string;
  title: string;
  /** Short caption for the step diagram */
  caption: string;
  headline: string;
  body: string;
  still: Still;
};

const stageStill = (key: string, alt: string): Still => photo(`stage-${key}`, alt, "wide");

export const stages: Stage[] = [
  {
    n: "01",
    key: "raw-material",
    title: "Raw Material",
    caption: "Secondary fibre received",
    headline: "It Begins with Secondary Fibre.",
    body: "Recovered fibre raw material is received at the factory and moved into the process by loader.",
    still: stageStill("raw-material", "Loader lifting a bucket of raw material inside the factory shed"),
  },
  {
    n: "02",
    key: "pulping",
    title: "Pulping",
    caption: "Water & agitation",
    headline: "Broken Down to Pulp.",
    body: "In the pulper, water and a rotating agitator break the raw material down into a workable fibre pulp.",
    still: stageStill("pulping", "Agitator arms turning fibre pulp inside a pulper tank"),
  },
  {
    n: "03",
    key: "forming",
    title: "Sheet Formation",
    caption: "Formed & pressed",
    headline: "Fibres Take Shape.",
    body: "The pulp is formed into sheets on the pulp machine, where rollers press out water.",
    still: stageStill("forming", "Pulp sheet machine with operators at work"),
  },
  {
    n: "04",
    key: "drying",
    title: "Drying",
    caption: "Sun-dried in open air",
    headline: "Dried in Open Air.",
    body: "Freshly formed sheets are laid out across the drying yard and dried naturally in the sun.",
    still: stageStill("drying", "Pulp sheets drying in the open yard with stacked bundles"),
  },
  {
    n: "05",
    key: "storage",
    title: "Storage & Dispatch",
    caption: "Stacked, ready to ship",
    headline: "Stacked for Supply.",
    body: "Dried sheets are stacked in the warehouse, ready for dispatch to customers in India and abroad.",
    still: stageStill("storage", "Stacks of finished pulp sheets in the warehouse"),
  },
];
