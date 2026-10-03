export type ScholarId = 'lianjun-zhang' | 'yongtao-zhu' | 'kevin-chan'

export interface ScholarProfile {
  id: ScholarId
  name: string
  degree: string
  institutions: string[]
  emails: string[]
  googleScholarUrl: string
  institutionalProfileUrl: string
  photo?: {
    src: string
    alt: string
    objectPosition?: string
  }
}

const scholarsData: Record<ScholarId, ScholarProfile> = {
  'lianjun-zhang': {
    id: 'lianjun-zhang',
    name: 'Lianjun Zhang',
    degree: 'PhD',
    institutions: [
      'Suzhou Institute of Systems Medicine',
      'Chinese Academy of Medical Sciences & Peking Union Medical College',
    ],
    emails: ['zlj@ism.cams.cn', 'zhanglj@ism.pumc.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=LioEwqwAAAAJ',
    institutionalProfileUrl: 'https://www.ismsz.cn/Web/KXYJKYTDPage?Id=20&PageId=292',
    photo: {
      src: '/static/images/people/lianjun-zhang.png',
      alt: 'Portrait of Lianjun Zhang',
      objectPosition: '50% 40%',
    },
  },
  'yongtao-zhu': {
    id: 'yongtao-zhu',
    name: 'Yongtao Zhu',
    degree: 'PhD',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['Yongtao.Zhu@xjtlu.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=9r8TXE8AAAAJ',
    institutionalProfileUrl: 'https://scholar.xjtlu.edu.cn/en/persons/YongtaoZhu/',
    photo: {
      src: '/static/images/people/yongtao-zhu.png',
      alt: 'Portrait of Yongtao Zhu',
      objectPosition: '50% 40%',
    },
  },
  'kevin-chan': {
    id: 'kevin-chan',
    name: 'Kevin Chun Chan',
    degree: 'PhD',
    institutions: ['Xi’an Jiaotong-Liverpool University'],
    emails: ['Chun.Chan@xjtlu.edu.cn'],
    googleScholarUrl: 'https://scholar.google.com/citations?hl=en&user=rSZrshkAAAAJ',
    institutionalProfileUrl: 'https://scholar.xjtlu.edu.cn/en/persons/ChunChan/',
    photo: {
      src: '/static/images/people/kevin-chan.png',
      alt: 'Portrait of Kevin Chun Chan',
    },
  },
}

export default scholarsData
