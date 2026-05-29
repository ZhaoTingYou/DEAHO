# 02_pages.md — DAEHO 页面结构文档

## 重要原则

- 页面结构以当前提供的粗略设计图为基础继续完善。
- 已有设计图的页面，优先保持截图中的版式、比例和视觉气质。
- 尚未完成设计图的页面，可以按照品牌方向、已有页面设计和现有风格补齐描述，但不能做成普通模板页。
- 文案如果设计图中已经出现，开发时应以设计图文字为准；看不清的文字先保留语义说明，不自行编造正式文案。
- 所有主页面共用同一套 Header、语言切换、登录入口、滚动节奏和高端品牌视觉规则。

---

## 站点信息架构

### 主 category

官网一共有 6 个主 category：

| Category | 路由 | 页面定位 |
|---|---|---|
| HOME | `/` | 官网首页，负责建立第一印象、品牌 tone & mood、核心产品与信任度 |
| CHRONICLE | `/chronicle` | 品牌时间线 / 历史故事 / 发展脉络页面 |
| LEGACY | `/legacy` | 品牌信任资产总入口，承载经验、可信度、成果数据 |
| SPECIALTY | `/specialty` | 专业能力总入口，连接工艺流程与产品系列 |
| NEWS | `/news` | 新闻、品牌内容、项目文章与视频内容列表 |
| GOLF | `/golf` | Golf bracelet 独立产品线展示页面 |

### 子 category

LEGACY 下方包含 3 个子 category：

| Parent | Sub Category | 建议路由 | 页面定位 |
|---|---|---|---|
| LEGACY | loyalty | `/legacy/loyalty` | 长期客户关系、品牌陪伴、持续交付经验 |
| LEGACY | credibility | `/legacy/credibility` | 100% 自主流程、0% 交付事故、品质与交付可信度 |
| LEGACY | achievement | `/legacy/achievement` | 冠军项目、累计交付、年度制作量、代表案例 |

SPECIALTY 下方包含 2 个子 category：

| Parent | Sub Category | 建议路由 | 页面定位 |
|---|---|---|---|
| SPECIALTY | technique | `/specialty/technique` | 制作工艺、流程、设备、检品与交付 |
| SPECIALTY | collection | `/specialty/collection` | 项目展示、代表项目与产品成果集合 |

### 导航规则

- Header 主导航固定为：HOME / CHRONICLE / LEGACY / SPECIALTY / NEWS / GOLF。
- LEGACY hover 或点击后出现子导航：loyalty / credibility / achievement。
- SPECIALTY hover 或点击后出现子导航：technique / collection。
- 当前页面或当前子栏目需要有低调选中状态，例如细线、浅色底、透明描边或 muted gold 标识。
- 右侧保留 theme toggle 和 language globe controls。
- 顶部栏实现必须复用 `frontend/components/layout/SiteHeader.tsx`，后续页面不要再各自复制 Header markup。
- theme toggle 是全站状态，不是单页状态；选择白天或黑夜后，进入任意页面都要延续同一模式。
- Header 滚动行为全站统一：下滑时以向上滑出、淡出、轻微虚化的动画隐藏，上滑时按同一节奏出现。

---

## 页面总览

| 页面名称 | 路由 | 类型 | 设计图参考 |
|---|---|---|---|
| HOME | `/` | 首页 | `/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`；Hero 顶部栏参考 `/Users/tingyouzhao/Desktop/戒指/素材/HOMEPAGE1.png` |
| CHRONICLE | `/chronicle` | 主页面 | 当前未提供完整设计图，按品牌时间线方向补齐 |
| LEGACY | `/legacy` | 主页面 | `/Users/tingyouzhao/Desktop/戒指/LEGACY PLAN 1.png` |
| LEGACY / loyalty | `/legacy/loyalty` | 子页面或锚点页 | 由 Legacy 数据与品牌关系内容延展 |
| LEGACY / credibility | `/legacy/credibility` | 独立子页面 | `/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`；详细规格见 `project-docs/09_legacy_credibility.md` |
| LEGACY / achievement | `/legacy/achievement` | 子页面或锚点页 | 由 Legacy 项目成果与案例内容延展 |
| SPECIALTY | `/specialty` | 主页面 | 当前未提供完整父级设计图，可作为 technique / collection 入口页 |
| SPECIALTY / technique | `/specialty/technique` | 子页面 | `/Users/tingyouzhao/Desktop/戒指/TECHNIQUE PLAN 1.png` |
| SPECIALTY / collection | `/specialty/collection` | 子页面 | `/Users/tingyouzhao/Desktop/戒指/TECHNIQUE PLAN 1.png` 右侧 collection 版式参考 |
| NEWS | `/news` | 主页面 | `/Users/tingyouzhao/Desktop/戒指/NEWS PLAN 1.png` |
| GOLF | `/golf` | 主页面 | `/Users/tingyouzhao/Desktop/戒指/GOLF PLAN 1.png` |

