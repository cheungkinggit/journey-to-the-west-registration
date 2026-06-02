// 兩所幼稚園的報名初始模擬資料
export interface Registration {
  id: string;
  schoolType: 'ling-liang' | 'kam-lai'; // 藍田靈糧幼稚園 或 佛教金麗幼稚園
  studentName: string;
  gender: '男' | '女';
  grade: 'K1' | 'K2' | 'K3';
  phone: string;
  email: string;
  parentCount: '1' | '2';
  otherChildrenCount: '0' | '1' | '2';
  willEnroll: '很有意願，本校是首選之一' | '正在考慮中，希望透過活動加深了解' | '純粹參與活動，暫未有定案';
  createdAt: string;
}

export const INITIAL_REGISTRATIONS: Registration[] = [
  // 藍田靈糧幼稚園 (ling-liang)
  {
    id: 'LL-001',
    schoolType: 'ling-liang',
    studentName: '陳小明',
    gender: '男',
    grade: 'K3',
    phone: '98765432',
    email: 'chanxiaoming@email.com',
    parentCount: '2',
    otherChildrenCount: '1',
    willEnroll: '很有意願，本校是首選之一',
    createdAt: '2026-06-01 10:15'
  },
  {
    id: 'LL-002',
    schoolType: 'ling-liang',
    studentName: '李美美',
    gender: '女',
    grade: 'K2',
    phone: '91234567',
    email: 'leemeimei@email.com',
    parentCount: '1',
    otherChildrenCount: '0',
    willEnroll: '正在考慮中，希望透過活動加深了解',
    createdAt: '2026-06-01 14:30'
  },
  {
    id: 'LL-003',
    schoolType: 'ling-liang',
    studentName: '張子軒',
    gender: '男',
    grade: 'K1',
    phone: '93456789',
    email: 'cheungtszhin@email.com',
    parentCount: '2',
    otherChildrenCount: '2',
    willEnroll: '純粹參與活動，暫未有定案',
    createdAt: '2026-06-02 09:12'
  },
  {
    id: 'LL-004',
    schoolType: 'ling-liang',
    studentName: '黃雨晴',
    gender: '女',
    grade: 'K3',
    phone: '95678901',
    email: 'wongyuqing@email.com',
    parentCount: '1',
    otherChildrenCount: '1',
    willEnroll: '很有意願，本校是首選之一',
    createdAt: '2026-06-02 11:45'
  },
  {
    id: 'LL-005',
    schoolType: 'ling-liang',
    studentName: '林宇航',
    gender: '男',
    grade: 'K2',
    phone: '97890123',
    email: 'lamyuhang@email.com',
    parentCount: '2',
    otherChildrenCount: '0',
    willEnroll: '正在考慮中，希望透過活動加深了解',
    createdAt: '2026-06-02 16:20'
  },

  // 佛教金麗幼稚園 (kam-lai)
  {
    id: 'KL-001',
    schoolType: 'kam-lai',
    studentName: '劉星宇',
    gender: '男',
    grade: 'K3',
    phone: '61234567',
    email: 'lausingyu@email.com',
    parentCount: '2',
    otherChildrenCount: '0',
    willEnroll: '很有意願，本校是首選之一',
    createdAt: '2026-06-01 11:05'
  },
  {
    id: 'KL-002',
    schoolType: 'kam-lai',
    studentName: '趙雅琪',
    gender: '女',
    grade: 'K3',
    phone: '62345678',
    email: 'chiuyakee@email.com',
    parentCount: '1',
    otherChildrenCount: '1',
    willEnroll: '正在考慮中，希望透過活動加深了解',
    createdAt: '2026-06-01 15:40'
  },
  {
    id: 'KL-003',
    schoolType: 'kam-lai',
    studentName: '周梓謙',
    gender: '男',
    grade: 'K2',
    phone: '63456789',
    email: 'choutsbhim@email.com',
    parentCount: '2',
    otherChildrenCount: '2',
    willEnroll: '純粹參與活動，暫未有定案',
    createdAt: '2026-06-02 10:00'
  },
  {
    id: 'KL-004',
    schoolType: 'kam-lai',
    studentName: '吳凱晴',
    gender: '女',
    grade: 'K1',
    phone: '64567890',
    email: 'nghoiching@email.com',
    parentCount: '1',
    otherChildrenCount: '0',
    willEnroll: '正在考慮中，希望透過活動加深了解',
    createdAt: '2026-06-02 13:15'
  },
  {
    id: 'KL-005',
    schoolType: 'kam-lai',
    studentName: '梁樂軒',
    gender: '男',
    grade: 'K2',
    phone: '65678901',
    email: 'leunglokhin@email.com',
    parentCount: '2',
    otherChildrenCount: '1',
    willEnroll: '很有意願，本校是首選之一',
    createdAt: '2026-06-02 17:30'
  }
];

export const SCHOOL_INFO = {
  'ling-liang': {
    title: '藍田靈糧幼稚園',
    logo: 'https://www.lingliang.org.hk/favicon.ico', // Placeholder
    bgGradient: 'from-blue-50 to-sky-100',
    accentColor: 'blue',
    posterUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/poster_ling_liang-1_b81cf4e6.png'
  },
  'kam-lai': {
    title: '佛教金麗幼稚園',
    logo: 'https://www.kamlai.edu.hk/favicon.ico', // Placeholder
    bgGradient: 'from-orange-50 to-amber-100',
    accentColor: 'amber',
    posterUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663574972046/Vcs8rxDnLfAzocfvm4iNsq/poster_kam_lai-1_ef286318.png'
  }
};
