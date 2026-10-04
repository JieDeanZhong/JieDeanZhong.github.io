# 四点页眉本地预览

当前为第二轮调整：四点与“Jie”的实际字形等高，桌面约 16.75px、手机约 13.35px；页眉从 108px 压缩为桌面 72px、手机 64px，首页链接仍保留 44px 点击高度。最新截图和尺寸检查在 `revision-2/`，默认本地首页展示新版。下方三版参数与截图为第一轮历史对照。

源文件为 `/Users/jie/Downloads/logos.ai`，选择 A4 画板最左下方一行四个实心方点。`logos-original.ai` 是未修改的原始文件副本，SHA-256 及原始矩形坐标见 `extraction.json`。SVG 保留原稿方点形状、相对比例和略有差异的三个点距，仅平移到独立画布并改为反白。

- 对照页：http://localhost:3011/comparison.html
- A：http://localhost:3000/?logoPreview=a
- B（默认及推荐）：http://localhost:3000/?logoPreview=b
- C：http://localhost:3000/?logoPreview=c
- 独立 SVG：`public/static/images/four-dot-mark.svg`
- 编辑排版：`components/HeaderBrand.module.css`
- 组合与无障碍名称：`components/HeaderBrand.tsx`

| 版本 | 桌面图形总宽 / 图文间距 | 手机图形总宽 / 图文间距 |
| --- | --- | --- |
| A | 44px / 12px | 33px / 8px |
| B | 55px / 14px | 44px / 10px |
| C | 66px / 16px | 49.5px / 12px |

字体、字重、颜色和对齐方式完全相同。姓名为真实文字，桌面 22px（640–767px 为 20px），手机 17px，字重 600。图形相对文字视觉中心上移 1px。组合为一个首页链接，名称为 `Jie Dean Zhong — Home`，SVG 对辅助技术隐藏，不产生四个独立交互点。

推荐 B：桌面方点约 10px、手机约 8px，图形清楚，同时姓名保持主要识别作用。A 的手机方点约 6px，存在感偏弱；C 的桌面方点约 12px，较抢眼。四点本身较抽象，单独使用仍可能像状态指示；通过固定位置、统一反白、无动画及紧邻姓名缓解。标记横向比例约 5.5∶1，直接放进 16px 方形 favicon 后每个点不到 3px，不适合兼作极小图标。本次未修改 favicon。

截图来自真实网站，桌面视口 1280 × 800、手机视口 390 × 844，设备像素比为 1。对照页按原始像素尺寸展示，不缩放。`screenshots/` 中保留三版完整页面和页眉截图；`desktop-comparison.png`、`mobile-comparison.png` 为对照页截图。

验证：Yarn 3.6.1 生产构建通过；直接 ESLint 检查通过。原 `yarn lint` 脚本使用 Next.js 16 不再支持的 `next lint --fix`，未改动脚本。浏览器共 27 项检查通过，覆盖三版在 320、360、390、640、768、1024、1280、1440px 的边界与导航、真实链接名称、键盘首页跳转、触屏菜单/首页/搜索，以及 MDX 和标签页；详见 `browser-results.json`。手机为 Chrome 触屏仿真，未做实体机验收。

只修改本地文件，未提交、推送或发布。开发服务器支持编辑后即时刷新；三个查询参数只在开发模式启用，常规页面使用 B。重启网站使用 Yarn 3.6.1 执行 `yarn dev`，重启对照页使用 `python3 -m http.server 3011 --bind 127.0.0.1 --directory design/four-dot-header-preview-2026-10-04`。
