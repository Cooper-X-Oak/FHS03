# FHS 网站 IA Map

> 版本 v2.1 · 2026-10-15 · 依据：原 IA 图（v1，由 SITEMAP.md 生成）+ 客户 2026-10-15 反馈。v1 的页面、路径、关键词、模板和 Nina 备注全部保留，改动见文末变更记录。

## 读表说明

| 字段 | 含义 |
| --- | --- |
| 层级 | N0 首页；N1 一级栏目；N2–N4 逐级下钻 |
| 模板 | T1–T10，定义见“页面模板” |
| 状态 | 线框内 / 新增页（线框外）/ 骨架页（先搭框架，内容后补）/ 升级为完整页（原骨架页，v2.1 起完整建设）/ 规划中（暂不建页）/ 本次新增 |
| 索引 | index：本期建设并提交收录；noindex：保留框架，不推广；不建页：规划中 |
| 关键词 | 括号内为美国月搜索量；(?) 为尚无数据 |
| 模块顺序 | 各模板的模块与顺序以设定集 5.3 为准；本文末“页面模板”保留 v1 原始列表，仅供追溯 |

## 核心品类与客户

- **5 个核心品类**：滤芯、滤袋、滤壳、滤膜、滤纸。
- **客户结构**：经销商、贸易商、配件商与系统集成商合计约 80%；终端工厂（啤酒、葡萄酒、饮料、印刷等）约 20%，利润好。
- **替代需求**：任何品牌。国际巨头单独成页：Pall、3M、Parker、Pentair、Eaton、Sartorius、Millipore。
- **行业优先级（食品饮料）**：酒类 > 软饮料 > 食用油。

## 首页

| 页面 | 路径 | 层级 | 模板 | 索引 | 关键词 |
| --- | --- | --- | --- | --- | --- |
| Home | / | N0 | T1 | index | industrial filter supplier (30); filtration products supplier China (?); 品牌词 FHS Filtration |

> [!NOTE]
> `已定`（IA-Q4）：去掉 Manufacturer 定位。原主词 “industrial filtration manufacturer” 月搜索 30、KD 53，没有 SEO 价值，且与“多厂匹配的采购合作伙伴”定位冲突。首页不以搜索流量为目标，承担品牌词、分流和询价；采购流量由品类页和产品页承接。

## 产品：Products `/products/`

