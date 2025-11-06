# --- apply-ui-patches.ps1 ---
$ErrorActionPreference = "Stop"

function Read-File($p){ if(!(Test-Path $p)){ throw "File not found: $p"}; Get-Content -Raw -Path $p }
function Write-File($p,$t){ Set-Content -Path $p -Value $t -Encoding UTF8 }
function Info($m){ Write-Host "✅ $m" -ForegroundColor Green }
function Note($m){ Write-Host "• $m" -ForegroundColor Yellow }

# 0) Ensure we’re at project root (has src folder)
if(!(Test-Path "src")){ throw "Run this from your project root (where the 'src' folder is)." }

# 1) Make App.jsx render only BookedUp (prevents double header/footer)
$appPath = "src/App.jsx"
$appCode = @"
import React from 'react'
import BookedUp from './components/BookedUp.jsx'

export default function App() {
  return <BookedUp />
}
"@
Write-File $appPath $appCode
Info "App shell replaced to render only <BookedUp />"

# 2) Patch BookedUp.jsx
$bookedPath = "src/components/BookedUp.jsx"
$text = Read-File $bookedPath

# 2a) Ensure useEffect is imported
$text = $text -replace 'import React,\s*\{\s*useState\s*\}\s*from\s*\'react\'\s*;',
@"import React, { useState, useEffect } from 'react';"@

# 2b) Insert tiny hash router helpers (just before component starts)
if($text -notmatch 'const\s+getViewFromHash'){
  $router = @"
// ---- tiny hash router helpers ----
const VIEWS = ['home','signup','messages','admin','favourites','how','pricing'];
const getViewFromHash = () => {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  return VIEWS.includes(raw) ? raw : 'home';
};
"@
  # insert before first "const BookedUp"
  $text = $text -replace '(\n\s*const\s+BookedUp\s*=\s*\(\)\s*=>\s*\{)', "`r`n$router`r`n`$1"
  Info "Added hash-router helpers"
} else {
  Note "Router helpers already present"
}

# 2c) Replace currentView state with router-aware version (handles multiple variants)
$text = $text -replace 'const\s*\[\s*currentView\s*,\s*setCurrentView\s*\]\s*=\s*useState\([^\)]*\);',
@"
const [currentView, setCurrentView] = useState(getViewFromHash());
useEffect(() => {
  const onHash = () => setCurrentView(getViewFromHash());
  window.addEventListener('hashchange', onHash);
  return () => window.removeEventListener('hashchange', onHash);
}, []);
const navigate = (view) => { window.location.hash = `/${view}`; };
"@
Info "currentView wired to URL hash"

# 2d) Fix hero bullet mojibake
$text = $text.Replace('DJs • Bands • Singers • Comedians • All in One Place',
                      'DJs &bull; Bands &bull; Singers &bull; Comedians &mdash; All in One Place')
Info "Fixed hero bullets"

# 2e) Add How It Works + Pricing renderers (insert before first `return (`)
if($text -notmatch 'const\s+renderHowItWorks\s*='){
  $how = @"
const renderHowItWorks = () => (
  <section className="container mx-auto px-4 py-12">
    <h2 className="text-4xl md:text-5xl font-black text-white mb-8" style={{ textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>
      HOW IT WORKS
    </h2>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {title:'Search & Filter',desc:'Find the perfect act by genre, price, rating, location & availability.'},
        {title:'Chat & Confirm',desc:'Message acts directly, align on details, and confirm availability.'},
        {title:'Book Securely',desc:'Lock in your date with confidence and track everything in one place.'},
      ].map((s,i)=>(
        <div key={i} className="bg-white/95 rounded-2xl p-6 border-4 border-yellow-400">
          <h3 className="text-2xl font-black mb-2 text-gray-900">{s.title}</h3>
          <p className="text-gray-700">{s.desc}</p>
        </div>
      ))}
    </div>
    <div className="text-center mt-10">
      <a href="#/home" className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-black inline-block">
        Start Browsing
      </a>
    </div>
  </section>
);
"@
  $text = $text -replace 'return\s*\(', "$how`r`nreturn ("
  Info "Added How It Works page"
} else { Note "How It Works already present" }

