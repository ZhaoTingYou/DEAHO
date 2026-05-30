# DAEHO Legacy / Credibility — Web + Motion Asset Pack

用于给 Codex / 前端开发的素材包，包含页面视觉参考、无文字背景/产品/插画素材、动画规范与代码参考。

## 文件夹说明

- `references/full-section-screens/`  
  页面和每个 section 的完整视觉参考图，方便 Codex 对照还原。

- `backgrounds/`  
  可用于网页 section 的背景图、渐变背景、蓝图背景、大理石/山路/研发背景裁剪。

- `products/`  
  戒指、包装盒、主视觉产品等可复用产品素材裁剪。

- `illustrations/`  
  山路成长图、市场地位柱状图、0% 盾牌场景、R&D 蓝图、100% 流程闭环等动画用视觉素材。

- `decorative-elements/`  
  SVG/PNG 装饰元素：蓝图圆、分割线、滚动提示、节点、流程骨架等。

- `motion/`  
  动效说明 Markdown、motion sequence JSON、CSS keyframes、GSAP 示例和动画分镜板。

- `docs/`  
  Codex 提示词、素材清单、设计说明。

## 主色

- `#345B7D`
- `#BDCDDB`
- `#FFFFFF`
- 少量金色点缀：`#BE9A5B`

## 使用建议

1. 先让 Codex 读取 `docs/codex_implementation_prompt.md`。
2. 按 `references/full-section-screens/` 还原页面结构。
3. 按 `motion/credibility_motion_spec.md` 和 `motion/motion-sequence.json` 实现动画。
4. `decorative-elements/*.svg` 建议作为 SVG 组件导入，方便做 stroke-dashoffset 动画。
