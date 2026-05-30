/* ============================================================
   VisitFlow — Application Logic
   Visitor Management System
   ============================================================ */

// ── State ──────────────────────────────────────────────────
const APP = {
  currentUser: null,
  currentPage: 'dashboard',
  selectedSlot: null,
  selectedShiftSlot: null,
  calendarMonth: new Date().getMonth(),
  calendarYear: new Date().getFullYear(),
};

// ── Mock Data ──────────────────────────────────────────────
const MEETINGS = [
  {
    id: 1,
    title: 'Q2 Budget Review',
    company: 'Acme Corp',
    date: '2026-04-21',
    time: '09:00',
    endTime: '10:00',
    duration: 60,
    room: 'Room A',
    status: 'confirmed',
    priority: 'high',
    attendees: ['john@acme.com', 'sarah@acme.com'],
    agenda: 'Review Q2 financial projections and approve department budgets.',
    bookedAt: '2026-04-18T10:30:00',
    bookedBy: 'John Doe',
  },
  {
    id: 2,
    title: 'Product Design Sprint',
    company: 'TechNova Inc',
    date: '2026-04-21',
    time: '11:00',
    endTime: '12:00',
    duration: 60,
    room: 'Room B',
    status: 'confirmed',
    priority: 'normal',
    attendees: ['mike@technova.com'],
    agenda: 'Kickoff for the redesign of the mobile dashboard.',
    bookedAt: '2026-04-19T14:00:00',
    bookedBy: 'Mike Chen',
  },
  {
    id: 3,
    title: 'Client Onboarding Call',
    company: 'GreenLeaf Ltd',
    date: '2026-04-21',
    time: '14:00',
    endTime: '15:00',
    duration: 60,
    room: 'Room C',
    status: 'pending',
    priority: 'normal',
    attendees: ['lisa@greenleaf.com'],
    agenda: 'Walk through platform features and set up initial config.',
    bookedAt: '2026-04-20T09:15:00',
    bookedBy: 'Lisa Park',
  },
  {
    id: 4,
    title: 'Investor Update',
    company: 'VisitFlow',
    date: '2026-04-22',
    time: '10:00',
    endTime: '11:30',
    duration: 90,
    room: 'Room D',
    status: 'confirmed',
    priority: 'urgent',
    attendees: ['cfo@visitflow.io', 'investor@capital.com'],
    agenda: 'Monthly investor briefing with financial metrics and growth KPIs.',
    bookedAt: '2026-04-17T16:00:00',
    bookedBy: 'John Doe',
  },
  {
    id: 5,
    title: 'HR Policy Discussion',
    company: 'Acme Corp',
    date: '2026-04-22',
    time: '13:00',
    endTime: '14:00',
    duration: 60,
    room: 'Room A',
    status: 'confirmed',
    priority: 'normal',
    attendees: ['hr@acme.com'],
    agenda: 'Review updated remote work policy and hybrid guidelines.',
    bookedAt: '2026-04-18T11:00:00',
    bookedBy: 'Sarah Lee',
  },
  {
    id: 6,
    title: 'Vendor Negotiation',
    company: 'SupplyPro',
    date: '2026-04-23',
    time: '15:00',
    endTime: '16:00',
    duration: 60,
    room: 'Room B',
    status: 'pending',
    priority: 'high',
    attendees: ['vendor@supplypro.com'],
    agenda: 'Negotiate terms for Q3 supply contract renewal.',
    bookedAt: '2026-04-20T10:00:00',
    bookedBy: 'David Kim',
  },
  {
    id: 7,
    title: 'Marketing Strategy',
    company: 'BrightAds',
    date: '2026-04-20',
    time: '11:00',
    endTime: '12:30',
    duration: 90,
    room: 'Room A',
    status: 'confirmed',
    priority: 'normal',
    attendees: ['mkt@brightads.com'],
    agenda: 'Plan Q3 marketing campaigns and ad spend allocation.',
    bookedAt: '2026-04-16T09:00:00',
    bookedBy: 'John Doe',
  },
  {
    id: 8,
    title: 'Security Audit Review',
    company: 'CyberShield',
    date: '2026-04-19',
    time: '14:00',
    endTime: '15:30',
    duration: 90,
    room: 'Room D',
    status: 'confirmed',
    priority: 'high',
    attendees: ['audit@cybershield.com'],
    agenda: 'Review findings of the annual security audit and plan remediation.',
    bookedAt: '2026-04-15T12:00:00',
    bookedBy: 'John Doe',
  },
];

