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
  metadata: {
    applicationUrl: string;
  };
}

export interface SearchPolicyCard {
  id: number;
  policyName: string;
  policySummary: string;
  category: string;
  dday: string;
}
export interface DetailPolicyProps {
  policyNo: string;
  policyName: string;
  policySummary: string;
  policyField: string;
  supportContent: string;
  operationPeriod: string;
  applicationPeriod: string;
  supportScale: string;
  minAge: number;
  maxAge: number;
  incomeCondition: string;
  educationRequirement: string;
  majorRequirement: string;
  employmentStatus: string;
  specializedField: string;
  additionalInfo: string;
  participationRestriction: string;
  applicationProcess: string;
  evaluationAndAnnouncement: string;
  applicationSite: string;
  requiredDocuments: string;
  viewCount: number;
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
