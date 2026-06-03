import posterLingLiang from './assets/poster_ling_liang.webp';
import posterKamLai from './assets/poster_kam_lai.webp';

// 兩所幼稚園的報名初始模擬資料 (已移除聯絡電話與報讀意願)
export interface Registration {
  id: string;
  schoolType: 'ling-liang' | 'kam-lai'; // 藍田靈糧幼稚園 或 佛教金麗幼稚園
  studentName: string;
  gender: '男' | '女';
  grade: 'K1' | 'K2' | 'K3';
  email: string;
  parentCount: '1' | '2';
  otherChildrenCount: '0' | '1' | '2';
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
    email: 'chanxiaoming@email.com',
    parentCount: '2',
    otherChildrenCount: '1',
    createdAt: '2026-06-01 10:15'
  },
  {
    id: 'LL-002',
    schoolType: 'ling-liang',
    studentName: '李美美',
    gender: '女',
    grade: 'K2',
    email: 'leemeimei@email.com',
    parentCount: '1',
    otherChildrenCount: '0',
    createdAt: '2026-06-01 14:30'
  },
  {
    id: 'LL-003',
    schoolType: 'ling-liang',
    studentName: '張子軒',
    gender: '男',
    grade: 'K1',
    email: 'cheungtszhin@email.com',
    parentCount: '2',
    otherChildrenCount: '2',
    createdAt: '2026-06-02 09:12'
  },
  {
    id: 'LL-004',
    schoolType: 'ling-liang',
    studentName: '黃雨晴',
    gender: '女',
    grade: 'K3',
    email: 'wongyuqing@email.com',
    parentCount: '1',
    otherChildrenCount: '1',
    createdAt: '2026-06-02 11:45'
  },
  {
    id: 'LL-005',
    schoolType: 'ling-liang',
    studentName: '林宇航',
    gender: '男',
    grade: 'K2',
    email: 'lamyuhang@email.com',
    parentCount: '2',
    otherChildrenCount: '0',
    createdAt: '2026-06-02 16:20'
  },

  // 佛教金麗幼稚園 (kam-lai)
  {
    id: 'KL-001',
    schoolType: 'kam-lai',
    studentName: '劉星宇',
    gender: '男',
    grade: 'K3',
    email: 'lausingyu@email.com',
    parentCount: '2',
    otherChildrenCount: '0',
    createdAt: '2026-06-01 11:05'
  },
  {
    id: 'KL-002',
    schoolType: 'kam-lai',
    studentName: '趙雅琪',
    gender: '女',
    grade: 'K3',
    email: 'chiuyakee@email.com',
    parentCount: '1',
    otherChildrenCount: '1',
    createdAt: '2026-06-01 15:40'
  },
  {
    id: 'KL-003',
    schoolType: 'kam-lai',
    studentName: '周梓謙',
    gender: '男',
    grade: 'K2',
    email: 'choutsbhim@email.com',
    parentCount: '2',
    otherChildrenCount: '2',
    createdAt: '2026-06-02 10:00'
  },
  {
    id: 'KL-004',
    schoolType: 'kam-lai',
    studentName: '吳凱晴',
    gender: '女',
    grade: 'K1',
    email: 'nghoiching@email.com',
    parentCount: '1',
    otherChildrenCount: '0',
    createdAt: '2026-06-02 13:15'
  },
  {
    id: 'KL-005',
    schoolType: 'kam-lai',
    studentName: '梁樂軒',
    gender: '男',
    grade: 'K2',
    email: 'leunglokhin@email.com',
    parentCount: '2',
    otherChildrenCount: '1',
    createdAt: '2026-06-02 17:30'
  }
];

export const SCHOOL_INFO = {
  'ling-liang': {
    title: '藍田靈糧幼稚園',
    logo: 'https://www.lingliang.org.hk/favicon.ico',
    bgGradient: 'from-blue-50 to-sky-100',
    accentColor: 'blue',
    posterUrl: posterLingLiang
  },
  'kam-lai': {
    title: '佛教金麗幼稚園',
    logo: 'https://www.kamlai.edu.hk/favicon.ico',
    bgGradient: 'from-orange-50 to-amber-100',
    accentColor: 'amber',
    posterUrl: posterKamLai
  }
};
