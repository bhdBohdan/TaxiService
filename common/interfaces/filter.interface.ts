export interface Filters {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  make?: string;
  isdeleted?: boolean;
}

export interface PageProps {
  searchParams: Promise<SearchParams>;
}

export interface SearchProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    isdeleted?: string;
    make?: string;
  };
}

export interface SearchParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  make?: string;
}
