// Same client logos and order as the home page carousel (HomePagePartners in NewTeamIntWebPage).
// Files are served from the main site's asset storage.
const ASSETS = 'https://teamsitestorage.blob.core.windows.net/assets/home/partners';

export type ClientLogo = { id: string; src: string; alt: string; width: number; height: number };

export const clientLogos: ClientLogo[] = [
  { id: 'arrive-logistics', src: `${ASSETS}/home-partner-arrive-logistics.webp`, alt: 'Arrive Logistics logo', width: 160, height: 23 },
  { id: 'brite-core', src: `${ASSETS}/home-partner-brite-core.webp`, alt: 'Brite Core logo', width: 160, height: 28 },
  { id: 'conoco-phillips', src: `${ASSETS}/home-partner-conoco-phillips.webp`, alt: 'Conoco Phillips logo', width: 160, height: 38 },
  { id: 'cox', src: `${ASSETS}/home-partner-cox.webp`, alt: 'Cox logo', width: 100, height: 25 },
  { id: 'coyote-logistics', src: `${ASSETS}/home-partner-coyote-logistics.webp`, alt: 'Coyote Logistics logo', width: 150, height: 27 },
  { id: 'experian', src: `${ASSETS}/home-partner-experian.webp`, alt: 'Experian logo', width: 160, height: 40 },
  { id: 'hibbett-sports', src: `${ASSETS}/home-partner-hibbett-sports.webp`, alt: 'Hibbett Sports logo', width: 129, height: 18 },
  { id: 'indigo', src: `${ASSETS}/home-partner-indigo.webp`, alt: 'Indigo logo', width: 150, height: 35 },
  { id: 'kelly-services', src: `${ASSETS}/home-partner-kelly-services.webp`, alt: 'Kelly Services logo', width: 128, height: 18 },
  { id: 'lufthansa', src: `${ASSETS}/home-partner-lufthansa.webp`, alt: 'Lufthansa logo', width: 160, height: 40 },
  { id: 'nomo', src: `${ASSETS}/home-partner-nomo.webp`, alt: 'Nomo logo', width: 140, height: 25 },
  { id: 'shiji', src: `${ASSETS}/home-partner-shiji.webp`, alt: 'Shiji logo', width: 120, height: 20 },
  { id: 'swiss-re', src: `${ASSETS}/home-partner-swiss-re.webp`, alt: 'Swiss Re logo', width: 160, height: 40 },
  { id: 'telenor', src: `${ASSETS}/home-partner-telenor.webp`, alt: 'Telenor logo', width: 169, height: 72 },
  { id: 'zilliant', src: `${ASSETS}/home-partner-zilliant.webp`, alt: 'Zilliant logo', width: 150, height: 25 },
  { id: 'digital-oil-gas', src: `${ASSETS}/home-partner-dogs.webp`, alt: 'Digital Oil & Gas logo', width: 129, height: 18 },
  { id: 'trellix', src: `${ASSETS}/home-partner-trellix.webp`, alt: 'Trellix logo', width: 129, height: 18 },
];
