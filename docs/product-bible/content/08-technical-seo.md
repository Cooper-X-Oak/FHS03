# 08 技术 SEO 层 Technical SEO

技术 SEO 层定义“让搜索引擎正确理解和收录每一页”：页面字段、结构化数据、图片、收录与多语言。内容写什么见 06，本章只管技术规则。

## 8.1 On-page SEO Spec 页面 SEO 规范 ★

`已定`

### Title

| 模板 | 规则 | 示例 |
| --- | --- | --- |
| T1 首页 | 品牌 + 定位 + 品类 | *FHS Filtration \| Industrial Filter Supplier in China* |
| T3 产品页 | 主关键词（首字母大写）+ 区分点 + 品牌 | *High Flow Filter Cartridges \| FHS Filtration* |
| T4 替代页 | 品牌 + 产品类型 + Replacements + 品牌 | *Pall Filter Cartridge Replacements \| FHS Filtration* |
| T5 行业页 | 行业 + Filtration + 品牌 | *Beer and Brewery Filtration \| FHS Filtration* |
| T6 客户类型页 | 业务表达 + 品牌 | *Wholesale Filter Cartridges \| FHS Filtration* |
| T7 文章 | 问题或主题；超长时去掉品牌后缀 | *Filter Micron Rating Guide* |

通用规则：≤ 60 个字符；主关键词靠前；不写 manufacturer、factory、cheapest、CUNO；不写“4 小时报价”之类的时效承诺进标题。各页 title 已在 IA map 的“SEO 标题”列给出。

### Meta description、H1 与正文

| 字段 | 规则 |
| --- | --- |
| Meta description | 140–160 字符；说清供应什么、给谁，以一个动作结尾（*Send your model or photo for a quote.*） |
| H1 | 每页一个，含主关键词，可以与 title 不同 |
| H2 | 对应 5.3 的模块，用采购者的话写，例如 *How to choose*、*What it replaces* |
| 首段 | ≤ 60 词，第一句出现主关键词，直接回答搜索意图 |
| URL | 见 5.6，已定的路径不改 |
| Canonical | 每页指向自己；带 UTM 或筛选参数的 URL 指向无参数版本 |

**竞品做法**：H1 + 首段直接回答，在产品页 6/6、首页 4/6 家具备。 `网页展示`
**对标结论**：跟。

## 8.2 Structured Data Spec 结构化数据规范 ★

`已定` 用 JSON-LD；只标注页面上真实可见的内容。

| 模板 | 类型 | 必填字段 | 说明 |
| --- | --- | --- | --- |
| 全站（首页输出） | Organization、WebSite | name、url、logo、contactPoint（email、WhatsApp）、address（城市级） | 不写 foundingDate，除非 Q01 已确认 |
| 除首页外全站 | BreadcrumbList | 与面包屑一致 | — |
| T3 分类变体 | CollectionPage + ItemList | 子产品名称与 URL | — |
| T3 产品变体 | Product | name、image、description、category、material | **不写 price、offers、review、aggregateRating**：没有公开价格和真实评价，不编造 |
| T4 替代页 | WebPage | — | 不用 Product，避免让搜索引擎把原厂品牌当作 FHS 的产品 |
| T5 行业页 | WebPage | — | — |
| T7 文章 | Article | headline、image、datePublished、dateModified、author | author 用 FHS 或 Nina（确认后） |
| T3、T4、T5、T7 的 FAQ | FAQPage | 与页面 FAQ 一致 | 可以输出，但 Google 已基本不对商业网站显示 FAQ 富结果，不作为目标 |
| T9 询价页 | ContactPage | — | — |
| T10 关于页 | AboutPage | — | — |

**竞品做法**：结构化数据在产品页 5/6、首页 5/6 家具备。 `网页展示`
**对标结论**：跟；不编造评分和价格是“避”。

## 8.3 Image SEO Spec 图片 SEO 规范 ★

`已定` 采购者会用图片搜索找产品（2.5），图片是流量入口。图片来源与拍摄要求见 4.4。

| 项目 | 规则 |
| --- | --- |
| 文件名 | 英文小写，连字符，描述产品与规格：*pp-bag-filter-housing-size-2.jpg* |
| Alt 文本 | 描述画面内容，自然带上产品名；不堆关键词；装饰性图片留空 |
| 图注 | 尺寸图、细节图加图注，写明尺寸（英制 + 公制） |
| 数量 | T3 至少 4 张：整体、端盖或接口、细节、尺寸标注 |
| 格式与尺寸 | WebP（保留 JPG 备用）；主图宽 ≥ 1200 px；单张 ≤ 200 KB |
| 加载 | 首屏主图优先加载，其余懒加载；写明宽高，避免布局跳动 |
| 元数据 | 去掉 EXIF 中的位置等信息 |
| 图片 sitemap | 产品图随页面写进 sitemap |
| 禁止 | 原厂图片和 logo；带他厂品牌、联系方式或水印的图片 |

**竞品做法**：产品图库 5/6 家具备，尺寸细节图 0/6。 `网页展示`
**对标结论**：跟（图库）+ 补（尺寸细节图，同时是图片搜索的差异化入口）。

## 8.4 Indexing Strategy 收录策略

`已定`

| 类别 | 页面 | 处理 |
| --- | --- | --- |
| index | 68 个页面（5.1） | 写进 sitemap；按批次提交 |
| noindex | `lab`、`accessories` | `noindex, follow`；不进 sitemap、不进导航 |
| 待确认 | `edible-oil` | 保持 index，内容优先级最低（IA-Q2） |
| 不建页 | `presses`、`cases` | 没有 URL，任何页面不链接 |
| 不收录的功能页 | 产品范围搜索结果、带参数的 URL | `noindex` 或 canonical 到无参数版本 |
| 301 | 见 5.6 | 上线当天生效 |

**最低内容标准**：一个页面要设为 index，至少要有首段、产品范围或规格范围、3 条以上选型要点或工况说明、实拍图、联系模块。达不到的页面（包括骨架页 `other-cartridges`、`special-housings`、`general-industry`）先 noindex，补齐后再改为 index。

**上线与提交**

1. 未上线的批次不出现在导航、sitemap 和内链里，避免出现空页面。
2. Search Console 使用域名资源；sitemap 按栏目拆分（products、applications、replacement、knowledge、company）。
3. 每批上线当天提交 sitemap，并对该批的重点页手动请求收录。
4. 上线后第 1 个月每周看“网页”报告，处理“已抓取，尚未编入索引”的页面。

**性能**：Core Web Vitals 目标为 LCP < 2.5 秒、INP < 200 毫秒、CLS < 0.1（移动端）。网站已接入 Cloudflare。

## 8.5 Internationalization 多语言策略

`已定` **本期只做英文**，只保留框架。

| 项目 | 设定 |
| --- | --- |
| URL 方案 | 子目录，如 `/es/`、`/ru/`；英文版保持根目录 |
| hreflang | 增加第二种语言时同时上线，含 `x-default` 指向英文 |
| 翻译 | 不直接上线机翻；产品名、规格与术语表（4.3）一并翻译并人工复核 |
| 选择语言的依据 | 主要出口市场（Q02）+ Search Console 中非英语国家的展示量 |
