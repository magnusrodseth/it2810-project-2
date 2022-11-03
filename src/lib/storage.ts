import { LocalStorageKey, SessionStorageKey } from '../types/storage'

type StorableKey = SessionStorageKey | LocalStorageKey

interface Storable {
  set(key: StorableKey, value: string): void
  get(key: StorableKey): string | undefined
  remove(key: StorableKey): void
  clear(): void
}

class LocalStorageHandler implements Storable {
  set(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value)
  }
  get(key: LocalStorageKey): string | undefined {
    return localStorage.getItem(key) || undefined
  }
  remove(key: LocalStorageKey): void {
    localStorage.removeItem(key)
  }
  clear(): void {
    localStorage.clear()
  }
}

class SessionStorageHandler implements Storable {
  set(key: SessionStorageKey, value: string): void {
    sessionStorage.setItem(key, value)
  }
  get(key: SessionStorageKey): string | undefined {
    return sessionStorage.getItem(key) || undefined
  }
  remove(key: SessionStorageKey): void {
    return sessionStorage.removeItem(key)
  }
  clear(): void {
    return sessionStorage.clear()
  }
}

export const LocalStorage = new LocalStorageHandler()
export const SessionStorage = new SessionStorageHandler()
