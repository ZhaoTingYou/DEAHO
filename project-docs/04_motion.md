# 04_motion.md — Motion / Interaction Direction

## Motion Goal

DAEHO 的动效不是为了炫技，而是为了让用户感觉进入一个高端冠军品牌世界。

整体动效关键词：

- 慢
- 顺滑
- 有重量
- 有惯性
- 有镜头感
- 有呼吸感
- 克制

避免：

- 快速弹跳
- 夸张缩放
- neon 科技感
- 游戏 UI 效果
- 普通 startup landing page 动效

---

## Motion Reference

### M01 Hero Scroll

来源：
`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

参考位置：
首页 Hero

只参考：

- scroll inertia
- background zoom
- text reveal
- 大字 typography 从暗处出现、放大、进入清晰构图的节奏
- cinematic opening
- slow camera push

不要参考：

- 字体
- 颜色
- UI 布局
- 具体品牌元素

建议用于：

- HOME Hero
- GOLF Hero
- COLLECTION Hero

技术建议：

- GSAP ScrollTrigger
- Lenis smooth scroll
- Framer Motion reveal

---

## Global Scroll Behavior

- 全站启用 smooth scroll。
- 滚动速度偏慢，保留高级品牌的重量感。
- section 之间可以有轻微 parallax、fade、scale 或 camera push。
- 不要让滚动过度粘滞，用户仍然需要能顺畅浏览内容。

Desktop：

- 可使用 GSAP 做复杂滚动叙事。
- HOME、LEGACY、GOLF 可以使用横向或 pinned section。

Mobile：

- 减少 heavy pinned scroll。
- 保留 fade in、slide up、image reveal。
- 优先性能和可读性。

---

## Page-Level Motion

### HOME

Opening：

- 页面进入时先出现黑场或深色 opening screen。
- opening screen 初始只展示居中的 `DAEHO` logo。
- `DAEHO` logo 为白色或 soft white，从 blur 状态逐渐变清楚。
- logo 清晰后短暂停留，再从屏幕中央移动到 Hero 顶部栏 `DAEHO` logo 的最终位置，同时缩小到该 logo 的最终尺寸。
- logo 的移动和缩小必须同步发生，避免“先移动后缩小”或“先缩小后移动”的割裂感。
- PC 端当前最终位置为顶部左侧 `DAEHO`；移动端最终位置为顶部居中 `DAEHO`。
- logo 飞行期间，Hero 背景、标题、CTA 和顶部栏从暗处逐步显影。
- logo 到达 Hero 顶部位置后，导航、右上角站点链接组和 language globe icon 轻微 fade in。
- opening screen 向上或向内淡出，正式 HOME Hero 内容出现。
- 这个过程应该像品牌影片开场，不像 loading screen。
- 整体参考当前 opening reference video：黑场、中央 DAEHO、主页从暗处出现、logo 丝滑落位。不要做生硬的 UI 飞行动画。

Hero：

- Hero 背景视频在正式内容出现时轻微 fade in。
- 视频运动要非常慢，像 blueprint / technical drawing 在暗处微微推进。
- 视频可以配合极慢 camera push 或 parallax，但不能影响导航和标题可读性。
- 产品图慢速 scale in 或 floating。
- Hero title 分行 reveal。
- 静态 poster 只作为加载前、移动端性能保护或 reduced-motion fallback。
- PC 端主导航 category 同时存在 current page active state 和 hover state。
- 当前页面对应 category 常驻较明显的半透明白色 / 灰白遮罩；鼠标移动到其他 category 时，目标 category 出现更淡的白色遮罩，离开后淡出。
- hover 遮罩的移动和透明度变化要轻、快、平滑，不覆盖或取消当前页面的 active 遮罩。

Timing guidance：

- logo blur to sharp：约 0.9s。
- logo 清晰停留：约 0.5s。
- logo center to hero logo position + scale down：约 1.45s。
- page reveal：约 0.6s。
- 总时长建议约 3.4s - 3.6s。

Featured Categories：

- 从 Hero 进入 Featured Categories 时使用参考视频式 scroll-pinned 转场。
- Hero 固定在视口中，Featured Categories 从底部向上推入并覆盖 Hero。
- Featured Categories 可以从轻微缩小状态进入，最终放大到正常尺寸。
- Hero 在转场过程中轻微变暗、降低透明度或轻微缩放，避免和新画布抢焦点。
- Featured Categories 外层容器保留大圆角、柔和阴影 / 光晕，像一张高级品牌海报进入视口。
- `/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-featured-categories-hover-panels.mov` 只作为 Featured Categories 内部 hover / focus panel 动画参考，不属于 Hero 到第二屏的衔接动画。
- 转场完成后再进入 Featured Categories 内部的 hover / focus category 切换交互。
- hover / focus 时内部产品 panel 参考该视频做横向展开 / 收缩。
- active panel 由窄竖条扩展为大画面，inactive panel 压缩为窄竖条。
- 上一张 active panel 收缩和下一张 panel 展开需要同步，像一组横向门板在重新分配空间。
- 图片用 cover 裁切和 object-position 位移，不能拉伸变形。
- active panel 文案分层 reveal：label / title 先出现，装饰线随后出现，CTA 最后出现。
- 分类大图随滚动或 active 状态逐个进入。
- hover 时图片微缩放、遮罩透明度变化、CTA 轻微移动。
- 切换分类时保持慢速 crossfade。

Statistics Bento：

- 这一段对应 HOME 的 Legacy / Proof Bento。
- 动效参考：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-proof-bento-grid-reference.mov`。
- 本段不额外铺设独立 section 背景、浅灰舞台或黑色底板；外层保持透明，原页面背景自然透出。
- 最终采用 `方案一：Shuffled slide-in`。`方案二：Scroll opacity reveal` 仅作为备选记录，当前实现不要使用。
- 后期实现时不要把 slide 位移和 scroll opacity reveal 混在一起。

