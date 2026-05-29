# 07_home.md — HOME 具体设计讨论

## 当前参考

设计图：

`/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`

Hero 顶部栏最新参考：

`/Users/tingyouzhao/Desktop/戒指/素材/HOMEPAGE1.png`

Hero 到下一屏滚动转场参考：

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

Featured Categories 内部 hover panel 动画参考：

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-featured-categories-hover-panels.mov`

Featured Categories 静态参考：

`/Users/tingyouzhao/Desktop/戒指/素材/page3.png`

Legacy / Proof Bento grid 动效参考：

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-proof-bento-grid-reference.mov`

这个文件是 HOME 的粗略页面方向。后续首页设计、排版构造、动画规则和代码实现都应以这个方向为基础继续细化。

---

## HOME 设计目标

HOME 是 DAEHO 官网最重要的第一印象页面。

它的任务不是一次讲完所有信息，而是让用户在几秒内感受到：

- DAEHO 是高端定制品牌。
- DAEHO 与冠军戒指、荣誉、纪念和高品质制作相关。
- 网站不是普通电商，而是品牌 campaign。
- 用户可以继续进入 Legacy、Specialty、Collection、News、Golf 等内容。

一句话方向：

HOME 要像一个高端冠军品牌的 opening film + product campaign + portfolio entrance。

---

## 首页整体节奏

当前 HOME 一共有 5 个连续画面 / 段落：

1. Opening Intro  
   深色开场动画，中央 DAEHO logo 从模糊变清晰；变清晰后，一边缩小一边移动到 Hero 顶部 logo 的最终位置。

2. Hero  
   正式首页首屏，展示 DAEHO、冠军戒指、blueprint / technical drawing 视频背景、主标题和 CTA。

3. Featured Categories  
   展示三个核心产品入口：우승반지、경력배지、주문배치。

4. Legacy / Proof Bento  
   用品牌数据证明实力：38 年、100%、0%、20,000+、5,000+。

5. Recent Projects  
   展示冠军团队、戒指、案例照片，形成品牌成果和项目背书。

---

## Section 1 — Opening Intro

### 设计目的

Opening Intro 是首页的仪式感入口，不是 loading。

它负责让用户先记住 DAEHO 这个名字，再自然进入正式页面。

### 视觉状态

初始状态：

- 全屏深色背景。
- 背景接近 charcoal black / dark navy black。
- 画面中央只有 `DAEHO`。
- `DAEHO` 字距拉开，白色或 soft gray。
- 其他导航、图片、文字都暂时不出现。

动画过程：

1. `DAEHO` 以模糊状态出现。
2. logo 慢慢变清楚。
3. logo 完全清晰后短暂停留，随后开始同时缩小和移动。
4. logo 从画面中央丝滑移动到 Hero 顶部栏 `DAEHO` logo 的最终位置。
5. logo 移动过程中同步缩小到 Hero 顶部栏 logo 的最终尺寸。
6. logo 飞行期间，Hero 背景和主要内容从黑场中逐步显影，不要等 logo 消失后才切到主页。
7. logo 到位后，Hero 顶部栏、主导航和语言入口定格出现。
8. opening overlay 柔和淡出，正式 Hero 内容展示完成。

最终状态：

- Hero 顶部 `DAEHO` logo 与 opening 中移动过来的 logo 位置一致。
- Hero 顶部 `DAEHO` logo 最终尺寸与 opening 缩小后的 logo 尺寸一致。
- 不能出现 logo 跳动、瞬移或重新渲染的感觉。
- 不能先移动再缩小，也不能先缩小再移动；移动与缩小需要同时发生，形成一个连贯的品牌转场。
- 当前测试版本中，PC 端 logo 最终落点在顶部左侧；移动端最终落点保持顶部居中。

### 动效气质

- 慢。
- 稳。
- 有镜头感。
- 像奢侈品牌影片开头。
- 不像 loading screen。
- 不使用弹跳、闪烁、科技扫描线或过度粒子效果。
- 飞行不是硬直线移动，需要有柔和的启动、持续推进和贴合落位。