| 页面ID | 页面 | 路径 | 层级 | 模板 | 状态 | 索引 | 关键词 | SEO 标题 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `cartridges` | Filter cartridges | /products/cartridges/ | N2 | T3 | 线框内 | index | cartridge filter (2900); industrial filter cartridges (110); filter cartridge replacement (390); micron filter cartridge (?) | Industrial Filter Cartridges \| FHS Filtration |  |
| `pleated` | Pleated cartridges | /products/cartridges/pleated-filter-cartridges/ | N3 | T3 | 新增页（线框外） | index | pleated filter cartridge (140); pleated membrane filter (?); membrane filter cartridge (?); micron pleated filter (?); polypropylene filter cartridge (110); polypropylene filter cartridges (110); pp pleated filter cartridge (?); nylon filter cartridge (?); nylon pleated filter cartridge (?); glass fiber filter cartridge (?); gf filter cartridge (?); pvdf filter cartridge (140); pvdf cartridge filter (140) | Pleated Filter Cartridges by Material \| FHS Filtration |  · 分节：PES, PTFE, Nylon, PVDF, Glass fibre, PP |
| `pes` | PES cartridges | /products/cartridges/pes-filter-cartridges/ | N4 | T3 | 线框内 | index | cartridge filter pes (90); pes filter cartridge (?); pes filter cartridge manufacturer (?) | PES Pleated Filter Cartridges \| FHS Filtration |  |
| `ptfe` | PTFE cartridges | /products/cartridges/ptfe-filter-cartridges/ | N4 | T3 | 线框内 | index | ptfe filter (480); ptfe filter cartridge (70); filter cartridge ptfe (70); ptfe cartridge filter (70); ptfe filter cartridge manufacturer (?) | PTFE Filter Cartridges \| FHS Filtration |  |
| `high-flow` | High flow cartridges | /products/cartridges/high-flow-filter-cartridges/ | N3 | T3 | 线框内 | index | high flow filter cartridge (140); high flow cartridge filter (140); high flow filter cartridges (140); hi flow filter cartridge (140); high flow filter cartridge manufacturer (?) | High Flow Filter Cartridges \| FHS Filtration |  |
| `depth` | Depth & prefilter cartridges | /products/cartridges/depth-filter-cartridges/ | N3 | T3 | 线框内 | index | melt blown filter (110); meltblown filter (110); melt blown filtration (110); depth filter cartridge (?); sediment filter cartridge (?); 5 micron filter cartridge (?); string wound filter cartridge (?); wound filter cartridge (?); carbon filter cartridge (?); carbon block filter cartridge (?); carbon fiber filter cartridge (?) | Depth Filter Cartridges for Prefiltration \| FHS Filtration | Nina：深层滤芯是电镀客户和欧洲经销商的走量产品。质量要点（发布前确认）：每支人工检验、足克重、从不在货里夹带联系方式绕过经销商。 · 分节：Melt blown, String wound, Carbon block and carbon fibre |
| `capsule` | Capsule filters | /products/cartridges/capsule-filters/ | N3 | T3 | 新增页（线框外） | index | capsule filter (210) | Capsule Filters for Liquids \| FHS Filtration |  · 分节：General capsule filters, Inkjet printer filters |
| `inkjet` | Inkjet printer filters | /products/cartridges/inkjet-printer-filters/ | N4 | T3 | 新增页（线框外） | index | inkjet printer filter (?); cij printer filter (?); ink filter (?); videojet filter (?); domino ink filter (?); markem imaje filter (?); imaje filter (?); hitachi inkjet filter (?); willett printer filter (?) | Inkjet Printer Filters by Printer Brand \| FHS Filtration | Nina：喷码机配件客户很多。两条主线：喷码机品牌和型号，或滤芯本身的型号。按客户的产品分类，喷码机滤芯归在滤芯 › 囊式滤芯下面。 · 分节：Videojet, Domino, Markem-Imaje, Hitachi, Willett |
| `metal` | Metal filters | /products/cartridges/sintered-metal-filters/ | N3 | T3 | 新增页（线框外） | index | sintered metal filter (210); stainless steel cartridge filter (110); titanium sintered filter (?) | Sintered Metal Filter Cartridges \| FHS Filtration |  · 分节：Stainless steel pleated, Stainless steel sintered, Titanium sintered |
| `other-cartridges` | Other cartridges | /products/cartridges/pe-sintered-filter-cartridges/ | N3 | T3 | 升级为完整页 | index | pe sintered filter cartridge (?); resin bonded filter cartridge (?) | PE Sintered and Resin Filter Cartridges \| FHS Filtration | 升级为完整建设，排第一批：前十有 9 个中国网站，几乎是中国网站的赛道（R7）。原备注：骨架页。 · 分节：PE sintered, Resin bonded |
| `housings` | Filter housings | /products/housings/ | N2 | T3 | 线框内 | index | filter housing (1300); filter housings (1300); stainless steel filter housing (320); filter vessel (90); filter housing manufacturer (30); micron filter housing (?) | Filter Housings: Bag and Cartridge \| FHS Filtration | 按『形式 × 材质』组织：袋式和芯式，各有不锈钢、PP、PVDF。 |
| `bag-housings` | Bag filter housings | /products/housings/bag-filter-housings/ | N3 | T3 | 新增页（线框外） | index | bag filter housing (480); filter bag housing (260); stainless steel bag filter housing (140); ss bag filter housing (?); pvdf filter housing (?); pvdf bag filter housing (?); duplex filter housing (?); duplex bag filter (?); bag filter housing system (?) | Bag Filter Housings: SS, PP and PVDF \| FHS Filtration |  · 分节：PP, Stainless steel, PVDF, Duplex and multi-bag systems |
| `pp-bag-housings` | PP bag housings | /products/housings/pp-bag-filter-housings/ | N4 | T3 | 线框内 | index | pp bag filter housing (?); pp filter housing (?); plastic bag filter housing (?) | PP Bag Filter Housings \| FHS Filtration | Nina：这一个产品占滤壳业务约 80%。 |
| `cartridge-housings` | Cartridge housings | /products/housings/cartridge-filter-housings/ | N3 | T3 | 新增页（线框外） | index | cartridge filter housing (210); stainless steel water filter housing (110); ss filter housing (?); pp cartridge filter housing (?) | Cartridge Filter Housings: SS and PP \| FHS Filtration |  · 分节：Stainless steel, PP, PVDF |
| `high-flow-housings` | High flow housings | /products/housings/high-flow-filter-housings/ | N3 | T3 | 新增页（线框外） | index | high flow filter housing (?) | High Flow Filter Housings \| FHS Filtration |  · 分节：Stainless steel, PP |
| `special-housings` | Special housings | /products/housings/special-filter-housings/ | N3 | T3 | 骨架页 | index | lenticular filter housing (?); disc filter housing (?); vent filter housing (?) | Lenticular and Special Filter Housings \| FHS Filtration | 骨架页：标题、简介、产品范围和询价入口；完整内容后续补。 |
| `presses` | Filter presses | /products/housings/filter-presses/ | N3 | T3 | 规划中 | 不建页 | plate and frame filter press (?); stainless steel plate and frame filter (?) | Plate and Frame Filter Press \| FHS Filtration | 规划中，暂不建页、不进导航、其他页面不链接它。Nina：2027 新系列，约 10 种；归在滤壳大类下面。网站主线整理好以后再加。 |
| `bags` | Filter bags | /products/bags/ | N2 | T3 | 线框内 | index | filter bag (1300); filter bags for water (720) | Filter Bags for Liquid Filtration \| FHS Filtration | 滤袋和袋式过滤器是配套的，页面互相链接。 |
| `liquid-bags` | Liquid filter bags | /products/bags/liquid-filter-bags/ | N3 | T3 | 新增页（线框外） | index | liquid filter bag (210); liquid filter bags (210); filter bag supplier (110); polypropylene filter bags (110); polyester filter bags (90); 5 micron bag filter (170); 10 micron bag filter (70); chemical filter bag (?); nylon filter bag (140); mesh filter bags (170); nylon mesh filter bag (90); nylon mesh filter bags (90); oil absorbing filter bag (?) | Liquid Filter Bags: Felt, Mesh and PTFE \| FHS Filtration |  · 分节：PP and PE felt, PTFE, Nylon mesh, Oil absorbing |
| `anode` | Anode bags | /products/bags/anode-bags/ | N3 | T3 | 新增页（线框外） | index | anode bag (?); electroplating anode bags (?); titanium basket anode bag (?) | Anode Bags for Electroplating \| FHS Filtration |  |
| `filter-paper` | Filter paper | /products/filter-paper/ | N2 | T3 | 线框内 | index | industrial filter paper (?); filter paper roll (?); edible oil filter paper (?); filter sheets (?); qualitative filter paper (?); quantitative filter paper (?) | Industrial Filter Paper \| FHS Filtration |  · 分节：Electroplating, Food grade (2027), Laboratory (2027) |
| `plating-paper` | Electroplating paper | /products/filter-paper/electroplating-filter-paper/ | N3 | T3 | 新增页（线框外） | index | electroplating filter paper (?); plating filter paper (?) | Electroplating Filter Paper, Cut to Size \| FHS Filtration | Nina：电镀行业用量第二大的产品。 |
| `membranes` | Membranes | /products/membranes/ | N2 | T3 | 升级为完整页 | index | membrane filter (1600); filter membrane (1600); ptfe membrane filter (210); pes membrane filter (170); polyethersulfone membrane (260); uf membrane (?); ultrafiltration membrane (?) | Membrane Filters: Microfiltration and UF \| FHS Filtration | `已定`（IA-Q1）：滤膜是 5 个核心品类之一，完整建设，排第二批。前十已有 2 个中国网站。原备注：膜元件排第五，先搭框架。 · 分节：Microfiltration, Ultrafiltration (UF) |
| `ro-membranes` | RO membranes | /products/membranes/ro-membranes/ | N3 | T3 | 升级为完整页 | index | ro membrane (2900); ro membrane filter (880); reverse osmosis filter membrane (880); membrane filter for water treatment (320) | RO Membranes and Prefiltration \| FHS Filtration | `已定`（IA-Q1）：随滤膜品类完整建设，排第二批。前十没有中国网站（欧美经销商目录占据），内容同时承担把 RO 流量引向前置过滤产品（深层滤芯、袋式滤壳）。 |
| `lab` | Lab filtration | /products/lab/ | N2 | T3 | 骨架页 | noindex | syringe filter (1600); 0.22 micron filter (590); membrane filter disc (?); lab membrane filter (?); vacuum filter cup (?); bottle top filter (?) | Syringe Filters and Lab Filtration \| FHS Filtration | 客户反馈：暂不做推广和收录，只搭框架；后续慢慢整理利润好、复购高的实验室过滤产品。原备注：次要产品线：先搭框架（骨架页），不做内容；主线产品完成后再补。 · 分节：Syringe filters, Membrane discs, Filter cups |
| `accessories` | Filtration accessories | /products/accessories/ | N2 | T3 | 骨架页 | noindex | no keyword target | Filtration Accessories \| FHS Filtration | 客户反馈：统一叫过滤配件，不突出泵；非核心，暂不推广，避免内容分散。原备注：次要产品线：先搭框架（骨架页），不做内容；主线产品完成后再补。 Nina：客户买过滤器时顺带配泵、阀门和管件，打包出口。 |
| `catalog` | Product catalog | /products/catalog/ | N2 | T9 | 线框内 | index | no keyword target | Filtration Product Catalog \| FHS Filtration |  |

