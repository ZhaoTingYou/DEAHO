# DAEHO Legacy / Credibility Page Motion Spec

## 0. 项目定位

本动效文档用于 DAEHO 官网 `LEGACY > CREDIBILITY` 页面。  
页面核心不是电商展示，而是通过品牌历史、可信数据、市场地位、交付可靠性、研发能力和全流程体系，传达 DAEHO 的高级品牌感与专业可信度。

### 风格关键词

- Luxury Brand
- Editorial Motion
- Precision
- Calm Confidence
- Heritage
- Engineering
- Smooth Scroll
- Subtle Parallax

### 参考气质

参考 Omega、Porsche、Rolex、Patek Philippe 官网的节奏：  
动效不追求炫技，而是强调克制、高级、稳定、精密。

---

## 1. 全局动效规范

### 1.1 动效原则

| 项目 | 说明 |
|---|---|
| 节奏 | 慢、稳、柔和，不快速闪动 |
| 层级 | 先背景，再主视觉，再标题，再正文，再细节 |
| 质感 | 使用淡入、线条绘制、轻微视差、数字增长 |
| 禁止 | 过度弹跳、过度旋转、粒子爆炸、电商式 hover 放大 |

### 1.2 推荐 Easing

```js
easeOutCubic
easeInOutCubic
easeOutQuart
```

推荐 cubic-bezier：

```css
--ease-luxury: cubic-bezier(0.22, 1, 0.36, 1);
--ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
```

### 1.3 推荐 Duration

| 类型 | 时间 |
|---|---|
| Section 主入场 | 0.9s - 1.4s |
| 标题 reveal | 0.7s - 1.0s |
| 正文 fade-up | 0.5s - 0.8s |
| 数字 count-up | 1.2s - 2.0s |
| SVG 线条绘制 | 1.0s - 1.8s |
| Hover | 0.25s - 0.45s |
| 背景循环 | 8s - 16s |

### 1.4 Scroll Trigger

```js
start: "top 75%"
once: true
```

每个 section 进入视口 25% 左右触发，避免用户刚看到时元素已经全部出现。

---

# 2. Section 01 — Hero / Proven Without Exception

## 页面内容

- 页面：`LEGACY / CREDIBILITY`
- 主标题：`PROVEN WITHOUT EXCEPTION`
- 核心视觉：大理石空间、冠军戒指、奖牌/戒指陈列
- Tab：`Loyalty / Credibility / Achievement`

## 动效目标

让用户进入页面时先感受到“殿堂感”和“品牌权威感”。  
首屏应该像高级品牌广告片的开场，而不是普通网页加载。

## 入场顺序

### Step 1 — 背景空间出现

- 白色建筑空间 / 大理石背景淡入
- 拱门区域有极淡光影从上向下扫过
- Duration: `1.2s`
- Easing: `easeOutCubic`

```css
opacity: 0 -> 1
filter: blur(8px) -> blur(0)
```

### Step 2 — 顶部导航出现

- Logo 与导航从上方轻微下落
- 每个导航项 stagger 出现
- Duration: `0.6s`
- Stagger: `0.05s`

```css
opacity: 0 -> 1
transform: translateY(-12px) -> translateY(0)
```

### Step 3 — 标题分行 Reveal

`PROVEN / WITHOUT / EXCEPTION` 三行依次出现。

推荐使用 clip-path：

```css
clip-path: inset(0 0 100% 0) -> inset(0 0 0 0)
opacity: 0 -> 1
transform: translateY(24px) -> translateY(0)
```

- Duration: `0.9s`
- Stagger: `0.12s`

### Step 4 — 主戒指出现

- 中央主戒指先出现
- 左右小戒指随后从中心向两边轻微展开
- Duration: `1.0s`
- Stagger: `0.12s`

```css
opacity: 0 -> 1
scale: 0.96 -> 1
translateY: 18px -> 0
```

### Step 5 — Tab 出现

- Loyalty / Credibility / Achievement 淡入
- 当前 active 下划线从中心向左右展开
- Duration: `0.45s`

## 循环氛围

### 戒指高光

每 8-10 秒出现一次很轻的宝石高光。

```css
shine opacity: 0 -> 0.35 -> 0
duration: 1.2s
```

### 背景光影

拱门背景非常轻微移动。

```css
background-position: 0 0 -> 12px 0
duration: 12s
repeat: infinite
yoyo: true
```

## 交互

### Tab Hover

- 文字颜色加深
- 下划线从左到右展开

```css
color: #345B7D
line width: 0 -> 100%
```

---

# 3. Section 02 — 38 Years of Experience

## 页面内容

- `38 YEARS OF EXPERIENCE`
- 1986 / 1990s / 2000s / 2010s / 2020s
- 右侧山路成长路径图