### 时间建议

- blur 到清晰：约 0.9s。
- 清晰后停留：约 0.5s。
- 中央移动并缩小到 Hero 顶部 logo：约 1.45s。
- Top bar / Hero reveal：约 0.6s。
- 总时长：约 3.4s - 3.6s。

---

## Section 2 — Hero

### 设计目的

Hero 负责承接 opening，并建立 DAEHO 的品牌世界。

Hero 应该像一张冠军戒指 campaign 海报，而不是普通网页首屏。

### 画面结构

- 深色背景。
- Hero 顶部栏采用透明叠加式结构，不使用独立实色导航条。
- PC 端 `DAEHO` logo 位于顶部左侧，不再居中，是顶部栏主视觉锚点。
- PC 端右上角放站点链接组：`대호` / `OH` / `VULCAN`，这是三个不同网站的入口链接，不是装饰文字，也不是主 logo。
- 三个链接需要可点击，视觉上保持同一行，使用细字重、宽字距、白色或 soft white，并与左侧 `DAEHO` 在同一条水平线上。
- PC 端右上角保留 language 入口，但只显示 globe icon，不显示 `LANGUAGE` 字样。
- 点击 globe icon 后出现语言选择浮层，可选 KR / EN / CN。
- 不需要 `LOGIN` 入口。
- 主导航保持原来的顶部中间一排位置：HOME / CHRONICLE / LEGACY / SPECIALTY / NEWS / GOLF。
- 当前页面 HOME 使用低调灰色半透明 active 胶囊背景。
- PC 端 category 需要区分 current page 和 hover state：当前页面所在 category 保留较明显的白色 / 灰白半透明遮罩；鼠标移动到其他 category 时，该 category 出现更淡的白色遮罩作为 hover feedback。
- hover 遮罩不能取代当前页面遮罩；鼠标离开后淡色 hover 遮罩消失，current page 的 active 遮罩继续保留。
- 顶部栏整体覆盖在 blueprint 背景上，文字和线框使用白色或 soft white。
- Hero 背景最终使用视频，不是静态图片。
- 当前设计图里的 blueprint / technical drawing 只是视频的静态占位画面。
- 视频内容方向：冠军戒指 blueprint、technical drawing、暗纹网格、金属线稿、细节结构轻微运动。
- 视频需要低对比、暗色、慢速运动，不能抢过标题和导航。
- 需要准备静态 fallback poster，用于加载前、低性能设备、移动端或 reduced-motion 状态。
- 产品主视觉是冠军戒指或纪念戒指。
- 主标题放右侧或右中区域，例如：`DESIGN TO BE REMEMBERED`。
- 主标题上方可以放小标签：`VICTORY. PRIDE. LEGACY`。
- 韩语 subtitle 保持短句，作为情绪补充，不写成长段说明。
- CTA 使用细描边按钮，例如：`DISCOVER COLLECTION`。
- PC 端可加入小型 `SCROLL` indicator；当前测试中位置略偏左以贴合背景构图。
- 移动端不显示 `SCROLL` indicator。

### 移动端顶部与菜单

- 移动端顶部栏只保留居中的 `DAEHO` logo。
- 移动端隐藏顶部站点链接、language icon、LOGIN 和主导航。
- 移动端底部使用 `MENU` 按钮打开菜单面板。
- 菜单面板包含：
  - Sites：`대호` / `OH` / `VULCAN`
  - Account：`LANGUAGE`
  - Category：HOME / CHRONICLE / LEGACY / SPECIALTY / NEWS / GOLF
- 移动端不需要 LOGIN。

### 视觉重点

第一眼优先级：

1. DAEHO 品牌。
2. 冠军戒指 / blueprint 视频氛围。
3. 主标题。
4. CTA。
5. 其他导航信息。

### 不要做

- 不要把 Hero 做成普通左右分屏 SaaS layout。
- 不要使用亮色渐变背景。
- 不要把当前占位图当成最终背景资产；最终需要视频版本。
- 不要放大段说明文字。
- 不要让 CTA 像电商按钮。
- 不要加入购物车、价格、促销信息。

