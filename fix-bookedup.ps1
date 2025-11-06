# --- fix-bookedup.ps1 ---
$ErrorActionPreference = "Stop"

function Read-File($p){ if(!(Test-Path $p)){ throw "File not found: $p"}; Get-Content -Raw -Path $p }
function Write-File($p,$t){ Set-Content -Path $p -Value $t -Encoding UTF8 }
function Backup($p){ if(Test-Path $p){ Copy-Item $p "$p.bak" -Force } }
function Ok($m){ Write-Host "✅ $m" -ForegroundColor Green }
function Note($m){ Write-Host "• $m" -ForegroundColor Yellow }

# --- sanity ---
if(!(Test-Path "src")){ throw "Run this from your project root (must contain 'src' folder)." }

# --- 1) App shell: render only <BookedUp /> to avoid double headers/footers ---
$appPath = "src/App.jsx"
Backup $appPath
$appCode = @"
import React from 'react'
import BookedUp from './components/BookedUp.jsx'

export default function App() {
  return <BookedUp />
}
"@
Write-File $appPath $appCode
Ok "App shell updated: now renders only <BookedUp />"

# --- 2) Patch BookedUp.jsx comprehensively ---
$bp = "src/components/BookedUp.jsx"
Backup $bp
$t = Read-File $bp

# 2a) ensure we have useEffect in React import
if ($t -match "import React,\s*\{\s*useState\s*\}\s*from\s*'react'") {
  $t = $t -replace "import React,\s*\{\s*useState\s*\}\s*from\s*'react'",
                   "import React, { useState, useEffect } from 'react'"
  Ok "Added useEffect to React import"
} elseif ($t -match "from\s*'react'") {
  if ($t -notmatch "useEffect") {
    # try to inject useEffect into existing braces import
    $t = $t -replace "import React,\s*\{\s*([^}]*)\}\s*from\s*'react'",
                     {"import React, { " + ($Matches[1] + ", useEffect").Replace(",,",",").Replace("  "," ") + " } from 'react'"}
    Ok "Ensured useEffect is imported"
  } else { Note "useEffect already present" }
}

# 2b) Insert storage helpers + admin code after lucide-react import
if ($t -notmatch "const\s+LS\s*=\s*\{") {
  $helpers = @"
// ---- storage + admin code helpers ----
const LS = {
  get: (k, defVal) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : defVal; } catch { return defVal; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(k),
};
const ADMIN_CODE = import.meta.env?.VITE_ADMIN_CODE || 'BOOKEDUP2025';
"
  if ($t -match "from\s*'lucide-react'\s*;") {
    $t = $t -replace "(from\s*'lucide-react'\s*;)", "`$1`r`n$helpers"
    Ok "Added storage helpers + ADMIN_CODE"
  } else {
    # fallback: prepend
    $t = $helpers + $t
    Note "Lucide import not found; prepended helpers at file top"
  }
} else { Note "Helpers already present" }

# 2c) Tiny hash router before component start
if ($t -notmatch "const\s+getViewFromHash") {
  $router = @"
// ---- tiny hash router helpers ----
const VIEWS = ['home','signup','messages','admin','favourites','how','pricing'];
const getViewFromHash = () => {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  return VIEWS.includes(raw) ? raw : 'home';
};
"
  $t = $t -replace "(\n\s*const\s+BookedUp\s*=\s*\(\)\s*=>\s*\{)", "`r`n$router`r`n`$1"
  Ok "Added hash router helpers"
} else { Note "Router helpers already exist" }

# 2d) Router-aware currentView + navigate()
if ($t -match "const\s*\[\s*currentView\s*,\s*setCurrentView\s*\]\s*=\s*useState\([^\)]*\);") {
  $cvBlock = @"
const [currentView, setCurrentView] = useState(getViewFromHash());
useEffect(() => {
  const onHash = () => setCurrentView(getViewFromHash());
  window.addEventListener('hashchange', onHash);
  return () => window.removeEventListener('hashchange', onHash);
}, []);
const navigate = (view) => { window.location.hash = `/${view}`; };
"@
  $t = $t -replace "const\s*\[\s*currentView\s*,\s*setCurrentView\s*\]\s*=\s*useState\([^\)]*\);", $cvBlock
  Ok "currentView now tied to URL hash"
} else { Note "currentView state pattern not found (might already be routed)" }

