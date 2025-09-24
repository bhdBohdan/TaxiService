export interface Filters {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
  isdeleted?: boolean;
}

export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface SearchProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    isdeleted?: string;
  };
}
