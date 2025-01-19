import { IAPIArtwork } from './painting'
import { IAPIPagination } from './pagination'

export interface IAPIConfig {
  iiifBaseUrl: string
}

export interface IArtworkResponse {
  paintingData: IAPIArtwork
  configuration: IAPIConfig
}

export interface IArtworkListResponse {
  paintingsData: IAPIArtwork[]
  configuration: IAPIConfig
}

export interface ISearchResults {
  paginationInfo: IAPIPagination
  artworksData: IAPIArtwork[]
  configuration: IAPIConfig
}