# 2e) Admin auth + applications state
if ($t -notmatch "\[\s*adminAuthed") {
  $insertState = @"
const [adminAuthed, setAdminAuthed] = useState(() => LS.get('adminAuthed', false));
const [applications, setApplications] = useState(() => LS.get('applications', []));
"
  # Try to place after currentView block
  if ($t -match "const\s*\[\s*currentView\s*,\s*setCurrentView\s*\]") {
    $t = $t -replace "(const\s*\[\s*currentView\s*,\s*setCurrentView\s*\][\s\S]*?;\s*)", "`$1`r`n$insertState"
  } else {
    # Fallback: append near other useState calls
    $t = $t -replace "(const\s*\[\s*searchQuery[\s\S]*?;\s*)", "`$1`r`n$insertState"
  }
  Ok "Added adminAuthed & applications state"
} else { Note "Admin/applications state already present" }

# 2f) Remove hard-coded pendingApplications if present
if ($t -match "const\s+pendingApplications\s*=\s*\[") {
  $start = [regex]::Match($t, "const\s+pendingApplications\s*=\s*\[").Index
  $end = $t.IndexOf("];", $start)
  if ($end -gt $start) {
    $t = $t.Remove($start, ($end + 2) - $start).Insert($start, "// pending applications now stored in 'applications' state")
    Ok "Removed hard-coded pendingApplications[]"
  }
} else { Note "No hard-coded pendingApplications found" }

# 2g) Replace handleSignupSubmit to persist applications
if ($t -match "const\s+handleSignupSubmit\s*=\s*\(e\)\s*=>\s*\{") {
  $newSubmit = @"
const handleSignupSubmit = (e) => {
  e.preventDefault();
  const id = Date.now();
  const record = {
    id,
    name: signupData.name.trim(),
    genre: signupData.genre,
    location: signupData.location.trim(),
    price: signupData.price.trim(),
    email: signupData.email.trim(),
    description: signupData.description.trim(),
    socials: {
      instagram: signupData.instagram || '',
      facebook: signupData.facebook || '',
      youtube: signupData.youtube || '',
      website: signupData.website || '',
    },
    appliedDate: new Date().toISOString().slice(0,10),
    status: 'pending'
  };
  const next = [record, ...applications];
  setApplications(next);
  LS.set('applications', next);

  try {
    const currentNotes = LS.get('notifications', []);
    const newNote = { id, type: 'review', message: `New application: ${record.name}`, time: 'just now', read: false };
    LS.set('notifications', [newNote, ...currentNotes]);
  } catch {}

  alert('Application submitted! Our team will review it shortly.');
  setSignupData({ name:'',email:'' ,genre:'' ,location:'' ,price:'' ,description:'' ,instagram:'' ,facebook:'' ,youtube:'' ,website:'' ,photos:[] });

  window.location.hash = '/home';
};
"@
  # naive replace of function body (up to first closing "};" after start)
  $m = [regex]::Match($t, "const\s+handleSignupSubmit\s*=\s*\(e\)\s*=>\s*\{")
  if ($m.Success) {
    $start = $m.Index
    $close = $t.IndexOf("};", $start)
    if ($close -gt $start) {
      $t = $t.Remove($start, ($close + 2) - $start).Insert($start, $newSubmit)
      Ok "Updated handleSignupSubmit() to push into applications"
    }
  }
} else { Note "handleSignupSubmit not found — skipped" }

