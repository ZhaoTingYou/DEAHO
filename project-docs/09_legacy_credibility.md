# 09_legacy_credibility.md — LEGACY / credibility 页面详细规格

## 设计依据

参考设计图：

`/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`

卷轴第一页素材：

`/Users/tingyouzhao/Desktop/戒指/素材/Group 39.svg`

PC 白天版首屏正式素材：

`/Users/tingyouzhao/Desktop/戒指/素材/Group 39.png`

黑夜版首屏素材：

`/Users/tingyouzhao/Downloads/ring_hero_black_background.png`

白天版首屏素材：

`/Users/tingyouzhao/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_17xqaall7jb922_c51d/temp/InputTemp/7813f1ff-95fa-481c-a2df-c1d37e8b9c12.png`

设计图尺寸：`7545 × 938`。这张图应被理解为一个横向展开的卷轴式页面叙事。当前实现不再需要单独的白色 Hero 截图页，进入 `/legacy/credibility` 后应直接从 Scroll Proof Sequence 的第一张全屏卷轴素材开始。

`Group 39.png` 尺寸为 `1576 × 721`，是 PC 白天版第一张正式素材。`Group 39.svg` 保留为可拆分源文件线索。正式页面第一屏以用户提供的黑夜 / 白天两张 PNG 为准，并以 full-screen cover 方式铺满视口。

---

## 页面定位

路由：`/legacy/credibility`

该页面属于 LEGACY 的子栏目，核心任务是证明 DAEHO 不是只会展示漂亮成品，而是拥有可控流程、稳定交付和长期可靠性。

用户进入此页面后需要理解：

- DAEHO 有足够长的行业经验。
- DAEHO 的关键流程由自己掌控。
- DAEHO 对交付风险有明确管理。
- DAEHO 已经完成过大量真实交付。
- 这些可信度不是 slogan，而是被数字、流程和交付记录支撑。

页面气质关键词：

- precise
- verified
- controlled
- stable
- premium proof
- quiet confidence

避免：

- 普通企业资质页
- SaaS dashboard
- 花哨科技感
- 大段说明文字
- 夸张金色和廉价证书感

---

## 页面总体结构

建议页面由 3 个主要部分组成：

1. Scroll Proof Sequence：卷轴式证明叙事，第一张素材直接全屏出现
2. Proof System Detail：流程与检品能力展开
3. CTA Bridge：导向 technique / achievement

设计图主要覆盖第 1 部分。它不是普通横向卡片，而是像卷轴一样逐页展开的证明画面。第 2、3 部分是为了让页面从“漂亮的 proof 数据”继续落到“为什么可信”的具体说明，建议实现时补齐。

---

## Global Header

所有页面顶部栏后续统一按 Home 顶部栏执行，`/legacy/credibility` 也不再使用独立 credibility header。

实现约束：顶部栏统一复用 `frontend/components/layout/SiteHeader.tsx`。页面只传入当前主分类、当前 legacy 分支和主题状态，不再复制 Header / Mobile Menu / Language Menu 的 JSX。

Header 规则：

- 使用 Home 的 logo、site links、main nav、language / theme action 视觉语言。
- `LEGACY` 主导航为 active 状态。
- 鼠标 hover 到 `LEGACY` 时，下面横向展开 legacy 分支导航。
- 当用户位于任意 legacy 分支页面时，legacy 分支导航需要常驻显示，并高亮当前分支。
- legacy 分支导航必须以 `LEGACY` 主分类按钮的中心线为锚点居中对齐。
- 分支导航字体不能太小，需要接近主导航的可读尺寸，并支持白天 / 黑夜两套色调。
- 卷轴首页照片不能与顶部栏或分支导航重叠；第一张素材需要从顶部栏安全区之后开始显示。
- 黑夜版使用 Home 夜间 header 色调；白天版使用 Home day theme 的蓝色文字和浅色按钮。
- 白天版不是只替换第一张图；整条 proof scroll sequence 都需要切换到 day tone。
- 白天版与黑夜版保持同一套卷轴布局：同样的 pinned scroll、横向 sheet translation、metric copy + line illustration 结构。
- 白天版色系必须和 Home day theme 保持一致：冷白 / 浅蓝背景，品牌蓝文字与控件，不使用独立米金色页面基调。

