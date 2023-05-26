export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  total: number;
  items: T[];
}