方案一：Shuffled slide-in（最终采用）

- 核心运动不是普通 fade-up，而是 bento grid 从四周向中心汇聚的滑动衔接入场。
- 方案一由 scroll trigger 触发，但不由 scroll progress 控制动画进度。
- 当该 section 到达指定视口位置时触发，例如 section top 进入 viewport `60% - 70%` 区域。
- 触发后自动播放一次完整的 time-based slide animation；用户继续滚动或轻微反向滚动时，不 scrub、不倒放。
- 可用 IntersectionObserver 或 GSAP ScrollTrigger 实现；如果使用 ScrollTrigger，`scrub: false`，`toggleActions` 应为只播放一次的逻辑。
- 触发后约 `300ms` 开始动画。
- 卡片需要有不同出现时间点，不要同一时间全部出现。
- 出现顺序不要按视觉位置或阅读顺序排列；使用 curated shuffled stagger，让卡片从不同方向交错汇聚。
- 推荐每张卡错开约 `80ms - 120ms`，整体 stagger spread 约 `500ms - 650ms`，形成清晰但不拖沓的分批入场。
- 右上卡片从右上方向进入：`translateX(120px) translateY(-80px)`，delay `0ms`。
- 左侧卡片从左侧进入：`translateX(-120px)`，delay 约 `90ms`。
- 中上卡片从上方进入：`translateY(-120px)`，delay 约 `180ms`。
- 底部 CTA 从右下方向进入：`translateX(80px) translateY(80px)`，delay 约 `270ms`。
- 左上介绍卡片从左上方向进入：`translateX(-120px) translateY(-80px)`，delay 约 `360ms`。
- 右侧卡片从右侧进入：`translateX(120px)`，delay 约 `450ms`。
- 中下卡片从正下方垂直进入：`translateX(0) translateY(120px)`，delay 约 `560ms`。
- 每张卡片入场时长约 `700ms - 900ms`。
- easing 使用 `cubic-bezier(0.22, 1, 0.36, 1)`，接近 exponential ease-out。
- 卡片入场同时 opacity 从 `0` 到 `1`。
- 动画完成后完全静止并保持存在，不循环、不回放。

方案二：Scroll opacity reveal（备选，不采用）

