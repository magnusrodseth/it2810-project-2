import { LocalStorage, SessionStorage } from './storage'

describe('LocalStorage', () => {
  it('should set and get a value', () => {
    LocalStorage.set('theme', 'dark')
    expect(LocalStorage.get('theme')).toBe('dark')
  })

  it('should remove a value', () => {
    LocalStorage.set('theme', 'dark')
    LocalStorage.remove('theme')
    expect(LocalStorage.get('theme')).toBeUndefined()
  })

  it('should clear all values', () => {
    LocalStorage.set('theme', 'dark')
    LocalStorage.clear()
    expect(LocalStorage.get('theme')).toBeUndefined()
  })
})

describe('SessionStorage', () => {
  it('should set and get a value', () => {
    const url = 'url'

    SessionStorage.set('repoUrl', url)
    expect(SessionStorage.get('repoUrl')).toBe(url)
  })

  it('should remove a value', () => {
    const url = 'url'

    SessionStorage.set('repoUrl', url)
    SessionStorage.remove('repoUrl')
    expect(SessionStorage.get('repoUrl')).toBeUndefined()
  })

  it('should clear all values', () => {
    SessionStorage.set('repoUrl', 'url')
    SessionStorage.clear()
    expect(SessionStorage.get('repoUrl')).toBeUndefined()
  })
})

export { }
