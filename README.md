# X 风格个人主页 · 填空模板

纯白底、1px 细线、一个强调色、右对齐的中文短句 —— 用 X（Twitter）的视觉语言做的单列个人主页。

**内容已按你填写的信息填好**（都在 `lib/data.ts`），直接 `pnpm dev` 就是成品。

- 不想装环境：双击 **`preview.html`**，是一模一样的静态预览（内容固定，不能热更新）
- 还想改文字：依旧只改 `lib/data.ts`；哪一项改回 `【可输入文字·xxx】`，页面就会用浅灰提示你还没填
- 配图还是占位框：把图片放进 `public/`，再把 `post.media.src` 改成 `"/cover.jpg"` 即可

- **技术栈**：Next.js 15（App Router）· TypeScript · Tailwind CSS v4 · lucide-react
- **输出**：纯静态（`output: "export"`），可部署到任意静态托管
- **内容**：全部集中在 `lib/data.ts`，改文案不用碰组件

> 👉 **不知道哪里该填？直接看 [填写指南.md](填写指南.md)** —— 里面有页面地图（①→⑩）、逐项对照表和常见问题。
> 页面上每个浅灰占位符都写着自己在页面上的位置，例如 `【可输入文字·昵称】`、`【可输入文字·正文第1行】`。

---

## 三步填完

**① 填文字**

打开 `lib/data.ts`，把每一处 `【可输入文字·xxx】` **整段**换成你的文字。括号里的 `xxx` 就是这一项的用途，例如：

```ts
export const profile: Profile = {
  displayName: "【可输入文字·昵称】", // ← 改成 "你的名字"
  // ...
};
```

**② 填图片**

把图片丢进 `public/`（例：`public/avatar.jpg`、`public/cover.jpg`），再把 `src: null` 改成路径：

```ts
avatar: { src: "/avatar.jpg", alt: "我的头像" },
media:  { src: "/cover.jpg",  alt: "一张海边的照片" },
```

> `public/` 里的文件在页面上用 `/文件名` 访问：前面带斜杠、不带 `public`。

**③ 填数字**

`following`、`views`、`counts.*` 现在都是 `0`，直接改成真实数字；`followers` 是字符串，写「6.41 万」这种格式（数字与单位之间留一个空格）。

> 每个字段旁边都有中文注释，标明它在页面的哪个位置；完整对照见 [填写指南.md](填写指南.md)。

---

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

构建静态站点：

```bash
pnpm build        # 产物在 out/
```

本地预览构建产物（任选其一）：

```bash
npx serve out
# 或
python -m http.server 4000 --directory out
```

> 因为 `output: "export"`，没有 `pnpm start`（那是 Node 服务端模式）。

---

## 文件树

```text
x-profile/
├─ app/
│  ├─ layout.tsx          # html/body、metadata、viewport、亮暗主题色
│  ├─ page.tsx            # 页面组装：Provider + 各区块 + 分割线
│  ├─ globals.css         # Tailwind v4 入口 + 颜色令牌 + 暗色 + 动效
│  └─ icon.svg            # favicon（可换成自己的图标）
├─ components/
│  ├─ TopBar.tsx          # ✕｜标题+域名｜⋯（client：滚动状态 / 菜单）
│  ├─ ProfileHeader.tsx   # 48px 头像 · 昵称 @handle · 斜杠元信息 · 徽章 · 关注粉丝
│  ├─ PostCard.tsx        # 置顶帖：右对齐正文 + 词组 + 提及 + 配图 + 时间 + 计数
│  ├─ ActionRow.tsx       # 回复/转推/引用/喜欢/书签（client：喜欢与书签可切）
│  ├─ ReplyList.tsx       # 两条评论：回复 XX：+ 描边气泡 + 计数
│  ├─ HintText.tsx        # 右对齐提示语
│  ├─ SiteFooter.tsx      # ip 属地 + 免责声明
│  ├─ MoreNote.tsx        # 页尾小字 and more....（粉色 12px）
│  ├─ Fill.tsx            # ★ 占位文本：没填显示浅灰，填了显示正常色
│  ├─ Avatar.tsx          # ★ 头像位：有图显示图，没图显示占位圆
│  ├─ MediaFrame.tsx      # ★ 配图位：有图显示图，没图显示占位框
│  ├─ Reveal.tsx          # 进入视口轻微上浮（client）
│  ├─ Toast.tsx           # 全局轻提示（client）
│  └─ Engagement.tsx      # 喜欢/收藏状态，行内与底栏共用（client）
├─ lib/
│  ├─ data.ts             # ★★★ 只改这一个文件 ★★★
│  ├─ format.ts           # 1326 → "1,326"
│  ├─ share.ts            # 复制链接（含降级方案）
│  └─ toast.ts            # 轻提示事件总线
├─ public/
│  ├─ cover.jpg           # 帖子配图（1200 × 1200）
│  └─ README.txt          # 放图说明
├─ 填写指南.md            # ★ 页面地图 + 逐项对照表
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json
```

