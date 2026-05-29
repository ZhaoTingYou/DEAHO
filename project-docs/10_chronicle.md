# 10_chronicle.md — CHRONICLE 页面实现规格

更新时间：2026-05-29

路由：`/chronicle`

实现文件：

- `frontend/app/chronicle/page.tsx`
- `frontend/components/chronicle/ChroniclePage.tsx`
- `frontend/components/layout/SiteHeader.tsx`
- `frontend/components/layout/ThemeProvider.tsx`
- `frontend/app/globals.css`

参考目录：

- `/Users/tingyouzhao/Desktop/deaho官网/CHRONICLE案例`

---

## 页面定位

CHRONICLE 是 DAEHO 的品牌时间线页面，不做普通公司简介，也不做密集信息列表。

核心气质：

- 历史档案。
- 品牌发展脉络。
- 年份节点。
- 横向卷轴式叙事。
- 高级、克制、慢速、有重量。

页面进入后先播放 CHRONICLE 专属 opening，然后进入 scroll-driven timeline。

---

## 当前内容结构

当前页面包含 4 个卷轴板块，左侧年份导航与板块一一对应。

```ts
[
  {
    year: "1994",
    label: "HERITAGE",
    title: "첫 번째 걸음",
  },
  {
    year: "2001",
    label: "CRAFTSMANSHIP",
    title: "변치 않는 가치",
  },
  {
    year: "2012",
    label: "INNOVATION",
    title: "기술의 비상",
  },
  {
    year: "2026",
    label: "FUTURE",
    title: "미래를 향한 박동",
  },
]
```

注意：

- 年份导航不能去重，必须与板块数量一致。
- 即使后续出现相同年份，也要保留多个节点，必要时用年份 + 小标题区分。
- 当前第二个节点使用 `2001`，用于补齐 4 个板块的年份选择。

---

## 顶部栏规则

CHRONICLE 使用全站统一顶部栏组件 `SiteHeader`，不单独复制 Header markup。

当前传入：

- `activeSection="CHRONICLE"`
- `scrollHideEnabled`
- `theme`
- `onThemeToggle`
- `ready={stageVisible || introComplete}`

行为规则：

- 顶部栏布局必须和 Home 顶部栏一致。
- PC 端显示：左侧站点链接、中间 `DAEHO` logo 与主导航、右侧主题与语言入口。
- 移动端显示居中的 `DAEHO` logo、右侧主题按钮和 menu 按钮。
- 下滑时顶部栏向上滑出、淡出并轻微虚化。
- 上滑时顶部栏按同一套 motion 出现。
- Header 滚动显隐逻辑由 `SiteHeader` 统一管理，后续页面不要各自写一套。
- `LEGACY` 和 `SPECIALTY` 的分支导航都由 `branchNavigation` 渲染。
- Desktop hover 到有分支的主 category 时，分支横向展开，并以主 category 中心线居中对齐。
- Mobile menu 内需要展示主 category 及其子分支。

---

## 全局主题规则

主题状态由 `ThemeProvider` 维护。

当前持久化方式：

- `localStorage`：`daeho-theme`
- cookie fallback：`daeho-theme`
- `html.dataset.siteTheme`
- `html.site-theme-day`
- `html.site-theme-night`
- `html.page-tone-light`
- `html.page-tone-dark`

规则：

- 用户切换为白天模式后，进入 Home、CHRONICLE、credibility 等页面都应保持白天模式。
- 用户切换为黑夜模式后，跨页面也保持黑夜模式。
- `/day` 路由强制使用 day theme。
- `/chronicle` 在 day theme 下使用 light page tone，在 night theme 下使用 dark page tone。
- 后续页面如果支持日夜主题，需要接入同一个 `ThemeProvider`，不要写单页主题状态。

---

## 日夜视觉兼容

CHRONICLE 需要同时兼容 night 和 day 两套色系。

### Night

Night 是默认高级档案室气质：

- 背景：深黑、深蓝黑、暗红微光。
- 主文字：soft white。
- active 与进度：muted gold。
- 年份节点：gold dot + soft gold text。
- 开场圆圈：gold stroke。
- Header：白色 / soft white。

当前主要色值：

- active gold：`#e5bf60`
- label gold：`#c7a45a`
- dark bg：`#050609`

### Day

Day 必须和 Home day theme 统一，不使用独立红色体系。

Day 色系：

- 背景：冷白、浅蓝、轻微 blueprint 感。
- 主文字：深蓝灰。
- active 与控件：品牌蓝。
- 年份节点：blue dot + blue text。
- Header logo：Home day 的品牌蓝。
- 分支菜单、语言菜单、移动端菜单都使用浅色玻璃感。

当前主要色值：

- active blue：`#0d4488`
- header logo blue：`#184f97`
- icon blue：`#174a8c`
- page text：`#102744`
- active bg：`rgba(37, 104, 184, 0.14)`

