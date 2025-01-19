const SAVED_ARTS_KEY = `modsen-museum__saved-arts`
const LIST_SEPARATOR = ','

const parseIdList = (listStr) => listStr.split(LIST_SEPARATOR).map(Number).filter(Boolean)

const formatIdList = (list) => list.join(LIST_SEPARATOR)

const getSessionStorageValue = (key) => window.sessionStorage.getItem(key) || ''

const setSessionStorageValue = (key, value) => {
  const oldValue = window.sessionStorage.getItem(key)
  const event = new StorageEvent('storage', {
    key,
    oldValue,
    newValue: value
  })

  window.sessionStorage.setItem(key, value)
  window.dispatchEvent(event)
}

const clearSessionStorageValue = (key) => {
  const oldValue = window.sessionStorage.getItem(key)
  const event = new StorageEvent('storage', {
    key,
    oldValue,
    newValue: null
  })

  window.sessionStorage.removeItem(key)
  window.dispatchEvent(event)
}

export const getSavedArtIds = () => parseIdList(getSessionStorageValue(SAVED_ARTS_KEY))

export const addSavedArt = (artId) => {
  const savedIds = getSavedArtIds()

  if (savedIds.includes(artId)) {
    return
  }

  savedIds.push(artId)
  setSessionStorageValue(SAVED_ARTS_KEY, formatIdList(savedIds))
}

export const removeSavedArt = (artId) => {
  const savedIds = getSavedArtIds()

  if (!savedIds.includes(artId)) {
    return
  }

  const updatedIds = savedIds.filter((id) => id !== artId)
  setSessionStorageValue(SAVED_ARTS_KEY, formatIdList(updatedIds))
}

export const clearSavedArts = () => {
  clearSessionStorageValue(SAVED_ARTS_KEY)
}
