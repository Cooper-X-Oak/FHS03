# 06 内容层 Content Strategy

内容层定义“每页写什么、为什么能排上去”：内容支柱、关键词分配、信息增量、给 agent 的简报模板、质检清单和生产排期。

**本章的核心判断：这个市场的采购搜索量小、竞争弱，门槛是产品资料的扎实程度，不是内容规模。** `分析判断`（R7）FHS 不比文章数量，不追与采购无关的流量，把力气花在产品页的规格、图片和选型上。

## 6.1 Content Pillars & Topic Clusters 内容支柱与主题集群 ★

`已定`

| 支柱 | 回答的问题 | 承载模板 | 主要买家 | 投入 |
| --- | --- | --- | --- | --- |
| 产品与规格 | 有哪些类型、规格范围、怎么选、能替代什么 | T3 | 经销商、系统集成商 | **最高**：核心采购流量的来源 |
| 行业应用 | 这个工况每个工位用什么、要注意什么 | T5 | 终端工厂、系统集成商 | 中：按 1.4 行业优先级 |
| 选型知识 | 精度、材质、尺寸怎么选，问题怎么排查 | T7 | 所有人（早期） | 中：只写与采购选型相关的题 |
| 品牌替代 | 能不能替换我现在用的型号 | T4 | 终端工厂、经销商 | 低（SEO）/ 高（转化）：页面是询价入口 |

主题集群的成员与链接方式见 5.5。

**竞品做法**：大流量对手的流量主要来自与采购无关的内容（Brother 最大流量页是“纯净水和蒸馏水的区别”，sinteredfilter.net 是“金属熔点和密度”）；核心采购流量最多的是 CFS 的滤芯品类页和 MS 的 PTFE 膜产品页。 `工具数据`

**对标结论**：

- **避**：泛科普、与采购无关的高流量题。
- **跟**：品类页和产品页做透。
- **补**：把“怎么选”放进产品页（M09 产品页 0/6），而不是只写成文章。

## 6.2 Keyword-to-Page Map 关键词—页面映射

`已定`

**规则**：一页一个主关键词、一种意图；同一个词只分给一页。主词写进 title、H1、首段和 URL（URL 已定的不改）。副词来自 IA map 的关键词列，自然出现在 H2 和正文即可。

### 产品页与栏目

| 页面 | 主关键词 | 月搜索 | KD | 前十中国网站 | 判定 | 批次 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| `home` | industrial filter supplier | 30 | — | — | 品牌与分流，不以搜索为目标 | 1 |
| `cartridges` | industrial filter cartridges | 110 | 0 | 1 | 机会 | 1 |
| `high-flow` | high flow filter cartridge | 140 | 0 | 6 | 机会 | 1 |
| `metal` | sintered metal filter | 210 | 0 | 4 | 机会 | 1 |
| `other-cartridges` | pe sintered filter cartridge | — | — | 9 | 中国网站主场 | 1 |
| `pes` | pes filter cartridge | 10 | — | 3 | 待确认 | 1 |
| `depth` | depth filter cartridge | 40 | 0 | 0 | 可争 | 1 |
| `inkjet` | inkjet printer filter | — | — | 5 | 中国网站主场 | 1 |
| `pp-bag-housings` | pp bag filter housing | 10 | — | 2 | 待确认 | 1 |
| `plating-paper` | electroplating filter paper | — | — | 0 | 待确认 | 1 |
| `anode` | anode bags for electroplating | — | — | 0 | 待确认 | 1（集群） |
| `pleated` | pleated filter cartridge | 140 | 0 | 2 | 机会 | 2 |
| `ptfe` | ptfe filter cartridge | 70 | 0 | 1 | 机会 | 2 |
| `capsule` | capsule filter | 210 | 0 | 1 | 机会 | 2 |
| `housings` | filter housing | 1,300 | 0 | 0 | 可争 | 2 |
| `bag-housings` | bag filter housing | 480 | 0 | 1 | 机会 | 2 |
| `cartridge-housings` | cartridge filter housing | 210 | 0 | 1 | 机会 | 2 |
| `high-flow-housings` | high flow filter housing | 10 | — | 2 | 待确认 | 2 |
| `special-housings` | lenticular filter housing | 30 | 0 | 1 | 机会 | 2 |
| `bags` | **filter bag**（调整，见下） | 1,300 | — | — | — | 2 |
| `liquid-bags` | liquid filter bags | 210 | 0 | 1 | 机会 | 2 |
| `membranes` | membrane filter | 1,600 | 0 | 2 | 机会 | 2 |
| `ro-membranes` | ro membrane | 2,900 | 0 | 0 | 可争 | 2 |
| `filter-paper` | industrial filter paper | 10 | 0 | 3 | 机会 | 2 |

