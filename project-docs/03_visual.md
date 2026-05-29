# Visual System（视觉系统）

---

# 0. Design Source（当前设计依据）

当前视觉系统基于以下粗略设计图继续完善：

* HOME：`/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`
* LEGACY：`/Users/tingyouzhao/Desktop/戒指/LEGACY PLAN 1.png`
* LEGACY / credibility：`/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`
* LEGACY / credibility scroll sheet 01：`/Users/tingyouzhao/Desktop/戒指/素材/Group 39.svg`
* NEWS：`/Users/tingyouzhao/Desktop/戒指/NEWS PLAN 1.png`
* SPECIALTY / technique：`/Users/tingyouzhao/Desktop/戒指/TECHNIQUE PLAN 1.png`
* SPECIALTY / collection：参考 `TECHNIQUE PLAN 1.png` 右侧产品展示页面
* GOLF：`/Users/tingyouzhao/Desktop/戒指/GOLF PLAN 1.png`

CHRONICLE、SPECIALTY 父级页面以及 LEGACY 的 loyalty / achievement 独立子页面暂未提供完整设计图，需要沿用本视觉系统补齐。

---

# 0.1 Category Visual Role（栏目视觉角色）

## HOME

HOME 是第一印象页面，负责建立黑场、冠军戒指、品牌影片、核心产品和品牌信任度的整体世界观。视觉应最有冲击力。

## CHRONICLE

CHRONICLE 是时间线页面，视觉应偏历史、档案、图纸、旧照片、年份节点和品牌发展脉络。不要做成普通公司简介。

## LEGACY

LEGACY 是信任资产页面，视觉可以比 HOME 更明亮和庄重。浅色 Hero 负责建立“被证明过的品牌”感，深色横向数据 panel 负责强化结果与可信度。

LEGACY 的 3 个子栏目视觉区分：

* loyalty：长期关系、客户陪伴、持续合作，画面更温和、有历史感。
* credibility：流程、检品、交付、稳定性，画面更理性、干净、专业。
* achievement：冠军案例、交付数量、代表项目，画面更有荣誉和庆典感。

### LEGACY / credibility visual direction

credibility 独立页的视觉参考是 `/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`。

页面前半段使用强烈的明暗切换：

* 页面不再先做单独 Hero，进入后直接从卷轴第一屏开始。
* 第一张卷轴使用用户提供的黑夜 / 白天 PNG，占满 `100vw × 100svh`，不是小画框。
* 顶部栏统一使用 Home 顶部栏视觉，`LEGACY` 为 active。
* 后续内容随着滚动像横向卷轴一样展开，不是普通横向 panel。
* proof sequence 背景从 day tone 逐渐进入 night tone：先是 warm white / proof archive，再进入 charcoal / deep gray 的深色证明展厅。
* proof sequence 的信息重点依次为 `38년의 업력`、`100% 전공정 자체 진행`、`0% 납품사고`、`20,000+ 누적 납품`。
* red accent 用于历史 / 风险控制类信息，例如 `38` 和 `0%`；green accent 用于正向 proof / 规模类信息，例如 `100%` 和 `20,000+`。
* 线稿 icon 应保持统一笔触、低透明度和工程图感，不要使用彩色插画或普通 icon card。
* 卷轴素材需要白天版和黑夜版。正式实现不要只用整图 invert；如果 SVG 内部元素可拆分，使用主题变量控制；如果不可拆分，需要单独导出两套调色资产。

credibility 页面可以比 LEGACY 总页更理性、更接近 proof archive，但仍然要保留 DAEHO 的高端珠宝和冠军品牌气质。

## SPECIALTY

SPECIALTY 是专业能力入口。视觉应连接工艺过程与产品成果，核心气质是 precision、craft、proof。

## SPECIALTY / technique

Technique 页面视觉偏冷静、专业、流程化。深蓝黑背景、蓝色时间线节点、灰阶工艺照片可以作为主要视觉语言。

## SPECIALTY / collection

Collection 页面视觉偏产品 / 项目 campaign。使用大产品图、黑金光影、拆解视图、播放按钮和底部价值 icon，重点展示代表项目和产品成果。

## NEWS

NEWS 页面比其他页面更轻，使用白色或米白背景，保持 editorial magazine 风格。文章卡片要干净，不做普通博客模板。

## GOLF

GOLF 页面是独立产品线，视觉更偏运动精品、黑金奢侈品、配饰 campaign。产品图要有速度感、金属感和收藏价值。

---

# 1. Brand Visual Direction（品牌视觉方向）

本项目不是传统企业官网。

整体方向应偏向：

* Luxury（奢侈感）
* Cinematic（电影感）
* Editorial（杂志感）
* Premium Craftsmanship（高级工艺感）
* Heritage（传承感）
* Championship Culture（冠军文化）
* Modern Minimalism（现代极简）

整体网站体验应接近：

* 高端腕表品牌
* 奢侈珠宝品牌
* 豪华汽车官网
* 高级 fashion campaign
* 高端体育冠军文化品牌

网站应该更像：

