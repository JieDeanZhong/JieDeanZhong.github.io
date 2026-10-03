interface TrogenSection {
  id: string
  title: string
  subtitle?: string
  body: string
  links?: { label: string; url: string }[]
}

const wiki = 'https://2025.igem.wiki/xjtlu-science-china/'

const trogenData = {
  title: 'TroGen: A commensal bacterial platform for intracellular drug delivery in TNBC',
  summary:
    'A Top 10 undergraduate project at iGEM 2025. We engineered commensal bacteria and demonstrated their entry into TNBC cells in vitro, laying the groundwork for intracellular drug delivery.',
  photo: {
    src: '/static/images/research/trogen/gemy_edited.png',
    width: 2827,
    height: 1590,
    alt: 'A bright green mascot among a crowd at an iGEM event.',
  },
  role: 'Research lead',
  pis: [
    {
      name: 'Yongtao Zhu, PhD',
      url: 'https://connect.xjtlu.edu.cn/user/zhulab',
    },
    { name: 'Kevin C. Chan, PhD' },
  ],
  context: [
    { name: 'iGEM 2025' },
    { name: 'XJTLU-Science-China', url: wiki },
    { name: 'Xi’an Jiaotong-Liverpool University' },
  ],
  participationPeriod: 'Feb–Nov 2025',
  wiki,
  sections: [
    {
      id: 'research-question',
      title: 'Research question & approach',
      body: 'The project explored whether commensal bacteria could serve as carriers for intracellular drug delivery in triple-negative breast cancer (TNBC). The initial focus was on establishing bacterial entry into tumor cells as a prerequisite for subsequent delivery studies.',
    },
    {
      id: 'my-contribution',
      title: 'My contribution',
      body: 'I led the research design and experimental progression of TroGen, working with the team to develop and evaluate the project’s core approach.',
    },
    {
      id: 'selected-results',
      title: 'Selected results',
      subtitle: 'Cell entry in vitro',
      body: 'In vitro experiments demonstrated entry of engineered commensal bacteria into TNBC cells. These findings support an early proof of concept for the cell-entry stage of the proposed platform.',
      links: [{ label: 'View experimental results', url: `${wiki}result/` }],
    },
    {
      id: 'research-decisions',
      title: 'Research decisions & limitations',
      body: 'The current findings support bacterial entry into TNBC cells. They do not yet establish successful therapeutic cargo delivery or antitumor efficacy, which require further validation.',
    },
    {
      id: 'team-resources',
      title: 'Team & resources',
      body: 'TroGen was developed by the XJTLU-Science-China team for iGEM 2025.',
      links: [
        { label: 'Project wiki', url: wiki },
        { label: 'Experimental results', url: `${wiki}result/` },
        { label: 'Engineering cycle', url: `${wiki}engineering/` },
      ],
    },
  ] satisfies TrogenSection[],
}

// Add the project schematic, selected experimental images, and confirmed research decisions later.
export default trogenData
