import {
  fetchPaintingsByIds,
  searchPaintings,
  paginateFetchPaintings
} from '@/utils/paintingsFetch'
import { fetchFromApi } from '@/utils/apiBasic'

jest.mock('@/utils/apiBasic')

const mockFetchFromApi = fetchFromApi as jest.Mock

describe('Painting Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchPaintingsByIds', () => {
    it('should return empty artworks and pagination if no painting IDs are provided', async () => {
      const result = await fetchPaintingsByIds([])
      expect(result).toEqual({
        artworks: [],
        pagination: { currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: 0, offset: 0 }
      })
    })

    it('should fetch artworks by IDs and return the correct structure', async () => {
      mockFetchFromApi.mockResolvedValueOnce({
        data: [{ id: 1 }, { id: 2 }],
        config: {}
      })

      const result = await fetchPaintingsByIds([1, 2])

      expect(mockFetchFromApi).toHaveBeenCalledWith(
        expect.stringContaining('/artworks'),
        expect.objectContaining({ ids: '1,2' })
      )
      expect(result.artworks).toHaveLength(2)
    })
  })

  describe('searchPaintings', () => {
    it('should fetch search results and map them correctly', async () => {
      mockFetchFromApi.mockResolvedValueOnce({
        data: [{ id: 1 }, { id: 2 }],
        config: {},
        pagination: {}
      })

      const result = await searchPaintings('test', 5, 1)

      expect(mockFetchFromApi).toHaveBeenCalledWith(
        expect.stringContaining('/artworks/search'),
        expect.objectContaining({ q: 'test', limit: 5, page: 1 })
      )
      expect(result.artworks).toHaveLength(2)
    })
  })

  describe('paginateFetchPaintings', () => {
    it('should fetch paginated paintings and map them correctly', async () => {
      mockFetchFromApi.mockResolvedValueOnce({
        data: [{ id: 1 }, { id: 2 }],
        config: {},
        pagination: {}
      })

      const result = await paginateFetchPaintings(5, 2)

      expect(mockFetchFromApi).toHaveBeenCalledWith(
        expect.stringContaining('/artworks'),
        expect.objectContaining({ limit: 5, page: 2 })
      )
      expect(result.artworks).toHaveLength(2)
    })
  })
})