---

## Opening 动画

CHRONICLE 有独立 opening，不复用 Home 的 logo 飞行动画。

当前要求：

- 开场 logo 圆圈稍大，接近 `clamp(320px, 24vw, 360px)`。
- logo 字体要和 Home 里的 DAEHO logo 一致。
- logo 出来后，不做硬切，也不做突兀发光消失。
- 过渡方式为柔和的交叉溶解：
  - 后面的 timeline 内容先在底下低亮度、柔焦出现。
  - logo 与圆圈单独慢慢失焦、透明化。
  - 外层 day/night 遮罩逐渐变薄。
  - 最终页面内容完成对焦并显现。

当前 timing：

```ts
stageVisible: 2250ms
introExiting: 2750ms
introComplete: 5100ms
```

当前 CSS motion：

- `chronicleLogoIn`
- `chronicleStageSoftReveal`
- `chronicleIntroVeilOut`
- `chronicleIntroGlowMist`
- `chronicleIntroRingMistOut`
- `chronicleLogoMistOut`

Reduced motion：

- 如果用户系统设置 `prefers-reduced-motion: reduce`，直接显示页面并跳过 opening。

---

## Scroll Timeline

Desktop 使用 pinned horizontal timeline。

结构：

- `.chronicle-stage`：提供垂直滚动距离。
- `.chronicle-viewport`：sticky 视口。
- `.chronicle-track`：横向移动容器。
- `.chronicle-slide`：每个 100vw 的时间线板块。

滚动计算：

- 根据 `.chronicle-stage.getBoundingClientRect()` 计算 progress。
- Desktop 使用缓动追随：`current + (target - current) * 0.07`。
- Mobile 直接使用 target，避免触摸滚动滞后。
- activeIndex 使用 `Math.round(progress * (slideCount - 1))`。

---

## 年份导航

年份导航必须固定在 viewport 左侧，不能放在会被 transform / filter / animation 影响的卷轴容器内。

当前实现：

- `chronicle-year-nav` 放在 `<section className="chronicle-stage">` 外层。
- `position: fixed`
- `z-index: 45`
- 开场完成前保持隐藏。
- `is-stage-visible` 后淡入。

原因：

- 如果 fixed 元素放在带 `filter` 或 `transform` 的父级里，浏览器会让它相对父级固定。
- 这样滚轮下滑时年份导航会跟着卷轴移动，甚至被裁切或消失。
- 因此年份导航必须脱离 `.chronicle-stage`。

行为：

- PC：垂直固定在左侧中部。
- Mobile：固定在左下方，避开顶部栏和内容主体。
- 点击年份节点会滚动到对应板块。
- active 状态跟随当前板块。

---

## 底部进度线

底部进度线同样不能放在 `.chronicle-stage` 内。

当前实现：

- `chronicle-progress` 放在 `.chronicle-stage` 外层。
- `position: fixed`
- `z-index: 44`
- 宽度根据 `progress * 100%` 更新。
- day mode 使用品牌蓝。
- night mode 使用 muted gold。

---

## Mobile 适配

Mobile 不使用 desktop pinned horizontal translate。

规则：

- `.chronicle-stage` 高度恢复为 auto。
- `.chronicle-viewport` 改成普通 relative flow。
- `.chronicle-track` 改成 grid。
- 每个 `.chronicle-slide` 纵向排列。
- 文案默认显示，不依赖 horizontal scroll reveal。
- 图片 frame 取消 clip-path reveal。
- 年份导航固定在左下方。
- 进度线固定在底部。
- 顶部栏使用全站 mobile menu。

---

## 当前验收点

CHRONICLE 当前已完成：

- `/chronicle` 路由页面。
- Home 同款可复用顶部栏。
- Header 下滑隐藏、上滑出现。
- LEGACY / SPECIALTY 分支导航支持。
- 全局 day / night theme 持久化。
- CHRONICLE day / night 两套色系。
- Opening logo 圆圈动画。
- Opening 柔焦透明交叉溶解。
- Desktop 横向卷轴时间线。
- 固定年份导航。
- 四个年份节点：`1994 / 2001 / 2012 / 2026`。
- 点击年份跳转到对应卷轴板块。
- 固定底部进度线。
- Mobile 纵向适配。

---

## 后续注意事项

- 后续替换真实历史图片时，需要分别检查 day / night 下的图片亮度。
- 如果某张图片在 night mode 太亮，可以只对 `.chronicle-page.is-night-theme .chronicle-image-frame img` 加局部 filter。
- 如果某张图片在 day mode 太灰，不要提高全局 saturation，优先替换更适合 day tone 的素材。
- 不要把年份导航重新放回 `.chronicle-viewport` 或 `.chronicle-stage` 内部。
- 不要为其他页面复制 CHRONICLE 的 fixed nav 逻辑，除非页面也有同样的 pinned transform / filter 场景。