## 行业应用：Applications `/applications/`

| 页面ID | 页面 | 路径 | 层级 | 模板 | 状态 | 索引 | 关键词 | SEO 标题 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `electroplating` | Electroplating | /applications/electroplating/ | N2 | T5 | 线框内 | index | electroplating filtration (?); plating solution filtration (?); electroplating filter cartridge (?); electroplating filter bag (?) | Electroplating Filtration Supplies \| FHS Filtration | 战略重点，提升为一级行业。产品用量：深层滤芯第一、电镀滤纸第二，另有碳棒滤芯、阳极袋、PP/PVDF 滤壳。 |
| `food-beverage` | Food & beverage | /applications/food-beverage/ | N2 | T5 | 线框内 | index | food and beverage filtration (20); beverage filtration (?); juice filtration (?); soft drink filtration (?); coconut water filtration (?); bottled water filtration (?); dairy filtration (?) | Food and Beverage Filtration \| FHS Filtration | 食品饮料总页。行业优先级（客户反馈）：酒类（啤酒、葡萄酒、苹果酒、蒸馏酒）> 软饮料（可乐、果汁等）> 食用油。 · 分节：Wine, Edible oil, Beer, Juice and beverages, Bottled water, Dairy and plant milk |
| `beer` | Beer & brewery | /applications/food-beverage/beer/ | N3 | T5 | 本次新增 | index | brewery filter (110); beer filtration (?) | Beer and Brewery Filtration \| FHS Filtration | 客户长期在做的终端行业（啤酒厂）。主关键词待新页面关键词研究确认。 |
| `wine` | Wine, cider & spirits | /applications/food-beverage/wine/ | N3 | T5 | 线框内 | index | wine filtration system (320); wine filter equipment (90); wine filter paper (20); cider filtration (?); spirits filtration (?) | Wine, Cider and Spirits Filtration \| FHS Filtration | 线框路径 /applications/wine/，并入食品饮料。 客户反馈：扩为葡萄酒、苹果酒等果酒和蒸馏酒；主关键词待重新确认。 |
| `soft-drinks` | Soft drinks & juice | /applications/food-beverage/soft-drinks/ | N3 | T5 | 本次新增 | index | beverage filtration (?); juice filtration (?); soft drink filtration (?) | Soft Drink and Juice Filtration \| FHS Filtration | 覆盖可乐、果汁等软饮料。主关键词待新页面关键词研究确认。 |
| `edible-oil` | Edible oil | /applications/food-beverage/edible-oil/ | N3 | T5 | 新增页（线框外） | index（待确认） | edible oil filtration (?); cooking oil filtration (?); palm oil filtration (?); coconut oil filter (?) | Edible Oil Filtration: Palm, Coconut, Olive \| FHS Filtration | Nina 靠这个词拿下椰子油、棕榈油大客户。 客户反馈：食用油要靠后一点。索引状态待确认：曾靠此词拿下大客户，未确认前保持 index，只降低内容优先级。 |
| `water` | Water treatment | /applications/water/ | N2 | T5 | 线框内 | index | industrial water filtration (880); industrial water treatment equipment (110); process water filtration (?); ro prefiltration (?); what micron filter before ro (?); seawater desalination filter (?); ultrapure water filtration (?); industrial wastewater filtration (?) | Industrial Water Filtration Products \| FHS Filtration |  · 分节：RO prefiltration, Desalination, Ultrapure water, Wastewater |
| `chemical` | Chemical processing | /applications/chemical/ | N2 | T5 | 线框内 | index | paint filtration (?); paint filter bags (?); coating filtration (?); ink filtration (?); inkjet ink filtration (?); printhead filter (?) | Chemical Process Filtration \| FHS Filtration |  · 分节：Paints and coatings, Ink manufacturing, Inkjet printing |
| `general-industry` | General industry | /applications/general-industry/ | N2 | T5 | 骨架页 | index | industrial liquid filtration (?); oil and gas filtration (?); produced water filtration (?); power plant filtration (?); lithium battery slurry filtration (?); pharmaceutical filter cartridges (?); sterile filtration (?); semiconductor filtration (?); cmp slurry filter (?) | Industrial Liquid Filtration \| FHS Filtration | 骨架页：标题、简介、产品范围和询价入口；完整内容后续补。 · 分节：Oil and gas, Energy, Pharma and biotech, Microelectronics |