---

## 共用页面结构

### Header

- 左侧：`대호` / `OH` / `VULCAN` 站点链接。
- 中间：`DAEHO` logo 与 HOME / CHRONICLE / LEGACY / SPECIALTY / NEWS / GOLF 主导航。
- 右侧：theme toggle 与 language globe。
- 深色页面使用白色或 soft white 导航。
- 浅色页面切换为深灰文字、浅色分支背景和 muted gold active 状态。
- Desktop 优先横向导航；Mobile 改为折叠菜单。

### Footer

当前设计图未完整展示 Footer。建议 Footer 保持极简：

- DAEHO logo
- 主 category 快捷入口
- 联系方式 / 地址 / 社交入口
- 版权信息

Footer 不要做成普通电商页脚，视觉应延续黑色、高级、留白充足的品牌气质。

---

## HOME `/`

参考：`/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`

详细设计讨论记录：`project-docs/07_home.md`

HOME 是整个官网的品牌入口，需要在首屏立即建立 DAEHO 的高端、冠军、定制、工艺感与品牌信任度。

### Section 1 — Opening / Hero

- HOME 最上方深色区域是 opening animation，不是普通静态 section。
- Opening 初始状态：全屏深色背景，只显示居中的 `DAEHO` logo。
- `DAEHO` logo 先以模糊状态出现，再逐渐变清晰。
- logo 清晰后，一边缩小一边从画面中央移动到 Hero 顶部栏居中 `DAEHO` logo 的位置。
- logo 到位后，正式 Header 和 HOME 页面内容出现，进入下方正式页面状态。
- 动画结束后的 Header 位置、logo 大小和正式页面中的 Header 保持一致。
- Opening 过渡必须慢、克制、有电影感，避免快速飞入或弹跳。
- Hero 展示阶段使用全屏深色背景。
- Hero 顶部栏使用最新设计：`DAEHO` 居中，导航在 logo 下方，左上角为 `대호` / `OH` / `VULCAN` 三个站点链接，右上角为 LANGUAGE / LOGIN 描边胶囊按钮。
- 中央或偏右展示冠军戒指产品大图。
- Hero 背景最终是视频背景；当前设计图中的 blueprint / technical drawing 是视频 poster / 静态占位。
- 视频方向：冠军戒指图纸、technical drawing、暗色网格、金属线稿和细节结构的慢速运动。
- 必须提供静态 poster fallback，不能只依赖视频加载。
- 主标题示例方向：`DESIGN TO BE REMEMBERED`。
- CTA：`DISCOVER COLLECTION`。
- 右侧或画面中心可有播放按钮，用于品牌影片或工艺影片。
- 底部保留 `SCROLL` 提示。

### Section 2 — Featured Categories

- 从 Hero 滑动到此 section 时使用参考视频式转场：Hero 先固定，Featured Categories 从底部向上推入并覆盖 Hero。
- 转场过程中 Featured Categories 像一张大画布进入视口，可以带大圆角、柔和阴影和轻微 scale up。
- 静态参考：`/Users/tingyouzhao/Desktop/戒指/素材/page3.png`。
- 黑色或深色背景。
- 展示 3 个核心产品入口：
  - 우승반지 / Championship Ring
  - 경력배지 / Career Badge
  - 주문배치 / Custom Badge
