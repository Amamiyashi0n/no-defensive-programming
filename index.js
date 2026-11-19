import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export const name = 'no-defensive-programming'
export const inject = ['skills']

const skillUrl = new URL('./SKILL.md', import.meta.url)
const skillPath = fileURLToPath(skillUrl)
const resourceBase = {
  kind: 'directory',
  path: fileURLToPath(new URL('./', import.meta.url)),
}

async function loadSkill() {
  const markdown = await readFile(skillUrl, 'utf8')
  const frontmatter = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown)
  const description = frontmatter?.[1].match(/^description:[ \t]*(.+)$/m)?.[1].trim()
  if (!description) throw new Error('SKILL.md needs a one-line description in its frontmatter')
  return {
    name,
    description: description.replace(/^(['"])(.*)\1$/, '$2'),
    invocation: { modelInvocable: true, userInvocable: true },
    provider: name,
    source: 'bundled',
    path: skillPath,
    resourceBase,
    content: markdown.slice(frontmatter[0].length),
  }
}

export function apply(ctx) {
  ctx.skills.registerProvider(() => ({
    name,
    async list() {
      const { content, ...metadata } = await loadSkill()
      return [{ ...metadata, rank: 600, locator: skillUrl }]
    },
    get: loadSkill,
  }))
}
