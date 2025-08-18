import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  Eye,
  EyeOff,
  MoreHorizontal,
  Loader2,
  Package,
  AlertCircle,
  Check,
  Minus,
} from "lucide-react";
import {
  TableProps,
  TableColumn,
  TableSort,
  SortDirection,
} from "./Table.types";
import {
  tableVariants,
  tableSizes,
  tableDensity,
  baseTableStyles,
  tableContainerStyles,
  headerCellStyles,
  sortableHeaderStyles,
  sortIconStyles,
  cellStyles,
  selectableCellStyles,
  expandableCellStyles,
  checkboxCellStyles,
  expandButtonStyles,
  resizeHandleStyles,
  pinnedColumnStyles,
  loadingOverlayStyles,
  skeletonStyles,
  emptyStateStyles,
  errorStateStyles,
  paginationStyles,
  searchContainerStyles,
  searchInputStyles,
  filterContainerStyles,
  columnVisibilityStyles,
  expandedRowStyles,
  highlightStyles,
  tableAnimations,
  fadeInAnimation,
  slideInAnimation,
  scaleInAnimation,
  shimmerAnimation,
  bounceAnimation,
} from "./Table.styles";
import { cn } from "../utils/cn";

// Helper function to get nested value from object
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

// Helper function to highlight search matches
const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = String(text).split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={highlightStyles}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

// Default pagination configuration
const defaultPagination = {
  page: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [5, 10, 25, 50, 100],
  showPageSizeSelector: true,
  showPageInfo: true,
};