> [!NOTE]
> **主词调整** `已定`：研究中 `bags` 与 `liquid-bags` 的主词是同一个词的单复数（liquid filter bag / bags），会互相抢词。`bags` 改用 IA 中的 “filter bag”（1,300），`liquid-bags` 保留 “liquid filter bags”。“filter bag” 的 KD 和 SERP 未研究，上线后用 Search Console 验证。

> [!TIP]
> 第一批里几个 KD 和搜索量缺数据的页面（`pes`、`other-cartridges`、`inkjet`、`plating-paper`），是按“前十已有多个中国网站”加 Nina 的业务权重排进来的，不是按 KD。缺数据不等于没有需求。

### 行业、替代、客户类型、知识

| 页面 | 主关键词 | 月搜索 | KD | 前十中国网站 | 判定 | 批次 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| `electroplating` | electroplating filtration | — | — | 2 | 战略重点 | 1（集群） |
| `beer` | beer filtration | 210 | 0 | 1 | 机会 | 3 |
| `soft-drinks` | juice filtration | 170 | 0 | 2 | 机会 | 3 |
| `wine` | wine filtration system | 320 | 0 | 0 | 可争 | 3 |
| `food-beverage` | food and beverage filtration | 20 | 7 | 1 | 机会 | 3 |
| `water` | industrial water filtration | 880 | 0 | 0 | 可争 | 3 |
| `chemical` | paint filtration | 1,600 | 9 | 0 | 可争 | 3 |
| `general-industry` | industrial liquid filtration | 50 | 0 | 3 | 机会 | 3 |
| `edible-oil` | edible oil filtration | 10 | 39 | 2 | 困难，优先级最低 | 3 末 |
| `replacement` | filter cross reference | 4,400 | 49 | 0 | 困难，不投入 SEO | 1（询价入口） |
| 品牌页 ×7 | 见下方替代页规则 | — | — | — | 询价入口 | 3 |
| `distributors` | wholesale filter cartridges | — | — | 0 | 业务入口 | 1 |
| `oem` | filtration components supplier | — | — | — | 业务入口 | 1 |
| `plating-problems` | electroplating filtration problems | — | — | 4 | 中国网站能排 | 1（集群） |
| `cartridge-life` | filter cartridge clogging | — | — | 0 | 待确认 | 1（集群） |
| `micron-rating` | filter micron rating | 210 | 5 | 2 | 机会 | 3 首 |
| `absolute-vs-nominal` | absolute vs nominal filter rating | 10 | 12 | 3 | 机会 | 3 首 |
| `bag-sizes` | filter bag size chart | 70 | 0 | 1 | 机会 | 3 首 |
| `membrane-materials` | pes vs ptfe filter | — | — | 5 | 中国网站主场 | 3 |
| `bag-vs-cartridge` | bag filter vs cartridge filter | 50 | 0 | 1 | 机会 | 3 |
| `membrane-vs-depth` | depth filter vs membrane filter | 20 | 0 | 1 | 机会 | 3 |
| 其余 6 篇 | 见 IA map | — | — | — | 待确认 | 3 |

数据来源：关键词组（内部资料，未公开）。搜索量为美国月均，`工具数据`。

