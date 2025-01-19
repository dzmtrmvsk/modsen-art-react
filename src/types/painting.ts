export interface IPainting {
  id: number
  title: string
  artistName: string | null
  originLocation: string | null
  createdDate: string
  artworkDimensions: string
  displayedInGallery: boolean
  associatedGallery: string | null
  acquisitionInfo: string
  imageSource: string
}

export interface IPaintingList {
  artworks: IPainting[]
}

export interface IAPIArtwork {
  id: number
  title: string
  artist_title: string | null
  artist_display: string | null
  place_of_origin: string | null
  date_display: string
  dimensions: string
  is_on_view: boolean
  gallery_title: string | null
  credit_line: string
  image_id: string
}
