import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal
} from 'lucide-react';
import { PaginationProps } from './Pagination.types';
import { 
  paginationVariants, 
  paginationSizes, 
  ellipsisStyles,
  pageInfoStyles,
  jumpToStyles
} from './Pagination.styles';
import { cn } from '../../utils/cn';

const DOTS = '...';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  size = 'md',
  siblingCount = 2,
  showFirstLast = true,
  showPrevNext = true,
  showPageInfo = false,
  showJumpTo = false,
  labels = {},
  icons = {},
  disabled = false,
  showEllipsis = true,
  className,
  ...props
}) => {
  const [jumpToValue, setJumpToValue] = useState('');

  // Default labels
  const defaultLabels = {
    previous: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    jumpTo: 'Go to page',
    pageInfo: 'Page {current} of {total}',
    ...labels
  };

  // Default icons
  const defaultIcons = {
    previous: <ChevronLeft />,
    next: <ChevronRight />,
    first: <ChevronsLeft />,
    last: <ChevronsRight />,
    ...icons
  };

  // Generate page range
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

    // Case 1: If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return showEllipsis ? [...leftRange, DOTS, totalPages] : [...leftRange, totalPages];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return showEllipsis ? [firstPageIndex, DOTS, ...rightRange] : [firstPageIndex, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return showEllipsis 
        ? [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        : [firstPageIndex, ...middleRange, lastPageIndex];
    }

    return [];
  }, [totalPages, siblingCount, currentPage, showEllipsis]);

  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  const handleJumpTo = () => {
    const page = parseInt(jumpToValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpToValue('');
    }
  };

  const handleJumpToKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJumpTo();
    }
  };

  const styles = paginationVariants[variant];
  const sizeStyles = paginationSizes[size];

  const renderButton = (
    content: React.ReactNode,
    page: number | null,
    isActive = false,
    ariaLabel?: string
  ) => {
    const isDisabled = disabled || page === null || page === currentPage;
    
    let buttonStyles = styles.button;
    if (isActive) {
      buttonStyles = styles.activeButton;
    } else if (isDisabled) {
      buttonStyles = styles.disabledButton;
    }

    // Apply pill-specific styles
    const buttonClasses = cn(
      buttonStyles,
      sizeStyles.button,
      variant === 'pills' ? 'rounded-full' : ''
    );

    return (
      <button
        key={`page-${page}`}
        onClick={() => page && handlePageChange(page)}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        className={buttonClasses}
      >
        {content}
      </button>
    );
  };

  const renderPageInfo = () => {
    if (!showPageInfo) return null;
    
    const pageInfoText = defaultLabels.pageInfo
      .replace('{current}', currentPage.toString())
      .replace('{total}', totalPages.toString());

    return (
      <span className={cn(pageInfoStyles, sizeStyles.text)}>
        {pageInfoText}
      </span>
    );
  };

  const renderJumpTo = () => {
    if (!showJumpTo) return null;

    return (
      <div className={cn(jumpToStyles, sizeStyles.text)}>
        <span>{defaultLabels.jumpTo}:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jumpToValue}
          onChange={(e) => setJumpToValue(e.target.value)}
          onKeyPress={handleJumpToKeyPress}
          className={cn(
            sizeStyles.input,
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          )}
          placeholder="1"
          disabled={disabled}
        />
        <button
          onClick={handleJumpTo}
          disabled={disabled || !jumpToValue}
          className={cn(
            styles.button,
            sizeStyles.button,
            variant === 'pills' ? 'rounded-full' : ''
          )}
        >
          Go
        </button>
      </div>
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex flex-col sm:flex-row items-center gap-4', className)} {...props}>
      {/* Main pagination */}
      <nav aria-label="Pagination" className={styles.container}>
        {/* First page button */}
        {showFirstLast && (
          renderButton(
            <span className="flex items-center gap-1">
              {React.cloneElement(defaultIcons.first, { className: sizeStyles.icon })}
              <span className="hidden sm:inline">{defaultLabels.first}</span>
            </span>,
            currentPage > 1 ? 1 : null,
            false,
            `Go to first page`
          )
        )}

        {/* Previous page button */}
        {showPrevNext && (
          renderButton(
            <span className="flex items-center gap-1">
              {React.cloneElement(defaultIcons.previous, { className: sizeStyles.icon })}
              <span className="hidden sm:inline">{defaultLabels.previous}</span>
            </span>,
            currentPage > 1 ? currentPage - 1 : null,
            false,
            `Go to previous page`
          )
        )}

        {/* Page numbers */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span
                key={`dots-${index}`}
                className={cn(ellipsisStyles, sizeStyles.button)}
                aria-hidden="true"
              >
                <MoreHorizontal className={sizeStyles.icon} />
              </span>
            );
          }

          return renderButton(
            pageNumber,
            pageNumber as number,
            pageNumber === currentPage,
            `Go to page ${pageNumber}`
          );
        })}

        {/* Next page button */}
        {showPrevNext && (
          renderButton(
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">{defaultLabels.next}</span>
              {React.cloneElement(defaultIcons.next, { className: sizeStyles.icon })}
            </span>,
            currentPage < totalPages ? currentPage + 1 : null,
            false,
            `Go to next page`
          )
        )}

        {/* Last page button */}
        {showFirstLast && (
          renderButton(
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">{defaultLabels.last}</span>
              {React.cloneElement(defaultIcons.last, { className: sizeStyles.icon })}
            </span>,
            currentPage < totalPages ? totalPages : null,
            false,
            `Go to last page`
          )
        )}
      </nav>

      {/* Page info and jump to */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {renderPageInfo()}
        {renderJumpTo()}
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';