- 左侧使用标题、简短说明和 `CLICK` CTA。
- 右侧使用横向大图卡片，卡片之间可有覆盖和错位关系。
- 交互上可以支持 hover 切换主图、标题和 CTA。

### Section 3 — Legacy / Statistics Bento

- 以 Bento Grid 或横向 panel 展示品牌数据。
- 数据参考：
  - 38년의 업력
  - 100% 전공정 자체 진행
  - 0% 납품사고
  - 20,000+ 누적 납품
  - 5,000+ 매년 제작
- 视觉不要做成 dashboard，应像奢侈品牌 infographic。

### Section 4 — Recent Projects

- 白色或浅色留白背景。
- 标题：`RECENT PROJECTS`。
- 展示冠军团队、戒指、奖项照片。
- 采用 2×2 或 staggered gallery。
- 图片可以和戒指贴图叠加，形成冠军文化和实物成果的联系。

---

## CHRONICLE `/chronicle`

当前未提供完整设计图，需要按品牌整体气质补齐。

CHRONICLE 用于讲述 DAEHO 的品牌历史、发展阶段、重要节点和代表性项目。它和 LEGACY 的区别是：CHRONICLE 更偏时间叙事，LEGACY 更偏信任资产和结果证明。

### 建议页面结构

1. Hero
   - 深色背景。
   - 大标题可使用 `CHRONICLE` 或品牌年份叙事标题。
   - 背景可使用黑白历史图、工厂细节、旧图纸、戒指草图或项目照片。

2. Timeline
   - 年份纵向或横向时间线。
   - 每个年份包含一个标题、一句说明、一张图片。
   - 交互可以使用滚动时逐段 reveal。

3. Milestone Gallery
   - 展示代表性项目、重要客户、制作工艺升级、交付节点。
   - 版式偏 editorial，不做普通列表。

4. Brand Statement
   - 用简短品牌宣言收束，导向 LEGACY 或 SPECIALTY。

---

## LEGACY `/legacy`

参考：`LEGACY PLAN 1.png`

LEGACY 是品牌信任资产总页面，重点表达 DAEHO 经得起验证的经验、可信度和成果。

### Section 1 — Hero

- 浅色背景，整体比 HOME 更明亮、更庄重。
- 展示多枚冠军戒指和纪念产品。
- 主标题方向：`PROVEN WITHOUT EXCEPTION`。
- Header 可使用深灰背景，保持与其他页面统一。
- Hero 下方保留滚动提示。

### Section 2 — Horizontal Legacy Panels

- 深色背景。
- 横向连续 panel 或横向滚动叙事。
- 5 个核心数据 panel：
  1. 38년의 업력
  2. 100% 전공정 자체 진행
  3. 0% 납품사고
  4. 20,000+ 누적 납품
  5. 5,000+ 매년 제작
- 每个 panel 包含数字、说明、极简线性插画。
- 整体像高端品牌数据展厅，不像数据仪表盘。

### LEGACY 子 category：loyalty

页面目标：表达长期合作、持续交付、客户信任和品牌陪伴。

建议内容：

- 长期客户与项目关系。
- 多年行业经验。
- 从初次项目到持续复购的品牌信任。
- 可以使用 38 年经验、累计客户、重复合作案例等内容。

### LEGACY 子 category：credibility

页面目标：表达专业流程和稳定交付能力。

详细设计讨论记录：`project-docs/09_legacy_credibility.md`

设计图参考：`/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`

页面应被理解为“直接从全屏卷轴素材开始”的可信度叙事，而不是普通资质介绍页。

建议内容结构：

- Scroll Proof Sequence：卷轴式滚动证明叙事，第一页使用用户提供的 day / night 全屏 PNG，后续 proof 包括 `38년의 업력`、`100% 전공정 자체 진행`、`0% 납품사고`、`20,000+ 누적 납품`。
- Proof System Detail：补充自主流程、检品标准、交付管理等解释，不要只停留在数字展示。
- CTA Bridge：导向 `/specialty/technique` 查看制作过程，导向 `/legacy/achievement` 查看成果案例。

视觉重点：