“高端品牌 campaign 展示”

而不是：

“普通商城网站”。

---

# 2. Visual Mood（整体视觉气质）

网站需要传达：

* 荣誉感
* 稀缺感
* 高级定制感
* 精密工艺感
* 历史感
* 冠军荣耀

整体氛围：

* 深色
* 沉浸式
* 克制
* 有力量感
* 高级
* 有电影镜头感

避免：

* Startup 风格
* SaaS Dashboard 感
* 廉价电商 UI
* 彩色科技感
* 过度互联网产品化

---

# 3. Layout System（布局系统）

## Layout Style

整体布局采用：

* Editorial Layout（杂志式布局）
* Asymmetric Layout（非对称布局）
* Split Layout（分屏布局）
* Showcase Layout（展示型布局）
* Scroll Storytelling（滚动叙事）

布局重点：

* 大量留白
* 强视觉层级
* 图片主导
* 内容密度低
* 视觉节奏感明显

---

## Section Rhythm

Section 之间需要：

* 有呼吸感
* 有停顿感
* 不要紧凑堆积

每个 section：

* 都像独立品牌海报
* 都有独立视觉重点

---

## Grid Rules

桌面端：

* Wide cinematic layout
* 不规则错位布局
* Bento-style blocks
* Editorial composition

避免：

* 普通商城 grid
* 死板列表
* 信息堆叠

---

# 4. Typography System（字体系统）

## Typography Mood

字体气质：

* 高级
* 克制
* 有留白
* 有杂志感
* 不厚重
* 不科技 startup 化

---

## Heading Style

标题：

* 大字号
* 强留白
* Uppercase 优先
* 高对比度
* 少字高冲击

Hero 标题：

* 要像电影海报
* 要有视觉统治力
* 要有呼吸感

---

## Body Text

正文：

* 简洁
* 低信息密度
* 不长篇堆积

整体阅读体验：

* calm
* premium
* organized

---

## Typography Rules

避免：

* 粗黑 startup 字体
* 超密集正文
* 廉价电商促销感

推荐：

* Elegant Serif
* Luxury Sans-serif
* Thin typography
* Spacious typography

---

# 5. Color System（颜色系统）

## Primary Colors

主背景：

* Bright color
* White
* Dark Navy
* Deep Black
* Charcoal Black
* Dark Navy Black

辅助背景：

* White
* Dark Navy
* Metallic Gray
* Luxury Gray
* Soft Dark Gradient

点缀色：

* Gold
* Orange
* Champagne Gold
* Warm Metallic Gold

文字：

* White
* Soft Gray
* Muted Gold Accent

---

## Color Usage Rules

金色：

* 只能作为强调
* 不允许大面积铺满
* 保持克制高级感

避免：

* 亮黄色
* 高饱和土豪金
* 低端金属感

整体网站必须：

* 根据页面内容在 bright / white 与 dark navy / black 之间切换
* 克制
* 有高级品牌感

---

# 6. Image Direction（图片视觉方向）

## Photography Style

图片风格：

* Cinematic
* High Contrast
* Premium Lighting
* Luxury Campaign Feeling

产品图：

* 强调材质
* 强调反光
* 强调工艺
* 强调收藏品感

---

## Product Presentation

戒指展示：

* 要有悬浮感
* 要像奖杯
* 要像高端腕表广告

推荐：

* 深色背景
* 聚光灯效果
* 金属反射
* 高级阴影

---

# 7. Hero Section Rules（首页首屏规则）

## Home Opening Rule

HOME 顶部深色区域是开场动画。

开场动画视觉顺序：

* 深色黑场
* 中央 `DAEHO` logo 模糊出现
* logo 从模糊变清晰
* logo 一边缩小一边移动到 Hero 顶部栏居中 `DAEHO` 位置
* Header 和正式 HOME 页面内容出现

这个 opening 要像奢侈品牌影片的开头，不能像普通 loading、splash screen 或科技产品启动页。

HOME Hero 顶部栏最新视觉：

* `DAEHO` 居中放置，作为顶部栏主 logo。
* 主导航位于 logo 下方一排。
* 左上角使用 `대호` / `OH` / `VULCAN` 三个站点链接。
* 这三个文字是可点击链接组，不是装饰文字。
* 右上角使用白色描边胶囊按钮承载 LANGUAGE / LOGIN。
* 顶部栏覆盖在 blueprint 背景上，不加厚重实色底。
* Hero 背景最终是视频背景，当前图只是 poster / 静态占位。
* 视频要呈现 blueprint / technical drawing 的轻微运动，不要变成普通静态图片区。

---

Hero 必须：

* 沉浸式
* Fullscreen
* 强视觉冲击
* 少文字
* 强氛围感

推荐：

* 视频背景
* 慢速 zoom
* 镜头推进
* 黑场 reveal
* cinematic opening

---

## Hero Motion Mood

Hero 动画：

* 慢
* 有重量
* 有惯性
* 有镜头语言

不要：

* startup landing page 风
* 快速切换
* 花哨科技动画

---