## 组件树

```text
<EngagementProvider>            # 喜欢 / 收藏状态
  <div max-w-600 单列 md:border-x>
    <TopBar />                  # sticky 53px，滚动后出现 1px 底边 + blur
    <main>
      <Reveal><ProfileHeader /></Reveal>     # <Avatar/> + <Fill/>
      <Reveal><PostCard /></Reveal>          # <MediaFrame/> + <Fill/>
        └─ <ActionRow />                     # 5 个 20px 图标 + 13px 计数
      <Divider />                            # 1px #EFF3F4
      <Reveal><ReplyList /></Reveal>         # <Avatar/> ×2 + 气泡
      <Reveal><HintText /></Reveal>
      <Divider />
      <Reveal><SiteFooter /></Reveal>
    </main>
    <MoreNote />                # 页尾小字：and more....（粉色、12px）
    <Toast />
  </div>
</EngagementProvider>
```

---

## 占位符是怎么工作的

`lib/data.ts` 顶部有一个常量：

```ts
export const PLACEHOLDER = "【可输入文字";
```

所有文案都经过 `<Fill value={...} />` 渲染：**文字还以「【可输入文字」开头 → 显示浅灰 `#8B98A5`；换成真实内容 → 自动变成正常文字色。**
所以打开页面一眼就能看出哪里没填，填完自然就是成品，不用手动改样式。

占位符带名字，就是为了让你知道该填什么：

```text
【可输入文字·昵称】      →  这里是昵称
【可输入文字·正文第1行】  →  这里是正文第一行
【可输入文字·粉丝数】    →  这里是粉丝数
```

图片位同理：`src: null` → 显示占位框（浅灰底 + 居中图标 + 「配图 1200 × 515」提示）；填了路径 → 换成真图，并自动套上 16px 圆角与 hover 放大。

---

## 字段对照表

| 字段 | 页面位置 | 怎么写 |
|---|---|---|
| `site.title` | 顶栏第一行 | 一句话站名 |
| `site.domain` | 顶栏第二行 | `yourname.me`（不带 https://） |
| `site.name` / `site.description` | 浏览器标签 / SEO | 名字与一句话简介 |
| `profile.displayName` | 昵称 | 你的名字 |
| `profile.handle` | 昵称右侧 | `@你的ID`，带 @ |
| `profile.avatar` | 头像 | `src` 填 `/avatar.jpg`，或留 `null` |
| `profile.meta` | 斜杠元信息 | 3–4 项，例 `["20", "INTP", "写作者"]` |
| `profile.badge` | 灰边徽章 | 留空 `""` 则整行隐藏 |
| `profile.following` / `followers` | 关注 / 粉丝 | 数字；粉丝写「6.41 万」 |
| `post.lines` | 正文（右对齐） | 每项一行，2–3 行为佳 |
| `post.tags` | 斜杠词组 | 每项一行 |
| `post.mention` | @提及 | 只写名字，不带 @ |
| `post.media` | 配图 | `src` 填 `/cover.jpg`，或留 `null` |
| `post.timestamp` | 时间戳 | 例 `06:13 下午 · 02 7 月 26` |
| `post.views` / `post.counts` | 浏览数与五个计数 | 数字 |
| `replies[]` | 两条评论 | 昵称、handle、回复对象、正文、头像 |
| `hint.lines` | 右对齐提示 | 1–2 行 |
| `footer.*` | 页脚 | 属地声明 / 免责声明 |