export const Table = <T extends Record<string, any>>({
  data = [],
  columns = [],
  variant = "default",
  size = "md",
  density = "comfortable",
  withBorder = false,
  withColumnBorders = false,
  striped = false,
  hoverable = true,
  rowHeight,
  height,
  virtualScrolling = false,
  pagination,
  sort,
  onSortChange,
  selection,
  loading = false,
  loadingRows = 5,
  emptyState,
  errorState,
  error = false,
  rowProps,
  onRowClick,
  onRowDoubleClick,
  caption,
  withFooter = false,
  footer,
  resizable = false,
  reorderable = false,
  onColumnsReorder,
  withColumnVisibility = false,
  styles,
  expandable = false,
  expandedRecords = [],
  onExpandedRecordsChange,
  renderExpandedRow,
  filterable = false,
  filters = {},
  onFiltersChange,
  searchable = false,
  searchQuery = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  highlightSearch = true,
  noDataMessage = "No data available",
  responsive = true,
  responsiveBreakpoint = "768px",
  keyboardNavigation = true,
  loadingOverlay,
  animationDuration = 200,
  className,
  ...props
}: TableProps<T>) => {
  const [internalSort, setInternalSort] = useState<TableSort<T> | null>(
    sort || null
  );
  const [internalSelection, setInternalSelection] = useState<
    (string | number)[]
  >(selection?.selectedRecords || []);
  const [internalExpanded, setInternalExpanded] =
    useState<(string | number)[]>(expandedRecords);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use controlled or internal state
  const currentSort = sort !== undefined ? sort : internalSort;
  const currentSelection =
    selection?.selectedRecords !== undefined
      ? selection.selectedRecords
      : internalSelection;
  const currentExpanded =
    expandedRecords !== undefined ? expandedRecords : internalExpanded;

  // Filter visible columns
  const visibleColumns = useMemo(() => {
    return columns.filter(
      (col) => !hiddenColumns.has(String(col.accessor)) && !col.hidden
    );
  }, [columns, hiddenColumns]);

  // Apply search filter
  const searchFilteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data;

    return data.filter((record) => {
      return visibleColumns.some((column) => {
        const value = getNestedValue(record, String(column.accessor));
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, searchable, visibleColumns]);

  // Apply column filters
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0)
      return searchFilteredData;

    return searchFilteredData.filter((record) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const value = getNestedValue(record, key);
        return String(value)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      });
    });
  }, [searchFilteredData, filters, filterable]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!currentSort) return filteredData;

    const { columnAccessor, direction } = currentSort;
    const column = columns.find((col) => col.accessor === columnAccessor);

    return [...filteredData].sort((a, b) => {
      if (column?.sortFunction) {
        return direction === "asc"
          ? column.sortFunction(a, b)
          : column.sortFunction(b, a);
      }

      const aValue = getNestedValue(a, String(columnAccessor));
      const bValue = getNestedValue(b, String(columnAccessor));

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, currentSort, columns]);

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, pagination]);

  // Final data to render
  const displayData = pagination ? paginatedData : sortedData;

  // Handle sort
  const handleSort = useCallback(
    (columnAccessor: keyof T | string) => {
      const column = columns.find((col) => col.accessor === columnAccessor);
      if (!column?.sortable) return;

      let newSort: TableSort<T> | null = null;

      if (!currentSort || currentSort.columnAccessor !== columnAccessor) {
        newSort = { columnAccessor, direction: "asc" };
      } else if (currentSort.direction === "asc") {
        newSort = { columnAccessor, direction: "desc" };
      } else {
        newSort = null; // Remove sort
      }

      if (sort === undefined) {
        setInternalSort(newSort);
      }
      onSortChange?.(newSort);
    },
    [currentSort, columns, sort, onSortChange]
  );

  // Handle selection
  const handleSelection = useCallback(
    (recordId: string | number, checked: boolean) => {
      if (!selection) return;

      let newSelection: (string | number)[];

      if (selection.mode === "single") {
        newSelection = checked ? [recordId] : [];
      } else {
        if (checked) {
          newSelection = [...currentSelection, recordId];
        } else {
          newSelection = currentSelection.filter((id) => id !== recordId);
        }
      }

      if (selection.selectedRecords === undefined) {
        setInternalSelection(newSelection);
      }
      selection.onSelectionChange?.(newSelection);
    },
    [selection, currentSelection]
  );

  // Handle select all
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (!selection) return;

      const allIds = displayData.map((record, index) =>
        selection.getRecordId ? selection.getRecordId(record, index) : index
      );

      const newSelection = checked ? allIds : [];

      if (selection.selectedRecords === undefined) {
        setInternalSelection(newSelection);
      }
      selection.onSelectionChange?.(newSelection);
    },
    [selection, displayData]
  );

  // Handle row expansion
  const handleExpansion = useCallback(
    (recordId: string | number) => {
      const newExpanded = currentExpanded.includes(recordId)
        ? currentExpanded.filter((id) => id !== recordId)
        : [...currentExpanded, recordId];

      if (expandedRecords === undefined) {
        setInternalExpanded(newExpanded);
      }
      onExpandedRecordsChange?.(newExpanded);
    },
    [currentExpanded, expandedRecords, onExpandedRecordsChange]
  );

  // Get record ID
  const getRecordId = useCallback(
    (record: T, index: number): string | number => {
      return selection?.getRecordId
        ? selection.getRecordId(record, index)
        : index;
    },
    [selection]
  );

  // Check if record is selected
  const isRecordSelected = useCallback(
    (record: T, index: number): boolean => {
      const recordId = getRecordId(record, index);
      return currentSelection.includes(recordId);
    },
    [currentSelection, getRecordId]
  );

  // Check if record is expanded
  const isRecordExpanded = useCallback(
    (record: T, index: number): boolean => {
      const recordId = getRecordId(record, index);
      return currentExpanded.includes(recordId);
    },
    [currentExpanded, getRecordId]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!keyboardNavigation || !focusedCell) return;

      const { row, col } = focusedCell;
      let newRow = row;
      let newCol = col;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          newRow = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          event.preventDefault();
          newRow = Math.min(displayData.length - 1, row + 1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          newCol = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          event.preventDefault();
          newCol = Math.min(visibleColumns.length - 1, col + 1);
          break;
        case "Home":
          event.preventDefault();
          newCol = 0;
          break;
        case "End":
          event.preventDefault();
          newCol = visibleColumns.length - 1;
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (onRowClick) {
            onRowClick(displayData[row], row);
          }
          break;
      }

      if (newRow !== row || newCol !== col) {
        setFocusedCell({ row: newRow, col: newCol });
      }
    },
    [keyboardNavigation, focusedCell, displayData, visibleColumns, onRowClick]
  );

  const styles_variant = tableVariants[variant];
  const sizeStyles = tableSizes[size];
  const densityStyles = tableDensity[density];

  // Render loading skeleton
  const renderSkeleton = () => (
    <tbody>
      {Array.from({ length: loadingRows }).map((_, rowIndex) => (
        <tr key={`skeleton-${rowIndex}`} className={styles_variant.row}>
          {selection && (
            <td className={cn(checkboxCellStyles, sizeStyles.cell)}>
              <div className={cn(skeletonStyles, "w-4 h-4 rounded")} />
            </td>
          )}
          {expandable && (
            <td className={cn(sizeStyles.cell)}>
              <div className={cn(skeletonStyles, "w-4 h-4 rounded")} />
            </td>
          )}
          {visibleColumns.map((column, colIndex) => (
            <td
              key={`skeleton-${rowIndex}-${colIndex}`}
              className={cn(sizeStyles.cell, densityStyles.cell)}
            >
              <div className={cn(skeletonStyles, "h-4 w-full rounded")} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  // Render table header
  const renderHeader = () => (
    <thead className={cn(styles_variant.header, styles?.header)}>
      <tr>
        {/* Selection column */}
        {selection && (
          <th
            className={cn(
              headerCellStyles,
              checkboxCellStyles,
              sizeStyles.header,
              densityStyles.header
            )}
          >
            {selection.mode === "multiple" &&
              selection.showSelectAll !== false && (
                <input
                  type="checkbox"
                  checked={
                    currentSelection.length === displayData.length &&
                    displayData.length > 0
                  }
                  ref={(input) => {
                    if (input) {
                      input.indeterminate =
                        currentSelection.length > 0 &&
                        currentSelection.length < displayData.length;
                    }
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className={cn(sizeStyles.checkbox, "rounded border-gray-300")}
                  aria-label="Select all rows"
                />
              )}
          </th>
        )}

        {/* Expansion column */}
        {expandable && (
          <th
            className={cn(
              headerCellStyles,
              sizeStyles.header,
              densityStyles.header,
              "w-12"
            )}
          />
        )}

        {/* Data columns */}
        {visibleColumns.map((column, index) => {
          const isSorted = currentSort?.columnAccessor === column.accessor;
          const sortDirection = isSorted ? currentSort?.direction : null;

          return (
            <th
              key={String(column.accessor)}
              className={cn(
                headerCellStyles,
                sizeStyles.header,
                densityStyles.header,
                {
                  [sortableHeaderStyles]: column.sortable,
                  "text-center": column.textAlign === "center",
                  "text-right": column.textAlign === "right",
                  [pinnedColumnStyles]: column.pinned,
                },
                column.className,
                styles?.header
              )}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                left: column.pinned === "left" ? 0 : undefined,
                right: column.pinned === "right" ? 0 : undefined,
              }}
              onClick={
                column.sortable ? () => handleSort(column.accessor) : undefined
              }
              {...column.headerProps}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">
                  {column.renderHeader
                    ? column.renderHeader(column)
                    : column.title}
                </span>

                {column.sortable && (
                  <span className={sortIconStyles}>
                    {sortDirection === "asc" ? (
                      <ChevronUp className={sizeStyles.icon} />
                    ) : sortDirection === "desc" ? (
                      <ChevronDown className={sizeStyles.icon} />
                    ) : (
                      <div
                        className={cn(
                          sizeStyles.icon,
                          "opacity-0 group-hover:opacity-50"
                        )}
                      />
                    )}
                  </span>
                )}
              </div>

              {/* Resize handle */}
              {resizable && column.resizable !== false && (
                <div className={resizeHandleStyles} />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );

  // Render table body
  const renderBody = () => {
    if (loading) {
      return renderSkeleton();
    }

    if (error && errorState) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={
                visibleColumns.length +
                (selection ? 1 : 0) +
                (expandable ? 1 : 0)
              }
            >
              <div className={errorStateStyles}>{errorState}</div>
            </td>
          </tr>
        </tbody>
      );
    }

    if (displayData.length === 0) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={
                visibleColumns.length +
                (selection ? 1 : 0) +
                (expandable ? 1 : 0)
              }
            >
              <div className={emptyStateStyles}>
                {emptyState || (
                  <div className="flex flex-col items-center gap-4">
                    <Package className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500">{noDataMessage}</p>
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className={styles?.body}>
        {displayData.map((record, rowIndex) => {
          const recordId = getRecordId(record, rowIndex);
          const isSelected = isRecordSelected(record, rowIndex);
          const isExpanded = isRecordExpanded(record, rowIndex);
          const customRowProps = rowProps ? rowProps(record, rowIndex) : {};

          return (
            <React.Fragment key={recordId}>
              <tr
                className={cn(
                  styles_variant.row,
                  densityStyles.row,
                  {
                    "bg-blue-50 border-blue-200": isSelected,
                    "cursor-pointer": onRowClick,
                    "hover:bg-gray-50": hoverable && !isSelected,
                  },
                  styles?.row,
                  customRowProps.className
                )}
                style={{
                  height: rowHeight,
                  ...customRowProps.style,
                }}
                onClick={() => onRowClick?.(record, rowIndex)}
                onDoubleClick={() => onRowDoubleClick?.(record, rowIndex)}
                onKeyDown={handleKeyDown}
                tabIndex={keyboardNavigation ? 0 : undefined}
                {...customRowProps}
              >
                {/* Selection cell */}
                {selection && (
                  <td
                    className={cn(
                      checkboxCellStyles,
                      sizeStyles.cell,
                      densityStyles.cell
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        handleSelection(recordId, e.target.checked)
                      }
                      className={cn(
                        sizeStyles.checkbox,
                        "rounded border-gray-300"
                      )}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}

                {/* Expansion cell */}
                {expandable && (
                  <td
                    className={cn(sizeStyles.cell, densityStyles.cell, "w-12")}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpansion(recordId);
                      }}
                      className={expandButtonStyles}
                      aria-label={isExpanded ? "Collapse row" : "Expand row"}
                    >
                      <ChevronRight
                        className={cn(
                          sizeStyles.icon,
                          "transition-transform duration-200",
                          { "rotate-90": isExpanded }
                        )}
                      />
                    </button>
                  </td>
                )}

                {/* Data cells */}
                {visibleColumns.map((column, colIndex) => {
                  const value = getNestedValue(record, String(column.accessor));
                  const customCellProps = column.cellProps
                    ? column.cellProps(record, rowIndex)
                    : {};
                  const isFocused =
                    focusedCell?.row === rowIndex &&
                    focusedCell?.col === colIndex;

                  return (
                    <td
                      key={String(column.accessor)}
                      className={cn(
                        cellStyles,
                        styles_variant.cell,
                        sizeStyles.cell,
                        densityStyles.cell,
                        {
                          "text-center": column.textAlign === "center",
                          "text-right": column.textAlign === "right",
                          [selectableCellStyles]: onRowClick,
                          [pinnedColumnStyles]: column.pinned,
                          "ring-2 ring-blue-500": isFocused,
                        },
                        column.className,
                        styles?.cell,
                        customCellProps.className
                      )}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        left: column.pinned === "left" ? 0 : undefined,
                        right: column.pinned === "right" ? 0 : undefined,
                        ...customCellProps.style,
                      }}
                      onClick={() =>
                        setFocusedCell({ row: rowIndex, col: colIndex })
                      }
                      tabIndex={keyboardNavigation ? 0 : undefined}
                      {...customCellProps}
                    >
                      <div className="truncate">
                        {column.render
                          ? column.render(value, record, rowIndex)
                          : highlightSearch && searchQuery
                          ? highlightText(String(value || ""), searchQuery)
                          : String(value || "")}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Expanded row */}
              {expandable && isExpanded && renderExpandedRow && (
                <tr className={expandedRowStyles}>
                  <td colSpan={visibleColumns.length + (selection ? 1 : 0) + 1}>
                    <div className={cn("p-4", fadeInAnimation)}>
                      {renderExpandedRow(record, rowIndex)}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  // Render table footer
  const renderTableFooter = () => {
    if (!withFooter && !footer) return null;

    return (
      <tfoot className={styles?.footer}>
        <tr className={styles_variant.header}>
          {selection && (
            <td className={cn(sizeStyles.cell, densityStyles.cell)} />
          )}
          {expandable && (
            <td className={cn(sizeStyles.cell, densityStyles.cell)} />
          )}
          {visibleColumns.map((column) => (
            <td
              key={String(column.accessor)}
              className={cn(sizeStyles.cell, densityStyles.cell, {
                "text-center": column.textAlign === "center",
                "text-right": column.textAlign === "right",
              })}
            >
              {column.renderFooter
                ? column.renderFooter(column, displayData)
                : null}
            </td>
          ))}
        </tr>
        {footer && (
          <tr>
            <td
              colSpan={
                visibleColumns.length +
                (selection ? 1 : 0) +
                (expandable ? 1 : 0)
              }
            >
              {footer}
            </td>
          </tr>
        )}
      </tfoot>
    );
  };

  // Render search
  const renderSearch = () => {
    if (!searchable) return null;

    return (
      <div className={searchContainerStyles}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className={cn(searchInputStyles, "pl-10")}
          />
        </div>
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    if (!pagination) return null;

    const {
      page,
      pageSize,
      total,
      pageSizes = defaultPagination.pageSizes,
    } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);

    return (
      <div className={cn(paginationStyles, styles?.pagination)}>
        <div className="flex items-center gap-4">
          {pagination.showPageSizeSelector !== false && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={pageSize}
                onChange={(e) =>
                  pagination.onPageSizeChange?.(Number(e.target.value))
                }
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
          )}

          {pagination.showPageInfo !== false && (
            <span className="text-sm text-gray-700">
              {pagination.pageInfoFormatter
                ? pagination.pageInfoFormatter(page, pageSize, total)
                : `Showing ${startItem} to ${endItem} of ${total} entries`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => pagination.onPageChange?.(1)}
            disabled={page === 1}
            className={cn(
              sizeStyles.button,
              "border border-gray-300 rounded disabled:opacity-50"
            )}
          >
            <ChevronsLeft className={sizeStyles.icon} />
          </button>

          <button
            onClick={() => pagination.onPageChange?.(page - 1)}
            disabled={page === 1}
            className={cn(
              sizeStyles.button,
              "border border-gray-300 rounded disabled:opacity-50"
            )}
          >
            <ChevronLeft className={sizeStyles.icon} />
          </button>

          <span className="px-3 py-1 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => pagination.onPageChange?.(page + 1)}
            disabled={page === totalPages}
            className={cn(
              sizeStyles.button,
              "border border-gray-300 rounded disabled:opacity-50"
            )}
          >
            <ChevronRight className={sizeStyles.icon} />
          </button>

          <button
            onClick={() => pagination.onPageChange?.(totalPages)}
            disabled={page === totalPages}
            className={cn(
              sizeStyles.button,
              "border border-gray-300 rounded disabled:opacity-50"
            )}
          >
            <ChevronsRight className={sizeStyles.icon} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        baseTableStyles,
        styles_variant.root,
        {
          border: withBorder,
          "border-2": variant === "bordered",
        },
        styles?.root,
        className
      )}
      style={{
        height,
        animationDuration: `${animationDuration}ms`,
      }}
      {...props}
    >
      {/* Search */}
      {renderSearch()}

      {/* Table container */}
      <div
        ref={containerRef}
        className={cn(tableContainerStyles, styles?.table)}
        style={{
          height: height
            ? `calc(${height} - ${pagination ? "80px" : "0px"})`
            : undefined,
        }}
      >
        <table
          ref={tableRef}
          className={cn(styles_variant.table, "table-auto")}
          role="table"
          aria-label={caption ? String(caption) : "Data table"}
        >
          {caption && <caption className="sr-only">{caption}</caption>}

          {renderHeader()}
          {renderBody()}
          {renderTableFooter()}
        </table>

        {/* Loading overlay */}
        {loading && (
          <div className={cn(loadingOverlayStyles, styles?.loadingOverlay)}>
            {loadingOverlay || (
              <div className="flex items-center gap-3">
                <Loader2
                  className={cn(sizeStyles.icon, "animate-spin text-blue-600")}
                />
                <span className="text-gray-600">Loading...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {renderPagination()}

      <style>{`
        ${tableAnimations}
      `}</style>
    </div>
  );
};

Table.displayName = "Table";
