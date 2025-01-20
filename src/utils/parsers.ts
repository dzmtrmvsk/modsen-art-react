import { IPaginationDetails, IAPIPagination } from 'src/types/pagination'
import { IAPIArtwork, IPainting } from 'src/types/painting'
import { IAPIConfig } from 'src/types/apiResponse'
import { ART_API_IMAGE_PATH, IMAGE_PLACEHOLDER } from '@/constants/apiParams'

const parsePagination = (paginationJson: IPaginationDetails): IPaginationDetails => {
  return {
    currentPage: paginationJson.currentPage,
    totalPages: paginationJson.totalPages,
    totalRecords: paginationJson.totalRecords,
    pageSize: paginationJson.pageSize,
    offset: paginationJson.offset
  }
}

const parsePainting = (paintingJson: IAPIArtwork, configJson: IAPIConfig): IPainting => {
  return {
    id: paintingJson.id,
    title: paintingJson.title,
    artistName: paintingJson.artist_title ?? paintingJson.artist_display,
    originLocation: paintingJson.place_of_origin,
    createdDate: paintingJson.date_display,
    artworkDimensions: paintingJson.dimensions,
    displayedInGallery: paintingJson.is_on_view,
    associatedGallery: paintingJson.gallery_title,
    acquisitionInfo: paintingJson.credit_line,
    imageSource: paintingJson.image_id
      ? `${configJson.iiif_url}/${paintingJson.image_id}/${ART_API_IMAGE_PATH}`
      : IMAGE_PLACEHOLDER
  }
}

const mapApiPaginationToDetails = (apiPagination: IAPIPagination): IPaginationDetails => {
  return {
    currentPage: apiPagination.current_page,
    totalPages: apiPagination.total_pages,
    totalRecords: apiPagination.total,
    pageSize: apiPagination.limit,
    offset: apiPagination.offset
  }
}

export { parsePagination, parsePainting, mapApiPaginationToDetails }
