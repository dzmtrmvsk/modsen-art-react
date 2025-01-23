import { parsePagination, parsePainting, mapApiPaginationToDetails } from '@/utils/parsers'
import { IMAGE_PLACEHOLDER } from '@/constants/apiParams'
import { IPaginationDetails, IAPIPagination } from 'src/types/pagination'
import { IAPIConfig } from 'src/types/apiResponse'
import { IAPIArtwork } from '@/types/painting'

describe('Parsers', () => {
  describe('parsePagination', () => {
    it('should parse pagination JSON correctly', () => {
      const input: IPaginationDetails = {
        currentPage: 2,
        totalPages: 10,
        totalRecords: 100,
        pageSize: 10,
        offset: 10
      }

      const result = parsePagination(input)

      expect(result).toEqual({
        currentPage: 2,
        totalPages: 10,
        totalRecords: 100,
        pageSize: 10,
        offset: 10
      })
    })
  })

  describe('parsePainting', () => {
    const configJson: IAPIConfig = {
      iiif_url: 'https://example.com/iiif'
    }

    it('should parse painting JSON correctly with image ID', () => {
      const paintingJson: IAPIArtwork = {
        id: 1,
        title: 'Mona Lisa',
        artist_title: 'Leonardo da Vinci',
        artist_display: 'Leonardo',
        place_of_origin: 'Italy',
        date_display: '1503',
        dimensions: '77 cm × 53 cm',
        is_on_view: true,
        gallery_title: 'Louvre',
        credit_line: 'Acquired by France in 1797',
        image_id: 'abcd1234'
      }

      const result = parsePainting(paintingJson, configJson, 'full')

      expect(result).toEqual({
        id: 1,
        title: 'Mona Lisa',
        artistName: 'Leonardo da Vinci',
        originLocation: 'Italy',
        createdDate: '1503',
        artworkDimensions: '77 cm × 53 cm',
        displayedInGallery: true,
        associatedGallery: 'Louvre',
        acquisitionInfo: 'Acquired by France in 1797',
        imageSource: 'https://example.com/iiif/abcd1234/full'
      })
    })

    it('should handle missing artist_title by falling back to artist_display', () => {
      const paintingJson: IAPIArtwork = {
        id: 2,
        title: 'The Starry Night',
        artist_title: null,
        artist_display: 'Vincent van Gogh',
        place_of_origin: 'Netherlands',
        date_display: '1889',
        dimensions: '73.7 cm × 92.1 cm',
        is_on_view: false,
        gallery_title: 'MoMA',
        credit_line: 'Gift of Lillie P. Bliss',
        image_id: 'efgh5678'
      }

      const result = parsePainting(paintingJson, configJson, 'medium')

      expect(result).toEqual({
        id: 2,
        title: 'The Starry Night',
        artistName: 'Vincent van Gogh',
        originLocation: 'Netherlands',
        createdDate: '1889',
        artworkDimensions: '73.7 cm × 92.1 cm',
        displayedInGallery: false,
        associatedGallery: 'MoMA',
        acquisitionInfo: 'Gift of Lillie P. Bliss',
        imageSource: 'https://example.com/iiif/efgh5678/medium'
      })
    })

    it('should use a placeholder image if image_id is missing', () => {
      const paintingJson: IAPIArtwork = {
        id: 3,
        title: 'The Persistence of Memory',
        artist_title: 'Salvador Dalí',
        artist_display: null,
        place_of_origin: 'Spain',
        date_display: '1931',
        dimensions: '24 cm × 33 cm',
        is_on_view: true,
        gallery_title: 'MoMA',
        credit_line: 'Museum Purchase',
        image_id: ''
      }

      const result = parsePainting(paintingJson, configJson, 'thumbnail')

      expect(result).toEqual({
        id: 3,
        title: 'The Persistence of Memory',
        artistName: 'Salvador Dalí',
        originLocation: 'Spain',
        createdDate: '1931',
        artworkDimensions: '24 cm × 33 cm',
        displayedInGallery: true,
        associatedGallery: 'MoMA',
        acquisitionInfo: 'Museum Purchase',
        imageSource: IMAGE_PLACEHOLDER
      })
    })
  })

  describe('mapApiPaginationToDetails', () => {
    it('should map API pagination JSON to internal structure', () => {
      const apiPagination: IAPIPagination = {
        current_page: 1,
        total_pages: 5,
        total: 50,
        limit: 10,
        offset: 0
      }

      const result = mapApiPaginationToDetails(apiPagination)

      expect(result).toEqual({
        currentPage: 1,
        totalPages: 5,
        totalRecords: 50,
        pageSize: 10,
        offset: 0
      })
    })
  })
})
