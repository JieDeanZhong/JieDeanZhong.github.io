import scholarsData from './scholarsData'
import type { ScholarId } from './scholarsData'

export const researchExperiences = [
  {
    id: 'igem-2025',
    title: 'iGEM',
    description: 'Top 10 undergraduate research at iGEM 2025 and subsequent advisory work.',
    italicTitleText: '',
    role: 'Research lead · Advisor',
    supervisors: [
      {
        name: 'Yongtao Zhu',
        degree: 'PhD',
        url: scholarsData['yongtao-zhu'].institutionalProfileUrl,
        scholarId: 'yongtao-zhu',
      },
      {
        name: 'Kevin Chun Chan',
        degree: 'PhD',
        url: scholarsData['kevin-chan'].institutionalProfileUrl,
        scholarId: 'kevin-chan',
      },
    ],
    affiliations: [
      {
        name: 'XJTLU-Science-China',
        url: 'https://2025.igem.wiki/xjtlu-science-china/',
      },
      { name: 'Xi’an Jiaotong-Liverpool University' },
    ],
  },
  {
    id: 'ism',
    title: 'CD8⁺ T Cells & Cancer Immunotherapy',
    description: 'Research internship in cancer immunology.',
    italicTitleText: '',
    role: 'Core contributor',
    supervisors: [
      {
        name: 'Lianjun Zhang',
        degree: 'PhD',
        url: scholarsData['lianjun-zhang'].institutionalProfileUrl,
        scholarId: 'lianjun-zhang',
      },
    ],
    affiliations: [
      { name: 'Suzhou Institute of Systems Medicine', url: 'https://www.ismsz.cn/' },
      { name: 'Chinese Academy of Medical Sciences & Peking Union Medical College' },
    ],
  },
  {
    id: 'f-johnsoniae',
    title: 'Flavobacterium johnsoniae Motility Mechanisms',
    description: 'Bacterial gliding, surface interactions, and microscopy workflows.',
    italicTitleText: 'Flavobacterium johnsoniae',
    role: 'Research lead',
    supervisors: [
      {
        name: 'Yongtao Zhu',
        degree: 'PhD',
        url: scholarsData['yongtao-zhu'].institutionalProfileUrl,
        scholarId: 'yongtao-zhu',
      },
    ],
    affiliations: [{ name: 'Xi’an Jiaotong-Liverpool University' }],
  },
] as const satisfies readonly ResearchExperienceDetails[]

export type ResearchExperience = (typeof researchExperiences)[number]['id']

export const researchTypes = {
  project: 'Research',
  perspective: 'Comment',
  software: 'Development',
  advisory: 'Advisory',
} as const

export type ResearchType = keyof typeof researchTypes

export interface ResearchAffiliation {
  name?: string
  url?: string
}

export interface ResearchLink {
  label: string
  url: string
}

export interface ResearchSupervisor {
  name: string
  degree?: string
  url?: string
  scholarId?: ScholarId
}

export interface ResearchExperienceDetails {
  id: string
  title: string
  description: string
  italicTitleText?: string
  role: string
  supervisors: readonly ResearchSupervisor[]
  affiliations: readonly ResearchAffiliation[]
}

export interface ResearchPhoto {
  src: string
  width: number
  height: number
  alt: string
}

export interface ResearchEntry {
  id: string
  experience: ResearchExperience
  type: ResearchType
  // Editorial prominence is independent of content type.
  level: 'primary' | 'supporting'
  researchTitle?: string
  name: string
  // Detail routes and title links are opt-in; list-only entries leave this unset.
  hasDetailPage?: boolean
  // List-specific presentation leaves existing detail-page titles unchanged.
  listTitle?: string
  italicTitleText?: string
  articleType?: string
  summary?: string
  photo?: ResearchPhoto
  role?: string
  contribution?: string
  relatedResearch?: ResearchLink
  // Actual participation dates, independent of the project's event or cohort year.
  participationPeriod?: string
  // Event/cohort label when exact participation dates have not been recorded.
  eventPeriod?: string
  status?: string
  milestones?: string[]
  publicLinks?: ResearchLink[]
}