- 卡片不从任何方向滑动进入，而是停留在最终 bento 位置。
- 动画由下滑进度驱动：用户往下滑时，卡片逐渐从透明变为实体。
- 初始状态所有卡片 `opacity: 0`。
- 不使用 `translate`、`blur`、`scale`、`clip-path` 或额外遮罩来制造隐身效果。
- 到达该 section 的 reveal 区间末端时，所有卡片必须完全显示为 `opacity: 1`。
- 全部显示后保持存在，不再随用户向上滚动而消失。
- reveal 动画只执行一次；完成后锁定状态，不循环、不回放。
- 推荐用 scroll progress 控制每张卡片 opacity；不要使用页面加载后的自动 keyframe 播放。
- 透明度可以带轻微 ease-out，但视觉语言必须是“透明度浮现”，不是滑入、弹出或模糊显影。
- 推荐 shuffled reveal 起点：
  - 右上卡片：`0.00`
  - 左侧卡片：`0.08`
  - 中上卡片：`0.18`
  - 底部 CTA：`0.30`
  - 左上介绍卡片：`0.40`
  - 右侧卡片：`0.50`
  - 中下卡片：`0.62`
- 每张卡的 reveal range 建议约 `0.30 - 0.36` scroll progress。
- 方案二不要继承方案一的 `translateX / translateY` 或方向参数。

- 数字可以在卡片入场后慢速 count up，但要非常克制。
- icon / line art 可以逐笔 reveal 或 fade in，透明度保持低，作为背景纹理而不是主视觉。
- CTA hover：轻微 `scale(1.02)`，transition 约 `200ms ease`。
- 其他卡片 hover：背景颜色轻微加深或亮度提升，transition 约 `200ms`。

Recent Projects：

- 详细方案见：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/08_home_recent_projects_motion.md`。
- 从上一段 Proof / Bento 到 Recent Projects 使用白色画布推入转场。
- 上一段画面在滚动中轻微后退、变暗、缩小，Recent Projects warm white 画布从底部进入并覆盖。
- `RECENT PROJECTS` 标题先淡入，项目图随后 stagger reveal。
- 项目图采用 editorial reel，不做普通新闻卡片；右侧可以露出下一张作为 continuation preview。
- 戒指贴图做轻微 floating，不弹跳、不夸张旋转。
- 项目图之后出现细描边 `VIEW MORE` 链接，导向 `/news`。
- `BRAND OFFICIAL` 使用三行慢速 logo marquee，第 1、3 行向左，第 2 行向右；hover 时可以暂停并提高 logo 对比。
- Mobile 降低重 pinned 感，白色画布更早进入、上一段更晚退场，避免快速触摸滚动时出现黑色空场。
- Mobile 项目图改为横向 swipe reel，保留下一张露出。

### CHRONICLE

详细页面规格见：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/10_chronicle.md`。

CHRONICLE 使用独立 opening 与横向卷轴时间线，不复用 Home 的 logo 飞行动画。

- Opening 先画出较大的圆形 logo ring，再显示与 Home 顶部栏一致字体的 `DAEHO`。
- logo 清晰后，不使用硬切或突兀发光消失；采用柔焦透明交叉溶解。
- 后面的 timeline 内容提前在底层低亮度、柔焦显现。
- logo 与圆圈单独慢慢 blur + fade，外层 day / night 遮罩逐渐变薄。
- 页面内容最终从柔焦恢复清晰，形成自然的景深拉焦感。
- Desktop 使用 pinned horizontal timeline，scroll progress 驱动横向移动。
- 年份导航和底部进度线固定在 viewport 层，不放进带 transform / filter 的卷轴容器内。
- Mobile 降低 pinned 感，改成纵向板块滚动，年份导航固定在左下方。
- Night mode 使用 dark archive + muted gold；Day mode 使用 Home day 的 cold white / light blue / brand blue。

### LEGACY

Hero：

- 浅色场景中产品图轻微向上浮现。
- 标题保持庄重，不做夸张字效。

Horizontal Legacy Panels：

- Bento / metrics grid 动效参考：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-proof-bento-grid-reference.mov`。
- Desktop 可做横向滚动。
- 每个 panel 进入时数字、说明、icon 分层 reveal。
- 数据 panel 之间需要有停顿感。

Legacy 子栏目：

- loyalty：动效更柔和，适合 timeline、case fade、photo dissolve。
- credibility：动效更精确，适合 line drawing、process reveal、check mark reveal。
- achievement：动效更有仪式感，适合大数字、项目图、奖杯 / 戒指 spotlight reveal。

### LEGACY / credibility

详细页面规格见：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/09_legacy_credibility.md`。

