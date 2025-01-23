import { getSavedArtIds, addSavedArt, removeSavedArt, clearSavedArts } from '@/utils/sessionStorage'

const SAVED_ARTS_KEY = 'modsen-museum__saved-arts'
const mockDispatchEvent = jest.spyOn(window, 'dispatchEvent')

const mockSessionStorage: Record<string, string> = {}
const sessionStorageMock = {
  getItem: jest.fn((key: string) => mockSessionStorage[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    mockSessionStorage[key] = value
  }),
  removeItem: jest.fn((key: string) => {
    delete mockSessionStorage[key]
  })
}

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

describe('sessionStorage utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDispatchEvent.mockClear()
    Object.keys(mockSessionStorage).forEach((key) => delete mockSessionStorage[key])
  })

  describe('getSavedArtIds', () => {
    it('should return an empty array if sessionStorage key does not exist', () => {
      expect(getSavedArtIds()).toEqual([])
      expect(sessionStorage.getItem).toHaveBeenCalledWith(SAVED_ARTS_KEY)
    })

    it('should return an array of numbers when valid data exists in sessionStorage', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,2,3')
      expect(getSavedArtIds()).toEqual([1, 2, 3])
    })

    it('should filter out invalid or non-numeric IDs from sessionStorage data', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,abc,3,,0')
      expect(getSavedArtIds()).toEqual([1, 3])
    })
  })

  describe('addSavedArt', () => {
    it('should add an ID to sessionStorage if it does not exist', () => {
      addSavedArt(5)
      expect(sessionStorage.setItem).toHaveBeenCalledWith(SAVED_ARTS_KEY, '5')
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1)
    })

    it('should not add an ID if it already exists in sessionStorage', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,2,3')
      addSavedArt(2)
      expect(sessionStorage.setItem).not.toHaveBeenCalledWith(SAVED_ARTS_KEY, '1,2,3,2')
    })

    it('should append a new ID to existing IDs', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,2')
      addSavedArt(3)
      expect(sessionStorage.setItem).toHaveBeenCalledWith(SAVED_ARTS_KEY, '1,2,3')
    })
  })

  describe('removeSavedArt', () => {
    it('should remove an ID from sessionStorage if it exists', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,2,3')
      removeSavedArt(2)
      expect(sessionStorage.setItem).toHaveBeenCalledWith(SAVED_ARTS_KEY, '1,3')
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1)
    })

    it('should handle removing the last remaining ID', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '2')
      removeSavedArt(2)
      expect(sessionStorage.setItem).toHaveBeenCalledWith(SAVED_ARTS_KEY, '')
    })
  })

  describe('clearSavedArts', () => {
    it('should clear the sessionStorage key', () => {
      sessionStorage.setItem(SAVED_ARTS_KEY, '1,2,3')
      clearSavedArts()
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(SAVED_ARTS_KEY)
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1)
    })

    it('should handle clearing when sessionStorage key does not exist', () => {
      clearSavedArts()
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(SAVED_ARTS_KEY)
      expect(mockDispatchEvent).toHaveBeenCalledTimes(1)
    })
  })
})