const PENDING_APPROVALS = [
  {
    id: 101,
    name: 'Lisa Park',
    company: 'GreenLeaf Ltd',
    title: 'Client Onboarding Call',
    date: '2026-04-21',
    time: '14:00',
    room: 'Room C',
    requestedAt: '2026-04-20T09:15:00',
  },
  {
    id: 102,
    name: 'David Kim',
    company: 'SupplyPro',
    title: 'Vendor Negotiation',
    date: '2026-04-23',
    time: '15:00',
    room: 'Room B',
    requestedAt: '2026-04-20T10:00:00',
  },
  {
    id: 103,
    name: 'Emma Zhang',
    company: 'InnoTech',
    title: 'Partnership Discussion',
    date: '2026-04-24',
    time: '10:00',
    room: 'Room A',
    requestedAt: '2026-04-21T08:30:00',
  },
];

const SUMMARIES = [
  {
    id: 1,
    meetingId: 7,
    title: 'Marketing Strategy',
    date: '2026-04-20',
    company: 'BrightAds',
    points: [
      'Allocated $50K budget for Q3 social media campaigns',
      'Decided to focus on LinkedIn and YouTube for B2B outreach',
      'New brand video production to begin May 1st',
      'Monthly review meetings scheduled for progress tracking',
    ],
    attendees: ['JD', 'ML', 'SK'],
    colors: ['#4f6ef7', '#7c3aed', '#22c55e'],
  },
  {
    id: 2,
    meetingId: 8,
    title: 'Security Audit Review',
    date: '2026-04-19',
    company: 'CyberShield',
    points: [
      'Two critical vulnerabilities identified in API gateway',
      'Data encryption upgrade approved for all databases',
      'Penetration testing scheduled for next quarter',
      'Employee security training to be mandatory by May 15th',
    ],
    attendees: ['JD', 'AK', 'RB'],
    colors: ['#4f6ef7', '#ef4444', '#f59e0b'],
  },
  {
    id: 3,
    meetingId: 1,
    title: 'Q2 Budget Review (Previous)',
    date: '2026-04-14',
    company: 'Acme Corp',
    points: [
      'Engineering department budget increased by 15%',
      'Marketing spend approved at $120K for Q2',
      'New hire count: 8 positions approved across teams',
      'Capex for office renovation deferred to Q3',
      'Revenue projection revised upward by 8%',
    ],
    attendees: ['JD', 'SL', 'MC'],
    colors: ['#4f6ef7', '#22c55e', '#3b82f6'],
  },
];

