import scholarsData from './scholarsData'
import type { ScholarId } from './scholarsData'

export const researchSections = [
  { id: 'research-projects', title: 'Research Projects' },
  { id: 'perspectives', title: 'Perspectives' },
  { id: 'research-software', title: 'Research Software' },
  { id: 'advisory', title: 'Advisory' },
] as const

export type ResearchSection = (typeof researchSections)[number]['id']

export interface ResearchAffiliation {
  name?: string
  url?: string
}

export interface ResearchLink {
  label: string
  url: string
}

export interface ResearchPI {
  name: string
  degree?: string
  url?: string
  scholarId?: ScholarId
}

export interface ResearchEntry {
  id: string
  section: ResearchSection
  researchTitle?: string
  name: string
  // Detail routes and title links are opt-in; list-only entries leave this unset.
  hasDetailPage?: boolean
  // List-specific presentation leaves existing detail-page titles unchanged.
  listTitle?: string
  italicTitleText?: string
  articleType?: string
  summary?: string
  role?: string
  contribution?: string
  relatedResearch?: ResearchLink
  pi?: ResearchPI | ResearchPI[]
  // Each item is one logical line; grouped items share a line with middle-dot separators.
  affiliations?: (ResearchAffiliation | ResearchAffiliation[])[]
  // Actual participation dates, independent of the project's event or cohort year.
  participationPeriod?: string
  background?: string
  status?: string
  milestones?: string[]
  publicLinks?: ResearchLink[]
}

// Entries appear in this order within each section. Omit fields until content is confirmed.
const researchData: ResearchEntry[] = [
  {
    id: 'trogen',
    hasDetailPage: true,
    section: 'research-projects',
    name: 'TroGen',
    listTitle: 'TroGen: A commensal bacterial platform for intracellular drug delivery in TNBC',
    summary:
      'A Top 10 undergraduate project at iGEM 2025. We engineered commensal bacteria and demonstrated their entry into TNBC cells in vitro, laying the groundwork for intracellular drug delivery.',
    role: 'Research lead',
    pi: [
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
      [
        { name: 'iGEM 2025' },
        {
          name: 'XJTLU-Science-China',
          url: 'https://2025.igem.wiki/xjtlu-science-china/',
        },
        { name: 'Xi’an Jiaotong-Liverpool University' },
      ],
    ],
    participationPeriod: 'Feb–Nov 2025',
  },
  {
    id: 'fj-gliding',
    hasDetailPage: true,
    section: 'research-projects',
    name: 'FJ Gliding',
    listTitle: 'SprB–polysaccharide interactions in Flavobacterium johnsoniae',
    italicTitleText: 'Flavobacterium johnsoniae',
    summary: 'Exploring the molecular basis of surface interactions in a model gliding bacterium.',
    role: 'Research lead',
    pi: {
      name: 'Yongtao Zhu',
      degree: 'PhD',
      url: scholarsData['yongtao-zhu'].institutionalProfileUrl,
      scholarId: 'yongtao-zhu',
    },
    affiliations: [{ name: 'Xi’an Jiaotong-Liverpool University' }],
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'cxcl13-fc',
    hasDetailPage: true,
    section: 'research-projects',
    name: 'CXCL13–Fc fusion protein',
    listTitle: 'CXCL13–Fc and CXCR5-Engineered CD8⁺ T Cells',
    summary:
      'We are investigating how CXCL13–Fc affects the trafficking and antitumor function of CXCR5-engineered CD8⁺ T cells.',
    role: 'Core contributor',
    pi: {
      name: 'Lianjun Zhang',
      degree: 'PhD',
      url: scholarsData['lianjun-zhang'].institutionalProfileUrl,
      scholarId: 'lianjun-zhang',
    },
    affiliations: [
      { name: 'Suzhou Institute of Systems Medicine', url: 'https://www.ismsz.cn/' },
      { name: 'Chinese Academy of Medical Sciences & Peking Union Medical College' },
    ],
    participationPeriod: 'Jan 2026–Present',
    status: 'Ongoing',
  },
  {
    id: 'rainbow-trace',
    hasDetailPage: true,
    section: 'research-software',
    name: 'Rainbow Trace',
    listTitle: 'Rainbow Trace: A Python workflow for bacterial motility visualization',
    summary:
      'A Python workflow adapted from an existing Fiji macro to apply consistent processing parameters across images from the same experiment and reduce repetitive manual processing.',
    contribution: 'Workflow adaptation and Python development',
    relatedResearch: { label: 'FJ Gliding', url: '/research/fj-gliding' },
  },
  {
    id: 'rainbow-tracker',
    hasDetailPage: true,
    section: 'research-software',
    name: 'Rainbow Tracker',
    listTitle: 'Rainbow Tracker: Tracking bacterial identities across microscopy frames',
    summary:
      'An experimental workflow for tracking bacterial identities across frames, with rules for contact, separation, missed detections, boundary crossings, and uncertain observations.',
    contribution: 'Tracking logic design and manual inspection',
    relatedResearch: { label: 'FJ Gliding', url: '/research/fj-gliding' },
  },
  {
    id: 'spotlight',
    hasDetailPage: true,
    section: 'perspectives',
    name: 'Spotlight',
    articleType: 'Spotlight',
    status: 'Submitted',
    pi: {
      name: 'Lianjun Zhang',
      degree: 'PhD',
      url: scholarsData['lianjun-zhang'].institutionalProfileUrl,
      scholarId: 'lianjun-zhang',
    },
    affiliations: [
      { name: 'Suzhou Institute of Systems Medicine', url: 'https://www.ismsz.cn/' },
      { name: 'Chinese Academy of Medical Sciences & Peking Union Medical College' },
    ],
    participationPeriod: 'Aug–Sep 2026',
  },
  {
    id: 'dogmaos',
    hasDetailPage: true,
    section: 'advisory',
    name: 'DogmaOS',
    role: 'Advisor',
    background: 'iGEM 2026',
  },
  {
    id: 'flame',
    hasDetailPage: true,
    section: 'advisory',
    name: 'FLAME',
    role: 'Advisor',
    background: 'iGEM 2026',
  },
  {
    id: 'b-longum-pancreatic-cancer',
    hasDetailPage: true,
    section: 'advisory',
    name: 'Bifidobacterium longum elicits anti-tumor immunity in pancreatic cancer',
    role: 'Advisor',
    background: 'iGEM 2026',
  },
]

export const researchDetailEntries = researchData.filter((entry) => entry.hasDetailPage)

export default researchData