---

## Section 1 — Scroll Proof Sequence / 卷轴式证明叙事

### 目标

这是页面的核心。用户从明亮 Hero 滚入证明区后，看到的不是一组普通横向 panel，而是一条被慢慢展开的横向卷轴。每一页卷轴用一个关键数字、一个短标签和一组极简线稿说明 DAEHO 的可靠性。

实现时建议使用 desktop pinned scroll + horizontal sheet translation：

- 进入 proof section 后页面固定，像画布被放到视口中央。
- 用户继续滚动时，不是“切换卡片”，而是整条卷轴从右向左缓慢展开。
- 每个 scroll sheet 占据接近 `100vw`，形成一屏一个 proof chapter。
- 页与页之间可以有轻微重叠或纸张 / 画布连续感，避免像普通轮播分屏。
- 横向卷轴展开结束后释放 pin，回到正常纵向页面。

Mobile 不建议重 pinned 横向滚动，改为纵向堆叠 scroll sheets，但视觉上仍要保持“卷轴页”的连续感。

### 卷轴页设计共性

- 背景：deep charcoal / black gray，允许轻微 radial gradient。
- 每个 scroll sheet 左侧放 metric 文案，右侧或下方放线性图形。
- 指标颜色只使用两类：
  - risk / history emphasis：muted red
  - positive proof / scale：green
- 大面积 icon 使用细线、低透明度、白色或浅灰。
- dashed line 作为信息占位和视觉节奏，不要写成长段正文。
- 卷轴底部可有非常细的 horizontal progress line 或 chapter divider。
- 不要做卡片，不要做 dashboard，不要做圆角统计块。

### Scroll Sheet 01 — Proven Without Exception / Fullscreen Roll

素材：

Night:

`/Users/tingyouzhao/Downloads/ring_hero_black_background.png`

Day:

`/Users/tingyouzhao/Desktop/戒指/素材/Group 39.png`

这是卷轴的第一页，也是页面进入后的第一屏。它需要直接占满整个 viewport，不再先出现单独 Hero，也不要把图片放在小画框中。

使用规则：

- 需要做白天版与黑夜版。
- 黑夜版作为默认 `/legacy/credibility` 首屏气质，和 Home night theme 保持一致。
- 白天版可通过 theme action 切换预览，色调和 Home day theme 保持一致。
- 第一屏图片必须 `100vw × 100svh / 100dvh` 铺满。
- Desktop 使用 `object-fit: cover`，保持产品主体在中心。
- Mobile 不直接复用 desktop 横图裁切，需要准备竖版 day / night 专属素材，优先保留中央戒指、金色 pedestal 与产品质感，顶部不能出现空黑带或素材原生标题残留。
- Mobile 首屏图片需要从 viewport 顶部开始铺满；Header 覆盖在图片上方，但文字层要下移到安全阅读区，避免和 logo / theme action / mobile menu 互相遮挡。
- scroll sheet 进入时应像纸面被缓慢展开，不要像图片直接 fade in。

当前移动端首屏素材：

- Night: `/images/legacy/credibility/ring-hero-mobile-night.jpg`
- Day: `/images/legacy/credibility/ring-hero-mobile-day.jpg`

### Scroll Sheet 02 — 38년의 업력

设计图可见内容：

- 左侧：`38년의 업력`
- 数字 `38` 使用 red accent。
- 中右：巨大线框 `38`。
- 下方：城市天际线、增长折线、向上箭头。
- 配套 dashed lines 表示经验、积累和时间证明。

页面语义：

这不是单纯讲“历史悠久”，而是说明 DAEHO 的交付能力来自长期行业经验和反复项目验证。

建议文案：

- Metric: `38`
- Label: `38년의 업력`
- Support: `오랜 제작 경험으로 축적된 기준`

