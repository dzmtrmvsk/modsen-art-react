export interface IPaginationDetails {
  currentPage: number
  totalPages: number
  totalRecords: number
  pageSize: number
  offset: number
}

export interface IAPIPagination {
  current_page: number
  total_pages: number
  total: number
  limit: number
  offset: number
}
