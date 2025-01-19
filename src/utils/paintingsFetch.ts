import { QUERY_ART_FIELDS, QUERY_ART_TYPE_ID } from '@/constants/paintingQuery'
import { parsePainting, mapApiPaginationToDetails } from '@/utils/parsers'
import { IArtworkResponse, IArtworkListResponse, ISearchResults } from 'src/types/apiResponse'
import { IPainting, IPaintingList } from 'src/types/painting'
import { IPaginationDetails } from 'src/types/pagination'

const fetchPainting = async (paintingId: number): Promise<IPainting> => {
  const url = new URL(`${process.env.ART_API_ENDPOINT}/artworks/${paintingId}`)
  url.searchParams.append('fields', QUERY_ART_FIELDS.join(','))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error((await response.text()) || 'Error fetching painting.')
  }

  const data: IArtworkResponse = await response.json()
  return parsePainting(data.paintingData, data.configuration)
}

const fetchPaintingsByIds = async (paintingIds: number[]): Promise<IPaintingList> => {
  if (!paintingIds.length) {
    return { artworks: [] }
  }

  const url = new URL(`${process.env.ART_API_ENDPOINT}/artworks`)
  url.searchParams.append('fields', QUERY_ART_FIELDS.join(','))
  url.searchParams.append('ids', paintingIds.join(','))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error((await response.text()) || 'Error fetching paintings.')
  }

  const data: IArtworkListResponse = await response.json()
  return {
    artworks: data.paintingsData.map((paintingJson) =>
      parsePainting(paintingJson, data.configuration)
    )
  }
}

const searchPaintings = async (
  query: string = '',
  limit: number = 10,
  page: number = 1
): Promise<{ paintings: IPaintingList; pagination: IPaginationDetails }> => {
  const url = new URL(`${process.env.ART_API_ENDPOINT}/artworks/search`)
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
  return {
    paintings: {
      artworks: data.artworksData.map((paintingJson) =>
        parsePainting(paintingJson, data.configuration)
      )
    },
    pagination: mapApiPaginationToDetails(data.paginationInfo)
  }
}

export { fetchPainting, fetchPaintingsByIds, searchPaintings }