const ROOMS = [
  { id: 'room-a', name: 'Room A — Conference', seats: 12, status: 'available' },
  { id: 'room-b', name: 'Room B — Boardroom', seats: 8, status: 'occupied' },
  { id: 'room-c', name: 'Room C — Small', seats: 4, status: 'available' },
  { id: 'room-d', name: 'Room D — Executive', seats: 6, status: 'maintenance' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
];

// ── Navigation & Scroll ────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const observeReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = ['home', 'features', 'how-it-works', 'about', 'contact'];
  const scrollPos = window.scrollY + 120;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const link = document.querySelector(`.nav__link[data-section="${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    }
  });
}
window.addEventListener('scroll', updateActiveNavLink);

function toggleMobileNav() {
  const navLinks = document.getElementById('navLinks');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// ── Auth Modal ─────────────────────────────────────────────
function openModal(tab = 'login') {
  document.getElementById('authModal').classList.add('open');
  switchTab(tab);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('authModal').classList.remove('open');
  document.body.style.overflow = '';
}

function switchTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (tab === 'login') {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  } else {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

// Close modal on backdrop click
document.getElementById('authModal')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});

// ── Login / Signup Handlers ────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  APP.currentUser = {
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    email: email,
    company: 'Acme Corp',
    role: 'Company Admin',
  };
  closeModal();
  enterDashboard();
  showToast('Welcome back, ' + APP.currentUser.name + '!', 'success');
}

function handleSignup(e) {
  e.preventDefault();
  APP.currentUser = {
    name: document.getElementById('signupName').value,
    email: document.getElementById('signupEmail').value,
    company: document.getElementById('signupCompany').value,
    role: document.getElementById('signupRole').value === 'company_admin' ? 'Company Admin' : 'Visitor',
  };
  closeModal();
  enterDashboard();
  showToast('Account created! Welcome, ' + APP.currentUser.name + '!', 'success');
}

function handleSocialLogin(provider) {
  APP.currentUser = {
    name: 'Demo User',
    email: 'demo@company.com',
    company: 'Demo Corp',
    role: 'Company Admin',
  };
  closeModal();
  enterDashboard();
  showToast('Signed in with ' + provider + '!', 'success');
}

function handleLogout() {
  APP.currentUser = null;
  document.getElementById('dashboardApp').classList.remove('active');
  document.getElementById('landingPage').classList.remove('hidden');
  document.getElementById('mainNav').style.display = '';
  showToast('You have been signed out.', 'info');
}

// ── Enter Dashboard ────────────────────────────────────────
function enterDashboard() {
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('dashboardApp').classList.add('active');
  document.getElementById('mainNav').style.display = 'none';
  updateUserUI();
  renderDashboard();
  renderMiniCalendar();

  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const datePicker = document.getElementById('slotDatePicker');
  const meetDateInput = document.getElementById('meetDate');
  if (datePicker) datePicker.value = today;
  if (meetDateInput) meetDateInput.min = today;
}

function updateUserUI() {
  if (!APP.currentUser) return;
  const initials = APP.currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('sidebarAvatar').textContent = initials;
  document.getElementById('headerAvatar').textContent = initials;
  document.getElementById('sidebarName').textContent = APP.currentUser.name;
  document.getElementById('sidebarRole').textContent = APP.currentUser.role;
  if (document.getElementById('settingsName')) {
    document.getElementById('settingsName').value = APP.currentUser.name;
    document.getElementById('settingsEmail').value = APP.currentUser.email;
    document.getElementById('settingsCompany').value = APP.currentUser.company;
  }
}

// ── Page Navigation ────────────────────────────────────────
function switchPage(pageId) {
  APP.currentPage = pageId;

  // Update sidebar
  document.querySelectorAll('.sidebar__item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });

  // Show/hide pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.toggle('active', page.id === `page-${pageId}`);
  });

  // Render
  switch (pageId) {
    case 'dashboard': renderDashboard(); break;
    case 'slots': renderSlots(); break;
    case 'approvals': renderApprovals(); break;
    case 'meetings': renderMeetings(); break;
    case 'summary': renderSummaries(); break;
    case 'history': renderHistory(); break;
  }

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── Dashboard Render ───────────────────────────────────────
function renderDashboard() {
  renderTodayMeetings();
  updateStats();
  renderMiniCalendar();
}

function renderTodayMeetings() {
  const container = document.getElementById('todayMeetings');
  const today = new Date().toISOString().split('T')[0];
  const todayMeetings = MEETINGS.filter(m => m.date === today);

  if (todayMeetings.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:var(--sp-2xl);color:var(--c-text-muted);">
        <div style="font-size:2.5rem;margin-bottom:var(--sp-md);">📅</div>
        <p style="font-size:.9rem;">No meetings scheduled for today.</p>
        <button class="btn btn--primary btn--sm" style="margin-top:var(--sp-md);" onclick="switchPage('schedule')">Schedule One</button>
      </div>`;
    return;
  }

  const colors = ['blue', 'green', 'orange', 'red'];
  container.innerHTML = todayMeetings.map((m, i) => `
    <div class="meeting-item">
      <div class="meeting-item__time">
        <div class="meeting-item__time-start">${formatTime(m.time)}</div>
        <div class="meeting-item__time-end">${formatTime(m.endTime)}</div>
      </div>
      <div class="meeting-item__divider meeting-item__divider--${colors[i % colors.length]}"></div>
      <div class="meeting-item__info">
        <div class="meeting-item__title">${m.title}</div>
        <div class="meeting-item__meta">${m.company} · ${m.room} · ${m.attendees.length} attendee${m.attendees.length > 1 ? 's' : ''}</div>
      </div>
      <span class="meeting-item__status status--${m.status}">${capitalize(m.status)}</span>
    </div>
  `).join('');
}