# 8. Showcase Section Rules（展示区域规则）

## Hero To Showcase Transition

HOME 从 Hero 滚动到 Featured Categories 时，需要使用参考视频式转场：

* Hero 先被固定在视口中。
* 下一屏从底部向上推入，覆盖 Hero。
* 下一屏像一张大幅品牌海报，而不是普通 section 接在下面。
* 进入时可有大圆角、柔和阴影、轻微缩放。
* Hero 背景在转场过程中轻微变暗，让下一屏成为主视觉。

参考视频：

`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`

---

产品展示区：

* 更像 gallery
* 更像 luxury editorial
* 不像商城列表

推荐：

* 错位布局
* 大图
* 悬浮产品
* 分屏结构
* Bento showcase

---

# 9. Recent Projects Rules（项目展示规则）

Recent Projects：

* 要像艺术展
* 要像作品集
* 要有收藏品感

布局：

* staggered layout
* editorial composition
* 大量留白

动画：

* 丝滑 reveal
* stagger motion
* slow cinematic transition

---

# 10. Statistics / Feature Section Rules

数据区域：

* 使用 Bento Layout
* 类似 luxury infographic

避免：

* dashboard 感
* SaaS 数据面板

推荐：

* 大数字
* 极简 icon
* 黑金高级感

---

# 11. Motion Visual Direction（动画视觉方向）

## Motion Mood

动画整体必须：

* 慢
* 顺滑
* 有重量
* 有呼吸感
* 有镜头感
* 沉浸式

避免：

* exaggerated bounce
* startup motion
* gaming UI effect
* 低端炫技

---

## Scroll Behavior

滚动必须：

* 有惯性
* 有重量
* 有沉浸感

推荐：

* Lenis smooth scroll
* GSAP ScrollTrigger
* subtle parallax
* cinematic section transition

---

## Reveal Rules

Reveal 推荐：

* opacity fade
* upward movement
* slight scale
* stagger timing
* smooth easing

避免：

* instant popup
* harsh transition
* aggressive motion

---

# 12. Hover Interaction Rules

Hover：

* subtle
* elegant
* restrained

推荐：

* slight zoom
* glow shift
* opacity transition
* smooth floating

避免：

* 大幅 hover 放大
* neon 发光
* 游戏 UI 效果

---

# 13. Component Visual Rules

## Cards

卡片：

* 图片优先
* 少边框
* 大视觉比例
* 有悬浮感

---

## Buttons / CTA

按钮：

* 克制
* 高级
* 细边框
* 微动画

不要：

* 大面积彩色按钮
* 电商促销按钮

---

## Navigation

导航栏：

* Thin typography
* Calm spacing
* Minimal interaction
* Luxury brand style

---

# 14. Responsive Design Rules（响应式适配规则）

本项目必须支持响应式适配。

---

## Breakpoints

建议断点：

* Desktop：1440px+
* Laptop：1024px - 1439px
* Tablet：768px - 1023px
* Mobile：375px - 767px

---

## Desktop Rules

桌面端是主体验。

要求：

* 保留完整电影感布局
* 保留完整 scroll storytelling
* 保留高级 motion
* 大视觉冲击
* 强沉浸感

适配：

* 1440px
* 1920px
* Ultrawide

---

## Tablet Rules

平板端：

* 保留品牌感
* 简化复杂布局
* 多列可改两列

动画：

* 减少 heavy motion
* 保留基础 reveal

---

## Mobile Rules

移动端必须适配。

要求：

* 所有 section 改纵向堆叠
* Hero 保留视觉冲击
* 字体保持层级
* CTA 易点击
* 图片不压缩变形
* Bento 改单列
* Gallery 改纵向

复杂动画：

* 可以简化
* 但不能失去高级感

---

## Mobile Motion Rules

移动端：

* 减少 parallax
* 减少复杂 timeline
* 减少 heavy GSAP

保留：

* fade in
* slide up
* smooth reveal

优先：

* 性能
* 顺滑
* 可读性

---

## Responsive Priority

优先级：

1. 不破坏品牌感
2. 不破坏视觉层级
3. 不出现横向滚动
4. 保持高级感
5. 保持图片比例
6. 保持动画顺滑

---

# 15. Technical Visual Direction（视觉技术方向）

视觉实现推荐技术：

* Next.js
* React
* Tailwind CSS
* Framer Motion
* GSAP ScrollTrigger
* Lenis Smooth Scroll

当前阶段的前端设计与实现计划以 `project-docs/05_tech.md` 为准：先采用 React / Next.js 搭建官网前台，后端、数据库和后台管理暂不考虑。

动画原则：

* GSAP：复杂 scroll storytelling
* Framer Motion：组件 reveal / hover
* Lenis：smooth scroll
* CSS：基础 transition

---

# 16. Final Goal（最终目标）

最终网站应该：

“不是普通网页，

而像进入一个高端冠军品牌世界。”

整体体验需要接近：

* 奢侈品牌官网
* 高端 campaign
* 沉浸式品牌电影
* 冠军文化展示空间
