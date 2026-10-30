import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const files = process.argv.slice(2).filter((value) => !value.startsWith('--'))
const findOgImage = (html) => {
  const tags = html.match(/<meta\s+[^>]*>/gi) || []
  for (const tag of tags) {
    if (!/(?:property|name)=["']og:image["']/i.test(tag)) continue
    const match = tag.match(/content=["']([^"']+)/i)
    if (match) return match[1].replace(/&amp;/g, '&')
  }
}

for (const file of files) {
  const data = JSON.parse(await readFile(file, 'utf8'))
  for (let start = 0; !process.argv.includes('--skip-metadata') && start < data.matches.length; start += 10) {
    const batch = data.matches.slice(start, start + 10)
    await Promise.all(batch.map(async (match) => {
      const html = await fetch(match.report, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((response) => response.text()).catch(() => '')
      match.imageSource = findOgImage(html) || ''
    }))
    console.error(`${basename(file)}: ${Math.min(start + 10, data.matches.length)}/${data.matches.length}`)
  }
  const available = [...new Set(data.matches.filter((match) => match.imageSource).map((match) => match.imageSource))]
  const seasonSlug = data.season.replace('/', '-')
  const outputDir = join('public', 'blog-barca-history', seasonSlug, 'archive')
  await mkdir(outputDir, { recursive: true })
  const localBySource = new Map()
  for (const [sourceIndex, source] of available.entries()) {
    const filename = `${String(sourceIndex + 1).padStart(2, '0')}.jpg`
    const response = await fetch(source, { headers: { 'User-Agent': 'Mozilla/5.0' } }).catch(() => null)
    if (!response?.ok) continue
    await writeFile(join(outputDir, filename), Buffer.from(await response.arrayBuffer()))
    localBySource.set(source, `/blog-barca-history/${seasonSlug}/archive/${filename}`)
  }
  for (const [index, match] of data.matches.entries()) {
    const exact = Boolean(match.imageSource)
    const source = match.imageSource || available[index % available.length]
    if (!source) continue
    match.image = localBySource.get(source)
    match.imageExact = exact
  }
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}