### Scroll Sheet 03 — 100% 전공정 자체 진행

设计图可见内容：

- 左侧：`100% 전공정 자체 진행`
- `100%` 使用 green accent。
- 右侧：显示器、齿轮、放大镜、货车等 line icons，用 dotted line 串联。

页面语义：

强调 DAEHO 对设计、制作、检品、交付的关键过程有更高掌控力。这里要表达“流程可控”，不是炫耀设备。

建议文案：

- Metric: `100%`
- Label: `전공정 자체 진행`
- Support: `디자인부터 검품과 납품까지 직접 관리`

图形含义：

- monitor：设计 / 数据 / 方案确认
- gear：制作 / 가공
- magnifier：검품 / quality check
- truck：납품 / delivery handoff

### Scroll Sheet 04 — 0% 납품사고

设计图可见内容：

- 左侧：`0% 납품사고`
- `0%` 使用 red accent。
- 右侧：盾牌、桂冠、check mark。

页面语义：

这是 credibility 页面最强的承诺型信息，视觉应庄重。它应该像“风险被控制住”的证明，而不是广告式夸张保证。

建议文案：

- Metric: `0%`
- Label: `납품사고`
- Support: `일정과 품질을 끝까지 확인하는 납품 기준`

上线前注意：

如果 `0% 납품사고` 是真实可公开表达的数据，需要确认统计口径。若不能作为绝对承诺，可在最终文案中改为更稳妥的表达，例如 `납품 안정성` 或 `무사고 납품 기록`。

### Scroll Sheet 05 — 20,000+ 누적 납품

设计图可见内容：

- 左侧：`20,000+ 누적 납품`
- `20,000+` 使用 green accent。
- 右侧：世界地图线稿、运输货车、货箱。

页面语义：

用累计交付量证明 DAEHO 的项目经验和执行规模。它和 achievement 的区别是：这里强调“稳定交付能力”，不是展示荣誉案例。

建议文案：

- Metric: `20,000+`
- Label: `누적 납품`
- Support: `반복된 프로젝트로 검증된 제작과 배송 경험`

---

## Section 3 — Proof System Detail

设计图没有覆盖这一段，但建议补齐，否则页面会停留在数据展示，可信度的逻辑不够完整。

### 结构方向

背景可以从 deep charcoal 过渡到 off-white，形成从“证明数据”到“流程细节”的转场。

建议做 3 个 editorial blocks：

1. Controlled Process
   - 设计、렌더링、制作、检品、납품每一步都被纳入内部流程。
   - 视觉：流程图、工艺台、设计图、局部产品细节。

2. Quality Gate
   - 强调材质、镶嵌、刻印、表面处理、包装前检品。
   - 视觉：放大镜、检品手部、戒指细节 macro photo。

3. Delivery Discipline
   - 强调交期管理、包装、交付确认和项目沟通。
   - 视觉：包装盒、交付清单、物流 / handoff 场景。

### 版式

- 不使用三张普通卡片。
- Desktop 可采用左右交错 editorial layout。
- 每个 block 一侧为图片，另一侧为短标题、2-3 行说明和一个细线编号。
- 图片应低饱和、干净、真实，不要使用无关 stock photo。

---

## Section 4 — CTA Bridge

页面收束时需要给用户两个自然路径：

- 想看具体制作过程：`/specialty/technique`
- 想看真实成果案例：`/legacy/achievement`

建议 CTA 文案：

- `VIEW OUR PROCESS`
- `SEE ACHIEVEMENTS`

视觉上不要做两个普通按钮卡片。可以做一条深色横幅，左右两侧是两个细线入口，hover 时只轻微提高对比度和移动箭头。

---

## 内容数据建议

实现时建议把卷轴页独立成结构化数据。第一页是素材页，后续 proof sheets 是数据页：