---

## Hero -> Featured Categories 转场

### 参考

参考视频：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

目标效果：从 Hero 向下滑动到 Featured Categories 时，不是普通页面自然接上，而是像参考视频一样做 scroll-pinned 画布转场。

注意：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-featured-categories-hover-panels.mov` 不是 Hero 到第二屏的衔接动画，而是 Featured Categories 第二屏内部的鼠标 hover / focus panel 动画参考。Hero 到第二屏只负责整体画布入场。

### 动画结构

- 用户从 Hero 往下滚动时，Hero 先被固定在视口中。
- Featured Categories 作为下一张“大画布”从视口底部向上推入。
- 新画布进入时覆盖 Hero，而不是简单把 Hero 往上挤走。
- Hero 背景视频和标题在转场过程中可以轻微变暗、轻微缩放或降低透明度，让下一屏成为视觉焦点。
- Featured Categories 初始可以带轻微缩放，例如 0.92 - 0.96，进入过程中放大到 1。
- Featured Categories 容器可以保留大圆角、柔和外发光 / 阴影，像一张高级品牌海报被推到屏幕中央。
- 转场结束后，Featured Categories 占据主视口，进入正常滚动或 section 内交互。
- 转场结束时显示默认 active 状态即可，不要把内部 panel 展开绑定到 Hero scroll 进度上。

### 视觉细节

- Featured Categories 的最终画面参考 `page3.png`。
- 外层需要有黑色舞台背景。
- 内容容器是大幅横向画布，边缘有柔和颗粒感 / 光晕 / 阴影。
- 画布内部左侧是主产品大图和标题，右侧是两个窄图入口。
- 三个产品入口之间可以有暗色遮罩和纵向分割。
- 不要让转场像普通 card slide；它应该像下一张视觉海报从下面被推上来。

### 节奏

- 滚动距离建议约 120vh - 180vh，用来完成 pinned 转场。
- Featured Categories 从底部进入到完全居中约占转场的 60%。
- Hero 淡出 / 变暗约占转场的后 40%。
- 整体速度要跟 Lenis smooth scroll 配合，慢、稳、有重量。
- Mobile 可以简化为普通 slide-up reveal，不强制 pinned 转场。

---

## Section 3 — Featured Categories

### 设计目的

这一段负责让用户知道 DAEHO 主要做什么。

它不是商品列表，而是三个主产品方向的品牌入口。

### 内容

三个类别：

- 우승반지 / Championship Ring
- 경력배지 / Career Badge
- 주문배치 / Custom Badge

### 版式方向

- 使用深色背景。
- 使用大幅横向 visual canvas，而不是普通 section 内容块。
- 默认 active 类别为 `우승반지 / Championship Ring`，大图占画布左侧或中左侧。
- inactive 类别压缩为右侧窄竖向 panel，例如 `임관반지`、`주문제작`。
- 图片以背景图方式铺满 panel，使用暗色 overlay、纵向分割和裁切制造层次。
- 当前 active 类别图片更亮、信息更多，其他图片更暗、信息更少。
- `CLICK` CTA 使用半透明胶囊或细描边按钮，视觉保持轻，不像电商按钮。

### 交互方向

- hover / focus 某个类别时，该类别从窄 panel 横向展开为 active panel。
- 原 active panel 同步收缩成窄 panel。
- 主图、标题、说明和 CTA 随 active 状态切换。
- active panel 宽度最大，建议约占画布 55% - 65%；inactive panel 保持窄竖条，只露出背景裁切和短标题。
- panel 切换时，上一张 active panel 横向收窄，下一张 inactive panel 横向展开；图片使用 cover 裁切和 object-position 位移，不允许拉伸变形。
- inactive panel 的文字保持少量信息，例如小 label 和标题；active panel 才显示完整标题、短说明、虚线装饰和 `CLICK` CTA。
- active 文案出现顺序：小 label / 类别标题先出现，虚线或装饰线随后出现，CTA 最后 fade / slide in。
- 切换必须慢、顺滑。
- 图片只做轻微 zoom，不做大幅放大。
- Desktop 可以支持 scroll 进入时自动展开第一个 active panel，随后 hover / focus 切换；Mobile 改为纵向 stacked cards 或横向 swipe，不做复杂 panel expansion。

---

## Section 4 — Legacy / Proof Bento

> 如果不把 Opening Intro 计入正式滚动 section，本段是 HOME 的第三个正式内容 section。

### 设计目的

这一段负责证明 DAEHO 的可信度。

它应该像 luxury infographic，不像 dashboard。

这一段的核心不是“展示很多数据”，而是让用户在短时间内感受到：

- DAEHO 有长期稳定的制作经验。
- DAEHO 能独立完成从设计到制作、检品、交付的完整流程。
- DAEHO 的交付可信度可以被数字证明。
- DAEHO 不是普通供应商，而是高端定制纪念产品和冠军文化项目的制作伙伴。

### 内容

数据：

- 38년의 업력
- 100% 전공정 자체 진행
- 0% 납품사고
- 20,000+ 누적 납품
- 5,000+ 매년 제작

左上角 introduction card：

- `DAEHO PROOF`
- `Crafted to endure.`
- `정밀 제작과 안정적인 납품으로 증명된 신뢰.`

左上角不要继续保留“空白区域”文字，也不建议再加入一个普通数字。它应该作为整个 bento 的品牌叙事入口，用来建立珠宝品牌感、历史感和信任基调。

### 版式方向

- 使用 Bento Grid，整体参考 `page4.svg`。
- 桌面端保持横向宽幅比例，视觉上接近一张 luxury infographic poster。
- 整体分为左侧窄列、中间大列、右侧大列，并保留底部右侧红色 CTA。
- 左上角使用浅灰 / warm gray / ivory 介绍卡片，与深蓝数据卡形成明暗对比。
- 左上卡片可以加入淡金色戒指弧线、`1986` 印章或金属反光细节，但必须保持克制。
- 深蓝数据卡使用 `#00254F` 作为主色，可叠加非常轻的径向高光或暗蓝渐变。
- 卡片圆角建议 `14px - 16px`，卡片之间使用非常窄的 gap，但不要额外加黑色底板；gap 应该透出官网页面原本的背景。
- 红色 CTA 保留 `Inside AKFA / Learn more`，作为视觉锚点和下一步入口。
- 使用线性图标、地图、盾牌、流程图、机械臂、工厂线稿作为低透明背景图形。
- 大数字要清楚、有重量，但避免变成 SaaS dashboard KPI。

