import { createPageRange, getRandomPage } from '@/utils/pagination'

describe('createPageRange', () => {
  it('should return a valid range of pages', () => {
    const result = createPageRange(1, 10, 5, 5)
    expect(result).toEqual([3, 4, 5, 6, 7])
  })

  it('should throw an error for invalid configuration', () => {
    expect(() => createPageRange(10, 1, 5, 5)).toThrow('Invalid pagination configuration.')
    expect(() => createPageRange(1, 10, 0, 5)).toThrow('Invalid pagination configuration.')
    expect(() => createPageRange(1, 10, 11, 5)).toThrow('Invalid pagination configuration.')
    expect(() => createPageRange(1, 10, 5, 0)).toThrow('Invalid pagination configuration.')
  })

  it('should handle cases where the range exceeds the boundaries', () => {
    expect(createPageRange(1, 5, 3, 10)).toEqual([1, 2, 3, 4, 5])
    expect(createPageRange(1, 5, 1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('should adjust the range when activePage is near the start or end', () => {
    expect(createPageRange(1, 10, 1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(createPageRange(1, 10, 10, 5)).toEqual([6, 7, 8, 9, 10])
  })
})

describe('getRandomPage', () => {
  it('should return a page number between 10 and 10000', () => {
    const page = getRandomPage()
    expect(page).toBeGreaterThanOrEqual(10)
    expect(page).toBeLessThanOrEqual(10000)
  })

  it('should return an integer value', () => {
    const page = getRandomPage()
    expect(Number.isInteger(page)).toBe(true)
  })
})