```ts
export const credibilityScrollSheets = [
  {
    id: "proven-without-exception",
    type: "asset",
    dayAsset: "/images/legacy/credibility/ring-hero-day-layout.png",
    nightAsset: "/images/legacy/credibility/ring-hero-night.png",
    mobileDayAsset: "/images/legacy/credibility/ring-hero-mobile-day.jpg",
    mobileNightAsset: "/images/legacy/credibility/ring-hero-mobile-night.jpg",
    sourceAsset: "/Users/tingyouzhao/Desktop/戒指/素材/Group 39.png",
  },
  {
    id: "history",
    type: "metric",
    metric: "38",
    accent: "red",
    label: "38년의 업력",
    support: "오랜 제작 경험으로 축적된 기준",
    visual: "growth-history",
  },
  {
    id: "process",
    type: "metric",
    metric: "100%",
    accent: "green",
    label: "전공정 자체 진행",
    support: "디자인부터 검품과 납품까지 직접 관리",
    visual: "controlled-process",
  },
  {
    id: "delivery-safety",
    type: "metric",
    metric: "0%",
    accent: "red",
    label: "납품사고",
    support: "일정과 품질을 끝까지 확인하는 납품 기준",
    visual: "delivery-shield",
  },
  {
    id: "delivery-scale",
    type: "metric",
    metric: "20,000+",
    accent: "green",
    label: "누적 납품",
    support: "반복된 프로젝트로 검증된 제작과 배송 경험",
    visual: "delivery-scale",
  },
];
```

注意：`5,000+ 매년 제작` 是 LEGACY 总页 / achievement 方向的数据，不在当前 credibility 设计图中出现。除非后续设计要求，不建议强行放进本页卷轴 sequence。

---

## Motion 规格

### Scroll Proof Sequence

- 页面进入后第一屏就是 Scroll Sheet 01，不再经过单独 Hero。
- Header 覆盖在全屏素材上，视觉和 Home 顶部栏保持一致。
- Desktop 使用 pinned scroll + horizontal sheet translation。
- 整条卷轴的移动由滚动进度驱动，速度要慢，有重量。
- 每个 scroll sheet 接近视口中心时触发内部 reveal。
- metric 先出现，label 紧随，dashed lines 后出现。
- line icon 使用 stroke-dashoffset 或 mask 做逐线 reveal，但节奏要参考本站已有的慢速 reveal / cinematic motion，而不是另找外部动画参考。
- 数字 count up 可选，但必须克制；如果影响高级感，直接静态显示更好。
- sheet 之间需要停顿感，避免用户感觉只是普通横向轮播。

卷轴展开感：

- 第一页全屏素材可以从右侧轻微进入，像纸面被拉开。
- 可使用 clip-path / mask-position 做横向揭示，但不要做夸张“卷边”拟物效果。
- 第一页不使用小画框，不加卡片边框，不做截图容器。
- 画面展开过程中，背景可以从 day tone 过渡到 night tone，形成“白天证明档案 → 黑夜 proof archive”的转换。

### Reduced Motion / Mobile

- 关闭 heavy pinned scroll。
- 改为纵向 scroll sheets reveal。
- 首屏移动端仍需要有轻微生命感：背景可做非常慢的 scale / translate 漂移动画，并加一层柔和 sweep，模拟展台灯光扫过。
- 标题层分层进入：eyebrow、主标题、subtitle 依次 reveal，速度要慢，不要做跳动或夸张弹性。
- metric sheet 进入视口时使用 `IntersectionObserver` 触发：整页轻微上移 + blur 解除，metric 数字做一次克制 pulse，line icon 使用普通 fade / scale in。
- detail section 和 CTA 在移动端也需要 scroll reveal，避免 proof sequence 之后突然变成静态长列表。
- 不依赖横向滚动才能阅读核心信息。

---

## Day / Night 色调版本

credibility 卷轴需要同时支持白天版与黑夜版。

### Day Tone

用途：第一页卷轴的白天版本，更接近白色证明档案、产品证书、明亮展台。

视觉：

- 背景：warm white / soft ivory。
- 主文字：deep charcoal。
- 线稿：light gray / muted gold。
- 金色只作为细线和展台感，不做大面积金色。

### Night Tone

用途：

- 深色 proof sequence。
- 更接近黑夜档案室、品牌数据展厅、工程图证明。