# 2h) Swap renderAdmin for functional queue + login
if ($t -match "const\s+renderAdmin\s*=\s*\(\)\s*=>\s*\(") {
  $newAdmin = @"
const renderAdmin = () => {
  const pendingCount  = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const deniedCount   = applications.filter(a => a.status === 'denied').length;

  const setStatus = (id, status) => {
    const next = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(next);
    LS.set('applications', next);
  };

  const review = (id) => {
    const item = applications.find(a => a.id === id);
    if (!item) return;
    alert(`Application Details:\n\n${item.name} (${item.genre})\n${item.location}\nPrice: ${item.price}\nEmail: ${item.email}\n\n${item.description}`);
  };

  if (!adminAuthed) {
    const tryLogin = () => {
      const code = prompt('Enter admin access code:');
      if (code && code === ADMIN_CODE) {
        setAdminAuthed(true);
        LS.set('adminAuthed', true);
        alert('Admin unlocked.');
      } else if (code !== null) {
        alert('Incorrect code.');
      }
    };
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-black text-white mb-6" style={{ textShadow:'3px 3px 0 rgba(0,0,0,.3)' }}>
          ADMIN LOGIN
        </h2>
        <div className="bg-white rounded-2xl p-8 border-2 border-yellow-400">
          <p className="text-gray-700 mb-4">Restricted area. Click below and enter your admin access code.</p>
          <button onClick={tryLogin} className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-3 rounded-full font-black">
            Enter Code
          </button>
          <p className="text-xs text-gray-400 mt-4">Tip: set <code>VITE_ADMIN_CODE</code> in your environment. Fallback: BOOKEDUP2025</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-black text-white mb-8" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
        ADMIN DASHBOARD
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl border-2 border-white">
          <div className="text-3xl font-black text-white mb-2">{applications.length}</div>
          <div className="text-white font-bold">Total Applications</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl border-2 border-white">
          <div className="text-3xl font-black text-white mb-2">{pendingCount}</div>
          <div className="text-white font-bold">Pending Reviews</div>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 shadow-2xl border-2 border-white">
          <div className="text-3xl font-black text-white mb-2">{approvedCount}</div>
          <div className="text-white font-bold">Approved</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 shadow-2xl border-2 border-white">
          <div className="text-3xl font-black text-white mb-2">{deniedCount}</div>
          <div className="text-white font-bold">Denied</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-yellow-400 mb-8">
        <h3 className="text-2xl font-black text-gray-900 mb-6">Pending Applications</h3>
        <div className="space-y-4">
          {applications.filter(a => a.status === 'pending').map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">{app.name}</h4>
                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                  <span>{app.genre}</span>
                  <span>{app.location}</span>
                  <span>Applied {app.appliedDate}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStatus(app.id, 'approved')} className="bg-green-500 text-white px-5 py-2 rounded-full font-bold hover:bg-green-600">Approve</button>
                <button onClick={() => setStatus(app.id, 'denied')} className="bg-red-500 text-white px-5 py-2 rounded-full font-bold hover:bg-red-600">Deny</button>
                <button onClick={() => review(app.id)} className="bg-blue-500 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-600">Review</button>
              </div>
            </div>
          ))}
          {pendingCount === 0 && <div className="text-gray-600">No pending applications.</div>}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-200">
        <h3 className="text-2xl font-black text-gray-900 mb-6">Decisioned</h3>
        <div className="space-y-3">
          {applications.filter(a => a.status !== 'pending').map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex-1">
                <div className="font-bold">{app.name}</div>
                <div className="text-sm text-gray-600">{app.genre} • {app.location}</div>
              </div>
              <div className="font-bold">
                {app.status === 'approved' ? '✅ Approved' : '❌ Denied'}
              </div>
              <div>
                <button onClick={() => setStatus(app.id, 'pending')} className="px-4 py-2 rounded-full border-2">Move to Pending</button>
              </div>
            </div>
          ))}
          {applications.filter(a => a.status !== 'pending').length === 0 && <div className="text-gray-600">Nothing here yet.</div>}
        </div>
      </div>
    </section>
  );
};
"
  # replace the whole function (coarse)
  $m = [regex]::Match($t, "const\s+renderAdmin\s*=\s*\(\)\s*=>\s*\([\s\S]*?\);")
  if ($m.Success) {
    $t = $t.Remove($m.Index, $m.Length).Insert($m.Index, $newAdmin)
    Ok "renderAdmin() replaced with functional version"
  }
} else { Note "renderAdmin() not found — skipped" }

# 2i) Add How It Works + Pricing renderers (before the first 'return (')
if ($t -notmatch "const\s+renderHowItWorks\s*=") {
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
        <div key={i} className="bg-white/95 rounded-2xl p-6 border-2 border-yellow-400">
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
"
  $t = $t -replace "return\s*\(", "$how`r`nreturn ("
  Ok "Added How It Works page"
}

