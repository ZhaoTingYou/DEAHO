const assetPath = "/images/legacy/credibility/no-text-assets";
const motionAssetPath = "/images/legacy/credibility/motion-assets";

export type CredibilitySectionId = "hero" | "years" | "market" | "defect" | "rd" | "integration";

export type CredibilityVisualKind = "hero" | "journey" | "market" | "defect" | "rd" | "integration";

export type CredibilityMetric = {
  label: string;
  suffix?: string;
  target: number;
};

export type CredibilityPoint = {
  icon: string;
  label: string;
  value: string;
};

export type CredibilityHeroPhoto = {
  alt: string;
  className: string;
  src: string;
};

export type CredibilitySection = {
  body: string[];
  eyebrow: string;
  heroPhotos?: CredibilityHeroPhoto[];
  id: CredibilitySectionId;
  index: string;
  metric?: CredibilityMetric;
  points?: CredibilityPoint[];
  subtitle: string;
  tone: "light" | "blue";
  title: string;
  visualKind: CredibilityVisualKind;
};

export const credibilityDecorativePath = `${assetPath}/decorative-elements`;
export const credibilityMotionProductPath = `${motionAssetPath}/products`;

export const credibilitySections: CredibilitySection[] = [
  {
    id: "hero",
    index: "01",
    eyebrow: "DAEHO LEGACY / CREDIBILITY",
    title: "PROVEN\nWITHOUT EXCEPTION",
    subtitle: "38년 동안 단 한 번의 실패 없이 완성된 결과",
    tone: "light",
    visualKind: "hero",
    body: [
      "Credibility is not declared. It is proven through exact delivery, repeatable quality, and the discipline to protect every promise.",
      "DAEHO turns time, process, and responsibility into a standard that champions can trust."
    ],
    heroPhotos: [
      {
        src: `${credibilityMotionProductPath}/hero_supporting_ring_group.png`,
        alt: "Supporting championship ring group on a marble stage",
        className: "is-left"
      },
      {
        src: `${credibilityMotionProductPath}/hero_main_gold_ring.png`,
        alt: "Main gold championship ring on a marble podium",
        className: "is-primary"
      },
      {
        src: `${credibilityMotionProductPath}/hero_ring_collection_on_marble.png`,
        alt: "Championship ring collection displayed on marble blocks",
        className: "is-right"
      }
    ]
  },
  {
    id: "years",
    index: "02",
    eyebrow: "38 YEARS OF LEGACY",
    title: "38 YEARS\nOF TRUST",
    subtitle: "시간이 쌓아 올린 신뢰, 흔들리지 않는 제작 기준",
    tone: "light",
    visualKind: "journey",
    metric: {
      label: "Years of accumulated craftsmanship",
      target: 38
    },
    body: [
      "Since its founding, DAEHO has refined the championship ring experience through long-term partnerships and exacting production standards.",
      "Every project adds another proof point to a legacy built by consistency rather than claims."
    ],
    points: [
      { icon: `${credibilityDecorativePath}/icon_badge.png`, label: "Heritage", value: "Established ring-making discipline" },
      { icon: `${credibilityDecorativePath}/icon_flag.png`, label: "Milestone", value: "Trusted by landmark teams and events" },
      { icon: `${credibilityDecorativePath}/icon_people.png`, label: "Partnership", value: "Long-term customer relationships" }
    ]
  },
  {
    id: "market",
    index: "03",
    eyebrow: "MARKET LEADER",
    title: "THE STANDARD\nOF CHAMPIONS",
    subtitle: "대한민국 챔피언 링 시장을 이끌어온 기준",
    tone: "blue",
    visualKind: "market",
    body: [
      "DAEHO's credibility is visible in the teams, organizations, and moments that continue to choose its rings.",
      "The market follows proof: precise production, stable delivery, and a reputation earned one project at a time."
    ],
    points: [
      { icon: `${credibilityDecorativePath}/icon_growth_badge.png`, label: "Leadership", value: "Category-defining presence" },
      { icon: `${credibilityDecorativePath}/icon_chart.png`, label: "Growth", value: "Sustained demand and recognition" },
      { icon: `${credibilityDecorativePath}/icon_handshake.png`, label: "Trust", value: "Repeat partnerships across sectors" }
    ]
  },
  {
    id: "defect",
    index: "04",
    eyebrow: "DEFECT RATE 0%",
    title: "ZERO\nDELIVERY FAILURE",
    subtitle: "단 한 건의 납품 사고도 허용하지 않는 관리 체계",
    tone: "blue",
    visualKind: "defect",
    metric: {
      label: "Delivery failure rate",
      suffix: "%",
      target: 0
    },
    body: [
      "From schedule control to inspection, packaging, and handoff, each step is managed as part of one accountable system.",
      "The 0% record is the result of disciplined checkpoints, not luck."
    ],
    points: [
      { icon: `${credibilityDecorativePath}/icon_clipboard.png`, label: "Inspection", value: "Multi-step quality verification" },
      { icon: `${credibilityDecorativePath}/icon_box.png`, label: "Packaging", value: "Protected final delivery state" },
      { icon: `${credibilityDecorativePath}/icon_truck.png`, label: "Handoff", value: "Stable schedule and logistics control" }
    ]
  },
  {
    id: "rd",
    index: "05",
    eyebrow: "CONTINUOUS R&D",
    title: "ENGINEERED\nTO EVOLVE",
    subtitle: "멈추지 않는 기술 개발과 정밀한 제작 혁신",
    tone: "light",
    visualKind: "rd",
    body: [
      "DAEHO continues to refine design methods, tooling, material handling, and production workflows through constant research and development.",
      "Innovation stays quiet here: fewer claims, better processes, and a ring that arrives exactly as intended."
    ],
    points: [
      { icon: `${credibilityDecorativePath}/icon_robot_arm.png`, label: "Automation", value: "Precise production support" },
      { icon: `${credibilityDecorativePath}/icon_cube.png`, label: "Prototype", value: "Faster refinement cycles" },
      { icon: `${credibilityDecorativePath}/icon_check_circle.png`, label: "Validation", value: "Standards checked before delivery" }
    ]
  },
  {
    id: "integration",
    index: "06",
    eyebrow: "VERTICAL INTEGRATION 100%",
    title: "MADE\nUNDER ONE STANDARD",
    subtitle: "기획부터 물류까지, 대호가 끝까지 책임지는 전 공정",
    tone: "blue",
    visualKind: "integration",
    metric: {
      label: "Fully integrated production",
      suffix: "%",
      target: 100
    },
    body: [
      "Planning, design, production, quality control, packaging, and logistics operate inside one integrated system.",
      "That vertical structure keeps the promise consistent from the first sketch to the final delivery."
    ],
    points: [
      { icon: `${credibilityDecorativePath}/icon_people.png`, label: "Planning", value: "Aligned with each team story" },
      { icon: `${credibilityDecorativePath}/icon_cube.png`, label: "Production", value: "Controlled in-house process" },
      { icon: `${credibilityDecorativePath}/icon_truck.png`, label: "Delivery", value: "Final handoff under one standard" }
    ]
  }
];