// Entries appear in this order within each experience and level, regardless of type.
// Supporting work belongs to the experience, without implying a specific project dependency.
// Add future work to its experience here; the list and detail routes reuse these entries.
// Omit optional fields until content is confirmed.
const researchData: ResearchEntry[] = [
  {
    id: 'trogen',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'project',
    level: 'primary',
    name: 'TroGen',
    listTitle: 'TroGen: A commensal bacterial platform for intracellular drug delivery in TNBC',
    summary:
      'A Top 10 undergraduate project at iGEM 2025. We engineered commensal bacteria and demonstrated their entry into TNBC cells in vitro, laying the groundwork for intracellular drug delivery.',
    role: 'Research lead',
    participationPeriod: 'Feb–Nov 2025',
  },
  {
    id: 'fj-gliding',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'project',
    level: 'primary',
    name: 'FJ Gliding',
    listTitle: 'SprB–polysaccharide interactions in F. johnsoniae',
    italicTitleText: 'F. johnsoniae',
    summary: 'Exploring the molecular basis of surface interactions in a model gliding bacterium.',
    role: 'Research lead',
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'cxcl13-fc',
    hasDetailPage: true,
    experience: 'ism',
    type: 'project',
    level: 'primary',
    name: 'CXCL13–Fc fusion protein',
    listTitle: 'CXCL13–Fc and CXCR5-Engineered CD8⁺ T Cells',
    photo: {
      src: '/static/images/research/cxcl13-fc/ice.webp',
      width: 3761,
      height: 2115,
      alt: 'Laboratory reagent tubes nestled in crushed ice.',
    },
    summary:
      'We are investigating how CXCL13–Fc affects the trafficking and antitumor function of CXCR5-engineered CD8⁺ T cells.',
    role: 'Core contributor',
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'rainbow-trace',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'software',
    level: 'supporting',
    name: 'Rainbow Trace',
    participationPeriod: 'Apr 2026',
    listTitle: 'Rainbow Trace: A Python workflow for bacterial motility visualization',
    summary:
      'A Python workflow adapted from an existing Fiji macro to apply consistent processing parameters across images from the same experiment and reduce repetitive manual processing.',
    contribution: 'Workflow adaptation and Python development',
    relatedResearch: { label: 'FJ Gliding', url: '/research/fj-gliding' },
  },
  {
    id: 'rainbow-tracker',
    hasDetailPage: true,
    experience: 'f-johnsoniae',
    type: 'software',
    level: 'supporting',
    name: 'Rainbow Tracker',
    participationPeriod: 'Jul 2026',
    listTitle: 'Rainbow Tracker: Tracking bacterial identities across microscopy frames',
    summary:
      'An experimental workflow for tracking bacterial identities across frames, with rules for contact, separation, missed detections, boundary crossings, and uncertain observations.',
    contribution: 'Tracking logic design and manual inspection',
    relatedResearch: { label: 'FJ Gliding', url: '/research/fj-gliding' },
  },
  {
    id: 'spotlight',
    hasDetailPage: true,
    experience: 'ism',
    type: 'perspective',
    level: 'primary',
    name: 'Spotlight',
    articleType: 'Spotlight',
    status: 'Submitted',
    participationPeriod: 'Aug–Sep 2026',
  },
  {
    id: 'dogmaos',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'DogmaOS',
    role: 'Advisor',
    eventPeriod: 'iGEM 2026',
  },
  {
    id: 'flame',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'FLAME',
    role: 'Advisor',
    eventPeriod: 'iGEM 2026',
  },
  {
    id: 'b-longum-pancreatic-cancer',
    hasDetailPage: true,
    experience: 'igem-2025',
    type: 'advisory',
    level: 'supporting',
    name: 'Bifidobacterium longum elicits anti-tumor immunity in pancreatic cancer',
    role: 'Advisor',
    eventPeriod: 'iGEM 2026',
  },
]

export const researchDetailEntries = researchData.filter((entry) => entry.hasDetailPage)

export default researchData
