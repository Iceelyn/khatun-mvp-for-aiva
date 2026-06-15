// Tiny localStorage-backed store for the optional "journey" features.
// Everything here is best-effort and never blocks the core flow.
import { useEffect, useState } from 'react'

const KEY = 'khatun.v1'
const listeners = new Set()

export function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function saveStore(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage may be unavailable (private mode) — degrade silently */
  }
  listeners.forEach((l) => l(data))
}

export function updateStore(patch) {
  const next = { ...loadStore(), ...patch, updatedAt: Date.now() }
  saveStore(next)
  return next
}

export function clearStore() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l({}))
}

// React hook — re-renders any component when the store changes.
export function useKhatunStore() {
  const [state, setState] = useState(loadStore)
  useEffect(() => {
    const l = (d) => setState(d)
    listeners.add(l)
    return () => listeners.delete(l)
  }, [])
  return state
}

export function hasJourney() {
  const s = loadStore()
  return Boolean(s.answers && s.reply)
}
