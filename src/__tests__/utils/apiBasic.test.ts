import { fetchFromApi } from '@/utils/apiBasic'

global.fetch = jest.fn()

describe('fetchFromApi', () => {
  const mockFetch = fetch as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetch with the correct URL and parameters', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: 'test' })
    })

    const result = await fetchFromApi('https://api.example.com/test', { key: 'value' })

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test?key=value')
    expect(result).toEqual({ data: 'test' })
  })

  it('should throw an error if the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValueOnce('Not Found')
    })

    await expect(fetchFromApi('https://api.example.com/test')).rejects.toThrow('Not Found')
  })

  it('should handle undefined parameters gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ data: 'test' })
    })

    const result = await fetchFromApi('https://api.example.com/test', { key: undefined })

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test')
    expect(result).toEqual({ data: 'test' })
  })
})