## 品牌替代：Replace any brand `/replacement/`

定位改为“任何品牌都可以”：国际巨头、全球中小品牌、当地品牌、中国品牌，都可以发型号或照片匹配。分区自有关键词：filter cross reference (400)。

| 页面ID | 页面 | 路径 | 层级 | 模板 | 状态 | 索引 | 关键词 | SEO 标题 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `eaton` | Eaton replacements | /replacement/eaton/ | N2 | T4 | 新增页（线框外） | index | eaton filter bags (?); eaton bag filter housing (?) | Eaton Filter Bag Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |
| `pall` | Pall replacements | /replacement/pall/ | N2 | T4 | 新增页（线框外） | index | pall filter cartridge (?); pall high flow filter (?) | Pall Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |
| `3m` | 3M replacements | /replacement/3m/ | N2 | T4 | 新增页（线框外） | index | 3m filter cartridge (?); 3m high flow filter (?); 3m cuno filter cartridge (?) | 3M Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 客户要求：标题、H1、URL 不写 CUNO；旧地址 /replacement/3m-cuno/ 做 301。“3m cuno”保留为副词，仅用于数据追踪。 |
| `parker` | Parker replacements | /replacement/parker/ | N2 | T4 | 新增页（线框外） | index | parker filter cartridge (?) | Parker Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |
| `sartorius` | Sartorius replacements | /replacement/sartorius/ | N2 | T4 | 新增页（线框外） | index | sartorius filter cartridge (?) | Sartorius Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |
| `pentair` | Pentair replacements | /replacement/pentair/ | N2 | T4 | 本次新增 | index | pentair filter cartridge (?); pentair filter replacement (?) | Pentair Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |
| `millipore` | Millipore replacements | /replacement/millipore/ | N2 | T4 | 本次新增 | index | millipore filter cartridge (?); millipore filter replacement (?) | Millipore Filter Cartridge Replacements \| FHS Filtration | 只列核对过的型号；注明商标归原厂所有。没有核对数据时，页面以型号/照片询价为主。 |

