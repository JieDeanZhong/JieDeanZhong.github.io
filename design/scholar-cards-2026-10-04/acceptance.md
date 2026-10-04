# 研究人员名片本地验收

2026 年 10 月 4 日，按 `mingpian_draft.key` 全部三页完成 Lianjun Zhang、Yongtao Zhu 和 Kevin Chun Chan 的网页名片。本文记录本地验收结果；线上版本以仓库的 GitHub Pages 部署记录为准。

## 查看方式

打开 [本地 Research 页面](http://localhost:3000/research/)，悬停或点击研究项目下的人名。生产预览已启动；如需重新启动，在仓库根目录使用 Yarn 3.6.1 执行 `yarn start --port 3000`。继续开发使用 `yarn dev`。

## 实现与草稿对照

- 保留横向矩形、左侧大姓名与文字、右侧人像、底部下划线链接，以及三张卡片各自的文字明暗关系。桌面宽度分别为 700、590、640px，高度约 230px。
- 标题、机构和链接均为网页元素。邮箱和复制按钮不显示，原邮箱数据保留。外链继续在新标签页打开。
- Research 的五个人名入口共用一个弹出层，切换人物时不会留下重叠卡片。门户渲染和固定定位避免容器裁切及正文位移。
- 支持鼠标悬停、点击、触屏、Enter、Space、Tab、Esc 和外部点击。鼠标由人名移向链接时保持打开；键盘焦点停留在卡片内时不会被鼠标离开打断。
- 开合使用 160–200ms 的轻微淡入、位移和缩放；关闭为 110ms。减少动态效果时禁用过渡和位移。阴影、顶部高光与细侧边表现薄卡片厚度。
- 窄屏将姓名放在顶部，职称和机构在左，人像贴右下边缘。链接触控高度不小于 44px。

## 人像素材

三张原图均直接从 Keynote 压缩包提取，保存在 `originals/`，未使用网站旧头像或幻灯片截图。处理后的 PNG 母版保存在 `processed/`；页面使用 `public/static/images/people/` 中保持原分辨率的无损透明 WebP。

| 人物            | 内嵌原图                         | 分辨率      | 原图背景取色 |
| --------------- | -------------------------------- | ----------- | ------------ |
| Lianjun Zhang   | `Data/Lianjun_portrait-9084.png` | 1600 × 2172 | `#5e5e60`    |
| Yongtao Zhu     | `Data/Yongtao_portrait-9108.png` | 1000 × 1075 | `#bbbcbd`    |
| Kevin Chun Chan | `Data/Kevin_portrait-9124.png`   | 1521 × 1863 | `#a4a6a9`    |

背景色取自每张原图的背景区域，使用区域内各颜色通道的中位数。`asset-manifest.json` 记录取样坐标、原图 SHA-256、输出尺寸、透明像素数和文件大小。

最终素材使用 Vision 人像分割得到透明度蒙版，再细化头发和服装边缘；RGB 直接复制原图，没有重新生成人脸、表情、服装或肩部。通过构图让肩部裁切落到卡片边缘，不需要补画。逐一对照原图并检查渲染中的头发、眼镜和衣领；程序比对三个输出所有不透明像素，RGB 通道变化数均为 0。记录见 `portrait-verification.json` 和 `asset-manifest.json`。

复现处理时，先运行 `swift design/scholar-cards-2026-10-04/extract-portraits.swift`，再运行 `node design/scholar-cards-2026-10-04/refine-portraits.cjs`。后一个脚本读取前一个脚本的蒙版，不应重复细化同一输出。

## 六个链接核对

以下地址沿用仓库原配置。核对了页面姓名、机构和必要的个人简介，没有采用草稿中重复的 Yongtao 链接。

| 人物            | Google Scholar                                                               | Profile                                                                      | 身份依据                                                                                                 |
| --------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Lianjun Zhang   | [LioEwqwAAAAJ](https://scholar.google.com/citations?hl=en&user=LioEwqwAAAAJ) | [苏州系统医学研究所](https://www.ismsz.cn/Web/KXYJKYTDPage?Id=20&PageId=292) | Scholar 的姓名、苏州系统医学研究所机构和认证域名吻合；机构页面为张连军研究员、独立 PI。                  |
| Yongtao Zhu     | [9r8TXE8AAAAJ](https://scholar.google.com/citations?hl=en&user=9r8TXE8AAAAJ) | [XJTLU Yongtao Zhu](https://scholar.xjtlu.edu.cn/en/persons/YongtaoZhu/)     | 两页均对应西交利物浦大学 Yongtao Zhu；机构页标注 Associate Professor。官方实验室页再次交叉确认两个地址。 |
| Kevin Chun Chan | [rSZrshkAAAAJ](https://scholar.google.com/citations?hl=en&user=rSZrshkAAAAJ) | [XJTLU Chun Chan](https://scholar.xjtlu.edu.cn/en/persons/ChunChan/)         | Scholar 对应 Kevin Chun Chan 和 XJTLU；机构页为 Chun Chan、Assistant Professor，简介说明惯用名为 Kevin。 |

Lianjun 的机构网页通过同站点接口动态载入内容；核对了 `/MenuNew/GetMenuNewWebById` 的 `Id=292` 返回内容。部分搜索工具曾受到限流，但直接访问目标网页和官方内容接口完成了全部核对，没有遗留无法验证的地址。详细记录见 `link-verification.json`。

## 浏览器截图

截图来自 Google Chrome 的本地生产预览。桌面视口为 1440 × 1000，移动端为 390 × 844，均使用 2 倍像素密度；另保存了 320px 窄屏截图。

| 人物            | 桌面页面                                      | 名片细节                                   | 移动端                                         | 320px 窄屏                                       |
| --------------- | --------------------------------------------- | ------------------------------------------ | ---------------------------------------------- | ------------------------------------------------ |
| Lianjun Zhang   | [桌面](screenshots/lianjun-zhang-desktop.png) | [名片](screenshots/lianjun-zhang-card.png) | [移动端](screenshots/lianjun-zhang-mobile.png) | [窄屏](screenshots/lianjun-zhang-mobile-320.png) |
| Yongtao Zhu     | [桌面](screenshots/yongtao-zhu-desktop.png)   | [名片](screenshots/yongtao-zhu-card.png)   | [移动端](screenshots/yongtao-zhu-mobile.png)   | [窄屏](screenshots/yongtao-zhu-mobile-320.png)   |
| Kevin Chun Chan | [桌面](screenshots/kevin-chan-desktop.png)    | [名片](screenshots/kevin-chan-card.png)    | [移动端](screenshots/kevin-chan-mobile.png)    | [窄屏](screenshots/kevin-chan-mobile-320.png)    |

## 检查结果与范围

- Yarn 版本：3.6.1。
- `yarn build`：通过，生成 73 个静态页面并完成 RSS 生成。
- `yarn lint`：仓库原脚本仍调用 `next lint --fix`，与当前 Next.js 16 不兼容，报 `unknown option '--fix'`。未扩大范围修改脚本；改用 `yarn eslint app components layouts scripts data/scholarsData.ts`，检查通过。
- 修改的页面、组件、数据和样式通过 Prettier 检查。
- Chrome 验收覆盖三人桌面悬停与点击、进入卡片链接、外部关闭、Esc 与焦点返回、重复点击关闭、直接切换人物、快速进出、完整键盘操作、全部五个入口和上下左右边缘定位。
- 六个链接均在桌面点击及触屏轻点后确认新标签页目标；触屏直接切换人物也通过。补充结果见 `touch-link-results.json`。减少动态效果时无过渡。
- 触屏仿真在 320、360、390、600、768px 宽度检查三张卡片的开关、图片加载和横向边界；无页面横向溢出。
- 回归检查首页、MDX 文章、标签页和 Research 详情页；检查结果见 `browser-results.json`，执行脚本为 `verify-browser.cjs`。

移动端使用真实 Chrome 引擎的触屏仿真，未在实体手机或 Safari 上验证。网站没有增加运行时依赖；现有其他设计文件及工作区改动不属于本次修改。