### 替代页的关键词规则

- **泛品牌词不投入**：“pentair filter cartridge”（1,900）、“3m filter cartridge”（210）的前十被泳池家用和呼吸防护占据；“millipore filter cartridge” KD 44。
- **攻“品牌 + 产品类型”的组合词**：如 *pall high flow filter*、*3m high flow filter*、*eaton bag filter housing*、*parker filter cartridge*。具体组合以上线后 Search Console 的展示数据为准。
- **CUNO 的取舍**：竞品 Filson 靠 “cuno filter housing”（140）排第 1，但客户要求不写 CUNO。FHS 放弃这个词，`3m` 页只用 3M。这是一个明确的流量代价，已按客户意见执行。

## 6.3 Information Gain Plan 信息增量计划 ★

**信息增量 = 前五名都没回答好、而采购者真正需要的内容。**这是 FHS 在同等产品资料下排到前面的理由。

### 已确认的缺口

研究对 34 个机会组做了缺口验收，只确认了 2 条完整问题的缺口。 `网页展示` `分析判断`

| 页面 | 缺口 | FHS 的写法 | 模块 |
| --- | --- | --- | --- |
| `high-flow` | *Which is better, 1 micron or 20 micron?* 前五都没有直接比较 | 按截留、压差、更换频率、成本对比两个等级，给出按工况选择的表 | M09 |
| `general-industry`、`water` | *How much does an industrial water filtration system cost?* 前五只谈组件价格或成本效益 | 说清 FHS 报的是组件，整套系统的成本由哪些部分组成、各自受什么影响；不编造系统价格 | M16 |

### PAA 问题作为必答项

H2/H3 主题对比的验收方法失败了（31/34 组未达标），改为：**每个页面把该词的 PAA 问题列为必答项**，在 M09 或 M17 中直接回答。PAA 候选问题来自研究的 `paa-audit.json`，写简报时逐页抄入。

### FHS 独有的增量

这些内容来自采购侧的经验，竞品（多为工厂或经销商）很少写：

| 信息增量 | 放在哪里 | 为什么适合 FHS | 事实边界 |
| --- | --- | --- | --- |
| 型号不全时，拍哪几处、量哪些尺寸 | T4 全部、T3 的 M10 | 让替代采购从“不确定”进入可沟通状态 | 不发布未经核验的兼容表 |
| 同样精度标签，为什么报价不同 | `micron-rating`、`absolute-vs-nominal`、T3 的 M09 | 解释材料、结构、密封、测试口径的差异 | 引用具体技术来源 |
| 询价时发什么信息，能一次拿到准确报价 | 全部 T3 的联系模块提示、`quote` | 直接降低询价门槛 | — |
| 工况信息不全时，先确认什么 | T5 | 连接行业页与产品页 | 不把通用判断写成工程批准 |
| 组件与整套系统的报价边界 | `oem`、T5 | 系统集成商最关心 | 只说 FHS 报什么 |

## 6.4 Content Brief Template 内容简报模板

给 agent 批量生产用。每页一份简报，Cooper 填写或审核后交给 agent；agent 不得在简报之外新增事实。

```text
page_id:            （与 IA map 一致）
template:           T3 / T4 / T5 / T7
batch:              1 / 2 / 3
main_keyword:       （6.2）
secondary_keywords: （IA map 关键词列）
intent:             采购 / 规格 / 替代 / 应用 / 知识
reader:             Mark 经销商 / Ahmed 集成商 / Laura 终端工厂（2.2）
supporting_message: 价格 / 匹配 / 省心（3.2，只选一条）

must_answer:
  - PAA 问题 1–4（原文）
  - 已确认缺口（6.3，若有）
information_gain:   （6.3 中适用的条目）
facts_from_nina:    （规格范围、图片、样品与起订量等；未提供的留空，页面上不写）
proof_points:       （3.3 编号，只用已确认的）
modules:            （按 5.3 该模板的顺序；缺素材的模块写明“隐藏”）
internal_links:     父级 / 同级 / 行业页 / 文章（5.5）
cta_hint:           （4.5 对应文案；需求提示按品类改写）
images:             （文件名、alt、类型：实拍 / 细节 / 尺寸）
title / meta / H1:  （8.1 规则）
schema:             （8.2）
word_count_hint:    T3 600–1,200 · T5 800–1,500 · T7 1,000–2,000（只作参考，以回答完整为准）
```

