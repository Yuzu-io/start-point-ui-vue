// 分页参数
export interface PageParams {
  /* */
  pageNum?: number
  /* */
  pageSize?: number

  /* */
  orderBy?: string
}

// 响应接口
export interface PageInfo<T> {
  /* */
  total: number

  /* */
  list: T[]

  /* */
  pageNum: number

  /* */
  pageSize: number

  /* */
  size: number

  /* */
  startRow: number

  /* */
  endRow: number

  /* */
  pages: number

  /* */
  prePage: number

  /* */
  nextPage: number

  /* */
  isFirstPage: boolean

  /* */
  isLastPage: boolean

  /* */
  hasPreviousPage: boolean

  /* */
  hasNextPage: boolean

  /* */
  navigatePages: number

  /* */
  navigatepageNums: string[]

  /* */
  navigateFirstPage: number

  /* */
  navigateLastPage: number
}