function updateStats() {
  const total = MEETINGS.length;
  const confirmed = MEETINGS.filter(m => m.status === 'confirmed').length;
  const pending = MEETINGS.filter(m => m.status === 'pending').length;
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statConfirmed').textContent = confirmed;
  document.getElementById('statPending').textContent = pending;
}

// ── Mini Calendar ──────────────────────────────────────────
function renderMiniCalendar() {
  const container = document.getElementById('miniCalendar');
  const year = APP.calendarYear;
  const month = APP.calendarMonth;
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Days that have meetings
  const meetingDates = new Set(MEETINGS.filter(m => {
    const d = new Date(m.date);
    return d.getMonth() === month && d.getFullYear() === year;
  }).map(m => new Date(m.date).getDate()));

  let datesHTML = '';

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    datesHTML += `<span class="calendar-mini__date calendar-mini__date--other">${prevDays - i}</span>`;
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const hasMeeting = meetingDates.has(d);
    let classes = 'calendar-mini__date';
    if (isToday) classes += ' calendar-mini__date--today';
    if (hasMeeting) classes += ' calendar-mini__date--has-meeting';
    datesHTML += `<span class="${classes}">${d}</span>`;
  }

  // Next month padding
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let d = 1; d <= totalCells - firstDay - daysInMonth; d++) {
    datesHTML += `<span class="calendar-mini__date calendar-mini__date--other">${d}</span>`;
  }

  container.innerHTML = `
    <div class="calendar-mini__header">
      <span class="calendar-mini__title">${monthNames[month]} ${year}</span>
      <div class="calendar-mini__nav">
        <button onclick="navCalendar(-1)">◂</button>
        <button onclick="navCalendar(1)">▸</button>
      </div>
    </div>
    <div class="calendar-mini__days">
      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
      <span>Th</span><span>Fr</span><span>Sa</span>
    </div>
    <div class="calendar-mini__dates">${datesHTML}</div>
  `;
}

function navCalendar(dir) {
  APP.calendarMonth += dir;
  if (APP.calendarMonth > 11) { APP.calendarMonth = 0; APP.calendarYear++; }
  if (APP.calendarMonth < 0) { APP.calendarMonth = 11; APP.calendarYear--; }
  renderMiniCalendar();
}

// ── Available Slots ────────────────────────────────────────
function renderSlots() {
  const dateStr = document.getElementById('slotDatePicker')?.value || new Date().toISOString().split('T')[0];
  const bookedTimes = MEETINGS.filter(m => m.date === dateStr).map(m => m.time);

  const grid = document.getElementById('slotGrid');
  grid.innerHTML = TIME_SLOTS.map(slot => {
    const isBooked = bookedTimes.includes(slot);
    const isSelected = APP.selectedSlot === slot;
    let cls = 'slot';
    if (isBooked) cls += ' slot--booked';
    else if (isSelected) cls += ' slot--selected';
    else cls += ' slot--available';

    return `<div class="${cls}" onclick="${isBooked ? '' : `selectSlot('${slot}')`}" title="${isBooked ? 'Already booked' : 'Click to select'}">
      ${formatTime(slot)}
    </div>`;
  }).join('');

  renderRoomStatus();
}

function selectSlot(time) {
  APP.selectedSlot = time;
  renderSlots();
}

