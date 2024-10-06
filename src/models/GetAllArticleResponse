export interface DataItem {
    id: number;
    title: string;
    slug: string;
}

export interface Metadata {
    page: number;
    limit: number;
    total_docs: number;
    total_pages: number;
    has_next_page: boolean;
}

export interface DataResponse {
    code: number;
    data: {
        data: DataItem[];
        metadata: Metadata;
    };
}