- credibility 页面比 loyalty 更理性，比 achievement 更克制。
- 顶部栏统一按 HOME 顶部栏视觉执行。
- hover `LEGACY` 时需要横向展示 legacy 分支；位于 legacy 分支页时分支常驻显示。
- legacy 分支导航必须以 `LEGACY` 主分类中心线居中对齐，字体要保持清晰可读，并随白天 / 黑夜模式切换色调。
- 卷轴首页照片不能与顶部栏或分支导航重叠。
- proof sequence 要像被缓慢展开的高端证明卷轴，不像 dashboard 或 carousel。
- 卷轴素材需要 day tone / night tone 两套色调版本。
- 线稿 icon 和 dashed line 是证明系统的视觉语言，不能变成普通图标卡片。

### LEGACY 子 category：achievement

页面目标：表达 DAEHO 已完成的成果和冠军文化资产。

建议内容：

- 20,000+ 累计交付。
- 5,000+ 年度制作。
- 冠军戒指案例。
- 体育团队、赛事、企业纪念项目。
- 可接入 Recent Projects 或 Collection。

---

## SPECIALTY `/specialty`

当前未提供完整父级页面设计图。

SPECIALTY 是专业能力总入口，建议做成 technique 与 collection 的过渡页，而不是重复展示所有内容。

### 建议页面结构

1. Hero
   - 深色背景。
   - 标题强调 `SPECIALTY`、`CRAFTED WITH PRECISION` 或类似工艺方向。
   - 背景使用制作现场、草图、设备、细节打磨照片。

2. Two Entrances
   - 左侧：Technique，进入制作流程与工艺能力。
   - 右侧：Collection，进入代表项目与成品展示。
   - 两个入口都使用大图，不使用普通按钮卡片。

3. Process Preview
   - 简短展示设计、3D、加工、检品四步。
   - CTA 导向 `/specialty/technique`。

4. Product Preview
   - 展示冠军戒指、Golf bracelet、徽章等产品。
   - CTA 导向 `/specialty/collection`。

---

## SPECIALTY / technique `/specialty/technique`

参考：`TECHNIQUE PLAN 1.png` 左侧页面。

Technique 页面用于讲清楚 DAEHO 的制作过程和专业能力。

### Section 1 — Process Statement

- 深蓝黑或蓝灰色背景。
- 顶部保留 Header 和 SPECIALTY 子导航。
- 中央标题 / 引用：`우리는 결과물로 증명한다`。
- 整体气质偏冷静、专业、克制。

### Section 2 — Vertical Process Timeline

- 采用纵向时间线或左右交错布局。
- 中央有蓝色竖线和节点。
- 四个阶段：
  1. 디자인 : 수작업 / 2D 디자인
  2. 3D 렌더링 작업
  3. 기계 / 세공 / 광
  4. 검품 및 납품
- 每个阶段包含标题、短说明、工艺图片。
- 图片以灰阶或低饱和处理，保留高级感。

### Section 3 — Detail / Quality Proof

- 可展示手工打磨、机器加工、检品、包装交付细节。
- 不要堆很多文字，重点用图像证明专业性。

---

## SPECIALTY / collection `/specialty/collection`

参考：`TECHNIQUE PLAN 1.png` 右侧 collection 页面。

Collection 页面用于展示 DAEHO 的代表项目和产品成果集合。整体比 Technique 更产品化、更 campaign。

### Section 1 — H-LEAGUE Champions Ring

- 深色背景。
- 大型戒指主视觉。
- 标题方向：`H-LEAGUE CHAMPIONS RING`。
- CTA：`DISCOVER MORE`。
- 可有轮播箭头或序号。

### Section 2 — Crafted to Last Forever

- 深色背景。
- 使用拆解式产品图，展示戒指结构、工艺层次、材质细节。
- CTA：`VIEW TECHNIQUE` 或导向 technique。

### Section 3 — Championship Rings

- 展示多枚冠军戒指。
- 标题方向：`CHAMPIONSHIP RINGS`。
- CTA：`DISCOVER COLLECTION`。

### Section 4 — The DAEHO Heritage

- 视频或影片感大图。
- 中央播放按钮。
- 用于品牌故事、客户案例或制作纪录片。

