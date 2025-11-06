# --- push-and-deploy.ps1 (robust install with retry + verbose) ---
param(
  [bool]$Patch = $true,
  [string]$Repo = "https://github.com/simonhayes51/bookedup.git",
  [string]$Message = "chore: build, push, deploy"
)

function Require-Cmd($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Required command '$name' not found. Please install it and try again." -ForegroundColor Red
    exit 1
  }
}

Write-Host "🚀 BookedUp: push & deploy" -ForegroundColor Cyan
Require-Cmd git
Require-Cmd npm
Require-Cmd npx

# Helpful npm settings
npm config set registry "https://registry.npmjs.org/"
npm config set audit false
npm config set fund false
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# ---------- Optional quick patch for known handlers (safe literal replace) ----------
$jsxPath = "src/components/BookedUp.jsx"
if ($Patch -and (Test-Path $jsxPath)) {
  $text = Get-Content -Path $jsxPath -Raw

  $oldOnClick   = "onClick={() => currentMessage.trim() && setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }]) or setCurrentMessage('')}"
  $oldOnKeyDown = "onKeyDown={(e) => e.key === 'Enter' && currentMessage.trim() && setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }])}"

  $newOnClick = @"
onClick={() => {
  if (currentMessage.trim()) {
    setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }]);
    setCurrentMessage('');
  }
}}
"@.Trim()

  $newOnKeyDown = @"
onKeyDown={(e) => {
  if (e.key === 'Enter' && currentMessage.trim()) {
    setMessages([...messages, { text: currentMessage, sender: 'me', time: 'Just now' }]);
    setCurrentMessage('');
  }
}}
"@.Trim()

  $patched = $false
  if ($text.Contains($oldOnClick))   { $text = $text.Replace($oldOnClick,   $newOnClick);   $patched = $true }
  if ($text.Contains($oldOnKeyDown)) { $text = $text.Replace($oldOnKeyDown, $newOnKeyDown); $patched = $true }

  if ($patched) {
    Set-Content -Path $jsxPath -Value $text -Encoding UTF8
    Write-Host "🩹 Applied safe patch to $jsxPath" -ForegroundColor Green
  } else {
    Write-Host "ℹ️ No patch needed (patterns not found) — continuing." -ForegroundColor Yellow
  }
}

# ---------- INSTALL with verbose + retry ----------
function Install-Deps {
  if (Test-Path "package-lock.json") {
    Write-Host "📦 Installing deps with npm ci (lockfile present)..." -ForegroundColor Cyan
    npm ci --loglevel=verbose
  } else {
    Write-Host "📦 Installing deps (first run, no lockfile)..." -ForegroundColor Cyan
    npm install --loglevel=verbose
  }
  return $LASTEXITCODE
}

$code = Install-Deps
if ($code -ne 0) {
  Write-Host "⚠️ First install failed. Retrying with safe flags..." -ForegroundColor Yellow
  if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
  if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
  npm cache clean --force | Out-Null
  npm install --legacy-peer-deps --no-optional --no-audit --no-fund --loglevel=verbose --registry=https://registry.npmjs.org/
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed again. Try: npm ping / npm install --verbose / check proxy/VPN." -ForegroundColor Red
    exit 1
  }
}

# ---------- BUILD ----------
Write-Host "🛠️  Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Build failed. Aborting." -ForegroundColor Red; exit 1 }

# ---------- GIT PUSH ----------
if (-not (Test-Path ".git")) { git init; Write-Host "✅ Initialised git repository." }
git branch -M main | Out-Null
$hasOrigin = git remote | Select-String -SimpleMatch "origin"
if ($hasOrigin) { git remote remove origin | Out-Null }
git remote add origin $Repo
Write-Host "🔗 Remote set to $Repo"
git add -A
git commit -m $Message
Write-Host "📝 Committed: $Message"
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main -f
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Push failed." -ForegroundColor Red; exit 1 }
Write-Host "✅ Pushed to GitHub." -ForegroundColor Green

# ---------- RAILWAY DEPLOY ----------
Write-Host "🚄 Deploying to Railway (linked project)..." -ForegroundColor Cyan
npx --yes @railway/cli@latest up --detach
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Railway deploy failed." -ForegroundColor Red
  Write-Host "   Try: npx @railway/cli login  and  npx @railway/cli link" -ForegroundColor Yellow
  exit 1
}
Write-Host "✅ Railway deployment triggered successfully!" -ForegroundColor Green
Write-Host "🎉 Done."
