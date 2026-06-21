// Pure metric computation — single source of truth is the sessions array.
// No hooks here; callers pass already-fetched disciplines + sessions.

function toDateKey(d) {
  // d is 'YYYY-MM-DD' (date column) — already a stable key.
  return typeof d === 'string' ? d.slice(0, 10) : '';
}

function daysBetween(aKey, bKey) {
  const a = new Date(aKey + 'T00:00:00');
  const b = new Date(bKey + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}

// Longest run ending today (or yesterday) of consecutive days with a session.
function computeStreaks(sessions) {
  const keys = Array.from(new Set(sessions.map((s) => toDateKey(s.session_date)))).filter(Boolean);
  if (keys.length === 0) return { current: 0, best: 0 };
  keys.sort(); // ascending

  // best streak
  let best = 1;
  let run = 1;
  for (let i = 1; i < keys.length; i++) {
    if (daysBetween(keys[i], keys[i - 1]) === 1) run += 1;
    else run = 1;
    if (run > best) best = run;
  }

  // current streak: walk back from the latest day, but only "current" if the
  // latest day is today or yesterday.
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const latest = keys[keys.length - 1];
  const gapFromToday = daysBetween(todayKey, latest);
  let current = 0;
  if (gapFromToday <= 1) {
    current = 1;
    for (let i = keys.length - 1; i > 0; i--) {
      if (daysBetween(keys[i], keys[i - 1]) === 1) current += 1;
      else break;
    }
  }
  return { current, best };
}

export function computeMetrics(disciplines = [], sessions = [], profile = null) {
  const totalHours = sessions.reduce((sum, s) => sum + Number(s.duration_hours || 0), 0);

  const perDiscipline = {};
  for (const d of disciplines) perDiscipline[d.id] = 0;
  for (const s of sessions) {
    perDiscipline[s.discipline_id] = (perDiscipline[s.discipline_id] || 0) + Number(s.duration_hours || 0);
  }

  const disciplinesWithHours = disciplines.map((d) => {
    const hours = perDiscipline[d.id] || 0;
    const target = d.target_hours || 10000;
    return { ...d, hours, pct: target ? (hours / target) * 100 : 0 };
  });

  const globalTarget = 10000;
  const globalPct = Math.min(100, (totalHours / globalTarget) * 100);

  const { current: currentStreak, best: bestStreak } = computeStreaks(sessions);

  // skill distribution (share of total hours per discipline)
  const skillDistribution = disciplinesWithHours
    .map((d) => ({ id: d.id, name: d.name, hours: d.hours, share: totalHours ? (d.hours / totalHours) * 100 : 0 }))
    .sort((a, b) => b.hours - a.hours);

  // weekly pace: hours logged in the last 7 days vs weekly target
  const weeklyTarget = profile?.weekly_target_hours || 20;
  const todayKey = new Date().toISOString().slice(0, 10);
  const last7 = sessions
    .filter((s) => daysBetween(todayKey, toDateKey(s.session_date)) <= 6 && daysBetween(todayKey, toDateKey(s.session_date)) >= 0)
    .reduce((sum, s) => sum + Number(s.duration_hours || 0), 0);

  // distinct days that have a session, keyed for heatmap lookups
  const activeDayKeys = new Set(sessions.map((s) => toDateKey(s.session_date)));
  const hoursByDay = {};
  for (const s of sessions) {
    const k = toDateKey(s.session_date);
    hoursByDay[k] = (hoursByDay[k] || 0) + Number(s.duration_hours || 0);
  }

  // simple XP model: 1 hr = 1 XP toward a 10,000 "rank" bar
  const xp = Math.round(totalHours);

  return {
    totalHours,
    globalTarget,
    globalPct,
    disciplinesWithHours,
    currentStreak,
    bestStreak,
    skillDistribution,
    weeklyTarget,
    weeklyPace: last7,
    activeDayKeys,
    hoursByDay,
    xp,
    sessionCount: sessions.length,
  };
}
