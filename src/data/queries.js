// Epley 1RM estimate and total volume, exactly as computed in the pre-rewrite
// app-logic.js so historical chart values don't shift after the port.
function withDerived(r) {
  return {
    id: r.id,
    date: r.created_at,
    exercise: r.exercise,
    weight: r.weight,
    reps: r.reps,
    sets: r.sets,
    group: r.group,
    volume: r.weight * r.reps * r.sets,
    est1rm: Math.round(r.weight * (1 + r.reps / 30)),
  }
}

export async function fetchWorkoutRecords(supabase) {
  const { data, error } = await supabase
    .from('workout_records')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(withDerived)
}

export async function insertWorkoutRecord(supabase, rec) {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  const { error } = await supabase.from('workout_records').insert({
    user_id: userData.user.id,
    exercise: rec.exercise,
    group: rec.group,
    weight: rec.weight,
    reps: rec.reps,
    sets: rec.sets,
  })
  if (error) throw error
}

export async function deleteWorkoutRecord(supabase, id) {
  const { error } = await supabase.from('workout_records').delete().eq('id', id)
  if (error) throw error
}

// body_weight_records replaces the former sleep-tracking table; only body
// weight is ever stored (no bedtime/wakeup/quality/memo columns are read).
export async function fetchBodyWeightRecords(supabase) {
  const { data, error } = await supabase
    .from('body_weight_records')
    .select('*')
    // oldest -> newest: consumers read the last element as "latest"
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data || []).map(r => ({ id: r.id, date: r.created_at, weight: r.weight }))
}

export async function insertBodyWeightRecord(supabase, weight) {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  const { error } = await supabase.from('body_weight_records').insert({
    user_id: userData.user.id,
    weight,
  })
  if (error) throw error
}

export async function deleteBodyWeightRecord(supabase, id) {
  const { error } = await supabase.from('body_weight_records').delete().eq('id', id)
  if (error) throw error
}

// Returns null (not an error) when the signed-in user hasn't completed the
// onboarding wizard yet — that's the signal App.jsx branches on.
export async function fetchUserProfile(supabase) {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userData.user.id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function upsertUserProfile(supabase, profile) {
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  const { error } = await supabase.from('user_profiles').upsert({
    id: userData.user.id,
    nickname: profile.nickname,
    experience: profile.experience,
    body_type: profile.bodyType,
    goal: profile.goal,
    frequency: profile.frequency,
    height_cm: profile.heightCm,
    weight_kg: profile.weightKg ?? null,
  })
  if (error) throw error
}
