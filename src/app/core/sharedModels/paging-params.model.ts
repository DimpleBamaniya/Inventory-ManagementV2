export class BasicPagingParams {
    pageNo: number;          // Default to the first page
    pageSize: number;       // Default page size
    searchString: string;   // Default empty search string
    sortColumn: string;     // Default column to sort by
    sortOrder: string;
    constructor() {
        this.pageNo = 1;          // Default to the first page
        this.pageSize = 10;       // Default page size
        this.searchString = '';   // Default empty search string
        this.sortColumn = 'ID';    // Default column to sort by
        this.sortOrder = 'Asc'; // Default sort order
    }
}
