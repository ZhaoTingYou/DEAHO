# 05_tech.md — 前端设计与实现计划

## 当前阶段结论

当前阶段暂时不考虑后端、数据库、API 和后台管理，只聚焦 DAEHO 官网前端设计与页面体验。

推荐前端方向：

- React 体系。
- 推荐使用 Next.js + TypeScript。
- 样式使用 Tailwind CSS，必要时配合 CSS Modules。
- 动效使用 GSAP ScrollTrigger、Framer Motion、Lenis。
- 内容先使用本地 mock data / 静态数据文件管理。
- 图片、视频、poster 先放在 `public/` 目录中。

说明：Next.js 本质上是 React 框架。它适合官网前端设计阶段，因为页面结构清晰、组件化方便、后续也可以自然扩展 SEO、多语言和内容接入。当前不用考虑它如何连接后端。

---

## 前端设计目标

DAEHO 官网不是普通模板站、商城站、SaaS 落地页或新闻博客。

前端设计必须优先还原当前设计图中的：

- 页面气质。
- 版式比例。
- 图片层级。
- 滚动节奏。
- 品牌氛围。
- 产品材质细节。
- 高级、克制、电影感的视觉体验。

当前前端工作重点不是“功能多”，而是先把品牌第一印象、页面结构和动效节奏做准。

---

## 前端技术栈

### 推荐

- React
- Next.js
- TypeScript
- Tailwind CSS
- GSAP ScrollTrigger
- Framer Motion
- Lenis Smooth Scroll

### 可选

- CSS Modules：用于复杂局部样式。
- Zustand：如果后续需要轻量全局状态，例如菜单、语言、当前 section。
- React Hook Form：如果后续需要询盘表单前端验证。

### 暂不考虑

- Spring Boot API 接入。
- MySQL 数据结构。
- 管理后台。
- 登录系统。
- 文件上传系统。
- 真实 CMS。

这些内容等前端视觉和页面结构稳定后再规划。

---

## 页面路由结构

建议前端先按完整路由设计页面，即使部分页面初期只是视觉占位。

```text
/
/chronicle
/legacy
/legacy/loyalty
/legacy/credibility
/legacy/achievement
/specialty
/specialty/technique
/specialty/collection
/news
/news/[slug]
/golf
```

开发初期如果想控制范围，可以先把 LEGACY 子 category 做成 `/legacy` 页面内的 anchor section：

```text
/legacy#loyalty
/legacy#credibility
/legacy#achievement
```

但是组件结构要保留后续扩展为独立页面的能力。

SPECIALTY 的 technique 与 collection 建议一开始就做成独立子路由，因为两者页面视觉和内容差异较大。

---

## 推荐前端目录结构

```text
frontend/
  app/
    layout.tsx
    page.tsx
    chronicle/page.tsx
    legacy/page.tsx
    legacy/loyalty/page.tsx
    legacy/credibility/page.tsx
    legacy/achievement/page.tsx
    specialty/page.tsx
    specialty/technique/page.tsx
    specialty/collection/page.tsx
    news/page.tsx
    news/[slug]/page.tsx
    golf/page.tsx

  components/
    layout/
      SiteHeader.tsx
      Footer.tsx
    common/
      CtaButton.tsx
      PlayButton.tsx
      ScrollIndicator.tsx
      SectionLabel.tsx
      ImageReveal.tsx
      VideoPoster.tsx
    sections/
      home/
        HomeOpeningIntro.tsx
        HomeHero.tsx
        HomeFeaturedCategories.tsx
        HomeProofBento.tsx
        HomeRecentProjects.tsx
      chronicle/
      legacy/
      specialty/
      news/
      golf/

  data/
    navigation.ts
    home.ts
    chronicle.ts
    legacy.ts
    specialty.ts
    news.ts
    golf.ts

  lib/
    motion.ts
    lenis.ts
    seo.ts
    utils.ts

  styles/
    globals.css

  public/
    images/
    videos/
```

---

## 页面设计优先级

### 1. HOME

HOME 是最重要的第一印象页面，优先级最高。

需要先完成：

- Opening Intro。
- Hero。
- Hero 顶部栏。
- Hero 背景 poster / 视频占位。
- Featured Categories。
- Legacy / Proof Bento。
- Recent Projects。

HOME 的目标是让用户第一眼感受到 DAEHO 是高端、冠军、定制、工艺和可信赖的品牌。

### 2. 全站 Header / Mobile Menu

Header 会定义全站气质，必须使用同一套固定组件维护。

当前实现：

