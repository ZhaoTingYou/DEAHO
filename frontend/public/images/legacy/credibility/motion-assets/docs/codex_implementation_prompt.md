# Codex Implementation Prompt — DAEHO Legacy / Credibility

请根据本素材包实现 DAEHO 官网 `LEGACY > CREDIBILITY` 页面和滚动动效。

## 页面要求

1. 风格参考 Omega / Porsche / Rolex / Patek Philippe 官网。
2. 高级、简约、大气、品牌官网感，不要电商感。
3. 主色：`#345B7D`、`#BDCDDB`、白色，可用少量金色 `#BE9A5B` 点缀。
4. 一屏一个 section，不要把页面压缩在一个视口里。
5. 图片比例要自然，不要拉伸压缩。

## Section

- 01 Hero — Proven Without Exception
- 02 38 Years of Experience
- 03 Market Leader / 시장의 기준을 세우다
- 04 0% Delivery Accident / 납품 사고
- 05 Continuous R&D
- 06 100% Vertical Integration / 수직계열화

## 动画要求

使用 GSAP + ScrollTrigger。

- 标题：clip-path 或 fade-up reveal
- 数字：count-up
- SVG：stroke-dasharray / stroke-dashoffset 绘制
- 背景：轻微 parallax
- 戒指/产品：轻微 scale + fade，不要电商式 zoom
- 图标节点：依次出现，轻微 scale
- 循环动效：只保留轻微光点、线条流动、旗帜/光影微动

请优先参考：

- `motion/credibility_motion_spec.md`
- `motion/motion-sequence.json`
- `motion/gsap-scrolltrigger-example.js`
- `references/full-section-screens/`