桌面布局分配：

- 左上：品牌介绍卡片，浅色背景，负责建立高级珠宝和信任叙事。
- 左下：`20,000+ 누적 납품`，深蓝大卡，强调累计交付规模。
- 中上：`38년의 업력`，深蓝横向卡，强调历史与经验。
- 中下：`0% 납품사고`，深蓝横向卡，强调交付稳定性。
- 右上：`100% 전공정 자체진행`，深蓝横向卡，强调完整自有流程。
- 右中：`5,000+ 매년 제작`，深蓝横向卡，强调持续制作能力。
- 右下：红色 `Inside AKFA / Learn more` CTA。

### 交互方向

- 动效参考：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-proof-bento-grid-reference.mov`。
- 本 section 不单独设置背景色，也不加黑色或浅灰舞台；外层容器保持 `background: transparent`，原来页面是什么背景就透出什么背景。
- 入场动画只作用在每张 bento 卡片本身，不通过额外背景层制造转场。
- 最终采用 `方案一：Shuffled slide-in`。`方案二：Scroll opacity reveal` 仅作为备选记录，当前实现不要使用。
- 以下两个 motion 方案不要混合实现。

#### 方案一：Shuffled slide-in（最终采用）

- 进入时不做普通 fade-up，而是使用 bento grid 滑动衔接入场。
- 方案一由 scroll trigger 触发，但不由 scroll progress 控制动画进度。
- 当该 section 到达指定视口位置时触发，例如 section top 进入 viewport `60% - 70%` 区域。
- 触发后自动播放一次完整的 time-based slide animation；用户继续滚动或轻微反向滚动时，不 scrub、不倒放。
- 可用 IntersectionObserver 或 GSAP ScrollTrigger 实现；如果使用 ScrollTrigger，`scrub: false`，`toggleActions` 应为只播放一次的逻辑。
- 触发后约 `300ms` 开始动画。
- 卡片不要同一时间全部出现；需要有明显先后时间点，回应甲方要求：`나오는 시간이 달랐으면 좋겠어 그리고 각방향에서`。
- 出现顺序不要按左上到右下、也不要按阅读顺序一个一个出现；使用 curated shuffled stagger，让卡片从不同方向交错汇聚。
- 推荐每张卡片错开约 `80ms - 120ms`，整体 stagger spread 控制在约 `500ms - 650ms` 内，避免节奏拖沓。
- 右上 `100% 전공정 자체진행` 从右上方向进入：`translateX(120px) translateY(-80px)`，delay `0ms`。
- 左侧 `20,000+ 누적 납품` 从左侧进入：`translateX(-120px)`，delay 约 `90ms`。
- 中上 `38년의 업력` 从上方进入：`translateY(-120px)`，delay 约 `180ms`。
- 底部 CTA 从右下方向进入：`translateX(80px) translateY(80px)`，delay 约 `270ms`。
- 左上介绍卡片从左上方向进入：`translateX(-120px) translateY(-80px)`，delay 约 `360ms`。
- 右中 `5,000+ 매년 제작` 从右侧进入：`translateX(120px)`，delay 约 `450ms`。
- 中下 `0% 납품사고` 从正下方垂直进入：`translateX(0) translateY(120px)`，delay 约 `560ms`。
- 每张卡片入场时长约 `700ms - 900ms`。
- easing 使用 `cubic-bezier(0.22, 1, 0.36, 1)`。
- 卡片入场同时 opacity 从 `0` 到 `1`。
- 动画完成后组件完全静止并保持存在，不循环、不回放。

#### 方案二：Scroll opacity reveal（备选，不采用）

- 方案二不是滑动进入；卡片从一开始就在最终 bento 位置。
- 动画由用户下滑进度驱动，不是页面加载后自动播放。
- 初始状态所有卡片 `opacity: 0`，没有 `translate`、没有 `blur`、没有 `scale`、没有 `clip-path`。
- 随着页面向下滚动，卡片按打乱的时间点逐渐从透明变为实体。
- 到达该 section 的 reveal 区间末端时，所有卡片必须完全显现为 `opacity: 1`。
- 全部显现后必须保持存在，不再随反向滚动变透明。
- 该 reveal 动画只出现一次；完成后锁定状态，不循环、不回放。
- 推荐使用 scroll progress 计算每张卡片 opacity，而不是 CSS keyframe 自动动画。
- 透明度变化可以使用轻微 ease-out，但视觉上只表现为透明度变化。
- 推荐 shuffled reveal 起点：
  - 右上 `100% 전공정 자체진행`：`0.00`
  - 左侧 `20,000+ 누적 납품`：`0.08`
  - 中上 `38년의 업력`：`0.18`
  - 底部 CTA：`0.30`
  - 左上介绍卡片：`0.40`
  - 右中 `5,000+ 매년 제작`：`0.50`
  - 中下 `0% 납품사고`：`0.62`
- 每张卡片的 reveal range 建议约 `0.30 - 0.36` scroll progress，避免闪现，也避免拖太久。
- 方案二不要继承方案一的方向位移参数；方案一的 `translateX / translateY` 只属于 slide-in 版本。

- 数字可以在卡片入场后做轻微 count up，但速度必须慢，且不能抢过整体入场节奏。
- 线性 icon 可以在卡片稳定后轻微 fade in 或 line reveal，透明度保持低。

#### Hover

- CTA 红色卡片 hover 时轻微 `scale(1.02)`，transition 约 `200ms ease`。
- 其他卡片 hover 时背景颜色轻微加深或亮度提升，transition 约 `200ms`。
- hover 不使用弹跳、强缩放、霓虹发光或游戏 UI 效果。

Mobile：

- 移动端不要硬压缩桌面 bento。
- 建议改为纵向堆叠或两列数据流：
  1. 品牌介绍卡片全宽
  2. `38년` / `100%` 双列
  3. `20,000+` 全宽
  4. `0%` / `5,000+` 双列
  5. `Inside AKFA` CTA 全宽
- 移动端保留卡片滑入和 fade，但减少复杂 pinned scroll 与过多 line reveal。

---

## Section 5 — Recent Projects

### 设计目的

这一段负责展示真实成果，让用户看到 DAEHO 与冠军团队、比赛、奖项和纪念产品的连接。

### 视觉方向

- 背景可以从深色切换到白色或 warm white。
- 版式更像 editorial portfolio。
- 使用 staggered gallery。
- 图片之间留白充足。
- 可以把冠军团队照片和戒指贴图结合。

### 当前动效方案

详细动效记录见：

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/08_home_recent_projects_motion.md`

