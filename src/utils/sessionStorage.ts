const SAVED_ARTS_KEY = `modsen-museum__saved-arts`
const LIST_SEPARATOR = ','

const parseIdList = (listStr: string): number[] =>
  listStr.split(LIST_SEPARATOR).map(Number).filter(Boolean)

const formatIdList = (list: number[]): string => list.join(LIST_SEPARATOR)

const getSessionStorageValue = (key: string): string => window.sessionStorage.getItem(key) || ''

const setSessionStorageValue = (key: string, value: string): void => {
  const oldValue = window.sessionStorage.getItem(key)
  const event = new StorageEvent('storage', {
    key,
    oldValue,
    newValue: value
  })

  window.sessionStorage.setItem(key, value)
  window.dispatchEvent(event)
}

const clearSessionStorageValue = (key: string): void => {
  const oldValue = window.sessionStorage.getItem(key)
  const event = new StorageEvent('storage', {
    key,
    oldValue,
    newValue: null
  })

  window.sessionStorage.removeItem(key)
  window.dispatchEvent(event)
}

export const getSavedArtIds = (): number[] => parseIdList(getSessionStorageValue(SAVED_ARTS_KEY))

export const addSavedArt = (artId: number): void => {
  const savedIds = getSavedArtIds()

  if (savedIds.includes(artId)) {
    return
  }

  savedIds.push(artId)
  setSessionStorageValue(SAVED_ARTS_KEY, formatIdList(savedIds))
}

export const removeSavedArt = (artId: number): void => {
  const savedIds = getSavedArtIds()

  if (!savedIds.includes(artId)) {
    return
  }

  const updatedIds = savedIds.filter((id) => id !== artId)

  if (savedIds.length !== updatedIds.length) {
    setSessionStorageValue(SAVED_ARTS_KEY, formatIdList(updatedIds))
  }
}

export const clearSavedArts = (): void => {
  clearSessionStorageValue(SAVED_ARTS_KEY)
}