if($text -notmatch 'const\s+renderPricing\s*='){
  $pricing = @"
const renderPricing = () => (
  <section className="container mx-auto px-4 py-12">
    <h2 className="text-4xl md:text-5xl font-black text-white mb-8" style={{ textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>
      PRICING
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-8 border-4 border-gray-200">
        <h3 className="text-2xl font-black mb-2 text-gray-900">Free</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Create a profile</li>
          <li>Basic search visibility</li>
          <li>Messages & booking requests</li>
        </ul>
        <div className="mt-6">
          <a href="#/signup" className="px-6 py-3 rounded-full font-black border-2 border-gray-300 inline-block">
            Get Started
          </a>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 border-4 border-pink-400">
        <h3 className="text-2xl font-black mb-2 text-gray-900">Premium <span className="text-pink-600">£29.99/mo</span></h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Priority listings & premium badge</li>
          <li>Advanced insights & lower fees</li>
          <li>Featured placement & promos</li>
        </ul>
        <div className="mt-6">
          <a href="#/signup" className="px-6 py-3 rounded-full font-black bg-gradient-to-r from-yellow-400 to-pink-500 text-black inline-block">
            Upgrade Now
          </a>
        </div>
      </div>
    </div>
  </section>
);
"@
  # place before the existing return (the previous step guaranteed there is a "return (" earlier)
  $text = $text -replace 'return\s*\(', "$pricing`r`nreturn ("
  Info "Added Pricing page"
} else { Note "Pricing already present" }

# 2f) Wire pages into the main switch (add lines if missing)
$blockFind = "{currentView === 'admin' && renderAdmin()}"
if($text.Contains($blockFind) -and $text -notmatch "renderHowItWorks\(\)" ){
  $blockReplace = @"
{currentView === 'admin' && renderAdmin()}
{currentView === 'favourites' && renderFavourites && renderFavourites()}
{currentView === 'how' && renderHowItWorks()}
{currentView === 'pricing' && renderPricing()}
"@.Trim()
  $text = $text.Replace($blockFind, $blockReplace)
  Info "Wired new pages into view switch"
} else {
  Note "View switch already extended (or pattern not found)"
}

# 2g) Footer links → real routes
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Browse Acts</a>',
                      '<a href="#/home" className="hover:text-yellow-400">Browse Acts</a>')
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">How It Works</a>',
                      '<a href="#/how" className="hover:text-yellow-400">How It Works</a>')
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Pricing</a>',
                      '<a href="#/pricing" className="hover:text-yellow-400">Pricing</a>')
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Sign Up</a>',
                      '<a href="#/signup" className="hover:text-yellow-400">Sign Up</a>')
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Premium Plans</a>',
                      '<a href="#/pricing" className="hover:text-yellow-400">Premium Plans</a>')
Info "Footer links routed"

# 2h) Size shrink pass (headings/padding/cards)
# Headings
$text = $text.Replace('text-6xl md:text-7xl','text-5xl md:text-6xl')
$text = $text.Replace('text-5xl','text-4xl')
$text = $text.Replace('text-4xl','text-3xl')
# Body
$text = $text.Replace('text-2xl','text-xl')
$text = $text.Replace('py-16','py-12')
$text = $text.Replace('px-12 py-4','px-8 py-3')
# Cards & hero image heights
$text = $text.Replace('h-64','h-56')
# Decorative thick borders
$text = $text.Replace('border-4','border-2')
# Inputs
$text = $text.Replace('py-3','py-2')
Info "Applied compact UI sizing"

# 2i) Optional: change header nav buttons to anchors for routing (common ones)
$text = $text.Replace('onClick={() => setCurrentView(\'signup\')}', ' ').Replace('onClick={() => setCurrentView("signup")}', ' ')
$text = $text.Replace('Join as Performer</button>','</button><a href="#/signup" className="text-white font-bold hover:text-yellow-300 transition">Join as Performer</a>')
$text = $text.Replace('Browse Acts</button>','</button><a href="#/home" className="text-white font-bold hover:text-yellow-300 transition">Browse Acts</a>')
$text = $text.Replace('Admin</button>','</button><a href="#/admin" className="text-white font-bold hover:text-yellow-300 transition">Admin</a>')

# 2j) Save file
Write-File $bookedPath $text
Info "Patched src/components/BookedUp.jsx"

Write-Host "`n🎉 All patches applied. Next steps:" -ForegroundColor Cyan
Write-Host "   npm run build"
Write-Host "   git add -A && git commit -m 'feat: routing + pages + compact UI' && git push"
Write-Host "   (or run your push-and-deploy.ps1 to also deploy to Railway)"