- `frontend/components/layout/SiteHeader.tsx`
- `frontend/components/layout/ThemeProvider.tsx`
- Home、`/chronicle` 与 `/legacy/credibility` 已复用同一个顶部栏组件。
- 页面只负责传入当前主分类和当前二级分支；LEGACY 与 SPECIALTY 分支都从 `branchNavigation` 渲染。
- 白天 / 黑夜模式由 `ThemeProvider` 全局维护，并持久化到 `localStorage` / cookie。
- 用户选择白天模式后，跨页面跳转必须一直保持白天模式；选择黑夜模式后同理。
- Header 的滚动显隐也由 `SiteHeader` 统一维护：向下滚动时通过向上滑出、淡出、轻微虚化隐藏，向上滚动时按同一套 motion 返回。
- Home 可以在 opening 结束前暂时禁用滚动显隐，但 opening 结束后必须和其他页面行为一致。

需要支持：

- Desktop 主导航。
- Mobile 底部或浮层菜单。
- LEGACY / SPECIALTY 二级导航。
- Mobile MENU 里二级导航必须嵌在对应主 category 下方，字体规则与移动端主菜单一致，只用缩进和细线表达层级。
- 当前页面 active 状态。
- hover mask 状态。
- language globe icon。
- Home 风格顶部栏作为全站统一样式。

### 3. LEGACY

LEGACY 是信任资产页面。

前端重点：

- 浅色 Hero。
- 深色横向数据 panel。
- loyalty / credibility / achievement 三个内容方向。
- 38 年、100%、0%、20,000+、5,000+ 等数据视觉。

### 4. SPECIALTY / technique

Technique 是工艺过程页面。

前端重点：

- 时间线。
- 工艺步骤。
- 图片与文字错位排版。
- 冷静、专业、精密的视觉气质。

### 5. SPECIALTY / collection

Collection 是代表项目和产品成果展示。

前端重点：

- 大产品图。
- 项目卡片。
- 细节图、播放按钮、底部价值 icon。
- 不做成普通商品列表。

### 6. GOLF

GOLF 是独立产品线，当前已完成前端页面 `/golf`。

前端重点：

- 顶部栏复用 `SiteHeader`，activeSection 为 `GOLF`。
- 页面实现文件：`frontend/components/golf/GolfPage.tsx`。
- 数据文件：`frontend/data/golf.ts`。
- Golf bracelet 主视觉和 campaign section。
- 4 个 detail cards：BALL TEXTURE / CLUB FACE / PRECISE LINE / PERFECT CURVE。
- shaft color 展示，包含 BLACK / WHITE / BURGUNDY / NAVY 四个可点击色卡。
- crafted to last、statement、packaging 三段产品叙事。
- Day mode 使用浅色冰蓝 golf campaign；Night mode 使用深色产品 campaign。
- Mobile 改为单列叙事，并保持全站 mobile menu。
- 运动精品感。

### 7. NEWS

NEWS 当前已完成前端列表页 `/news` 和文章详情页 `/news/[slug]`。

前端重点：

- editorial magazine 版式。
- 文章卡片。
- featured story。
- 点击 featured、文章图片、文章标题或 Read more 进入对应详情页。
- 详情页包含 hero 大图、article notes、正文段落、quote 和 related stories。
- 不做普通博客模板。
- 顶部栏复用 `SiteHeader`，activeSection 为 `NEWS`。
- 数据使用 `frontend/data/news.ts` 管理。
- 详情页静态路径由 `frontend/app/news/[slug]/page.tsx` 根据 `featuredNews + newsArticles` 生成。
- 分类筛选包含 `ALL / BRAND / CRAFTSMANSHIP / EVENTS / PROJECTS`。
- 排序支持 `Latest / Oldest` 切换。
- Day mode 使用 Home day 的冷白 / 浅蓝 / 品牌蓝。
- Night mode 使用深色档案感 / muted gold。
- Mobile 改成单列卡片，并保持全站 mobile menu。

### 8. CHRONICLE

