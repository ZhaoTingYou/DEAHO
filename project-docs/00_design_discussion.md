# 00_design_discussion.md — 页面设计讨论工作流

## 当前目标

当前阶段不是让第三方生成工具制作页面，而是和 Codex 一起逐页讨论并完善 DAEHO 官网的设计规格文档。

这些文档后续会直接作为代码实现依据。

---

## 讨论范围

每个页面都需要明确以下内容：

1. 页面目标  
   这个页面负责让用户理解什么、相信什么、去哪里。

2. 页面结构  
   section 顺序、每个 section 的功能、信息层级。

3. 排版构造  
   桌面端布局、移动端布局、图片和文字的关系、留白、对齐方式。

4. 视觉方向  
   背景色、图片风格、字体气质、颜色重点、品牌氛围。

5. 动画与交互  
   opening、scroll、hover、切换、video、gallery、mobile 简化规则。

6. 内容与素材  
   需要哪些图片、视频、图标、产品图、真实案例资料。

7. 开发注意事项  
   组件拆分、数据结构、响应式规则、不能做的效果。

---

## 页面讨论顺序

建议按这个顺序推进：

1. HOME  
   先定首页，因为它会定义全站 Header、开场动画、视觉基调和内容节奏。

2. LEGACY  
   定品牌信任资产，包括 loyalty、credibility、achievement 三个子栏目。

3. SPECIALTY  
   定专业能力总入口，并拆分 technique 与 collection。

4. GOLF  
   定独立产品线的 campaign 页面。

5. NEWS  
   定 editorial 内容页和文章卡片规则。

6. CHRONICLE  
   定品牌时间线、历史叙事和里程碑页面。

---

## 当前页面文档状态

| 页面 | 文档 | 状态 |
|---|---|---|
| HOME | `project-docs/07_home.md` | 已开始具体讨论 |
| LEGACY | `project-docs/02_pages.md`；credibility 详见 `project-docs/09_legacy_credibility.md` | credibility 已完成详细规格，loyalty / achievement 待深入 |
| SPECIALTY | `project-docs/02_pages.md` / 后续可拆独立文档 | 待深入 |
| NEWS | `project-docs/02_pages.md` / 后续可拆独立文档 | 待深入 |
| GOLF | `project-docs/02_pages.md` / 后续可拆独立文档 | 待深入 |
| CHRONICLE | `project-docs/02_pages.md`；详见 `project-docs/10_chronicle.md` | 已完成 opening、横向时间线、年份导航、日夜主题规格 |

---

## 讨论方式

- 一次重点聊一个页面或一个 section。
- 每次讨论后，把结论写进对应 `project-docs` 文件。
- 不能确定的内容先记录为“待确认问题”，不要在实现时临时猜。
- 如果设计图里已有明确结构，以设计图为准。
- 如果设计图没有完成，就用品牌方向和现有页面规律补齐。

---

## HOME 当前重点

当前正在讨论 HOME。

已确认：

- 顶部深色区域是 opening animation。
- 中央 `DAEHO` 从模糊变清晰。
- logo 移动到 HOME Hero 顶部栏居中的 `DAEHO` 位置。
- Header 和正式 HOME 内容随后出现。
- 首页不是电商页，而是高端冠军品牌 campaign。

下一步优先确认：

- Hero 正式画面的主视觉构成。
- Hero 标题和 CTA。
- Featured Categories 的三项内容和交互。
- Legacy / Proof Bento 是否作为首页完整 section。
- Recent Projects 的内容素材和排版密度。