## 6.5 Editorial QA Checklist 发布前质检清单

`已定` 每页发布前逐项打勾；任何一项不通过就不发布。

| 类别 | 检查项 |
| --- | --- |
| 事实 | 每个数字、规格、承诺都能在 Nina 提供的资料里找到；没有挪用竞品的年限、认证、交期 |
| 定位 | 没有 manufacturer、factory、our factory 指代 FHS；没有 equipment maker；没有 CUNO |
| 替代 | 只写 *replacement for*、*compatible with*；有商标声明；没有原厂 logo 和产品图 |
| 意图 | 首段直接回答主关键词的意图；PAA 必答项都已回答 |
| 设计支柱 | 页面让采购者更快“看到产品、放进询价名单”（1.1 判断句） |
| 语气与术语 | 符合 4.2、4.3；美式英语；尺寸英制与公制并列 |
| SEO 字段 | title、meta、H1、URL、schema 符合 8.1、8.2 |
| 图片 | 至少 4 张实拍（T3）；文件名和 alt 符合 8.3；没有他厂水印 |
| 内链 | 符合 5.5 的数量要求；没有链接到不建页或 noindex 页 |
| 转化 | 联系模块、长尾入口、移动端固定栏都在；需求提示已按页面改写；埋点参数 `page_id` 正确 |

## 6.6 Content Production Plan 生产排期

`已定` 批次依据 R7 第 4 节。每批上线即提交收录，不等全部完成。

| 批次 | 页面 | 上线前提 |
| --- | --- | --- |
| **第一批：最快见效，也是 Nina 的主力产品** | `home`、`products`、`cartridges`、`high-flow`、`metal`、`other-cartridges`、`pes`、`depth`、`inkjet`、`pp-bag-housings`、`plating-paper`、`solutions`、`distributors`、`oem`、`replacement`（总页）、`quote`、`catalog`、`about`、`support`、`privacy`、`terms` | Q10 规格资料与 Q06 实拍图（对应品类）；Q03 回复时效 |
| 第一批末：电镀集群 | `applications`、`knowledge`（栏目入口）、`electroplating`、`plating-problems`、`cartridge-life`、`anode` | 电镀相关产品图与工况经验 |
| **第二批：搜索量大，但前十被欧美目录网站占据** | `housings`、`bag-housings`、`cartridge-housings`、`high-flow-housings`、`special-housings`、`bags`、`liquid-bags`、`capsule`、`pleated`、`ptfe`、`filter-paper`、`membranes`、`ro-membranes` | 规格、尺寸图、选型要比目录网站更完整 |
| **第三批：行业、知识与替代** | 行业页（`beer`、`soft-drinks`、`wine`、`food-beverage`、`water`、`chemical`、`general-industry`，`edible-oil` 最后）；文章（先 `micron-rating`、`absolute-vs-nominal`、`bag-sizes`）；7 个品牌替代页；`news` | Q05 文件类型（食品饮料页）；Q11 可公开的替代品牌 |

> [!WARNING]
> **父页先行**：第一批里的子页（`pes`、`inkjet`、`pp-bag-housings`、`plating-paper`）的父页（`pleated`、`capsule`、`bag-housings`、`housings`、`filter-paper`）属于第二批。父页在第一批先以“分类版”上线：首段、子产品网格、规格范围、联系模块，满足 8.4 的最低内容标准；完整内容在第二批补齐。

栏目入口随所属批次的第一个子页上线，只列已上线的子页；导航里未上线的栏目先不显示。
