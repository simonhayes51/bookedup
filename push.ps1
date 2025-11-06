# --- push.ps1 ---
param (
    [string]$Repo = "https://github.com/simonhayes51/bookedup.git"
)

Write-Host "🚀 Preparing to push BookedUp project to GitHub..." -ForegroundColor Cyan

# Ensure git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git not found. Please install Git first." -ForegroundColor Red
    exit
}

# Initialise repo if needed
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Initialised new git repository."
}

# Add all files
git add .
Write-Host "📦 Added all files to staging area."

# Commit changes
git commit -m "Initial commit - BookedUp Railway-ready site"
Write-Host "📝 Created initial commit."

# Set main branch
git branch -M main

# Set remote (replace if already exists)
$remoteExists = git remote | Select-String "origin"
if ($remoteExists) {
    git remote remove origin
}
git remote add origin $Repo
Write-Host "🔗 Set remote to $Repo"

# Push to GitHub
git push -u origin main -f
Write-Host "✅ Successfully pushed to GitHub main branch."

Write-Host "🌐 Next step: Connect this repo to Railway and deploy!"
