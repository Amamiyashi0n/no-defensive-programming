# 避免过度防御性编程

`no-defensive-programming` 是一个面向编程任务的 Agent Skill。它帮助 Agent 先从真实用例验证项目行为，再决定是否需要增加校验、重试或抽象。

## Claude Code 和 Codex

在目标项目目录里使用 [Vercel Skills CLI](https://github.com/vercel-labs/skills)：

```sh
npx skills add Amamiyashi0n/no-defensive-programming --skill no-defensive-programming -a claude-code -a codex
```

只装一个客户端时，保留对应的 `-a` 参数。加 `-g` 可以安装到用户目录，供多个项目使用。安装后开启新会话，在 Claude Code 中输入 `/no-defensive-programming`，或在 Codex 中使用 `$no-defensive-programming`。

## DeepSeek Harness

1. 将本仓库克隆到 DeepSeek Harness 所在的机器。
2. 在 DeepSeek Harness 打开 **Plugins → Add plugin**，选择包含 `package.json` 和 `cordis.patch.yml` 的仓库根目录。
3. 安装并启用插件后开启新会话，使用 `no-defensive-programming` 技能。

## 用法示例

> 用 no-defensive-programming 审查这次修改。先用一个代表性的输入走真实入口，确认问题发生在哪里，再决定要补哪条检查。

各客户端共用同一份 [SKILL.md](SKILL.md)。