## 客户类型：Who we serve `/solutions/`

原分区名 “OEM & Distributors”。客户反馈原语言和定位不准，改为按客户类型分流：经销商、系统集成商两页，并提供到各行业页的入口（承接终端工厂）。分区自有关键词：industrial filter systems (110)。

| 页面ID | 页面 | 路径 | 层级 | 模板 | 状态 | 索引 | 关键词 | SEO 标题 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `oem` | System integrators & contractors | /solutions/system-integrators/ | N2 | T6 | 线框内 | index | no keyword target | Filtration Components for System Integrators \| FHS Filtration | 客户反馈：这类客户是系统集成商、工程商（如水处理整套系统商），自己不制造组件，采购后组装成系统。全站不得使用 equipment maker。旧地址 /solutions/oem-integrators/ 做 301。原备注：第一核心客户：设备商和系统集成商。 · 分节：Equipment makers, Complete supply packages |
| `distributors` | Distributors, resellers & parts suppliers | /solutions/distributors/ | N2 | T6 | 线框内 | index | wholesale filter cartridges (?); filter cartridge supplier (?); filter cartridge manufacturer (40); oem filter cartridge manufacturer (?); custom filter cartridge (?) | Wholesale Filter Cartridges \| FHS Filtration | 客户反馈：覆盖过滤产品经销商、贸易商、中间商、配件商（如喷码机、陶瓷喷码机配件商，啤酒设备商），不局限于某一类。与系统集成商合计约占客户 80%。原备注：第二核心客户。可用的信任点（需 Nina 确认公开）：深层滤芯每支专人全检、克重足量；不夹带联系方式绕过经销商；大批量稳定供货。 · 分节：Distribution supply, Private label |

## 知识与公司：Guides `/knowledge/`