详细页面规格见：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/10_chronicle.md`。

CHRONICLE 已按 `/Users/tingyouzhao/Desktop/deaho官网/CHRONICLE案例` 的横向时间线方向实现基础页面。

前端重点：

- 历史时间线。
- 年份节点。
- 旧照片 / 图纸 / 档案感。
- 不做普通公司简介。
- Opening 使用独立的 logo ring + DAEHO 动画，退出时通过 blur + opacity 交叉溶解显示页面内容。
- Desktop 使用 pinned horizontal timeline，滚动驱动 `.chronicle-track` 横向移动。
- 年份导航必须固定在卷轴 stage 外层，不能放进带 transform / filter 的父级中。
- 当前 4 个板块对应 4 个年份节点：`1994 / 2001 / 2012 / 2026`。
- Day mode 使用 Home day 的冷白、浅蓝和品牌蓝；Night mode 使用深色档案室与 muted gold。
- Mobile 改为纵向滚动板块，保留固定年份导航和底部进度线。

---

## Navigation Data

主导航和子导航先用本地结构化数据管理：

```ts
export const navigation = [
  { label: "HOME", href: "/" },
  { label: "CHRONICLE", href: "/chronicle" },
  {
    label: "LEGACY",
    href: "/legacy",
    children: [
      { label: "loyalty", href: "/legacy/loyalty" },
      { label: "credibility", href: "/legacy/credibility" },
      { label: "achievement", href: "/legacy/achievement" },
    ],
  },
  {
    label: "SPECIALTY",
    href: "/specialty",
    children: [
      { label: "technique", href: "/specialty/technique" },
      { label: "collection", href: "/specialty/collection" },
    ],
  },
  { label: "NEWS", href: "/news" },
  { label: "GOLF", href: "/golf" },
];
```

HOME Hero 左上角三个站点链接也需要结构化管理：

```ts
export const homeSiteLinks = [
  { label: "대호", href: "" },
  { label: "OH", href: "" },
  { label: "VULCAN", href: "" },
];
```

`href` 等真实站点链接确认后再填写。它们是可点击的外部或内部站点入口，不是装饰文字。

---

## 前端内容数据

当前先使用静态数据文件，不接后端。

### Legacy Metrics

```ts
export const legacyMetrics = [
  {
    value: "38",
    label: "38년의 업력",
    category: "loyalty",
    visual: "growth-chart",
  },
  {
    value: "100%",
    label: "전공정 자체 진행",
    category: "credibility",
    visual: "process",
  },
  {
    value: "0%",
    label: "납품사고",
    category: "credibility",
    visual: "shield",
  },
  {
    value: "20,000+",
    label: "누적 납품",
    category: "achievement",
    visual: "delivery-map",
  },
  {
    value: "5,000+",
    label: "매년 제작",
    category: "achievement",
    visual: "production",
  },
];
```

### Credibility Scroll Sheets

`/legacy/credibility` 独立页建议使用单独数据，不要直接复用全部 `legacyMetrics`。这一页的核心不是普通 panels，而是卷轴式 scroll sheets。页面进入后直接从第一张全屏卷轴素材开始，顶部栏沿用 HOME 顶部栏视觉。后续 proof chapters 包括：`38년의 업력`、`100% 전공정 자체 진행`、`0% 납품사고`、`20,000+ 누적 납품`。

```ts
export const credibilityScrollSheets = [
  {
    id: "proven-without-exception",
    type: "asset",
    sourceAsset: "/Users/tingyouzhao/Desktop/戒指/素材/Group 39.svg",
    dayAsset: "/images/legacy/credibility/ring-hero-day.png",
    nightAsset: "/images/legacy/credibility/ring-hero-night.png",
  },
  {
    id: "history",
    type: "metric",
    metric: "38",
    label: "38년의 업력",
    support: "오랜 제작 경험으로 축적된 기준",
    accent: "red",
    visual: "growth-history",
  },
  {
    id: "process",
    type: "metric",
    metric: "100%",
    label: "전공정 자체 진행",
    support: "디자인부터 검품과 납품까지 직접 관리",
    accent: "green",
    visual: "controlled-process",
  },
  {
    id: "delivery-safety",
    type: "metric",
    metric: "0%",
    label: "납품사고",
    support: "일정과 품질을 끝까지 확인하는 납품 기준",
    accent: "red",
    visual: "delivery-shield",
  },
  {
    id: "delivery-scale",
    type: "metric",
    metric: "20,000+",
    label: "누적 납품",
    support: "반복된 프로젝트로 검증된 제작과 배송 경험",
    accent: "green",
    visual: "delivery-scale",
  },
];
```

实现注意：

- Desktop 可用 GSAP ScrollTrigger 或等价方案实现 pinned scroll + 横向卷轴展开。
- 不要做成普通 carousel 或横向卡片列表。
- 第一张素材需要 day / night 两套可加载资源，且以 full-screen cover 方式渲染。

### Specialty Process

```ts
export const techniqueSteps = [
  "디자인 : 수작업 / 2D 디자인",
  "3D 렌더링 작업",
  "기계 / 세공 / 광",
  "검품 및 납품",
];
```

### Golf Product Colors

```ts
export const golfShaftColors = [
  "BLACK",
  "WHITE",
  "BURGUNDY",
  "NAVY",
];
```

---

## Component Rules

### Header

- 全站复用。
- 支持深色与浅色页面的状态。
- Desktop 显示完整导航。
- Mobile 显示 menu button。
- LEGACY 与 SPECIALTY 需要支持 dropdown 或二级导航。
- 当前页面需要有低调 active mask。
- hover mask 不能覆盖 current active 状态。
- `LEGACY` hover 时横向显示 `loyalty / credibility / achievement`。
- 位于 legacy 任意分支页时，legacy 分支导航常驻显示并高亮当前分支。
- legacy 分支导航以 `LEGACY` 主分类按钮中心线为锚点居中对齐。
- Home 风格顶部栏是全站标准：左侧站点链接，中间 `DAEHO` 与主导航，右侧 theme / language controls。

### CTA Button

- 使用细描边、透明背景、低调 hover。
- 箭头或圆形 icon 可以作为可复用装饰。
- 不使用大面积高饱和按钮。

### Play Button

- 用于 Hero、品牌影片、工艺影片。
- 圆形细线 + 三角播放 icon。
- 可选文字环，但必须克制。

### Scroll Indicator

- 用于 Hero 或横向滚动段落底部。
- 保持小尺寸、低透明度、细线。

### Image Sections

- 图片必须保持比例。
- 不允许强行拉伸。
- 使用 `object-fit: cover` 或 `object-fit: contain` 时要根据产品图性质选择。
- 没有真实图片时使用明确 placeholder，不使用随机 stock。

---

## HOME Opening Intro

- 只用于 HOME 首次进入页面的 opening animation。
- 初始状态为全屏深色覆盖层，中央显示 `DAEHO`。
- `DAEHO` 使用白色或 soft white，从 blur 到 sharp。
- 清晰后短暂停留，再同时执行 translate 和 scale。
- logo 移动并缩小到 Hero 顶部栏 logo 的最终位置与尺寸。
- 动画完成后，Header 进入正式状态，opening overlay 不再遮挡页面。
- 需要避免动画结束时 logo 位置跳动。
- 实现时应测量 Hero 顶部 logo 的最终 bounding box，作为 intro logo 动画的目标位置和尺寸。
- PC 端当前 logo 目标位置为顶部左侧。
- 移动端目标位置保持顶部居中。
- logo 飞行期间应同步触发 Hero 背景、标题、CTA、顶部栏的暗场显影。
- 用户 prefers-reduced-motion 时，跳过移动动画，只做短暂 fade 或直接显示正式页面。

---

## Motion Implementation Rules

- Lenis 负责全局 smooth scroll。
- GSAP ScrollTrigger 只用于复杂场景：
  - HOME opening logo transition
  - HOME Hero
  - HOME Hero to Featured Categories pinned transition
  - HOME category showcase
  - LEGACY horizontal panels
  - TECHNIQUE timeline
  - GOLF product storytelling
- Framer Motion 用于普通组件 reveal、hover 和 filter 切换。
- CSS transition 用于小范围 hover、opacity、color、mask 变化。
- Mobile 端减少 pinned scroll 和复杂 parallax。
- 必须处理 `prefers-reduced-motion`。

### HOME Hero to Featured Categories Transition

- 使用 GSAP ScrollTrigger pin Hero 转场区域。
- Hero 到下一屏整体入场参考：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`。
- Featured Categories 内部 hover / focus panel 展开参考：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-featured-categories-hover-panels.mov`，不要把它绑定到 Hero scroll 衔接动画。
- Featured Categories 容器初始位于视口下方，滚动时 `translateY` 到主视口。
- Featured Categories 可同时从 `scale(0.92-0.96)` 过渡到 `scale(1)`。
- Hero 背景层在转场后段降低 opacity 或增加 dark overlay。
- 转场结束后解除 pin，让 Featured Categories 进入正常页面流。
- Mobile / reduced-motion 下禁用 pinned 转场，改为简单 slide-up + fade。

### Featured Categories Hover Panel

- 这是第二个 section 内部的鼠标 hover / keyboard focus 动画，不是 Hero 到第二屏的衔接动画。
- panel layout 建议用 CSS grid / flex-basis 控制列宽。
- active panel 约 55% - 65%。
- inactive panel 保持窄竖条。
- hover / focus 切换时同步动画 active / inactive 宽度、overlay opacity、image object-position、text reveal。
- 不要通过拉伸图片实现宽度变化；图片必须保持 `object-fit: cover`。
- 可用 Framer Motion layout animation、GSAP tween 或 CSS transition 实现。
- 滚动进入只设置默认 active，不触发轮播式自动展开。

---

## Asset Rules

建议资产目录：

```text
frontend/public/
  images/
    home/
    chronicle/
    legacy/
    specialty/
      technique/
      collection/
    news/
    golf/
  videos/
    brand/
    home/
    technique/
    golf/
