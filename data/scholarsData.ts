export type ScholarId = 'lianjun-zhang' | 'yongtao-zhu' | 'kevin-chan'

export interface ScholarProfile {
  id: ScholarId
  name: string
  degree: string
  title: string
  institutions: string[]
  emails: string[]
  googleScholarUrl: string
  institutionalProfileUrl: string
  card: {
    background: string
    foreground: string
    institution: string
  }
  photo?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

const scholarsData: Record<ScholarId, ScholarProfile> = {
  'lianjun-zhang': {
    id: 'lianjun-zhang',
    name: 'Lianjun Zhang',
    degree: 'PhD',
    title: 'Research Professor',
    institutions: [
      'Suzhou Institute of Systems Medicine',
      'Chinese Academy of Medical Sciences & Peking Union Medical College',
    ],
    emails: ['zlj@ism.cams.cn', 'zhanglj@ism.pumc.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=LioEwqwAAAAJ',
    institutionalProfileUrl: 'https://www.ismsz.cn/Web/KXYJKYTDPage?Id=20&PageId=292',
    card: {
      background: '#5e5e60',
      foreground: '#ffffff',
      institution: 'Suzhou Institute of Systems Medicine, CAMS & PUMC',
    },
    photo: {
      src: '/static/images/people/lianjun-zhang-cutout.webp',
      alt: 'Portrait of Lianjun Zhang',
      width: 1600,
      height: 2172,
    },
  },
  'yongtao-zhu': {
    id: 'yongtao-zhu',
    name: 'Yongtao Zhu',
    degree: 'PhD',
    title: 'Associate Professor',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['Yongtao.Zhu@xjtlu.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=9r8TXE8AAAAJ',
    institutionalProfileUrl: 'https://scholar.xjtlu.edu.cn/en/persons/YongtaoZhu/',
    card: {
      background: '#bbbcbd',
      foreground: '#111111',
      institution: 'Xi’an Jiaotong-Liverpool University',
    },
    photo: {
      src: '/static/images/people/yongtao-zhu-cutout.webp',
      alt: 'Portrait of Yongtao Zhu',
      width: 1000,
      height: 1075,
    },
  },
  'kevin-chan': {
    id: 'kevin-chan',
    name: 'Kevin Chun Chan',
    degree: 'PhD',
    title: 'Assistant Professor',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['Chun.Chan@xjtlu.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=rSZrshkAAAAJ',
    institutionalProfileUrl: 'https://scholar.xjtlu.edu.cn/en/persons/ChunChan/',
    card: {
      background: '#a4a6a9',
      foreground: '#111111',
      institution: 'Xi’an Jiaotong-Liverpool University',
    },
    photo: {
      src: '/static/images/people/kevin-chan-cutout.webp',
      alt: 'Portrait of Kevin Chun Chan',
      width: 1521,
      height: 1863,
    },
  },
}

export default scholarsData
