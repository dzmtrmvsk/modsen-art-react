import { QUERY_ART_FIELDS, QUERY_ART_TYPE_ID } from '@/constants/paintingQuery'
import { parsePainting, mapApiPaginationToDetails } from '@/utils/parsers'
import { IArtworkListResponse, ISearchResults } from 'src/types/apiResponse'
import { IPaintingList, IPaintingListPagination } from 'src/types/painting'
import { ART_API_ENDPOINT } from '@/constants/apiParams'

const fetchPaintingsByIds = async (paintingIds: number[]): Promise<IPaintingList> => {
  if (!paintingIds.length) {
    return { artworks: [] }
  }

  const url = new URL(`${ART_API_ENDPOINT}/artworks`)
  url.searchParams.append('fields', QUERY_ART_FIELDS.join(','))
  url.searchParams.append('ids', paintingIds.join(','))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error((await response.text()) || 'Error fetching paintings.')
  }

  const data: IArtworkListResponse = await response.json()
  const result: IPaintingList = {
    artworks: data.data.map((paintingJson) => parsePainting(paintingJson, data.config))
  }
  return result
}

const searchPaintings = async (
  query: string = '',
  limit: number = 10,
  page: number = 1
): Promise<IPaintingListPagination> => {
  const url = new URL(`${ART_API_ENDPOINT}/artworks/search`)
  url.searchParams.append('query[term][artwork_type_id]', QUERY_ART_TYPE_ID.toString())
  url.searchParams.append('fields', QUERY_ART_FIELDS.join(','))
  url.searchParams.append('limit', limit.toString())
  url.searchParams.append('page', page.toString())
  if (query) {
    url.searchParams.append('q', query)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error((await response.text()) || 'Error searching artworks.')
  }

  const data: ISearchResults = await response.json()
  const result: IPaintingListPagination = {
    artworks: data.data.map((paintingJson) => parsePainting(paintingJson, data.config)),
    pagination: mapApiPaginationToDetails(data.pagination)
  }
  return result
}

const paginateFetchPaintings = async (
  limit: number = 10,
  page: number = 1
): Promise<IPaintingListPagination> => {
  const url = new URL(`${ART_API_ENDPOINT}/artworks`)
  url.searchParams.append('fields', QUERY_ART_FIELDS.join(','))
  url.searchParams.append('limit', limit.toString())
  url.searchParams.append('page', page.toString())

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error((await response.text()) || 'Error searching artworks.')
  }

  const data: ISearchResults = await response.json()
  const result: IPaintingListPagination = {
    artworks: data.data.map((paintingJson) => parsePainting(paintingJson, data.config)),
    pagination: mapApiPaginationToDetails(data.pagination)
  }
  return result
}

export { fetchPaintingsByIds, searchPaintings, paginateFetchPaintings }