- 从上一段 Legacy / Proof Bento 进入时，上一段画面保持视觉钉住，同时变暗、轻微缩小并向上后退。
- `Recent Projects` 的 warm white 画布从底部推入，初始带轻微圆角和缩放，落位后铺满视口。
- `RECENT PROJECTS` 小标题先进入，项目图随后 stagger reveal。
- 冠军戒指贴图叠在项目图右下角，并做非常轻的 floating motion。
- 项目图下方加入细描边 `VIEW MORE` 链接，导向 `/news`。
- 下方 `BRAND OFFICIAL` 不做静态 logo 墙，而是三行慢速 marquee；第 1、3 行向左，第 2 行向右。
- 移动端不强行保留重 pinned 效果，而是让白色画布更早推入、上一段更晚退场，保证触摸快速滚动时不会出现黑色空场。
- 移动端项目图改为横向 swipe reel，右侧露出下一张项目，保留 portfolio reel 的连续感。

### 不要做

- 不要做成普通新闻卡片。
- 不要密集铺满图片。
- 不要把项目做成电商商品列表。

---

## Header 细节

Desktop：

- HOME Hero 顶部栏是专用布局，不完全沿用其他页面的通用左 logo Header。
- 左上角：DAEHO。
- 右上角：`대호` / `OH` / `VULCAN` 三个站点链接。
- 右上角靠边：globe language icon，只显示图标，不显示 LANGUAGE 文案。
- 点击 globe icon 后打开 KR / EN / CN 语言选择浮层。
- 不显示 LOGIN。
- 顶部中间偏下：HOME / CHRONICLE / LEGACY / SPECIALTY / NEWS / GOLF。
- HOME active 状态使用半透明灰色胶囊。
- 当前页面 category 的 active 胶囊需要常驻；其他 category hover 时出现更淡的半透明白色胶囊，离开后淡出。
- Typography 要细、字距宽、留白足。
- 顶部栏与 blueprint 背景融合，不要加厚重底色。

Mobile：

- 顶部只保留居中 DAEHO 作为主 logo。
- 底部使用 MENU 按钮。
- 站点链接、LANGUAGE、主导航都收进 MENU 面板。
- 不显示 LOGIN。
- 导航展开后保持深色、高级、低噪音。

---

## 设计讨论待确认

1. HOME Hero 视频背景的具体内容：只做 blueprint 线稿运动，还是加入戒指细节和镜头推进。
2. Hero 主标题是否确定使用 `DESIGN TO BE REMEMBERED`。
3. Featured Categories 三个类别是否就是 우승반지 / 경력배지 / 주문배치。
4. Legacy / Proof Bento 是放在首页，还是只做一个 preview 然后导向 LEGACY。
5. Recent Projects 是否使用真实团队照片，还是先用视觉 placeholder。
6. Opening Intro 是否只首次访问播放，还是每次刷新都播放。