这一页的核心动效是卷轴式展开，不是普通 horizontal panels，也不直接照搬 HOME 的 proof bento。内部动画没有单独外部参考时，应以本站已有的运动语言为准：慢速、顺滑、有重量、scroll-driven、cinematic reveal。

Hero：

- 白色 Hero 中的产品主视觉从下方轻微浮现，位移控制在 `24px - 40px`。
- 标题 `PROVEN WITHOUT EXCEPTION` 使用慢速 fade / slight rise，不做夸张 split-letter。
- 左右产品图可以有非常轻的 parallax，但必须稳定、庄重。

Scroll Proof Sequence：

- Desktop 使用 pinned scroll，进入 proof section 后固定视口，滚动驱动横向卷轴展开。
- `Group 39.svg` 是卷轴第一页素材，进入时应像纸面 / 证明档案被拉开，而不是直接 fade in 成一张图。
- 每个 scroll sheet 接近视口中心时触发内部 reveal：metric 先出现，label 紧随，dashed lines 和线稿 icon 后出现。
- icon 适合使用 stroke-dashoffset / mask 做 line drawing reveal。
- `0%` scroll sheet 的 shield / check mark 可以最后出现 check mark，形成“完成验证”的节奏。
- scroll sheets 之间需要停顿感，不要做成快速 carousel。
- 第一页使用 day tone，后续 proof sequence 可以逐步过渡到 night tone。
- reduced-motion 和 mobile 改为纵向 reveal，不依赖横向滚动阅读核心信息。

### SPECIALTY / technique

- 中央时间线节点随滚动点亮。
- 左右内容块交错进入。
- 工艺图片使用 grayscale to visible 或 opacity reveal。
- 蓝色节点可以有轻微 glow，但必须克制。

### SPECIALTY / collection

- 大产品图慢速推进。
- 产品拆解图可使用 stagger reveal。
- 播放按钮 hover 只做轻微描边和透明度变化。
- 产品 section 切换需要像 campaign 镜头，不像普通 carousel。

### NEWS

- Featured article 左右内容 fade in。
- Filter tabs 切换时文章卡片 crossfade。
- Article cards 轻微 slide up stagger。
- NEWS 页面动效要比产品页更轻，避免影响阅读。

### GOLF

Hero：

- Golf bracelet 产品图从暗处浮现。
- 标题分行慢速 reveal。
- 播放按钮可以有非常轻的 pulse。

Design Detail Slider：

- 细节卡片横向滑动或 fade。
- 箭头点击时使用平滑过渡。

Shaft Color：

- 颜色切换时产品图 crossfade。
- swatch / radio active 状态要清晰但低调。

Crafted / Statement：

- 图片组合随滚动错位 reveal。
- 佩戴场景图可以轻微 parallax。

---

## Interaction Rules

### Button / CTA

- hover：细边框变亮、文字轻微移动、箭头轻微推进。
- active：轻微压低或透明度变化。
- 不使用大面积亮色填充。

### Image

- hover：1.02 到 1.05 的微缩放即可。
- 可以加轻微光影变化。
- 不使用夸张 zoom。

### Video Play Button

- 默认细线圆形。
- hover 时圆环变亮，播放三角轻微移动。
- 可有慢速旋转文字环，但不要抢主视觉。

### Navigation

- hover 使用 underline、淡入背景或细描边。
- 子导航出现要平滑，不要 abrupt。
- 当前页面 active 状态保持克制。

---

## Technical Notes

- Lenis：全站 smooth scroll。
- GSAP ScrollTrigger：Hero、横向 panel、pinned section、复杂时间线。
- Framer Motion：组件进入、hover、filter 切换、普通 reveal。
- CSS transition：按钮、导航、轻量交互。

动效默认 easing：

- `power3.out`
- `power4.out`
- `expo.out`
- Framer Motion 可使用 `[0.16, 1, 0.3, 1]`

动效时长建议：

- 小组件：0.3s - 0.5s
- section reveal：0.8s - 1.2s
- Hero / pinned scene：1.2s - 2.4s

---

## Reduced Motion

必须支持 `prefers-reduced-motion`：

- 关闭 pinned scroll、parallax、count up。
- 保留基础 fade。
- 不影响内容可读性和导航功能。