| 页面ID | 页面 | 路径 | 层级 | 模板 | 状态 | 索引 | 关键词 | SEO 标题 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `choose-cartridge` | Choosing a cartridge | /knowledge/how-to-choose-a-filter-cartridge/ | N2 | T7 | 新增页（线框外） | index | how to choose filter cartridge (?); how to select filter cartridge (?) | How to Choose a Filter Cartridge \| FHS Filtration |  |
| `micron-rating` | Micron rating guide | /knowledge/filter-micron-rating-guide/ | N2 | T7 | 新增页（线框外） | index | filter micron rating (?); micron rating chart (?) | Filter Micron Rating Guide \| FHS Filtration |  |
| `bag-sizes` | Filter bag size chart | /knowledge/filter-bag-sizes/ | N2 | T7 | 新增页（线框外） | index | filter bag size chart (70); filter bag sizes (70) | Filter Bag Size Chart: #1, #2, #3, #4 \| FHS Filtration |  |
| `membrane-materials` | PES vs PTFE vs PVDF | /knowledge/pes-vs-ptfe-vs-pvdf/ | N2 | T7 | 新增页（线框外） | index | pes vs ptfe filter (?); ptfe vs pes vs pvdf (?) | PES vs PTFE vs PVDF Filter Cartridges \| FHS Filtration |  |
| `membrane-vs-depth` | Membrane vs depth | /knowledge/membrane-vs-depth/ | N2 | T7 | 线框内 | index | depth filter vs membrane filter (?) | Depth Filter vs Membrane Filter Guide \| FHS Filtration |  |
| `absolute-vs-nominal` | Absolute vs nominal | /knowledge/absolute-vs-nominal-filter-rating/ | N2 | T7 | 新增页（线框外） | index | absolute vs nominal filter rating (?) | Absolute vs Nominal Filter Rating \| FHS Filtration |  |
| `bag-vs-cartridge` | Bag vs cartridge | /knowledge/bag-filter-vs-cartridge-filter/ | N2 | T7 | 新增页（线框外） | index | bag filter vs cartridge filter (?) | Bag Filter vs Cartridge Filter \| FHS Filtration |  |
| `felt-vs-mesh` | Felt vs mesh bags | /knowledge/felt-vs-mesh-filter-bags/ | N2 | T7 | 新增页（线框外） | index | felt vs mesh filter bags (?) | Felt vs Mesh Filter Bags \| FHS Filtration |  |
| `housing-sizing` | Sizing a housing | /knowledge/how-to-size-a-filter-housing/ | N2 | T7 | 新增页（线框外） | index | how to size filter housing (?); bag filter housing flow rate (?) | How to Size a Filter Housing \| FHS Filtration |  |
| `ss304-vs-316l` | 304 vs 316L housings | /knowledge/304-vs-316l-filter-housing/ | N2 | T7 | 新增页（线框外） | index | 304 vs 316 stainless steel filter housing (?) | 304 vs 316 Stainless Steel Filter Housing \| FHS Filtration |  |
| `022-vs-045` | 0.22 vs 0.45 micron | /knowledge/0-22-vs-0-45-micron-filter/ | N2 | T7 | 新增页（线框外） | index | 0.22 vs 0.45 micron filter (?) | 0.22 vs 0.45 Micron Filter \| FHS Filtration |  |
| `ro-prefilter-micron` | RO prefilter micron | /knowledge/what-micron-filter-for-ro-prefiltration/ | N2 | T7 | 新增页（线框外） | index | ro prefilter micron (?) | What Micron Filter for RO Prefiltration \| FHS Filtration |  |
| `cartridge-life` | Short cartridge life | /knowledge/short-filter-cartridge-life/ | N2 | T7 | 新增页（线框外） | index | filter cartridge clogging (?); how often to change industrial filter cartridges (?) | Why Filter Cartridges Clog Too Fast \| FHS Filtration |  |
| `plating-problems` | Plating filtration problems | /knowledge/electroplating-filtration-problems/ | N2 | T7 | 新增页（线框外） | index | electroplating filtration problems (?) | Electroplating Filtration Problems \| FHS Filtration |  |
| `news` | News | /knowledge/news/ | N2 | T8 | 新增页（线框外） | index | no keyword target | FHS Filtration News \| FHS Filtration | 新闻列表页；单篇新闻是 CMS 集合 news，路径 /knowledge/news/<slug>/，用 T7 模板。 |
| `cases` | Case studies | /knowledge/cases/ | N2 | T8 | 规划中 | 不建页 | no keyword target | Filtration Case Studies \| FHS Filtration | 规划中：有真实、获授权的案例以后再建。 |
| `quote` | Get a quote | /quote/ | N1 | T9 | 线框内 | index | no keyword target | Get a Filtration Quote \| FHS Filtration | 表单字段：品牌、型号、照片、使用场景、数量、联系方式。提交后存入后台并发邮件到 sales@fhsfiltration.com；同时提供预填消息的 WhatsApp 一键联系和微信二维码。 `已定`（IA-Q3）：不用“4 小时报价”；全站统一写 24 小时内回复。 |
| `about` | About FHS | /about/ | N1 | T10 | 线框内 | index | no keyword target | About FHS Filtration | `已定`（IA-Q4）：定位为 China-based filtration sourcing partner（见设定集 1.3），不称 manufacturer / factory。原定位 “Industrial Filtration Manufacturer + Solution Provider + Supply Chain Integrator” 作废。合作工厂可以如实描述，但不能写成 FHS 自有；验货、出口国家等模块只放能兑现的事实。 |
| `support` | Technical support | /support/ | N1 | T10 | 线框内 | index | no keyword target | Technical Support \| FHS Filtration |  |
| `privacy` | Privacy | /privacy/ | N1 | T10 | 线框内 | index | no keyword target | Privacy Policy \| FHS Filtration |  |
| `terms` | Terms | /terms/ | N1 | T10 | 线框内 | index | no keyword target | Terms of Use \| FHS Filtration |  |

页面合计：首页 1 + 栏目页 66（不含 5 个分区入口）。

## 页面模板

