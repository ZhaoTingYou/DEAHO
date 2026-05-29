export type CredibilityScrollSheet =
  | {
      id: string;
      type: "asset";
      title: string;
      label: string;
      dayAsset: string;
      mobileDayAsset?: string;
      mobileNightAsset?: string;
      nightAsset: string;
      sourceAsset: string;
    }
  | {
      id: string;
      type: "metric";
      metric: string;
      label: string;
      support: string;
      accent: "red" | "green";
      visual: "growth-history" | "controlled-process" | "delivery-shield" | "delivery-scale";
    };

export const credibilityScrollSheets: CredibilityScrollSheet[] = [
  {
    id: "proven-without-exception",
    type: "asset",
    title: "PROVEN WITHOUT EXCEPTION",
    label: "SCROLL SHEET 01",
    sourceAsset: "/Users/tingyouzhao/Desktop/戒指/素材/Group 39.png",
    dayAsset: "/images/legacy/credibility/ring-hero-day-layout.png",
    mobileDayAsset: "/images/legacy/credibility/ring-hero-mobile-day.jpg",
    mobileNightAsset: "/images/legacy/credibility/ring-hero-mobile-night.jpg",
    nightAsset: "/images/legacy/credibility/ring-hero-night.png"
  },
  {
    id: "history",
    type: "metric",
    metric: "38",
    label: "38년의 업력",
    support: "오랜 제작 경험으로 축적된 기준",
    accent: "red",
    visual: "growth-history"
  },
  {
    id: "process",
    type: "metric",
    metric: "100%",
    label: "전공정 자체 진행",
    support: "디자인부터 검품과 납품까지 직접 관리",
    accent: "green",
    visual: "controlled-process"
  },
  {
    id: "delivery-safety",
    type: "metric",
    metric: "0%",
    label: "납품사고",
    support: "일정과 품질을 끝까지 확인하는 납품 기준",
    accent: "red",
    visual: "delivery-shield"
  },
  {
    id: "delivery-scale",
    type: "metric",
    metric: "20,000+",
    label: "누적 납품",
    support: "반복된 프로젝트로 검증된 제작과 배송 경험",
    accent: "green",
    visual: "delivery-scale"
  }
];

export const credibilityDetailBlocks = [
  {
    number: "01",
    title: "Controlled Process",
    copy: "디자인, 렌더링, 제작, 검품, 납품까지 주요 공정을 하나의 기준 안에서 관리합니다.",
    image: "/images/project-1.png"
  },
  {
    number: "02",
    title: "Quality Gate",
    copy: "소재, 세공, 각인, 표면 처리, 포장 전 검품까지 결과물의 완성도를 확인합니다.",
    image: "/images/project-2.png"
  },
  {
    number: "03",
    title: "Delivery Discipline",
    copy: "납기와 포장, 전달 확인까지 프로젝트의 마지막 순간을 안정적으로 관리합니다.",
    image: "/images/project-3.png"
  }
];