if ($t -notmatch "const\s+renderPricing\s*=") {
  $pricing = @"
const renderPricing = () => (
  <section className="container mx-auto px-4 py-12">
    <h2 className="text-4xl md:text-5xl font-black text-white mb-8" style={{ textShadow:'3px 3px 0 rgba(0,0,0,.3)'}}>
      PRICING
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
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
      <div className="bg-white rounded-2xl p-8 border-2 border-pink-400">
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
"
  $t = $t -replace "return\s*\(", "$pricing`r`nreturn ("
  Ok "Added Pricing page"
}

# 2j) Wire pages into main view switch (after admin line)
if ($t -match "\{currentView === 'admin' && renderAdmin\(\)\}") {
  $inject = @"
{currentView === 'admin' && renderAdmin()}
{currentView === 'favourites' && renderFavourites && renderFavourites()}
{currentView === 'how' && renderHowItWorks()}
{currentView === 'pricing' && renderPricing()}
"@.Trim()
  $t = $t -replace "\{currentView === 'admin' && renderAdmin\(\)\}", $inject
  Ok "Wired new views into return"
} else { Note "Admin switch line not found; views may already be wired" }

# 2k) Fix hero bullets mojibake
if ($t.Contains('DJs • Bands • Singers • Comedians • All in One Place')) {
  $t = $t.Replace('DJs • Bands • Singers • Comedians • All in One Place',
                  'DJs &bull; Bands &bull; Singers &bull; Comedians &mdash; All in One Place')
  Ok "Fixed hero bullets"
} else { Note "Hero bullets string not found" }

# 2l) Header/footer links → routes
$t = $t.Replace('<a href="#" className="hover:text-yellow-400">Browse Acts</a>', '<a href="#/home" className="hover:text-yellow-400">Browse Acts</a>')
$t = $t.Replace('<a href="#" className="hover:text-yellow-400">How It Works</a>', '<a href="#/how" className="hover:text-yellow-400">How It Works</a>')
$t = $t.Replace('<a href="#" className="hover:text-yellow-400">Pricing</a>', '<a href="#/pricing" className="hover:text-yellow-400">Pricing</a>')
$t = $t.Replace('<a href="#" className="hover:text-yellow-400">Sign Up</a>', '<a href="#/signup" className="hover:text-yellow-400">Sign Up</a>')
$t = $t.Replace('<a href="#" className="hover:text-yellow-400">Premium Plans</a>', '<a href="#/pricing" className="hover:text-yellow-400">Premium Plans</a>')
# common Admin button -> anchor (keeps button if already fine)
$t = $t.Replace('> Admin</button>', '</button><a href="#/admin" className="text-white font-bold hover:text-yellow-300 transition">Admin</a>')

Ok "Converted placeholder links to real routes"

# 2m) Compact UI: headings/paddings/cards
# (applied conservatively; only if present)
$repl = @{
  'text-6xl md:text-7xl' = 'text-5xl md:text-6xl';
  'text-5xl'             = 'text-4xl';
  'text-4xl'             = 'text-3xl';
  'text-2xl'             = 'text-xl';
  'py-16'                = 'py-12';
  'px-12 py-4'           = 'px-8 py-3';
  'h-64'                 = 'h-56';
  'border-4'             = 'border-2';
  'py-3'                 = 'py-2';
}
foreach ($k in $repl.Keys) {
  if ($t.Contains($k)) { $t = $t.Replace($k, $repl[$k]) }
}
Ok "Applied compact UI sizing pass"

# --- write back ---
Write-File $bp $t
Ok "Patched $bp"

Write-Host "`n✔ All patches applied. Next steps:" -ForegroundColor Cyan
Write-Host "  1) npm install"
Write-Host "  2) npm run build"
Write-Host "  3) git add -A && git commit -m 'fix: routing, admin queue, links, compact UI' && git push"
Write-Host "     (or run your push-and-deploy script to deploy to Railway)"
Write-Host "  4) Admin code: set VITE_ADMIN_CODE in Railway (fallback BOOKEDUP2025)"