| 模板 | 名称 | 适用页面 | 用途 |
| --- | --- | --- | --- |
| T1 | Home | 1 | 首页：讲清定位，首屏就能进入产品、应用和行业，并分流到替代询价。 |
| T2 | Section hub | 3 | 一级栏目入口：概览本栏目，卡片链接到下一级页面。 |
| T3 | Product landing | 26 | 分类页和产品页共用：写清有什么、怎么选、能替代什么，并直接转询盘。分类变体多一个子产品网格，产品变体多一张规格选项表。 |
| T4 | Cross-reference | 8 | 替代询价：输入型号或上传照片即可询价。中心页定位“任何品牌都可以”，品牌页说明能替代该品牌哪些产品族。 |
| T5 | Application | 9 | 行业和工艺页：从客户的工艺出发，说明每个工位用什么产品，再引到替代询价。 |
| T6 | Customer type | 2 | 按客户身份的方案页：回应这类客户的顾虑，用专属表单收询盘。本次改为经销商、系统集成商两页。 |
| T7 | Article | 14 | 知识文章和新闻：接研究型长尾词，并把读者送到产品落地页。 |
| T8 | Archive | 3 | 列表页：按主题或行业筛选文章、案例和新闻。 |
| T9 | Tool | 2 | 单页工具：询价表单、产品目录和目录里的单个型号卡片页。 |
| T10 | Company & legal | 4 | 公司和法律页：图文段落。关于我们额外放工厂、认证和出口国家模块（只放能兑现的事实）。 |

### T1 Home

1. Hero: positioning + send part number / photo (no video)（v2.1：不写 manufacturer）
2. Industry entry buttons above the fold
3. Three ways in: products · replacement · applications
4. Product lines grid
5. Proof: metrics, certifications, cases（只放能兑现的事实）
6. Customer types（经销商、系统集成商、终端工厂）
7. How quoting works（24 小时内回复）
8. CTA band

### T2 Section hub

1. Intro + value line
2. Child page cards
3. Finder shortcut (catalog / part number)
4. Proof strip
5. CTA band

### T3 Product landing

1. Hero: what + who + send part number / photo
2. Category: child product grid + how to choose
3. Product: what we supply (materials, micron range, sizes, connections)
4. How to choose
5. What it replaces (brand styles, no unverified rows)
6. Section tabs when the page covers several sub-types
7. Where it works (links to applications)
8. Proof: inspection, supply, cases
9. FAQ (MOQ, lead time, samples)
10. Related guides
11. Sticky quote + WhatsApp

### T4 Cross-reference

1. Hero with part-number input and photo upload
2. Hub: brand list + “any brand” entry（本次调整）
3. Brand: product families we replace (+ verified models when available)
4. How matching works: part no. / photo → spec → quote
5. What we match and what we don't
6. Trademark notice（品牌名归各自所有者，FHS 与其无隶属关系）
7. Related product landings
8. FAQ
9. CTA band

### T5 Application

1. Problem hero
2. Industry: process list
3. Process stages diagram (where filters sit)
4. Products per stage (links to product landings)
5. Case with before / after numbers（有真实授权案例时）
6. Common mistakes
7. CTA: send what you use now

### T6 Customer type

1. Pain points and answers
2. Supply package
3. How it works (steps)
4. Categories that fit
5. Proof / testimonials
6. Lead form tuned to the customer type

### T7 Article

1. Title + summary + contents
2. Body with tables and diagrams
3. Inline product callouts
4. Related product landings (at least one)
5. Related articles
6. CTA band

### T8 Archive

1. Intro
2. Topic / industry filters
3. Featured item
4. Article, case or news cards
5. CTA band

### T9 Tool

1. Quote: brand, part number, photo, application, quantity, contact + source page + email, WhatsApp, WeChat
2. Catalog: search by product, material, micron or part number; no result turns into a quote request
3. Item: one catalog card + quote with the model prefilled

### T10 Company & legal

1. Rich text sections
2. About: factory, certifications, export markets, QC process
3. Legal: plain text

## 待确认事项

| 编号 | 事项 | 涉及页面 | 未确认前的处理 |
| --- | --- | --- | --- |
| IA-Q1 | 滤膜已确认为核心品类，是否从骨架页升级为完整建设 | membranes、ro-membranes | `已定`：完整建设，排第二批 |
| IA-Q2 | 食用油页是否 noindex（曾靠此词拿下椰子油、棕榈油大客户） | edible-oil | 保持 index，降低内容优先级 |
| IA-Q3 | “4 小时内报价”能否兑现 | quote、home | `已定`：不用；改为 24 小时内回复 |
| IA-Q4 | 首页与关于页的 Manufacturer 定位，与“多厂匹配的采购合作伙伴”是否统一 | home、about | `已定`：去掉 Manufacturer 定位 |
| IA-Q5 | 新增页面（啤酒、软饮料、Pentair、Millipore、系统集成商、经销商）的主关键词 | 对应页面 | 研究已给出主词（beer filtration 210、juice filtration 170、pentair filter cartridge 1,900、millipore filter cartridge 10）；替代页 SEO 改攻“品牌 + 产品类型”组合词，客户类型页不以搜索为目标（见设定集 6.2） |

