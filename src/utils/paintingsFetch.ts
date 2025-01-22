import { ART_API_ENDPOINT, ART_API_IMAGE_PATHS } from '@/constants/apiParams'
import { QUERY_ART_FIELDS, QUERY_ART_TYPE_ID } from '@/constants/paintingQuery'
import { parsePainting, mapApiPaginationToDetails } from '@/utils/parsers'
import { IArtworkListResponse, ISearchResults } from 'src/types/apiResponse'
import { IPaintingListPagination } from 'src/types/painting'
import { fetchFromApi } from '@/utils/apiBasic'

const fetchPaintingsByIds = async (
  paintingIds: number[],
  imageFormat: string = ART_API_IMAGE_PATHS.MAJOR
): Promise<IPaintingListPagination> => {
  if (!paintingIds.length) {
    return {
      artworks: [],
      pagination: { currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: 0, offset: 0 }
    }
  }

  const data: IArtworkListResponse = await fetchFromApi(`${ART_API_ENDPOINT}/artworks`, {
    fields: QUERY_ART_FIELDS.join(','),
    ids: paintingIds.join(',')
  })

  return {
    artworks: data.data.map((paintingJson) =>
      parsePainting(paintingJson, data.config, imageFormat)
    ),
    pagination: { currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: 0, offset: 0 }
  }
}

const searchPaintings = async (
  query: string = '',
  limit: number = 10,
  page: number = 1,
  imageFormat: string = ART_API_IMAGE_PATHS.MAJOR
): Promise<IPaintingListPagination> => {
  const data: ISearchResults = await fetchFromApi(`${ART_API_ENDPOINT}/artworks/search`, {
    'query[term][artwork_type_id]': QUERY_ART_TYPE_ID.toString(),
    fields: QUERY_ART_FIELDS.join(','),
    limit,
    page,
    q: query || undefined
  })

  return {
    artworks: data.data.map((paintingJson) =>
      parsePainting(paintingJson, data.config, imageFormat)
    ),
    pagination: mapApiPaginationToDetails(data.pagination)
  }
}

const paginateFetchPaintings = async (
  limit: number = 10,
  page: number = 1,
  imageFormat: string = ART_API_IMAGE_PATHS.MAJOR
): Promise<IPaintingListPagination> => {
  const data: ISearchResults = await fetchFromApi(`${ART_API_ENDPOINT}/artworks`, {
    fields: QUERY_ART_FIELDS.join(','),
    limit,
    page
  })

  return {
    artworks: data.data.map((paintingJson) =>
      parsePainting(paintingJson, data.config, imageFormat)
    ),
    pagination: mapApiPaginationToDetails(data.pagination)
  }
}

export { fetchPaintingsByIds, searchPaintings, paginateFetchPaintings }