## 动效目标

表现 DAEHO 从 1986 年开始不断累积，走向高峰。  
动效重点是“时间积累”和“路线成长”。

## 入场顺序

### Step 1 — 左侧大数字 Count-up

数字从 0 增长到 38。

```js
countUp(0, 38, 1.5)
```

- Duration: `1.5s`
- Easing: `easeOutQuart`

### Step 2 — 标题与正文出现

- `YEARS OF EXPERIENCE` 轻微 fade-up
- 韩文说明淡入

```css
opacity: 0 -> 1
translateY: 18px -> 0
```

### Step 3 — 时间轴绘制

- 横线从左到右绘制
- 年份节点依次点亮
- 文案依次出现

```css
scaleX: 0 -> 1
transform-origin: left
```

- Line duration: `0.9s`
- Node stagger: `0.12s`

### Step 4 — 山路路径绘制

右侧路径从山脚到山顶绘制。

推荐 SVG path：

```css
stroke-dasharray: pathLength;
stroke-dashoffset: pathLength -> 0;
```

- Duration: `1.5s`

### Step 5 — 节点 Icon 出现

- building
- people
- chart
- diamond
- trophy
- flag

```css
opacity: 0 -> 1
scale: 0.85 -> 1
```

- Stagger: `0.18s`

## 循环氛围

### 路径光点

一个小光点沿路径缓慢移动。

```js
motionPath: mountainPath
duration: 7s
repeat: infinite
```

### 山顶旗帜

轻微摆动：

```css
rotate: -1deg -> 1deg -> -1deg
duration: 4s
```

---

# 4. Section 03 — 시장의 기준을 세우다

## 页面内容

- `시장의 기준을 세우다`
- 市场标准、全球证明
- 三个数据：38 年、0%、100%
- 右侧上升柱状视觉

## 动效目标

表达“市场标准建立者”的品牌地位。  
重点是柱子逐步上升，象征市场影响力增长。

## 入场顺序

### Step 1 — 蓝色背景淡入

```css
opacity: 0 -> 1
```

### Step 2 — 左侧标题出现

- 小标签先出现
- 主标题分行 reveal
- 副标题和正文 fade-up

Duration: `0.8s`

### Step 3 — 数据卡片出现

三个数据依次出现：

- 38 년의 업력
- 0% 납품 사고
- 100% 수직계열화

```css
opacity: 0 -> 1
translateY: 20px -> 0
```

- Stagger: `0.15s`

### Step 4 — 右侧柱子生长

大理石柱从底部向上生长：

```css
scaleY: 0 -> 1
transform-origin: bottom
```

- Duration each: `0.45s`
- Stagger: `0.12s`

### Step 5 — 曲线路径绘制

金色虚线曲线从左到右绘制。

- Duration: `1s`

### Step 6 — Icon 圆牌出现

每个 icon 在对应柱子上方出现：

```css
opacity: 0 -> 1
scale: 0.85 -> 1
```

### Step 7 — 戒指与旗帜压轴出现

- 戒指 scale 0.96 -> 1
- 旗帜轻微摆动

## Hover 交互

Hover 柱子或 icon 时：

- 当前柱子亮度提高
- 对应 icon 圆环微亮
- 曲线节点高亮

```css
filter: brightness(1.08)
box-shadow: 0 0 24px rgba(189,205,219,0.28)
```

---

# 5. Section 04 — 0% 납품 사고

## 页面内容

- `0% 납품 사고`
- 无缺陷信赖
- 右侧盾牌视觉
- 包装盒 / 配送 / 安全图形

## 动效目标

传达“稳定、安全、可靠”的感觉。  
动效要非常稳，不要跳。

## 入场顺序

### Step 1 — 左侧 0% 字体成型

不建议 count-up，因为结果是 0。  
推荐用线条成型：

```css
opacity: 0 -> 1
letter-spacing: 0.08em -> normal
filter: blur(4px) -> blur(0)
```

- Duration: `0.9s`

### Step 2 — 标题和正文淡入

```css
translateY: 18px -> 0
opacity: 0 -> 1
```

### Step 3 — 右侧盾牌出现

盾牌从后景推进：

```css
scale: 0.94 -> 1
opacity: 0 -> 1
```

- Duration: `0.9s`

### Step 4 — 包装盒放置感

包装盒从右下轻微进入：

```css
translateX: 24px -> 0
translateY: 16px -> 0
opacity: 0 -> 1
```

### Step 5 — 背景物流线条绘制

- truck icon
- route line
- shield icon
- check icon

按顺序出现。

## 循环氛围

盾牌边缘每 10 秒轻微闪一次高光：

