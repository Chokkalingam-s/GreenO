import {readFileSync, writeFileSync} from 'fs'
import process from 'process'

const filePath = process.argv[2]

if (!filePath) {
  console.error('Error: Please provide a file path.')
  process.exit(1)
}

console.log(`Processing file: ${filePath}`)

let content = readFileSync(filePath, 'utf8')

// Match only non-lazy imports
const importRegex = /^import\s+([\w{},\s]+)\s+from\s+['"](.+?)['"];/gm

let modified = false

content = content.replace(importRegex, (match, components, path) => {
  // Skip conversion if it's already lazy-loaded
  if (path.includes('./Lazy') || match.includes('l(')) return match

  const isSingleComponent = !components.includes('{')

  modified = true

  return isSingleComponent ? `const ${components.trim()} = l('${path}');` : match // Keeps named imports unchanged (e.g., `{ Suspense }`)
})

if (modified) {
  writeFileSync(filePath, content, 'utf8')
  console.log('✅ Imports updated to lazy loading.')
} else {
  console.log('ℹ️ No new imports found for conversion.')
}
