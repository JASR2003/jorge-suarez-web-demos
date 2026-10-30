$ErrorActionPreference = 'Stop'

$songs = @(
  'El after del after','Toda la vida','Lugares que llego','+ Que la droga','No da más','Copenhague','24/7 6.5','Nunca entendemo','No negocio con mi alma','Loco x tu cuerpo','Asesino','Ganas',
  'Desfilar mis penas','Salgo a cazar','Linaje','Está que quema','Casi un G','Quieren más','Tuuuyo','Flechazo en el centro','Mi ciudad',
  'Traje unos tangos','Cuál?','Un tango pal YSY','No para','Pastel con Nutella','El amanecer','Vamo a darle','¿Cuánto vale hacer el amor?','¿Cuántos términos?','A por todo','Un piso más','Cómo chilla ella',
  'Uh!',"Trap N' Export",'Quavo','Vuelta a la luna (remix)','Hidro','Full Ice','Tamo Loco'
)

function Normalize-Title([string]$value) {
  return ($value.ToLowerInvariant() `
    -replace '\(prod[^\)]*\)', '' `
    -replace '#mododiablo', '' `
    -replace '\(remix\)', 'remix' `
    -replace '[áàä]', 'a' `
    -replace '[éèë]', 'e' `
    -replace '[íìï]', 'i' `
    -replace '[óòö]', 'o' `
    -replace '[úùü]', 'u' `
    -replace '[^a-z0-9]', '')
}

$spotify = @{}
$spotifySources = @(
  'https://open.spotify.com/album/4XDH5D7YsE7B8xuhIBDyht',
  'https://open.spotify.com/album/4n6BNKtpmZOYUyfecMzzpZ',
  'https://open.spotify.com/album/2Vo0I6ocNBz16QklB1zVc3',
  'https://open.spotify.com/album/7vpRavovNYZYzEOieN5pvU',
  'https://open.spotify.com/album/5tPDpnIZLtftbejuG6BllH',
  'https://open.spotify.com/playlist/5mmsQsYxTLpe3D1jyy5V9b',
  'https://open.spotify.com/playlist/4P53GvkiY9HRkt1I4KlUVv',
  'https://open.spotify.com/album/5gAqSJZ06DrpRjJGMVzc1o',
  'https://open.spotify.com/album/2Y49yWxPBPxArcgVRkMhL3',
  'https://open.spotify.com/album/1wqjwWta01I0J17ThJeCca',
  'https://open.spotify.com/album/3pax6WwEDVeXQ9B86UlHtW'
)

foreach ($url in $spotifySources) {
  $html = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
  $matches = [regex]::Matches($html, 'aria-label="([^"]+)" data-testid="track-row"[\s\S]{0,900}?href="/track/([A-Za-z0-9]+)"')
  foreach ($match in $matches) {
    $spotify[(Normalize-Title $match.Groups[1].Value)] = "https://open.spotify.com/track/$($match.Groups[2].Value)"
  }
}

$knownSpotify = @{
  'Casi un G' = '0CEuRbdXmopiGOI1ZALzLz'
  'Está que quema' = '38H5RjvcICmF10kJeZeyPM'
  'Traje unos tangos' = '5NNgc8no4aMgbrCWQFkdZ7'
  'Uh!' = '2dn8nEUXm38ANu5SJImuzg'
  'Quavo' = '262lBp5MtK39jc7gQdYrVM'
}
foreach ($entry in $knownSpotify.GetEnumerator()) {
  $spotify[(Normalize-Title $entry.Key)] = "https://open.spotify.com/track/$($entry.Value)"
}

$apple = @{}
$appleTracks = (Invoke-RestMethod -Uri 'https://itunes.apple.com/lookup?id=1270499144&entity=song&country=AR&limit=200').results | Where-Object wrapperType -eq 'track'
foreach ($track in $appleTracks) { $apple[(Normalize-Title $track.trackName)] = $track.trackViewUrl }

$result = [ordered]@{}
foreach ($song in $songs) {
  $normalized = Normalize-Title $song
  if (-not $apple.ContainsKey($normalized)) {
    $uri = 'https://itunes.apple.com/search?term=' + [uri]::EscapeDataString("YSY A $song") + '&media=music&entity=musicTrack&country=AR&limit=20'
    $found = (Invoke-RestMethod -Uri $uri).results | Where-Object {
      $_.artistName -match 'YSY|Modo Diablo|Duki|Cucuza' -and ((Normalize-Title $_.trackName) -like "*$normalized*" -or $normalized -like "*$((Normalize-Title $_.trackName))*")
    } | Select-Object -First 1
    if ($found) { $apple[$normalized] = $found.trackViewUrl }
  }

  $youtube = $null
  $queryArtist = if ($song -in @('Uh!', "Trap N' Export", 'Quavo', 'Vuelta a la luna (remix)')) { 'Modo Diablo' } else { 'YSY A' }
  $query = [uri]::EscapeDataString("$queryArtist $song oficial")
  $youtubeHtml = (Invoke-WebRequest -Uri "https://www.youtube.com/results?search_query=$query" -UseBasicParsing -Headers @{'User-Agent'='Mozilla/5.0'}).Content
  $videoId = [regex]::Matches($youtubeHtml, '"videoId":"([A-Za-z0-9_-]{11})"') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique -First 1
  if ($videoId) { $youtube = "https://www.youtube.com/watch?v=$videoId" }

  $result[$song] = [ordered]@{
    youtube = $youtube
    spotify = if ($spotify.ContainsKey($normalized)) { $spotify[$normalized] } else { $null }
    apple = if ($apple.ContainsKey($normalized)) { $apple[$normalized] } else { $null }
  }
}

$outputPath = Join-Path $env:TEMP 'ysysmo-links.json'
$result | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $outputPath -Encoding utf8
Write-Output $outputPath