## 变更记录

| 日期 | 动作 | 页面ID | 改动前 | 改动后 | 索引 | 依据 | 待确认 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-15 | 修改 | oem | Equipment makers /solutions/oem-integrators/ | System integrators & contractors /solutions/system-integrators/ | index | equipment maker 为中式英文且含义不准 | 否 |
| 2026-10-15 | 修改 | distributors | Distributors | Distributors, resellers & parts suppliers | index | 客户群体反馈 | 否 |
| 2026-10-15 | 修改 | 3m-cuno → 3m | 3M CUNO replacements /replacement/3m-cuno/ | 3M replacements /replacement/3m/ | index | 客户要求不写 CUNO | 否 |
| 2026-10-15 | 修改 + 降级 | accessories | Pumps & accessories | Filtration accessories | noindex | 非核心，不推广 | 否 |
| 2026-10-15 | 降级 | lab | 骨架页 | 骨架页 + noindex | noindex | 实验室过滤只搭框架，后续整理高利润、高复购产品 | 否 |
| 2026-10-15 | 修改 | food-beverage | 含 brewery / beer 相关词 | 食品饮料总页，啤酒相关词移到 beer 页 | index | 食品优先级反馈 | 否 |
| 2026-10-15 | 修改 | wine | Wine | Wine, cider & spirits | index | 酒类是食品饮料里最容易进入的方向 | 否 |
| 2026-10-15 | 降低优先级 | edible-oil | 食品饮料下的工艺页 | 优先级排在酒类、软饮料之后 | index（待确认） | 客户反馈：食用油靠后 | 是 |
| 2026-10-15 | 待确认 | membranes、ro-membranes | 骨架页 | 暂不变 | index | 滤膜已确认为核心品类，但旧备注说先搭框架 | 是 |
| 2026-10-15 | 新增 | beer | — | Beer & brewery /applications/food-beverage/beer/ | index | 客户长期服务啤酒厂 | 否 |
| 2026-10-15 | 新增 | soft-drinks | — | Soft drinks & juice /applications/food-beverage/soft-drinks/ | index | 食品饮料第二优先方向 | 否 |
| 2026-10-15 | 新增 | pentair | — | Pentair replacements /replacement/pentair/ | index | 客户给出的国际巨头名单 | 否 |
| 2026-10-15 | 新增 | millipore | — | Millipore replacements /replacement/millipore/ | index | 客户给出的国际巨头名单 | 否 |
| 2026-10-15 | 待确认 | quote | 标题含 “Quote in 4 Hours” | 暂不变 | — | 回复时效需 Nina 确认 | 是 |
| 2026-10-15 | 待确认 | home、about | 定位含 Industrial Filtration Manufacturer | 暂不变 | — | 与设定集定位（多厂匹配的采购合作伙伴）不一致 | 是 |
| 2026-10-15 | 修改 | replacement（分区） | Replace a brand | Replace any brand：任何品牌都可以 | index | 替代需求不限于几个大品牌 | 否 |
| 2026-10-15 | 修改 | solutions（分区） | OEM & Distributors | Who we serve：按客户类型分流 | index | 客户反馈原定位不准 | 否 |
| 2026-10-15 | 修改 | home | 主词 industrial filtration manufacturer；Manufacturer 定位 | 主词 industrial filter supplier；采购合作伙伴定位 | index | IA-Q4 已定；原主词月搜索 30、KD 53 | 否 |
| 2026-10-15 | 修改 | about | Manufacturer + Solution Provider + Supply Chain Integrator | China-based filtration sourcing partner | index | IA-Q4 已定 | 否 |
| 2026-10-15 | 升级 | membranes、ro-membranes | 骨架页 | 完整建设（第二批） | index | IA-Q1 已定：滤膜是核心品类 | 否 |
| 2026-10-15 | 修改 | quote | 标题 Get a Filtration Quote in 4 Hours | Get a Filtration Quote | index | IA-Q3 已定：24 小时内回复，不写 4 小时报价 | 否 |
| 2026-10-15 | 修改 | （全部模板） | 模块列表以本文为准 | 模块与顺序以设定集 5.3 为准 | — | 竞品模块对标（R4、R7） | 否 |
| 2026-10-15 | 升级 | other-cartridges | 骨架页 | 完整建设（第一批） | index | R7：前十 9 个中国网站 | 否 |
| 2026-10-15 | 修改 | bags | 主词 liquid filter bag（与 liquid-bags 重复） | 主词 filter bag | index | 避免两页抢同一个词（设定集 6.2） | 否 |
