export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export type SearchResults = {
  /**
   * an array of dog IDs matching your query
   */
  resultIds: string[];
  /**
   * the total number of results for the query (not just the current page)
   */
  total: number;
  /**
   * a query to request the next page of results (if one exists)
   */
  next: string;
  /**
   * a query to request the previous page of results (if one exists)
   */
  prev: string;
};