```

命名建议：

- `home-hero-ring.png`
- `home-hero-blueprint-video.mp4`
- `home-hero-blueprint-poster.jpg`
- `legacy-hero-rings.png`
- `technique-step-design.png`
- `collection-h-league-ring.png`
- `golf-hero-bracelet.png`
- `news-featured-01.png`

---

## Responsive Rules

### Desktop

- 保持 cinematic wide layout。
- 首页和产品页可以使用大图、大留白、非对称排版。
- Header 保持完整导航和二级菜单。
- 可以使用 pinned scroll、横向 panel 和复杂 reveal。

### Tablet

- 保留主要视觉层级。
- 减少过宽文字排版。
- 降低复杂横向滚动的强度。

### Mobile

- 优先保证品牌感和滚动顺滑。
- 不显示过多顶部导航。
- 使用底部或浮层 MENU。
- 禁用或简化 pinned scroll。
- 图片比例不能被压扁。
- Hero 视频可以降级为 poster。

---

## Performance Rules

- HOME Hero 背景最终使用视频时，必须提供 poster fallback。
- Hero 视频建议 muted、playsInline、loop。
- 是否 autoplay 需要结合性能和用户体验确认。
- Hero poster 必须优先加载，避免首屏黑屏。
- Hero 大图或 poster 必须压缩并使用合适格式。
- 首屏图片 / poster 需要优先加载。
- 非首屏图片 lazy load。
- 动画不要导致 layout shift。
- 视频默认不自动播放声音。
- Mobile 端优先保证滚动顺滑。

---

## Accessibility Rules

- 所有按钮必须可键盘操作。
- 图片必须有描述性 alt。
- 播放按钮必须有 aria-label。
- dropdown 导航必须支持键盘和 focus 状态。
- 深色背景上的文字必须有足够对比度。
- `prefers-reduced-motion` 必须生效。
- 表单如果出现，必须有明确 label、错误提示和提交状态。

---

## 前端开发阶段计划

### Phase 1 — 前端项目基础

- 建立 React / Next.js 项目。
- 配置 TypeScript。
- 配置 Tailwind CSS。
- 建立基础 layout。
- 建立全局字体、颜色、spacing 和基础视觉变量。
- 建立 `data/` 静态内容文件。

### Phase 2 — 全站基础组件

- Header。
- Mobile Menu。
- Footer。
- Language Menu。
- CTA Button。
- Play Button。
- Scroll Indicator。
- Image Reveal。

### Phase 3 — HOME 首屏

- Opening Intro。
- HOME Hero。
- Hero poster / video placeholder。
- HOME 专用顶部栏。
- Hero title、CTA、scroll indicator。
- reduced-motion fallback。

### Phase 4 — HOME 核心 sections

- Featured Categories。
- Featured Categories hover panel。
- Hero to Featured Categories pinned transition。
- Legacy / Proof Bento。
- Recent Projects。

### Phase 5 — 其他主页面

- LEGACY。
- SPECIALTY / technique。
- SPECIALTY / collection。
- GOLF。
- NEWS。
- CHRONICLE。

### Phase 6 — 响应式与动效打磨

- Desktop / tablet / mobile 全尺寸检查。
- 检查文字是否溢出或遮挡。
- 检查图片比例。
- 检查所有 scroll transition。
- 检查移动端性能。
- 检查 reduced-motion。

### Phase 7 — 前端交付前整理

- 整理 mock data。
- 整理图片和视频命名。
- 删除无用 placeholder。
- 检查导航链接。
- 检查每个页面首屏视觉。
- 检查页面之间的品牌一致性。

---

## 当前推荐下一步

1. 先搭建前端项目骨架。
2. 先做全站 Header 和 HOME Opening / Hero。
3. 再做 HOME Featured Categories 和转场。
4. 再做 Legacy / Proof Bento 和 Recent Projects。
5. 等 HOME 气质稳定后，再扩展其他页面。

当前阶段不要先做后台、数据库或复杂 CMS。前端视觉没有定下来之前，后端结构很容易反过来限制页面气质。