### Section 5 — Value Banner

- 底部 4 个品牌价值 icon：
  - CHAMPIONSHIP QUALITY
  - BESPOKE DESIGN
  - TIMELESS VALUE
  - GLOBAL LEGACY

---

## NEWS `/news`

参考：`NEWS PLAN 1.png`

NEWS 是品牌内容和文章列表页，整体需要比主产品页更轻、更干净，但仍要保持高级感。

### Section 1 — Featured Article

- 白色或米白背景。
- 左侧：分类标签、小标题、大标题、副标题、分享按钮。
- 右侧：featured image。
- 当前设计图中可见类似环保主题文章的版式，后续内容可替换为 DAEHO 新闻、制作幕后、客户故事或品牌报道。

### Section 2 — Category Filters

- 横向胶囊按钮。
- 参考分类：
  - All
  - Brand Story
  - More To Witness
  - Making & Growing
  - Behind The Scenes
  - Wild Expedition
- 当前 active 状态使用蓝色或深色强调。

### Section 3 — Article Grid

- 3 列卡片 grid。
- 卡片包含图片、标签、阅读时间、标题。
- 视频文章右下角可以有播放按钮。
- 下方可继续追加列表或加载更多。

---

## GOLF `/golf`

参考：`GOLF PLAN 1.png`

GOLF 是独立产品线页面，视觉更偏黑金、运动、收藏、精品配饰。

### Section 1 — Hero

- 黑色背景。
- 左侧：序号、产品类型、竖向大标题。
- 主标题方向：
  ```text
  FORM
  OF
  THE GAME
  ```
- 右侧：Golf bracelet 大型产品图。
- CTA：`DISCOVER COLLECTION`。
- 右侧有播放按钮。
- 底部保留 scroll indicator。

### Section 2 — Design in Every Detail

- 左侧：`DESIGN IN EVERY DETAIL` 标题、说明、`EXPLORE DETAILS`。
- 右侧：4 个细节图卡片。
- 细节方向：
  - BALL TEXTURE
  - CLUB FACE
  - PRECISE LINE
  - PERFECT CURVE
- 支持左右箭头切换。

### Section 3 — Shaft Color

- 深色背景。
- 展示 4 个 shaft color：
  - BLACK
  - WHITE
  - BURGUNDY
  - NAVY
- 使用 radio / swatch 控制颜色。
- 图片切换要慢、有质感。

### Section 4 — Crafted to Last

- 展示材质、刻字、细节加工、金属纹理。
- 可用 1 张大图 + 2 张细节图组合。
- 左侧有 `WATCH PROCESS` 或视频入口。

### Section 5 — More Than a Bracelet, a Statement

- 大图展示佩戴场景。
- 右侧标题、短说明、CTA：`VIEW COLLECTION`。
- 表达它不只是配饰，而是身份、审美和运动精神的 statement。

### Section 6 — Brand Value Banner

- 底部 4 项图标价值：
  - CUSTOM MADE
  - PREMIUM MATERIAL
  - EXQUISITE DETAIL
  - LIMITED EDITION

---

## 响应式规则

- Desktop 是主体验，保留横向叙事、错位布局和电影感。
- Tablet 可以减少列数，把横向 gallery 改为 2 列。
- Mobile 所有 section 改为纵向堆叠，Header 使用菜单按钮。
- 横向滚动 panel / 卷轴 sequence 在 Mobile 上改成纵向叙事，必要时才使用轻量 swipe。
- Hero 产品图必须保持比例，不能被压扁或随意裁切。

---

## AI / 开发工作规则

1. 有设计图的页面，以设计图为主要依据。
2. 没有设计图的页面，按照本文件的页面定位补齐，但视觉必须延续 DAEHO 的高级品牌方向。
3. Header、Footer、按钮、播放按钮、scroll indicator、分类筛选、产品卡片、文章卡片应组件化复用。
4. 不使用随机占位图；没有素材时，用明确的 asset placeholder 路径和说明。
5. 不把页面做成商城，不出现价格、购物车、促销、折扣等电商元素。
6. 所有动画和交互都应慢、克制、顺滑，避免过度科技感。