```css
box-shadow: 0 0 0 rgba(...) -> 0 0 22px rgba(...)
```

---

# 6. Section 05 — Continuous R&D

## 页面内容

- `CONTINUOUS R&D`
- 멈추지 않는 혁신, 지속적 R&D
- 工厂蓝图
- 创新圆环结构

## 动效目标

展示 DAEHO 不只是传统工艺，也有研发与技术能力。  
动效重点是“蓝图绘制”和“创新节点激活”。

## 入场顺序

### Step 1 — 左侧标题 Reveal

```css
clip-path: inset(0 0 100% 0) -> inset(0 0 0 0)
```

- Duration: `0.8s`

### Step 2 — 正文淡入

```css
opacity: 0 -> 1
translateY: 18px -> 0
```

### Step 3 — CTA 边框绘制

```css
border-width/path draw
opacity: 0 -> 1
```

### Step 4 — 工厂蓝图绘制

使用 SVG path 动画：

```css
stroke-dasharray: totalLength;
stroke-dashoffset: totalLength -> 0;
```

- Duration: `1.6s`

### Step 5 — 机器人手臂 / 工厂结构细节出现

- 机器人手臂
- 传送带
- 工厂建筑
- 烟囱

按层出现。

### Step 6 — Innovation 圆环出现

- 中心圆先出现
- 外圈线条绘制
- 五个节点依次出现：

1. Process Innovation  
2. Design Innovation  
3. Technology Development  
4. Quality Excellence  
5. Manufacturing Innovation  

## 循环氛围

### 圆环微动

```css
rotate: -1deg -> 1deg -> -1deg
duration: 10s
```

### 蓝图扫描线

淡淡扫描线横向移动：

```css
translateX: -100% -> 100%
duration: 12s
repeat: infinite
```

---

# 7. Section 06 — 100% 수직계열화

## 页面内容

- `100% 수직계열화`
- 전 공정 책임제
- 中心圆：100% Fully Integrated Production
- 六步流程环：

1. 기획 / 디자인  
2. 설계 / 개발  
3. 정밀 제조  
4. 품질 검사  
5. 포장  
6. 물류 / 배송  

## 动效目标

传达“从设计到交付，全流程自己负责”。  
动效重点是流程闭环。

## 入场顺序

### Step 1 — 左侧 100% Count-up

```js
countUp(0, 100, 1.4)
```

### Step 2 — 左侧标题出现

```css
opacity: 0 -> 1
translateY: 18px -> 0
```

### Step 3 — 中心圆环绘制

```css
stroke-dashoffset: full -> 0
```

- Duration: `1.1s`

### Step 4 — 中心 100% 出现

```css
scale: 0.9 -> 1
opacity: 0 -> 1
```

### Step 5 — 外圈流程路径绘制

虚线路径按顺时针绘制：

- Duration: `1.4s`

### Step 6 — 六个节点依次出现

每个节点：

```css
scale: 0.85 -> 1
opacity: 0 -> 1
```

- Stagger: `0.14s`

## 循环氛围

### 环形流动光点

```js
motionPath: circlePath
duration: 8s
repeat: infinite
```

### 中心 100% 轻微呼吸

```css
scale: 1 -> 1.012 -> 1
duration: 5s
```

---

# 8. 全局 Hover / Interaction

## 8.1 CTA Hover

适用于：
- Legacy View
- View / Explore
- Tab
- Menu

```css
.arrow {
  transform: translateX(0);
}

.button:hover .arrow {
  transform: translateX(6px);
}
```

同时：

```css
border-color: #345B7D;
background: rgba(52, 91, 125, 0.04);
```

## 8.2 Icon Hover

- 线条颜色加深
- 背后出现很淡的圆形光晕

```css
stroke: #345B7D;
background: rgba(189,205,219,0.18);
```

## 8.3 Image Hover

只做轻微：

```css
scale: 1 -> 1.015
filter: brightness(1.03)
```

---

# 9. 推荐开发实现

## 技术选择

推荐：

```txt
GSAP
GSAP ScrollTrigger
SVG stroke animation
CSS clip-path
CSS transitions
```

不建议：

```txt
复杂 WebGL
过度粒子
弹跳动画
电商式卡片 zoom
```

## Section 初始化结构示例

```js
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".credibility-section").forEach((section) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      once: true
    }
  })
  .from(section.querySelectorAll(".reveal-title"), {
    y: 32,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08
  })
  .from(section.querySelectorAll(".reveal-copy"), {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.35");
});
```

---

# 10. Codex 实现提示词

可以直接给 Codex 这样说：

