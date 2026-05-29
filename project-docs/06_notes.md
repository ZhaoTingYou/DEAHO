# 06_notes.md — Project Notes

## 用户偏好

喜欢：

- 慢速 scroll
- 呼吸感
- 镜头推进
- 高级感
- 黑色电影感
- 产品材质细节
- 冠军文化和荣誉感
- 不是普通网页的沉浸体验

不喜欢：

- startup 风
- 过度科技感
- 太快的 transition
- 普通电商感
- SaaS dashboard 感
- 廉价金色
- 信息堆太满

---

## 已确认的信息架构

主 category：

- HOME
- CHRONICLE
- LEGACY
- SPECIALTY
- NEWS
- GOLF

LEGACY 子 category：

- loyalty
- credibility
- achievement

SPECIALTY 子 category：

- technique
- collection

---

## 当前设计图状态

已提供粗略设计图：

- HOME PLAN 1：`/Users/tingyouzhao/Desktop/戒指/素材/HOME PLAN 1.png`
- LEGACY PLAN 1
- LEGACY / credibility：`/Users/tingyouzhao/Desktop/戒指/素材/credibility.png`
- LEGACY / credibility 卷轴第一页：`/Users/tingyouzhao/Desktop/戒指/素材/Group 39.svg`
- NEWS PLAN 1
- TECHNIQUE PLAN 1
- GOLF PLAN 1

未完整提供设计图：

- CHRONICLE
- SPECIALTY 父级页面
- LEGACY / loyalty 独立页面
- LEGACY / achievement 独立页面

处理方式：

- 已有设计图的页面优先按照图完成。
- 未完成设计图的页面，先按 `02_pages.md` 的结构说明实现基础信息架构。
- 后续如果补充 Figma 或截图，再替换为更准确的视觉描述。

---

## 内容方向备注

### HOME

首页需要像品牌 campaign，不像产品列表。

详细讨论文档：`project-docs/07_home.md`

重点：

- 最上面的深色区域是开始动画。
- 开始动画中，`DAEHO` 先在画面中央从模糊变清楚。
- 清楚之后，`DAEHO` 一边缩小一边移动到 Hero 顶部栏居中的 logo 位置。
- logo 到位后，正式页面内容展示出来。
- Hero 顶部栏最新设计：DAEHO 居中，导航在下方，左上角为 `대호` / `OH` / `VULCAN` 三个站点链接，右上角为 LANGUAGE / LOGIN。
- Hero 背景最终是视频背景，现在看到的 blueprint 图片只是设计占位 / poster。
- Hero 向下滑动到下一个 section 时，动画参考 `/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`：Hero 固定，下一屏从底部向上推入并覆盖 Hero。
- 第一眼看到 DAEHO 和冠军戒指。
- 用户马上感受到高端、定制、冠军、工艺。
- 首页负责建立品牌 tone & mood、核心产品和信任度，并导向 Legacy、Specialty、Collection、News 和 Golf。

### CHRONICLE

适合讲品牌历史和时间线。详细页面规格见：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/10_chronicle.md`。

当前已完成基础实现方向：

- 独立 opening logo ring。
- opening 通过 logo blur + opacity、遮罩淡出、页面柔焦浮现完成衔接。
- Desktop 使用 pinned horizontal timeline。
- 年份导航固定在 viewport 左侧，不跟随卷轴移动。
- 四个年份节点对应四个板块：`1994 / 2001 / 2012 / 2026`。
- 支持 day / night 两套主题，day mode 已统一到 Home 的冷白 / 浅蓝 / 品牌蓝体系。
- Mobile 改为纵向时间线，并保留固定年份导航。

### LEGACY

核心是证明品牌可信。

`/legacy/credibility` 已根据设计图整理独立详细规格：`project-docs/09_legacy_credibility.md`。

补充方向：

- credibility 的 proof 动画是卷轴式展开，不是普通横向 panel carousel。
- 页面直接从卷轴第一页开始，不再先做独立 Hero。
- 卷轴第一页使用用户提供的 day / night 全屏 PNG；`Group 39.svg` 保留为早期素材参考。
- 顶部栏统一按 HOME 顶部栏视觉执行。
- 内部动画没有单独外部参考时，应参考当前网站已有 motion 语言：慢速、顺滑、有重量、scroll-driven、cinematic reveal。

可以围绕：

- 38 年经验。
- 100% 自主流程。
- 0% 交付事故。
- 20,000+ 累计交付。
- 5,000+ 年度制作。

子栏目关系：

- loyalty：长期关系和客户信任。
- credibility：流程、品质、交付稳定性。
- achievement：成果、数据、冠军案例。

### SPECIALTY

核心是证明品牌专业。

Technique 讲过程，Collection 讲代表项目和产品成果集合。

### NEWS

当前 NEWS 设计图偏 editorial / magazine。已实现 `/news` 前端页面。

当前实现包括：

- 全站统一顶部栏。
- day / night 两套主题。
- blueprint 背景氛围。
- featured story。
- 分类筛选。
- Latest / Oldest 排序切换。
- 文章卡片 grid。
- 文章详情页 `/news/[slug]`。
- 详情页包含大图、文章信息侧栏、正文、quote 和 related stories。
- Mobile 单列适配和全站 mobile menu。

后续真实内容可以包括：

- 브랜드 스토리
- 제작 과정
- 프로젝트 사례
- 인터뷰
- 챔피언십 소식
- DAEHO behind the scenes

### GOLF

GOLF 是独立产品线。

要强调：

- premium customized golf bracelet
- form of the game
- shaft color
- crafted to last
- more than a bracelet, a statement

---

## 待补充素材

建议后续准备：

- DAEHO logo 原始文件。
- HOME Hero blueprint / technical drawing 视频。
- HOME Hero 视频 poster 静态图。
- HOME Hero 到 Featured Categories 转场参考视频：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-hero-to-featured-transition.mov`
- HOME Featured Categories hover panel 参考视频：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-featured-categories-hover-panels.mov`
- HOME Legacy / Proof Bento grid 参考视频：`/Users/tingyouzhao/Desktop/deaho官网/project-docs/video/home-proof-bento-grid-reference.mov`
- Featured Categories 静态参考：`/Users/tingyouzhao/Desktop/戒指/素材/page3.png`
- 戒指透明底产品图。
- Golf bracelet 透明底产品图。
- 工艺流程照片。
- 制作现场照片。
- 客户案例 / 冠军团队照片。
- 品牌影片或制作影片。
- NEWS 文章真实封面图。
- CHRONICLE 历史资料图。

---

## 开发注意事项

- 不要为了填空而使用无关图片。
- 不要加购物车、价格、促销标签。
- 不要把 Collection 做成电商商品列表。
- 不要把 NEWS 做成普通博客模板。
- 不要把 Legacy 数据做成后台 dashboard。
- 保持所有页面的统一 Header 和品牌节奏。
- 页面可以有中英文混排，但韩语是首选语言。

---

## 推荐下一步

1. 确认 `02_pages.md` 中的路由是否采用独立子页面，还是先做 anchor section。
2. 补充 CHRONICLE 的真实历史素材，替换当前占位图。
3. 确认 LEGACY 三个子 category 是否需要独立页面设计。
4. 整理图片素材到 `public/images/`。
5. 按 `05_tech.md` 先搭建 React / Next.js 前端项目骨架。
6. 开始做 HOME 和全站 Header，因为它们会定义整体网站基调。
7. 后端、数据库、后台管理等内容等前端视觉和页面结构稳定后再规划。
