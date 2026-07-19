#!/usr/bin/env node
/**
 * token-lint — enforces docs/01_TOKENS.md as a contract.
 *
 * 1. Every var(--*) used in source resolves against styles/tokens.css
 * 2. No raw color / duration / easing literals in components or features
 * 3. No banned easing anywhere
 *
 * Exit 1 fails CI. Run via `pnpm check`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = ['app', 'components', 'features']
const TOKENS = 'styles/tokens.css'

const declared = new Set(
  [...readFileSync(join(ROOT, TOKENS), 'utf8').matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1])
)

const walk = (dir, acc = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, acc)
    else if (/\.(tsx?|css)$/.test(e)) acc.push(p)
  }
  return acc
}

const RULES = [
  {
    id: 'undeclared-token',
    test: (line) =>
      [...line.matchAll(/var\((--[\w-]+)/g)]
        .map((m) => m[1])
        .filter((t) => !declared.has(t))
        .map((t) => `${t} is not declared in ${TOKENS}`),
  },
  {
    id: 'raw-color',
    test: (line) => {
      const m = line.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(/)
      return m ? [`raw color "${m[0]}" — use a token`] : []
    },
  },
  {
    id: 'raw-duration',
    test: (line) => {
      const m = line.match(/\b\d+m?s\b/)
      return m && /duration|transition|delay|animation/i.test(line)
        ? [`raw duration "${m[0]}" — use --t-*`]
        : []
    },
  },
  {
    id: 'raw-easing',
    test: (line) =>
      /cubic-bezier\(/.test(line) ? ['raw cubic-bezier — use --e-*'] : [],
  },
  {
    id: 'banned-easing',
    test: (line) => {
      const m = line.match(/\b(bounce|elastic|spring|overshoot|backOut|anticipate)\b/i)
      return m ? [`banned easing "${m[0]}" — see docs/06_DO_NOT.md`] : []
    },
  },
  {
    id: 'hover-scale',
    test: (line) =>
      /(hover|group-hover)[^\n]*\bscale-(?!100\b)/.test(line)
        ? ['scale() on hover is banned — see docs/06_DO_NOT.md']
        : [],
  },
  {
    id: 'outline-none',
    test: (line) =>
      /outline:\s*none|outline-none/.test(line) && !/focus-visible|shadow-focus/.test(line)
        ? ['outline removed without a focus replacement']
        : [],
  },
]

let failures = 0
const files = SRC.flatMap((d) => {
  try {
    return walk(join(ROOT, d))
  } catch {
    return []
  }
})

for (const file of files) {
  const isTokenFile = relative(ROOT, file) === TOKENS
  if (isTokenFile) continue

  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes('token-lint-disable')) return
      for (const rule of RULES) {
        for (const msg of rule.test(line)) {
          console.error(`${relative(ROOT, file)}:${i + 1}  [${rule.id}]  ${msg}`)
          failures++
        }
      }
    })
}

if (failures) {
  console.error(`\ntoken-lint: ${failures} violation${failures > 1 ? 's' : ''}.`)
  console.error('Add the value to docs/01_TOKENS.md and styles/tokens.css, or use an existing token.')
  process.exit(1)
}
console.log(`token-lint: clean (${files.length} files, ${declared.size} tokens).`)
