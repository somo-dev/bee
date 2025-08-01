import { TableVariant, TableDensity, TableSize } from "./Table.types";

export const tableVariants: Record<
  TableVariant,
  {
    root: string;
    table: string;
    header: string;
    row: string;
    cell: string;
  }
> = {
  default: {
    root: "bg-white rounded-lg border border-gray-200 overflow-hidden",
    table: "w-full",
    header: "bg-gray-50 border-b border-gray-200",
    row: "border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150",
    cell: "text-gray-900",
  },
  striped: {
    root: "bg-white rounded-lg border border-gray-200 overflow-hidden",
    table: "w-full",
    header: "bg-gray-50 border-b border-gray-200",
    row: "border-b border-gray-100 last:border-b-0 even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150",
    cell: "text-gray-900",
  },
  bordered: {
    root: "bg-white rounded-lg border-2 border-gray-300 overflow-hidden",
    table: "w-full",
    header: "bg-gray-50 border-b-2 border-gray-300",
    row: "border-b-2 border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150",
    cell: "text-gray-900 border-r border-gray-200 last:border-r-0",
  },
  minimal: {
    root: "bg-white",
    table: "w-full",
    header: "border-b border-gray-200",
    row: "border-b border-gray-100 last:border-b-0 hover:bg-gray-25 transition-colors duration-150",
    cell: "text-gray-900",
  },
  elevated: {
    root: "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden",
    table: "w-full",
    header:
      "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200",
    row: "border-b border-gray-100 last:border-b-0 hover:bg-gray-50 hover:shadow-sm transition-all duration-200",
    cell: "text-gray-900",
  },
};

export const tableSizes: Record<
  TableSize,
  {
    header: string;
    cell: string;
    text: string;
    icon: string;
    checkbox: string;
    button: string;
  }
> = {
  xs: {
    header: "px-2 py-1 text-xs font-semibold",
    cell: "px-2 py-1 text-xs",
    text: "text-xs",
    icon: "w-3 h-3",
    checkbox: "w-3 h-3",
    button: "px-1.5 py-0.5 text-xs",
  },
  sm: {
    header: "px-3 py-2 text-xs font-semibold",
    cell: "px-3 py-2 text-sm",
    text: "text-xs",
    icon: "w-3 h-3",
    checkbox: "w-3 h-3",
    button: "px-2 py-1 text-xs",
  },
  md: {
    header: "px-4 py-3 text-sm font-semibold",
    cell: "px-4 py-3 text-sm",
    text: "text-sm",
    icon: "w-4 h-4",
    checkbox: "w-4 h-4",
    button: "px-3 py-1.5 text-sm",
  },
  lg: {
    header: "px-6 py-4 text-base font-semibold",
    cell: "px-6 py-4 text-base",
    text: "text-base",
    icon: "w-5 h-5",
    checkbox: "w-5 h-5",
    button: "px-4 py-2 text-base",
  },
  xl: {
    header: "px-8 py-5 text-lg font-semibold",
    cell: "px-8 py-5 text-lg",
    text: "text-lg",
    icon: "w-6 h-6",
    checkbox: "w-6 h-6",
    button: "px-5 py-2.5 text-lg",
  },
};

export const tableDensity: Record<
  TableDensity,
  {
    header: string;
    cell: string;
    row: string;
  }
> = {
  compact: {
    header: "py-1",
    cell: "py-1",
    row: "h-8",
  },
  comfortable: {
    header: "py-3",
    cell: "py-3",
    row: "h-12",
  },
  spacious: {
    header: "py-4",
    cell: "py-4",
    row: "h-16",
  },
};

export const baseTableStyles = `
  relative overflow-hidden
  transition-all duration-200 ease-in-out
`;

export const tableContainerStyles = `
  relative overflow-auto
  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
  hover:scrollbar-thumb-gray-400
`;

export const headerCellStyles = `
  text-left font-semibold text-gray-700 uppercase tracking-wide
  select-none relative
  transition-all duration-200 ease-in-out
`;

export const sortableHeaderStyles = `
  cursor-pointer hover:bg-gray-100
  focus:outline-none focus:bg-gray-100
`;

export const sortIconStyles = `
  inline-flex items-center justify-center ml-1
  transition-transform duration-200 ease-in-out
`;

export const cellStyles = `
  relative transition-all duration-150 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
`;

export const selectableCellStyles = `
  cursor-pointer
`;

export const expandableCellStyles = `
  cursor-pointer hover:bg-gray-50
`;

export const checkboxCellStyles = `
  w-12 text-center
`;

export const expandButtonStyles = `
  p-1 rounded hover:bg-gray-100 transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-blue-500
`;

export const resizeHandleStyles = `
  absolute top-0 right-0 bottom-0 w-1
  cursor-col-resize bg-transparent hover:bg-blue-500
  transition-colors duration-150
`;

export const pinnedColumnStyles = `
  sticky z-10 bg-white shadow-sm
`;

export const loadingOverlayStyles = `
  absolute inset-0 bg-white/80 backdrop-blur-sm
  flex items-center justify-center z-20
`;

export const skeletonStyles = `
  animate-pulse bg-gray-200 rounded
`;

export const emptyStateStyles = `
  text-center py-12 text-gray-500
`;

export const errorStateStyles = `
  text-center py-12 text-red-500
`;

export const paginationStyles = `
  flex items-center justify-between px-6 py-4
  border-t border-gray-200 bg-gray-50
`;

export const searchContainerStyles = `
  p-4 border-b border-gray-200 bg-white
`;

export const searchInputStyles = `
  w-full px-4 py-2 border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition-all duration-200
`;

export const filterContainerStyles = `
  p-2 border-b border-gray-200 bg-gray-50
`;

export const columnVisibilityStyles = `
  p-4 border-b border-gray-200 bg-white
`;

export const expandedRowStyles = `
  bg-gray-25 border-b border-gray-100
`;

export const highlightStyles = `
  bg-yellow-200 text-yellow-900 px-1 rounded
`;

// Animation keyframes
export const tableAnimations = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: scale(1);
    }
    40%, 43% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(1.02);
    }
    90% {
      transform: scale(1.01);
    }
  }
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const slideInAnimation = `
  animation: slideIn 0.2s ease-out;
`;

export const scaleInAnimation = `
  animation: scaleIn 0.2s ease-out;
`;

export const shimmerAnimation = `
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
`;

export const pulseAnimation = `
  animation: pulse 2s ease-in-out infinite;
`;

export const bounceAnimation = `
  animation: bounce 0.6s ease-in-out;
`;