function renderRoomStatus() {
  const container = document.getElementById('roomStatus');
  container.innerHTML = ROOMS.map(room => {
    const statusColor = room.status === 'available' ? 'var(--c-success)'
      : room.status === 'occupied' ? 'var(--c-danger)' : 'var(--c-warning)';
    const statusBg = room.status === 'available' ? 'var(--c-success-bg)'
      : room.status === 'occupied' ? 'var(--c-danger-bg)' : 'var(--c-warning-bg)';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--sp-md);border:1px solid var(--c-border-light);border-radius:var(--r-sm);margin-bottom:var(--sp-sm);">
        <div>
          <div style="font-size:.9rem;font-weight:600;">${room.name}</div>
          <div style="font-size:.75rem;color:var(--c-text-muted);">${room.seats} seats</div>
        </div>
        <span style="font-size:.72rem;font-weight:600;padding:4px 10px;border-radius:9999px;background:${statusBg};color:${statusColor};">
          ${capitalize(room.status)}
        </span>
      </div>`;
  }).join('');
}

function quickBook() {
  const title = document.getElementById('quickTitle')?.value;
  const visitor = document.getElementById('quickVisitor')?.value;

  if (!APP.selectedSlot) {
    showToast('Please select a time slot first.', 'error');
    return;
  }
  if (!title) {
    showToast('Please enter a meeting title.', 'error');
    return;
  }

  const dateStr = document.getElementById('slotDatePicker')?.value || new Date().toISOString().split('T')[0];
  const newMeeting = {
    id: Date.now(),
    title: title,
    company: visitor || 'Walk-in',
    date: dateStr,
    time: APP.selectedSlot,
    endTime: addMinutes(APP.selectedSlot, 60),
    duration: 60,
    room: 'Any Available',
    status: 'pending',
    priority: 'normal',
    attendees: [],
    agenda: '',
    bookedAt: new Date().toISOString(),
    bookedBy: APP.currentUser?.name || 'Unknown',
  };

  MEETINGS.push(newMeeting);
  APP.selectedSlot = null;
  document.getElementById('quickTitle').value = '';
  document.getElementById('quickVisitor').value = '';
  renderSlots();
  showToast('Booking request submitted! Awaiting company approval.', 'success');
}

// ── Schedule Meeting ───────────────────────────────────────
function handleScheduleMeeting(e) {
  e.preventDefault();
  const title = document.getElementById('meetTitle').value;
  const company = document.getElementById('meetCompany').value;
  const date = document.getElementById('meetDate').value;
  const time = document.getElementById('meetTime').value;
  const duration = parseInt(document.getElementById('meetDuration').value);
  const room = document.getElementById('meetRoom').value;
  const agenda = document.getElementById('meetAgenda').value;

  // Check if slot is taken
  const conflict = MEETINGS.find(m => m.date === date && m.time === time && m.status !== 'cancelled');
  if (conflict) {
    openShiftModal(date, time);
    return;
  }

  const newMeeting = {
    id: Date.now(),
    title,
    company: company || APP.currentUser?.company || 'Unknown',
    date,
    time,
    endTime: addMinutes(time, duration),
    duration,
    room: room === 'any' ? 'Any Available' : ROOMS.find(r => r.id === room)?.name || room,
    status: 'pending',
    priority: document.getElementById('meetPriority').value,
    attendees: document.getElementById('meetAttendees').value.split(',').map(e => e.trim()).filter(Boolean),
    agenda,
    bookedAt: new Date().toISOString(),
    bookedBy: APP.currentUser?.name || 'Unknown',
  };

  MEETINGS.push(newMeeting);
  PENDING_APPROVALS.push({
    id: newMeeting.id,
    name: APP.currentUser?.name || 'Unknown',
    company: newMeeting.company,
    title: newMeeting.title,
    date: newMeeting.date,
    time: newMeeting.time,
    room: newMeeting.room,
    requestedAt: newMeeting.bookedAt,
  });

  document.getElementById('scheduleForm').reset();
  updateApprovalBadge();
  showToast('Meeting request submitted successfully! Awaiting approval.', 'success');
  switchPage('dashboard');
}

// ── Approvals ──────────────────────────────────────────────
function renderApprovals() {
  const container = document.getElementById('approvalsList');
  document.getElementById('approvalCount').textContent = PENDING_APPROVALS.length;
  updateApprovalBadge();

  if (PENDING_APPROVALS.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:var(--sp-2xl);color:var(--c-text-muted);">
        <div style="font-size:2.5rem;margin-bottom:var(--sp-md);">✅</div>
        <p style="font-size:.9rem;">All caught up! No pending approvals.</p>
      </div>`;
    return;
  }

  container.innerHTML = PENDING_APPROVALS.map(a => `
    <div class="approval-item" id="approval-${a.id}">
      <div style="width:40px;height:40px;border-radius:50%;background:var(--c-accent-light);color:var(--c-accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0;">
        ${a.name.split(' ').map(w => w[0]).join('')}
      </div>
      <div class="approval-item__info">
        <div class="approval-item__name">${a.title}</div>
        <div class="approval-item__detail">${a.name} · ${a.company} · ${formatDate(a.date)} at ${formatTime(a.time)} · ${a.room}</div>
      </div>
      <div class="approval-item__actions">
        <button class="btn btn--sm btn--success" onclick="approveRequest(${a.id})">Approve</button>
        <button class="btn btn--sm btn--outline" onclick="openShiftModalForApproval(${a.id})">Shift</button>
        <button class="btn btn--sm btn--danger" onclick="declineRequest(${a.id})">Decline</button>
      </div>
    </div>
  `).join('');
}

