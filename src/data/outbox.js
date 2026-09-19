// Offline write queue for workout records. The gym often has no signal, so a
// failed insert is parked here (with its real timestamp) and retried when the
// connection returns, instead of being lost.
const KEY = 'lm_outbox_v1'

export function readOutbox() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

function writeOutbox(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage full/blocked: nothing more to do */ }
}

export function enqueue(rec) {
  const items = readOutbox()
  items.push({ ...rec, created_at: rec.created_at || new Date().toISOString() })
  writeOutbox(items)
  return items.length
}

// fetch() rejects with a TypeError (or the supabase client wraps it) when
// there's no connection; server-side rejections (RLS, bad data) are not
// network errors and must not be retried forever.
export function isNetworkError(err) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true
  const msg = String(err?.message || err || '')
  return err instanceof TypeError || /failed to fetch|networkerror|load failed|network request failed/i.test(msg)
}

let flushing = false

// Sends queued items oldest-first; stops at the first network failure so
// order is preserved, and drops items the server permanently rejects.
export async function flushOutbox(insertFn) {
  if (flushing) return 0
  flushing = true
  let sent = 0
  try {
    let items = readOutbox()
    while (items.length) {
      try {
        await insertFn(items[0])
      } catch (err) {
        if (isNetworkError(err)) break
        console.error('Dropping unsyncable queued record', err)
      }
      items = items.slice(1)
      writeOutbox(items)
      sent++
    }
  } finally {
    flushing = false
  }
  return sent
}
