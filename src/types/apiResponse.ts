import { IAPIArtwork } from './painting'
import { IAPIPagination } from './pagination'

export interface IAPIConfig {
  iiif_url: string
}

export interface IArtworkResponse {
  data: IAPIArtwork
  config: IAPIConfig
}

export interface IArtworkListResponse {
  data: IAPIArtwork[]
  config: IAPIConfig
}

export interface ISearchResults {
  pagination: IAPIPagination
  data: IAPIArtwork[]
  config: IAPIConfig
}