---

## 响应式（手机 / 平板 / 电脑）

| 视口宽度 | 左右内边距 | 版式 | 正文 / 昵称 |
|---|---|---|---|
| < 600px（手机） | 16px | 满宽单列，无边框 | 17px / 18px |
| 600–767px（大屏手机、竖屏平板） | 20px | 单列封顶 600px，居中 | 17px / 18px |
| 768–1023px（平板、小笔记本） | 24px | 出现 1px 左右分隔线 | 17px / 18px |
| ≥ 1024px（桌面） | 28px | 600px 单列居中，两侧留白 | 18px / 20px |

细节：

- 任何宽度下都不会出现横向滚动（`body { overflow-x: hidden }` + 图片 `max-width: 100%`）
- 不再有固定底栏，内容结束后直接收尾于页尾小字，`env(safe-area-inset-bottom)` 仍留在容器底部留白里
- 页面底部预留 `40px + 安全区`，滚到最底时页尾小字不会贴着边缘
- 锚点跳转（点 @room、点回复）会自动避开 53px 吸顶栏（`scroll-padding-top: 60px`）
- 移动端点按不出现蓝色高亮块（`-webkit-tap-highlight-color: transparent`）

## 设计令牌

| 令牌 | 亮色 | 暗色 |
|---|---|---|
| 背景 `bg-bg` | `#FFFFFF` | `#000000` |
| 次级 `bg-bg-soft` | `#F7F9F9` | `#16181C` |
| 主文字 `text-fg` | `#0F1419` | `#E7E9EA` |
| 次文字 `text-muted` | `#536471` | `#71767B` |
| 占位 / 提示 `text-faint` | `#8B98A5` | `#71767B` |
| 强调 `text-accent` | `#1D9BF0` | 同 |
| 分割线 `border-line` | `#EFF3F4` | `#2F3336` |
| 描边 `border-stroke` | `#CFD9DE` | `#3F4448` |

- 圆角只用 `rounded-lg`(8) / `rounded-xl`(12) / `rounded-2xl`(16) / `rounded-full`(999)
- 字号阶梯：28 / 20 / 18 / 17 / 15 / 13 / 12；正文 17px、行高 **2.0**、字距 `.02em`，两段之间再留 8px
- 数字 700 字重并启用 `tabular-nums`，计数变化时不跳动
- 阴影只有一处：顶栏 ⋯ 菜单的 `0 8px 24px rgba(0,0,0,.08)`
- 暗色由 `prefers-color-scheme` 自动切换，无需开关

---

## 验收清单

- [ ] 375 / 768 / 1440 三档无横向滚动
- [ ] 顶栏滚动 4px 后出现 1px 底边
- [ ] 正文右对齐，窄屏不出现孤字
- [ ] 粉丝数（如「6.41 万」）不折行
- [ ] 喜欢 / 书签可切换，计数 ±1，回弹 0.34s，行内与底栏状态同步
- [ ] 所有按钮热区 ≥ 44px
- [ ] 系统切到深色模式，文字对比度正常
- [ ] 开启「减少动态效果」后无入场动画
- [ ] 页面里不再出现 `【可输入文字】`（说明全部填完）

---

## 已知说明

- 依赖未在本机安装（生成环境离线），首次 `pnpm install` 会拉取 Next 15 / Tailwind 4 / lucide-react。
- 头像与配图目前是占位框，`public/` 里没有示例图片；放图后按第 ② 步填路径即可。
- 顶栏的 ✕ 与帖内的转推/引用（复制链接）等是演示交互，接入真实账号时可自行替换。
