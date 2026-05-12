# 智能体技术讲座：讲稿与HTML课件制作计划

## 项目概述
为中国移动内部非技术人员制作一场关于AI Agent技术的讲座，包含1万字+讲稿和15-20页模块化HTML交互课件。

## 核心要求
- 三个Agent：OpenClaw（主讲，基准60-70%）、Hermes Agent（增量对比）、Claude Code（增量对比）
- 受众：中国移动内部非技术人员，线上会议，30-45分钟
- 场景：内网隔离、自有模型API、内部系统浏览器自动化、已有聚智智能体平台和磐匠RPA
- 设计风格：中国移动白色底+蓝色主色，干净清爽科技风，样式配色可配置
- 输出：先讲稿，后HTML分页课件，模块化可扩展

---

## Stage 1: 深度研究（加载 deep-research-swarm）
**目标**：搜集全面信息，形成结构化素材库

### 1.1 四份材料深度提取
- OpenClaw橙皮书：架构原理、Skills系统、记忆系统、部署、安全
- OpenClaw介绍PPT：应用场景、功能模块
- AI Agent Skill工程最佳实践：Skill标准、设计原则、多Agent协作
- 北京大学Agentic Coding报告：Vibe Coding、Agentic Coding、工具对比

### 1.2 联网搜索补充
- Hermes Agent最新信息（2026年）：功能、与OpenClaw对比、优劣势
- Claude Code最新进展：能力范围、企业应用
- 中国移动数字化转型：聚智智能体平台、磐匠数字员工
- ReAct范式、MCP协议、Agent技术基础概念
- 运营商内部Agent应用场景和案例

### 1.3 素材整理
形成四个文档索引：
1. `materials/agent_concepts.md` - Agent基础概念（ReAct、MCP、Skills等）
2. `materials/openclaw_deep.md` - OpenClaw深度素材
3. `materials/comparison_hermes_claude.md` - Hermes Agent与Claude Code对比素材
4. `materials/china_mobile_scenarios.md` - 中国移动场景素材

---

## Stage 2: 讲稿撰写（加载 report-writing）
**目标**：撰写1万字+结构化讲稿

### 2.1 内容结构设计
- **主干内容**（3000-5000字，必讲）：关键结论、概括性介绍
- **可折叠细节**（5000-7000字，可选展开）：深入案例、技术细节、亮点展开

### 2.2 章节规划
- **Part 1: 认识AI Agent**（约2000字）
  - 什么是Agent：从ChatGPT到Agent的进化
  - ReAct范式：思考→行动→观察的循环
  - MCP协议：Agent与外部世界的"通用插头"
  - Skills系统：Agent的"专业技能证书"
  - 为什么新一代Agent不同于传统智能体

- **Part 2: OpenClaw深度解析**（约3500字）
  - OpenClaw是什么：开源AI Agent平台
  - 核心架构：Gateway-Node-Channel三层架构
  - 四层记忆系统：SOUL→TOOLS→USER→Session
  - Skills生态：ClawHub、SKILL.md标准、技能组合
  - 自托管与数据安全
  - 与ChatGPT的核心区别

- **Part 3: 三个Agent横向对比**（约2500字）
  - OpenClaw vs Hermes Agent：通用平台 vs 自进化助手
  - OpenClaw vs Claude Code：通用自动化 vs 专业编程
  - 各自的优势、局限性和最佳场景
  - 选型建议

- **Part 4: Agent的能力全景**（约2500字）
  - 能做什么：办公自动化、数据分析、报告生成、系统操作
  - 不擅长什么：高精确度计算、物理世界操作、创意判断
  - 进阶技巧：Skills组合、SubAgent协作、自我纠错
  - 完整场景穿透：从用户指令到最终结果的全流程

- **Part 5: 中国移动场景畅想**（约3000字）
  - 模型底座的重要性：内网环境下的自建模型
  - 公网隔离挑战与Skills/Pip源的重要性
  - 浏览器自动化：打通内部系统壁垒
  - 与聚智智能体平台、磐匠RPA的协同
  - 场景穿透：多场景模拟流程

---

## Stage 3: HTML交互课件制作（加载 vibecoding-webapp-swarm）
**目标**：制作15-20页模块化、可配置、可扩展的HTML课件

### 3.1 技术架构
- 每个页面为独立HTML文件
- 主框架页面串联所有子页面（翻页导航）
- CSS变量驱动主题系统（样式配色分离）
- 多套模板可切换
- 可折叠展开细节区域
- 动画效果（入场、切换、高亮）

### 3.2 设计规范
- 主色：中国移动蓝 (#0099FF 或 #0066CC)
- 底色：白色/浅灰渐变
- 辅色：科技青、活力橙（点缀）
- 字体：系统无衬线字体栈
- 风格：干净、清爽、专业、不极客

### 3.3 页面规划（15-20页）
1. 封面页
2. 目录/导航页
3. 从ChatGPT到Agent：进化之路
4. Agent核心概念：ReAct + MCP + Skills
5. OpenClaw总览：开源AI Agent平台
6. OpenClaw架构解析（可选可视化龙虾图）
7. OpenClaw记忆系统与Skills生态
8. 三个Agent横向对比
9. OpenClaw vs Hermes Agent详解
10. OpenClaw vs Claude Code详解
11. Agent能力全景：能做什么
12. 完整场景穿透：从指令到结果
13. 中国移动场景：模型底座与安全
14. 浏览器自动化：打通内部系统
15. 与聚智/磐匠的协同与升级
16. 场景穿透：日常办公自动化
17. 场景穿透：生产运维智能化
18. 进阶技巧与培养建议
19. 总结与展望
20. 致谢/Q&A

---

## Stage 4: 质量验证与交付
- 讲稿完整性检查
- HTML各页面功能测试
- 主题切换测试
- 翻页导航测试
- 最终打包交付

---

## 技能加载顺序
1. Stage 1: `deep-research-swarm` → 多Agent并行研究
2. Stage 2: `report-writing` → 讲稿撰写
3. Stage 3: `vibecoding-webapp-swarm` → HTML课件制作
4. Stage 4: 质量验证 + `docx` 输出（如需要Word版本）
