export interface PolicyCard {
  id: number;
  title: string;
  category: string;
  target: string;
  deadline: string;
  description: string;
  district: string;
  isHot?: boolean;
  isRecruiting?: boolean;
  image?: string;
}

export interface DistrictPolicies {
  [district: string]: PolicyCard[];
}

export type DistrictName =
  | 'Dobong-gu'
  | 'Dongdaemun-gu'
  | 'Dongjak-gu'
  | 'Eunpyeong-gu'
  | 'Gangbuk-gu'
  | 'Gangdong-gu'
  | 'Gangnam-gu'
  | 'Gangseo-gu'
  | 'Geumcheon-gu'
  | 'Guro-gu'
  | 'Gwanak-gu'
  | 'Gwangjin-gu'
  | 'Jongno-gu'
  | 'Jung-gu'
  | 'Jungnang-gu'
  | 'Mapo-gu'
  | 'Nowon-gu'
  | 'Seocho-gu'
  | 'Seodaemun-gu'
  | 'Seongbuk-gu'
  | 'Seongdong-gu'
  | 'Songpa-gu'
  | 'Yangcheon-gu'
  | 'Yeongdeungpo-gu'
  | 'Yongsan-gu';