视觉：

- 背景：charcoal / deep black gray。
- 主文字：soft white。
- 辅助线条：muted gray。
- red / green accent 只用于核心数字。

### 切换方式

- 默认 `/legacy/credibility` 可先呈现 night tone，和 Home 夜间版本保持一致。
- 通过 Header theme action 可切换到 day tone 预览。
- Desktop 也可以在卷轴展开过程中做 day to night 的渐进式过渡。
- Mobile 可以按区块直接切换，不必做复杂渐变。
- 不建议只用 CSS `filter: invert()` 作为最终方案；它可以用于开发临时预览，但正式版需要独立调色或可主题化 SVG。

---

## 视觉资产与实现注意

### 不建议

- 不要把 `credibility.png` 作为最终整页背景图。
- 不要用截图裁切来模拟页面。
- 不要继续做单独 Hero 后再进入卷轴。
- 不要把第一屏素材放进小画框；它必须占满全屏。
- 不要使用随机 icon pack 破坏线稿一致性。
- 不要把 proof sequence 做成信息卡片或普通 carousel。

### 建议准备素材

- 第一屏全屏素材 day / night PNG。
- `Group 39.png` 作为 PC 白天版第一屏正式素材；`Group 39.svg` 保留为第一页设计参考或源文件线索。
- Proof panel 线稿 SVG：
  - growth-history
  - controlled-process
  - delivery-shield
  - delivery-scale
- 工艺 / 检品 / 包装 / 交付真实照片，用于后续 detail section。

---

## 响应式规则

Desktop `>= 1200px`：

- 第一屏全屏铺满，优先保留中央戒指和标题区域。
- Proof sequence 使用 pinned scroll + 横向卷轴展开。
- 每个 scroll sheet 宽度接近 `100vw`，高度接近 `100svh`。

Tablet `768px - 1199px`：

- 第一屏允许左右裁切，中央戒指优先。
- Proof sequence 可使用横向 snap 或纵向堆叠，优先可读性。

Mobile `< 768px`：

- Header 使用 Home 移动端样式。
- 第一屏仍占满 `100dvh`，优先保留中央戒指；移动端需要使用独立文字层显示 `PROVEN WITHOUT EXCEPTION`，避免素材内文字被裁切后与 Header 冲突。
- Proof sequence 改为纵向 scroll sheets。
- 每个 proof sheet 按 `100dvh` 左右的手机卡片节奏排列，并为底部固定 MENU 预留安全空间。
- icon 作为低透明背景，不挤压文字。
- 韩文说明在移动端使用 `keep-all` 防止单字断行。
- 每段至少保持 `70svh` 左右的视觉停顿，不要变成普通列表。

---

## 验收标准

实现完成后检查：

- 首屏是否明确显示 `PROVEN WITHOUT EXCEPTION` 和 DAEHO 产品主视觉。
- Header 是否使用 Home 顶部栏结构，并且 `LEGACY` 为 active 状态。
- 页面是否直接从全屏卷轴第一页开始，没有额外 Hero。
- 第一张 day / night 图片是否真正铺满 `100vw × 100svh / 100dvh`。
- 是否存在 day tone / night tone 两套色调策略。
- Desktop proof sequence 是否像横向卷轴展开，而不是普通 panel carousel。
- 每个 scroll sheet 是否只围绕一个核心数字，不堆说明文字。
- `38`、`100%`、`0%`、`20,000+` 是否形成清晰阅读节奏。
- 线稿是否是低调辅助，不抢 metric。
- Mobile 是否能完整阅读全部 proof 信息，不依赖横向拖动。
- 页面整体是否仍像高端珠宝 / 冠军品牌，而不是企业介绍页。

---

## 待确认

- `0% 납품사고` 的公开表述口径。
- `20,000+ 누적 납품` 的统计口径。
- `Group 39.svg` 后续是否仍需作为可拆分源文件参与动画。
- Proof scroll sheet 线稿是否需要完全复刻设计图，还是允许保持同气质的简化 SVG。
