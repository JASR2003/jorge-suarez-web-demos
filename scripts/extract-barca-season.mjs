const clean = (value = '') => value
  .replace(/<ref[\s\S]*?<\/ref>/gi, '')
  .replace(/<ref[^>]*\/>/gi, '')
  .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, '$1')
  .replace(/\{\{[^{}]*\}\}/g, '')
  .replace(/'{2,}/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const field = (block, name) => {
  const match = block.match(new RegExp(`^\\|${name}\\s*=\\s*([^\\n]*)`, 'mi'))
  return clean(match?.[1])
}

const season = process.argv[2]
const url = `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(`${season}_FC_Barcelona_season`)}&action=raw`
const source = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((response) => response.text())
const headings = [...source.matchAll(/^===([^=].*?[^=])===$/gm)].map((match) => ({ index: match.index, title: match[1].trim() }))
const boxes = [...source.matchAll(/\{\{Football box(?: collapsible)?[\s\S]*?\n\}\}/gi)]
const matches = []
const debugHeadings = {}

for (const box of boxes) {
  let heading = ''
  for (const candidate of headings) {
    if (candidate.index > box.index) break
    heading = clean(candidate.title)
  }
  const block = box[0]
  debugHeadings[heading] = (debugHeadings[heading] || 0) + 1
  const round = field(block, 'round')
  if (/friendly|soccer champions|joan gamper|exhibition/i.test(round)) continue
  const competition = /Champions/i.test(heading) ? 'CHAMPIONS'
    : /Copa del Rey/i.test(heading) ? 'COPA DEL REY'
      : /Supercopa/i.test(heading) ? 'SUPERCOPA'
        : /La Liga/i.test(heading) ? 'LALIGA' : ''
  if (!competition) continue
  matches.push({
    date: field(block, 'date'), competition, round,
    home: field(block, 'team1'), score: field(block, 'score'), away: field(block, 'team2'),
    stadium: field(block, 'stadium'), result: field(block, 'result'), report: field(block, 'report'),
  })
}

if (process.argv.includes('--debug')) console.error(debugHeadings)

const payload = JSON.stringify({ season: season.replace('–', '/'), matches }, null, process.argv.includes('--compact') ? 0 : 2)
const outputIndex = process.argv.indexOf('--output')
if (outputIndex >= 0) {
  const { writeFile } = await import('node:fs/promises')
  await writeFile(process.argv[outputIndex + 1], `${payload}\n`, 'utf8')
} else {
  console.log(payload)
}
