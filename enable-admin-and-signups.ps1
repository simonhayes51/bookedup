# --- enable-admin-and-signups.ps1 ---
$ErrorActionPreference = "Stop"

function Read-File($p){ if(!(Test-Path $p)){ throw "File not found: $p"}; Get-Content -Raw -Path $p }
function Write-File($p,$t){ Set-Content -Path $p -Value $t -Encoding UTF8 }
function Ok($m){ Write-Host "✅ $m" -ForegroundColor Green }
function Note($m){ Write-Host "• $m" -ForegroundColor Yellow }

$path = "src/components/BookedUp.jsx"
$text = Read-File $path

# 1) Ensure useEffect import
$text = $text -replace 'import React,\s*\{\s*useState\s*\}\s*from\s*\'react\'\s*;',
"import React, { useState, useEffect } from 'react';"

# 2) Insert tiny storage helpers + admin code (after imports, before component)
if($text -notmatch 'const\s+LS\s*=\s*\{'){
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
"@
  $text = $text -replace '(const\s+BookedUp\s*=\s*\(\)\s*=>\s*\{)', "$helpers`r`n$1"
  Ok "Added storage helpers & ADMIN_CODE"
} else { Note "Helpers already present" }

# 3) Seed state from localStorage (adminAuthed + applications)
if($text -notmatch '\[\s*adminAuthed'){
  $text = $text -replace '(const\s*\[\s*currentView\s*,\s*setCurrentView\s*\][\s\S]*?\);)',
"$1
  const [adminAuthed, setAdminAuthed] = useState(() => LS.get('adminAuthed', false));
  const [applications, setApplications] = useState(() => LS.get('applications', []));
"
  Ok "Added adminAuthed & applications state"
}

# 4) Replace hard-coded pendingApplications array with dynamic one (if present)
$text = $text -replace 'const\s+pendingApplications\s*=\s*\[[\s\S]*?\];', '// pending applications now come from "applications" state'

# 5) Handle signup submit → save to applications, persist, notify
if($text -match 'const\s+handleSignupSubmit\s*=\s*\(e\)\s*=>\s*\{'){
  $text = $text -replace 'const\s+handleSignupSubmit\s*=\s*\(e\)\s*=>\s*\{[\s\S]*?\};',
@"
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

  // Optional: add a notification
  try {
    const currentNotes = LS.get('notifications', []);
    const newNote = { id: id, type: 'review', message: `New application: ${record.name}`, time: 'just now', read: false };
    LS.set('notifications', [newNote, ...currentNotes]);
  } catch {}

  alert('Application submitted! Our team will review it shortly.');
  setSignupData({ name:'',email:'',genre:'',location:'',price:'',description:'',instagram:'',facebook:'',youtube:'',website:'',photos:[] });

  // Send applicant back to home; admins will see it in Admin immediately
  window.location.hash = '/home';
};
"@
  Ok "Rewired handleSignupSubmit to persist applications"
}

# 6) Admin renderer: read from applications, actions Approve/Deny/Review + persist
if($text -match 'const\s+renderAdmin\s*=\s*\(\)\s*=>\s*\('){
  $text = $text -replace 'const\s+renderAdmin\s*=\s*\(\)\s*=>\s*\([\s\S]*?\);\s*\n\s*\)',
@"
const renderAdmin = () => {
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const deniedCount = applications.filter(a => a.status === 'denied').length;

  const setStatus = (id, status) => {
    const next = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(next);
    LS.set('applications', next);
  };

  const review = (id) => {
    const item = applications.find(a => a.id === id);
    if (!item) return;
    alert(\`Application Details:\\n\\n\${item.name} (\${item.genre})\\n\${item.location}\\nPrice: \${item.price}\\nEmail: \${item.email}\\n\\n\${item.description}\`);
  };

  // Require login if not authed
  if (!adminAuthed) {
    let code = '';
    const tryLogin = () => {
      code = prompt('Enter admin access code:');
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
          <p className="text-gray-700 mb-4">This area is restricted. Click below and enter your admin access code.</p>
          <button onClick={tryLogin} className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-6 py-3 rounded-full font-black">
            Enter Code
          </button>
          <p className="text-xs text-gray-400 mt-4">Tip: set <code>VITE_ADMIN_CODE</code> in your environment. Current fallback: BOOKEDUP2025</p>
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
"@
  Ok "Replaced Admin renderer with functional queue + auth"
} else {
  Note "Admin renderer pattern not found — file may be different. I’ll help tweak if needed."
}

# 7) Ensure Admin link navigates
$text = $text.Replace('> Admin<', '><').Replace('Admin</button>', '</button><a href="#/admin" className="text-white font-bold hover:text-yellow-300 transition">Admin</a>')

# 8) Write file
Write-File $path $text
Ok "Patched $path"

Write-Host "`nNext:" -ForegroundColor Cyan
Write-Host "  1) Run: npm run build"
Write-Host "  2) Push & deploy (your script): ./push-and-deploy.ps1"
Write-Host "  3) Admin code (default): BOOKEDUP2025"
Write-Host "     To change in Railway: set env var VITE_ADMIN_CODE"
