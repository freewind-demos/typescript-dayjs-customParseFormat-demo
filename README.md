# Day.js customParseFormat 插件演示

这个项目演示了 Day.js 的 customParseFormat 插件在日期解析中的作用和影响。

## 项目目的

1. 展示 customParseFormat 插件的使用方法
2. 对比使用和不使用该插件时的日期解析差异
3. 帮助理解 Day.js 的日期解析机制

## 关键发现

1. Day.js 默认会尝试智能猜测日期格式
   - 很多常见格式无需 customParseFormat 插件就能正确解析
   - 比如 '2024-01-01'、'01/01/2024' 等格式

2. customParseFormat 插件的双刃剑效果
   - 优点：可以解析更多非标准格式的日期
   - 缺点：会严格按照指定格式解析，反而可能导致某些原本能解析的格式失败
   - 例如：某些日期字符串在不使用插件时 Day.js 能猜对，但使用插件后反而解析失败

3. 特殊格式的支持
   - 一些格式需要额外的插件支持（如 localized、ordinal 等）
   - 某些格式必须使用 customParseFormat 才能正确解析

## 日期格式示例

1. 默认支持的格式（无需插件）：
   - ISO 8601: '2023-12-31T16:00:00Z'
   - 标准日期: '2024-01-01'
   - 带斜杠的日期: '01/01/2024'

2. 需要 customParseFormat 的格式：
   - 12小时制: '12/31/2023 2:30 PM'
   - 中文格式: '2023年12月31日 下午4点30分'
   - 美式日期: '12-31-2023'（月在前）
   - 特殊分隔符: '2023.12.31'、'31_12_2023'
   - 紧凑格式: '20231231163000'

3. 需要额外插件的格式：
   - 带星期和序数: 'Sunday, December 31st 2023'（需要 localized 和 ordinal 插件）
   - ISO 周格式: '2023/W52/7'
   - 月份缩写: '31-Dec-2023'

## 使用方法

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动项目：
   ```bash
   pnpm dev
   ```

3. 使用界面：
   - 通过开关控制是否使用 customParseFormat 插件
   - 观察不同日期格式的解析结果
   - 注意解析结果的变化

## 注意事项

1. 插件开启后无法关闭（Day.js 的插件系统限制）
2. 某些格式在使用 customParseFormat 后可能需要更精确的格式字符串
3. 在实际项目中，建议：
   - 如果处理已知格式的日期，使用 customParseFormat 可以保证解析的准确性
   - 如果处理未知格式的日期，可能优先尝试不使用插件，让 Day.js 自动猜测
   - 需要支持特殊格式时，确保加载了所有必要的插件
