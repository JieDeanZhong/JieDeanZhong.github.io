interface FjSection {
  id: string
  title: string
  body?: string
  placeholder: string
}

const fjData = {
  title: 'SprB–polysaccharide interactions in Flavobacterium johnsoniae',
  titlePrefix: 'SprB–polysaccharide interactions in',
  species: 'Flavobacterium johnsoniae',
  summary: 'Exploring the molecular basis of surface interactions in a model gliding bacterium.',
  photo: {
    src: '/static/images/research/fj-gliding/colony_16_9.png',
    width: 1024,
    height: 576,
    alt: 'Microscopy image of a colony edge for the FJ gliding project.',
  },
  role: 'Research lead',
  pi: {
    name: 'Yongtao Zhu, PhD',
    url: 'https://scholar.xjtlu.edu.cn/en/persons/YongtaoZhu/',
  },
  institution: 'Xi’an Jiaotong-Liverpool University',
  participationPeriod: 'Jan 2026–Present',
  sections: [
    {
      id: 'research-question',
      title: 'Research question & approach',
      placeholder: 'Detailed research question and approach to be added.',
    },
    {
      id: 'my-contribution',
      title: 'My contribution',
      placeholder: 'Individual contributions to be added.',
    },
    {
      id: 'selected-results',
      title: 'Selected results',
      placeholder: 'Selected results and experimental figures to be added.',
    },
    {
      id: 'research-decisions',
      title: 'Research decisions & limitations',
      placeholder: 'Research decisions and limitations to be added.',
    },
    {
      id: 'team-resources',
      title: 'Team & resources',
      placeholder: 'Team details and project resources to be added.',
    },
  ] as FjSection[],
}

// Replace the short placeholders with confirmed content and selected figures as they become available.
export default fjData
