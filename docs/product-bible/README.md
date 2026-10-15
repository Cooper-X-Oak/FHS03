# FHS 网站设定集

内容全部写在 `content/*.md` 里，`index.html` 负责渲染：Markdown、Mermaid 流程图、四象限图、提示块和状态标记。

## 本地查看

浏览器不允许直接双击打开的页面读取本地 md 文件，需要起一个静态服务：

```bash
cd product-bible
python3 -m http.server 8000
# 打开 http://localhost:8000
```

也可以直接部署到任何静态托管（GitHub Pages、Cloudflare Pages、Vercel 等）。

## 写作约定

| 写法 | 效果 |
| --- | --- |
| 标题末尾加 `★` | 标记为可横向对比竞品的小节 |
| `` `已定` `` `` `待确认` `` `` `待写` `` | 显示为状态标签 |
| `> [!NOTE]` `> [!TIP]` `> [!WARNING]` `> [!TODO]` | 提示块 |
| ```` ```mermaid ```` | Mermaid 图（流程图等） |
| ```` ```quadrant ```` | 四象限图，语法见下 |

四象限图语法：

```
title: 标题
x: 左端 -> 右端
y: 下端 -> 上端
q1: 右上象限名
q2: 左上象限名
q3: 左下象限名
q4: 右下象限名
point: 名称 | x（0–1） | y（0–1）
```

## 新增章节

1. 在 `content/` 下新建 md 文件。
2. 在 `index.html` 顶部的 `CHAPTERS` 数组里加一行；`draft: true` 表示待写。

## 依赖

页面从 CDN 加载三个库（固定版本）：marked 12.0.2、DOMPurify 3.1.6、Mermaid 10.9.1。


在线阅读：https://cooper-x-oak.github.io/FHS03/product-bible/

本版采用 product-bible-v2.1 内容：00–11、R7 综合结论、IA map。R7 入口为 `#r7`，IA map 为 `#ia-map`。
