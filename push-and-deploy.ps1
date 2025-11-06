# --- push-and-deploy.ps1 (handles no package-lock, installs, builds, pushes, deploys) ---
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

# 1) Optional patch (literal replace; no regex)
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
} elseif ($Patch) {
  Write-Host "ℹ️ Skipped patch (file not found): $jsxPath" -ForegroundColor Yellow
}

# 2) Install deps (use npm install if no lockfile; else npm ci)
if (Test-Path "package-lock.json") {
  Write-Host "📦 Installing dependencies with npm ci..." -ForegroundColor Cyan
  npm ci
} else {
  Write-Host "📦 No package-lock.json found — running npm install to generate it..." -ForegroundColor Cyan
  npm install
}
if ($LASTEXITCODE -ne 0) { Write-Host "❌ npm install failed." -ForegroundColor Red; exit 1 }

# 3) Build
Write-Host "🛠️  Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Build failed. Aborting." -ForegroundColor Red; exit 1 }

# 4) Git init / commit / push
if (-not (Test-Path ".git")) {
  git init
  Write-Host "✅ Initialised git repository."
}
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

# 5) Deploy to Railway (already linked project)
Write-Host "🚄 Deploying to Railway (linked project)..." -ForegroundColor Cyan
npx --yes @railway/cli@latest up --detach
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Railway deploy failed." -ForegroundColor Red
  Write-Host "   Try: npx @railway/cli login  and  npx @railway/cli link" -ForegroundColor Yellow
  exit 1
}
Write-Host "✅ Railway deployment triggered successfully!" -ForegroundColor Green
Write-Host "🎉 Done."
