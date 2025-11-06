# --- patch-bookedup.ps1 ---
# Applies UI fixes to remove duplicate header, add favourites, fix bullets, and wire footer links.

$ErrorActionPreference = "Stop"

# 1) Replace src/App.jsx to render only BookedUp (prevents double header/footer)
$appPath = "src/App.jsx"
$appContent = @"
import React from 'react'
import BookedUp from './components/BookedUp.jsx'

export default function App() {
  return <BookedUp />
}
"@
Set-Content -Path $appPath -Value $appContent -Encoding UTF8
Write-Host "✅ Rewrote $appPath to render only <BookedUp />"

# 2) Patch BookedUp.jsx
$bookedPath = "src/components/BookedUp.jsx"
if (!(Test-Path $bookedPath)) {
  Write-Host "❌ $bookedPath not found. Are you in the project root?" -ForegroundColor Red
  exit 1
}
$text = Get-Content -Path $bookedPath -Raw

# 2a) Fix bullet mojibake in hero subheading
$oldHero = 'DJs • Bands • Singers • Comedians • All in One Place'
$newHero = 'DJs &bull; Bands &bull; Singers &bull; Comedians &mdash; All in One Place'
if ($text.Contains($oldHero)) {
  $text = $text.Replace($oldHero, $newHero)
  Write-Host "✅ Fixed hero bullets"
}

# 2b) Ensure a Favourites renderer exists
if (-not ($text -match 'const\s+renderFavourites\s*=')) {
  $favsRenderer = @"
const renderFavourites = () => {
  const favs = performers.filter(p => favoriteActs.includes(p.id));
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-4xl font-black text-white" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
          ❤️ Your Favourites
        </h3>
        {favs.length > 0 && (
          <button
            onClick={() => setFavoriteActs([])}
            className="text-sm px-4 py-2 rounded-full border-2 border-gray-300 font-bold hover:bg-gray-100"
          >
            Clear all
          </button>
        )}
      </div>

      {favs.length === 0 ? (
        <div className="bg-white/90 rounded-2xl p-10 text-center border-4 border-pink-400">
          <p className="text-xl font-bold text-gray-800 mb-4">No saved acts yet.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-black hover:scale-105 transition"
          >
            Browse acts and tap “Save”
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favs.map(performer => (
            <div
              key={performer.id}
              onClick={() => { setSelectedPerformer(performer); setShowBookingModal(true); }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition border-4 border-transparent hover:border-yellow-400 cursor-pointer"
            >
              <div className="relative">
                <img src={performer.image} alt={performer.name} className="w-full h-64 object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(e, performer.id); }}
                  className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold shadow hover:scale-105 transition"
                >
                  Remove
                </button>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-black text-gray-900 mb-1">{performer.name}</h4>
                <div className="text-gray-600 font-semibold">{performer.genre} • {performer.location}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-pink-600 font-black">{performer.price}</div>
                  <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full">
                    <span className="font-black">{performer.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
"@
  # Insert before 'return ('
  if ($text -match "return\s*\(") {
    $text = $text -replace "return\s*\(", ($favsRenderer + "`r`n`r`nreturn (")
    Write-Host "✅ Added renderFavourites()"
  }
}

# 2c) Wire favourites into the view switch
$needle = "{currentView === 'admin' && renderAdmin()}"
$insert = @"
{currentView === 'admin' && renderAdmin()}
{currentView === 'favourites' && renderFavourites()}
"@.Trim()
if ($text.Contains($needle) -and -not ($text.Contains("renderFavourites()") -and $text.Contains("currentView === 'favourites'"))) {
  $text = $text.Replace($needle, $insert)
  Write-Host "✅ Wired favourites view into return"
}

# 2d) Make footer links actionable
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Browse Acts</a>',
                      '<button onClick={() => setCurrentView(' + "'home'" + ')} className="hover:text-yellow-400">Browse Acts</button>')
$text = $text.Replace('<a href="#" className="hover:text-yellow-400">Sign Up</a>',
                      '<button onClick={() => setCurrentView(' + "'signup'" + ')} className="hover:text-yellow-400">Sign Up</button>')

Set-Content -Path $bookedPath -Value $text -Encoding UTF8
Write-Host "✅ Patched $bookedPath"
Write-Host "🎉 Patching complete."