function approveRequest(id) {
  const idx = PENDING_APPROVALS.findIndex(a => a.id === id);
  if (idx !== -1) {
    PENDING_APPROVALS.splice(idx, 1);
    const meeting = MEETINGS.find(m => m.id === id || (m.title === PENDING_APPROVALS[idx]?.title));
    if (meeting) meeting.status = 'confirmed';
    // Also update any meeting with matching approval
    MEETINGS.forEach(m => {
      if (m.status === 'pending' && m.id === id) m.status = 'confirmed';
    });
    showToast('Meeting request approved!', 'success');
    renderApprovals();
  }
}

function declineRequest(id) {
  const idx = PENDING_APPROVALS.findIndex(a => a.id === id);
  if (idx !== -1) {
    PENDING_APPROVALS.splice(idx, 1);
    MEETINGS.forEach(m => {
      if (m.id === id) m.status = 'cancelled';
    });
    showToast('Meeting request declined.', 'info');
    renderApprovals();
  }
}

function approveAll() {
  PENDING_APPROVALS.forEach(a => {
    MEETINGS.forEach(m => {
      if (m.id === a.id) m.status = 'confirmed';
    });
  });
  PENDING_APPROVALS.length = 0;
  showToast('All requests approved!', 'success');
  renderApprovals();
}

function updateApprovalBadge() {
  const badge = document.getElementById('approvalBadge');
  if (badge) {
    badge.textContent = PENDING_APPROVALS.length;
    badge.style.display = PENDING_APPROVALS.length > 0 ? '' : 'none';
  }
}

// ── All Meetings ───────────────────────────────────────────
function renderMeetings() {
  const container = document.getElementById('meetingsList');
  const filter = document.getElementById('meetingFilter')?.value || 'all';
  let filtered = [...MEETINGS];
  if (filter !== 'all') filtered = filtered.filter(m => m.status === filter);
  filtered.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));

  const colors = ['blue', 'green', 'orange', 'red'];
  container.innerHTML = filtered.map((m, i) => `
    <div class="meeting-item">
      <div class="meeting-item__time">
        <div class="meeting-item__time-start">${formatTime(m.time)}</div>
        <div class="meeting-item__time-end">${formatDate(m.date)}</div>
      </div>
      <div class="meeting-item__divider meeting-item__divider--${colors[i % colors.length]}"></div>
      <div class="meeting-item__info">
        <div class="meeting-item__title">${m.title}</div>
        <div class="meeting-item__meta">${m.company} · ${m.room} · ${m.duration}min · Booked by ${m.bookedBy}</div>
      </div>
      <span class="meeting-item__status status--${m.status}">${capitalize(m.status)}</span>
    </div>
  `).join('');
}

// ── Meeting Summaries ──────────────────────────────────────
function renderSummaries() {
  const container = document.getElementById('summariesList');
  container.innerHTML = SUMMARIES.map(s => `
    <div class="summary-card">
      <div class="summary-card__header">
        <div>
          <div class="summary-card__title">${s.title}</div>
          <div style="font-size:.75rem;color:var(--c-text-muted);">${s.company}</div>
        </div>
        <div class="summary-card__date">${formatDate(s.date)}</div>
      </div>
      <ul class="summary-card__points">
        ${s.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:var(--sp-md);">
        <div class="summary-card__attendees">
          ${s.attendees.map((a, i) => `<div class="summary-card__avatar" style="background:${s.colors[i]}">${a}</div>`).join('')}
        </div>
        <button class="btn btn--sm btn--secondary">📥 Export PDF</button>
      </div>
    </div>
  `).join('');
}