```txt
请为 DAEHO 官网 LEGACY > CREDIBILITY 页面实现高级品牌官网风格的滚动动效。

要求：
1. 使用 GSAP + ScrollTrigger。
2. 页面每个 section 进入视口时触发一次入场动画。
3. 动效风格参考 Omega、Porsche、Rolex、Patek Philippe 官网：高级、克制、平滑、简约。
4. 不要电商式动画，不要夸张弹跳，不要粒子爆炸。
5. 使用 #345B7D、#BDCDDB、白色为主色。
6. 标题使用 clip-path 或 fade-up reveal。
7. 数字使用 count-up。
8. SVG 图形使用 stroke-dasharray / stroke-dashoffset 绘制。
9. Hero 戒指、山路路径、柱状图、盾牌、R&D 蓝图、流程闭环分别按 motion spec 实现。
10. 所有 hover 只做轻微位移、颜色变化、线条展开。
```

---

# 11. 当前实现记录

## 11.1 已接入文件

页面代码：

```txt
frontend/app/legacy/credibility/page.tsx
frontend/components/legacy/CredibilityPage.tsx
frontend/data/credibility.ts
frontend/app/globals.css
```

素材位置：

```txt
frontend/public/images/legacy/credibility/motion-assets/
```

原始素材包：

```txt
credibility素材/daeho_legacy_credibility_web_motion_assets/
```

## 11.2 页面结构

当前 `/legacy/credibility` 已按素材包重做为 6 个全屏滚动 section：

1. Hero / Proven Without Exception
2. 38 Years of Experience
3. Market Leader
4. 0% Delivery Accident
5. Continuous R&D
6. 100% Vertical Integration

左侧/右侧结构、产品视觉、插画视觉、section rail、Legacy 分支 tab 都已接入。页面支持全局白天/黑夜主题，白天模式使用 `#345B7D`、`#BDCDDB`、白色和少量金色，黑夜模式使用深蓝黑叠加同一套视觉资产。

## 11.3 动效实现

已使用 GSAP + ScrollTrigger：

- 每个 section 进入 `top 75%` 时触发一次 `is-visible` 入场。
- `top 52%` 到 `bottom 52%` 区间更新右侧 section rail 当前项。
- 背景层使用 ScrollTrigger scrub 做轻微纵向视差。
- 主视觉层使用 ScrollTrigger scrub 做反向轻微视差。
- 标题使用分行 reveal。
- 正文、divider、features、timeline、CTA、tab 使用 fade-up + blur release。
- 数字使用 count-up，其中 `38` 和 `100%` 会递增，`0%` 以短时成型方式显示。
- 视觉素材使用 fade/scale/blur 的克制入场，不做电商式 zoom。
- 首屏 section 会立即标记可见，避免 GSAP 异步加载时出现空白。
- 已补充素材包细节动效：`soft_blue_line_grid.png` 蓝图网格轻微漂移、`motion_path_dot.svg` 沿视觉路径轻微移动、`shield_line_icon.svg` 在 0% section 中呼吸浮动、主视觉上有低频高光 sweep。
- 细节动画在移动端缩小尺寸，并在 `prefers-reduced-motion` 下停止循环和位移。

## 11.4 顶部栏联动

`SiteHeader` 已做为复用顶部栏继续使用。为解决滚动隐藏后鼠标移动到顶部栏位置时的误触/卡住问题，当前行为为：

- header 隐藏时本体 `pointer-events: none`，避免透明 header 误接收事件。
- 隐藏态只启用 `.hero-header-hover-zone` 作为唤醒区域。
- 鼠标进入唤醒区域后 header 显示并变成实体状态。
- 鼠标离开 header 几何范围后，通过全局 pointermove 兜底检测自动收回。
- 收回时同步清理 `LEGACY` / `SPECIALTY` 分支菜单和 hover mask。
- 验证结果：滚动到 Home 中后段后，移入顶部栏可显示实体 header，移出后回到 `is-header-hidden`；hover `LEGACY` 只显示 `loyalty / credibility / achievement`，hover `SPECIALTY` 只显示 `technique / collection`。

## 11.5 验证记录

构建：

```txt
npm run build
```

结果：通过。

浏览器自动化验证：

```txt
http://127.0.0.1:3000/day
http://127.0.0.1:3000/legacy/credibility
```

结果：

- Home `/day` 下滑后 header 隐藏、hover 显示、离开后再次隐藏。
- Home `/day` 的 `LEGACY` 与 `SPECIALTY` 分支不会串菜单。
- `/legacy/credibility` 共 6 个 section。
- 首屏 active rail 为 `01`，滚到第二屏 active rail 为 `02`。
- 第二屏数字显示到 `38`。
- `/legacy/credibility` 白天模式 root class 为 `site-theme-day page-tone-light`，页面 class 为 `credibility-page credibility-redesign is-day-locked is-header-on-light`。