// ── History ────────────────────────────────────────────────
function renderHistory() {
  const tbody = document.getElementById('historyTableBody');
  const sorted = [...MEETINGS].sort((a, b) => new Date(b.date) - new Date(a.date));

  tbody.innerHTML = sorted.map(m => `
    <tr style="border-bottom:1px solid var(--c-border-light);">
      <td style="padding:12px;">${formatDate(m.date)}</td>
      <td style="padding:12px;font-weight:600;">${m.title}</td>
      <td style="padding:12px;">${m.company}</td>
      <td style="padding:12px;">${m.room}</td>
      <td style="padding:12px;">
        <span class="meeting-item__status status--${m.status}">${capitalize(m.status)}</span>
      </td>
      <td style="padding:12px;">
        <button class="btn btn--sm btn--ghost" onclick="showToast('Meeting details opened','info')">View</button>
      </td>
    </tr>
  `).join('');
}

function exportHistory() {
  const headers = ['Date', 'Meeting', 'Company', 'Room', 'Time', 'Status', 'Booked By'];
  const rows = MEETINGS.map(m => [m.date, m.title, m.company, m.room, m.time, m.status, m.bookedBy]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'visitflow_history.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('History exported as CSV!', 'success');
}

// ── Shift Suggestion Modal ─────────────────────────────────
function openShiftModal(date, conflictTime) {
  const modal = document.getElementById('shiftModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const bookedTimes = MEETINGS.filter(m => m.date === date).map(m => m.time);
  const available = TIME_SLOTS.filter(t => !bookedTimes.includes(t));
  const nearby = available.slice(0, 4);

  document.getElementById('shiftSubtitle').textContent =
    `${formatTime(conflictTime)} on ${formatDate(date)} is already booked. Here are alternative slots:`;

  const slotsContainer = document.getElementById('shiftSlots');
  slotsContainer.innerHTML = nearby.map(slot => `
    <div class="shift-slot" onclick="selectShiftSlot(this, '${slot}')">
      <div class="shift-slot__time">${formatTime(slot)}</div>
      <div class="shift-slot__label">${formatDate(date)}</div>
    </div>
  `).join('');

  APP.selectedShiftSlot = null;
}

function openShiftModalForApproval(id) {
  const approval = PENDING_APPROVALS.find(a => a.id === id);
  if (approval) openShiftModal(approval.date, approval.time);
}

function selectShiftSlot(el, time) {
  document.querySelectorAll('.shift-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  APP.selectedShiftSlot = time;
}

function confirmShift() {
  if (!APP.selectedShiftSlot) {
    showToast('Please select an alternative slot.', 'error');
    return;
  }
  showToast(`Shift suggestion sent for ${formatTime(APP.selectedShiftSlot)}!`, 'success');
  closeShiftModal();
}

function closeShiftModal() {
  document.getElementById('shiftModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('shiftModal')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeShiftModal();
});

// ── Notifications ──────────────────────────────────────────
function toggleNotifications() {
  document.getElementById('notifPanel').classList.toggle('open');
}

function clearNotifications() {
  document.getElementById('notifList').innerHTML = `
    <div style="text-align:center;padding:var(--sp-lg);color:var(--c-text-muted);font-size:.85rem;">
      No new notifications
    </div>`;
  const dot = document.querySelector('.main__notif-dot');
  if (dot) dot.style.display = 'none';
}

// Close notification panel on outside click
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('notifBtn');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// ── Contact Form ───────────────────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
  e.target.reset();
}

// ── Toast Notifications ────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  toast.innerHTML = `
    <span style="font-size:1.1rem;">${icons[type] || 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Utility Functions ──────────────────────────────────────
function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addMinutes(timeStr, minutes) {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

// ── Responsive helpers ─────────────────────────────────────
function checkResponsive() {
  const toggle = document.getElementById('sidebarToggle');
  if (toggle) {
    toggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
  }
}
window.addEventListener('resize', checkResponsive);

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  observeReveal();
  checkResponsive();
});
