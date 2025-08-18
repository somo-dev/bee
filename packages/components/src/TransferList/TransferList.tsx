import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Search,
  GripVertical,
  Package,
  Users,
  CheckSquare,
  Square,
} from "lucide-react";
import {
  TransferListProps,
  TransferListItem,
  TransferListGroup,
} from "./TransferList.types";
import {
  transferListVariants,
  transferListSizes,
  baseContainerStyles,
  listContainerStyles,
  listHeaderStyles,
  searchInputStyles,
  transferButtonsStyles,
  transferButtonStyles,
  transferAllButtonStyles,
  itemContentStyles,
  itemLabelStyles,
  itemDescriptionStyles,
  groupHeaderStyles,
  emptyStateStyles,
  dragHandleStyles,
  sortableItemStyles,
  draggingItemStyles,
  dropZoneStyles,
  countBadgeStyles,
  selectedCountBadgeStyles,
  transferListAnimations,
  slideInRightAnimation,
  slideInLeftAnimation,
  fadeInAnimation,
  bounceAnimation,
} from "./TransferList.styles";
import { cn } from "../utils/cn";

// Default filter function
const defaultFilter = (query: string, item: TransferListItem): boolean => {
  const searchTerm = query.toLowerCase();
  const label = String(item.label).toLowerCase();
  const description = item.description?.toLowerCase() || "";
  return label.includes(searchTerm) || description.includes(searchTerm);
};

// Default sort function
const defaultSort = (a: TransferListItem, b: TransferListItem): number => {
  return String(a.label).localeCompare(String(b.label));
};

export const TransferList: React.FC<TransferListProps> = ({
  data = [],
  value = [],
  onChange,
  titles = ["Available", "Selected"],
  descriptions,
  size = "md",
  variant = "default",
  searchable = true,
  sortable = true,
  showCounts = true,
  showTransferAll = true,
  showGroups = true,
  listHeight = 400,
  filter = defaultFilter,
  sortFunction = defaultSort,
  disabled = false,
  showCheckboxes = true,
  searchPlaceholder = "Search items...",
  emptyState,
  transferIcons,
  onReorder,
  preserveOrder = false,
  className,
  ...props
}) => {
  const [searchQueries, setSearchQueries] = useState<[string, string]>([
    "",
    "",
  ]);
  const [selectedItems, setSelectedItems] = useState<{
    available: Set<string | number>;
    selected: Set<string | number>;
  }>({
    available: new Set(),
    selected: new Set(),
  });
  const [draggedItem, setDraggedItem] = useState<TransferListItem | null>(null);
  const [dragOverList, setDragOverList] = useState<
    "available" | "selected" | null
  >(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<TransferListItem | null>(null);

  const dragCounter = useRef(0);

  // Normalize data to consistent format
  const normalizedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    // Handle TransferListItem array
    if (data.length > 0 && "value" in data[0]) {
      return data as TransferListItem[];
    }

    // Handle TransferListGroup array
    if (data.length > 0 && "items" in data[0]) {
      return (data as TransferListGroup[]).flatMap((group) =>
        group.items.map((item) => ({ ...item, group: group.label }))
      );
    }

    return [];
  }, [data]);

  // Split items into available and selected
  const { availableItems, selectedItems: selectedItemsList } = useMemo(() => {
    const selected = new Set(value);
    const available: TransferListItem[] = [];
    const selectedList: TransferListItem[] = [];

    normalizedData.forEach((item) => {
      if (selected.has(item.value)) {
        selectedList.push(item);
      } else {
        available.push(item);
      }
    });

    // Sort items if not preserving order
    if (!preserveOrder) {
      available.sort(sortFunction);
      selectedList.sort(sortFunction);
    } else {
      // Preserve order for selected items based on value array
      selectedList.sort(
        (a, b) => value.indexOf(a.value) - value.indexOf(b.value)
      );
    }

    return {
      availableItems: available,
      selectedItems: selectedList,
    };
  }, [normalizedData, value, sortFunction, preserveOrder]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    const [availableQuery, selectedQuery] = searchQueries;

    return {
      available: availableQuery
        ? availableItems.filter((item) => filter(availableQuery, item))
        : availableItems,
      selected: selectedQuery
        ? selectedItemsList.filter((item) => filter(selectedQuery, item))
        : selectedItemsList,
    };
  }, [availableItems, selectedItemsList, searchQueries, filter]);

  // Group items if needed
  const groupedItems = useMemo(() => {
    const groupItems = (items: TransferListItem[]) => {
      if (!showGroups) return [{ id: "default", label: "", items }];

      const groups: { [key: string]: TransferListItem[] } = {};

      items.forEach((item) => {
        const groupKey = item.group || "Other";
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(item);
      });

      return Object.entries(groups).map(([label, groupItems]) => ({
        id: label,
        label,
        items: groupItems,
      }));
    };

    return {
      available: groupItems(filteredItems.available),
      selected: groupItems(filteredItems.selected),
    };
  }, [filteredItems, showGroups]);

  const handleTransfer = useCallback(
    (items: (string | number)[], direction: "toSelected" | "toAvailable") => {
      if (disabled) return;

      let newValue: (string | number)[];

      if (direction === "toSelected") {
        newValue = [...value, ...items];
      } else {
        newValue = value.filter((v) => !items.includes(v));
      }

      onChange?.(newValue);

      // Clear selections
      setSelectedItems({
        available: new Set(),
        selected: new Set(),
      });
    },
    [value, onChange, disabled]
  );

  const handleTransferAll = useCallback(
    (direction: "toSelected" | "toAvailable") => {
      if (disabled) return;

      if (direction === "toSelected") {
        const allAvailable = filteredItems.available
          .filter((item) => !item.disabled)
          .map((item) => item.value);
        handleTransfer(allAvailable, "toSelected");
      } else {
        const allSelected = filteredItems.selected
          .filter((item) => !item.disabled)
          .map((item) => item.value);
        handleTransfer(allSelected, "toAvailable");
      }
    },
    [filteredItems, handleTransfer, disabled]
  );

  const handleItemSelect = useCallback(
    (
      itemValue: string | number,
      listType: "available" | "selected",
      isSelected: boolean
    ) => {
      if (disabled) return;

      setSelectedItems((prev) => {
        const newState = { ...prev };
        if (isSelected) {
          newState[listType].add(itemValue);
        } else {
          newState[listType].delete(itemValue);
        }
        return newState;
      });
    },
    [disabled]
  );

  const handleTransferSelected = useCallback(
    (direction: "toSelected" | "toAvailable") => {
      if (disabled) return;

      const sourceList = direction === "toSelected" ? "available" : "selected";
      const itemsToTransfer = Array.from(selectedItems[sourceList]);

      if (itemsToTransfer.length > 0) {
        handleTransfer(itemsToTransfer, direction);
      }
    },
    [selectedItems, handleTransfer, disabled]
  );

  // Drag and drop handlers
  const handleDragStart = useCallback(
    (item: TransferListItem) => {
      if (!sortable || disabled) return;
      setDraggedItem(item);
    },
    [sortable, disabled]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverList(null);
    setDragOverIndex(null);
    setDragOverItem(null);
    dragCounter.current = 0;
  }, []);

  const handleDragEnter = useCallback(
    (listType: "available" | "selected") => {
      if (!sortable || disabled || !draggedItem) return;
      dragCounter.current++;
      setDragOverList(listType);
    },
    [sortable, disabled, draggedItem]
  );

  const handleDragLeave = useCallback(() => {
    if (!sortable || disabled) return;
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverList(null);
      setDragOverIndex(null);
      setDragOverItem(null);
    }
  }, [sortable, disabled]);

  const handleDrop = useCallback(
    (listType: "available" | "selected") => {
      if (!sortable || disabled || !draggedItem) return;

      const currentList = value.includes(draggedItem.value)
        ? "selected"
        : "available";

      if (currentList !== listType) {
        // Transfer item to different list
        if (listType === "selected") {
          handleTransfer([draggedItem.value], "toSelected");
        } else {
          handleTransfer([draggedItem.value], "toAvailable");
        }
      } else {
        // Reorder within the same list
        const currentItems = currentList === "selected" ? selectedItemsList : availableItems;
        const draggedIndex = currentItems.findIndex(item => item.value === draggedItem.value);
        
        if (dragOverIndex !== null && draggedIndex !== dragOverIndex) {
          const newItems = [...currentItems];
          const [removed] = newItems.splice(draggedIndex, 1);
          const targetIndex = dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex;
          newItems.splice(targetIndex, 0, removed);
          
          // Update the appropriate list
          if (currentList === "selected") {
            const newValue = newItems.map(item => item.value);
            onChange?.(newValue);
          } else {
            // For available items, we need to update the data structure
            // This is more complex as we need to maintain the original data structure
            onReorder?.(newItems, currentList);
          }
        }
      }

      handleDragEnd();
    },
    [sortable, disabled, draggedItem, value, handleTransfer, handleDragEnd, selectedItemsList, availableItems, dragOverIndex, onChange, onReorder]
  );

  const styles = transferListVariants[variant];
  const sizeStyles = transferListSizes[size];

  // Default icons
  const icons = {
    moveRight: <ChevronRight />,
    moveLeft: <ChevronLeft />,
    moveAllRight: <ChevronsRight />,
    moveAllLeft: <ChevronsLeft />,
    ...transferIcons,
  };

  const renderSearchInput = (
    listType: "available" | "selected",
    index: 0 | 1
  ) => {
    if (!searchable) return null;

    return (
      <div className="relative mb-3">
        <Search
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            sizeStyles.icon
          )}
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQueries[index]}
          onChange={(e) => {
            const newQueries: [string, string] = [...searchQueries];
            newQueries[index] = e.target.value;
            setSearchQueries(newQueries);
          }}
          className={cn(searchInputStyles, sizeStyles.search, "pl-10")}
          disabled={disabled}
        />
      </div>
    );
  };

  const renderItem = (
    item: TransferListItem,
    listType: "available" | "selected",
    itemIndex: number
  ) => {
    const isSelected = selectedItems[listType].has(item.value);
    const isDragging = draggedItem?.value === item.value;
    const isDragOver = dragOverItem?.value === item.value && dragOverList === listType;

    return (
      <div
        key={item.value}
        className={cn(
          styles.item,
          sizeStyles.item,
          sortableItemStyles,
          {
            [styles.selectedItem]: isSelected,
            [draggingItemStyles]: isDragging,
            "opacity-50 cursor-not-allowed": item.disabled,
            "cursor-pointer": !item.disabled,
            "border-t-2 border-blue-400 bg-blue-50/50": isDragOver,
          },
          fadeInAnimation
        )}
        draggable={sortable && !disabled && !item.disabled}
        onDragStart={() => handleDragStart(item)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => {
          if (sortable && !disabled && draggedItem && draggedItem.value !== item.value) {
            e.preventDefault();
            setDragOverItem(item);
            setDragOverIndex(itemIndex);
          }
        }}
        onDragLeave={(e) => {
          if (sortable && !disabled) {
            // Only clear if we're leaving the item (not entering a child)
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setDragOverItem(null);
              setDragOverIndex(null);
            }
          }
        }}
        onClick={() => {
          if (!item.disabled) {
            handleItemSelect(item.value, listType, !isSelected);
          }
        }}
      >
        {/* Drag Handle - Always reserve space */}
        <div className={cn(
          dragHandleStyles, 
          sizeStyles.icon,
          isDragging && "opacity-100"
        )}>
          {sortable && !disabled && !item.disabled && (
            <GripVertical className={sizeStyles.icon} />
          )}
        </div>

        {/* Checkbox */}
        {showCheckboxes && (
          <div className={cn("flex-shrink-0", sizeStyles.checkbox)}>
            {isSelected ? (
              <CheckSquare
                className={cn(sizeStyles.checkbox, "text-blue-600")}
              />
            ) : (
              <Square className={cn(sizeStyles.checkbox, "text-gray-400")} />
            )}
          </div>
        )}

        {/* Icon */}
        {item.icon && (
          <div className={cn("flex-shrink-0", sizeStyles.icon)}>
            {React.cloneElement(item.icon, {
              className: cn(sizeStyles.icon, item.icon.props.className),
            })}
          </div>
        )}

        {/* Content */}
        <div className={itemContentStyles}>
          <div className={cn(itemLabelStyles, sizeStyles.text)}>
            {item.label}
          </div>
          {item.description && (
            <div className={cn(itemDescriptionStyles, sizeStyles.text)}>
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderList = (
    listType: "available" | "selected",
    groups: { id: string; label: string; items: TransferListItem[] }[],
    index: 0 | 1
  ) => {
    const totalItems = groups.reduce(
      (sum, group) => sum + group.items.length,
      0
    );
    const selectedCount = selectedItems[listType].size;

    return (
      <div className={cn(styles.container, sizeStyles.container)}>
        {/* Header */}
        <div className={styles.header}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={cn("font-semibold", sizeStyles.text)}>
                {titles[index]}
              </h3>
              {descriptions?.[index] && (
                <p className={cn("text-gray-600 mt-1", sizeStyles.text)}>
                  {descriptions[index]}
                </p>
              )}
            </div>
            {showCounts && (
              <div className="flex items-center gap-2">
                {selectedCount > 0 && (
                  <span className={selectedCountBadgeStyles}>
                    {selectedCount} selected
                  </span>
                )}
                <span className={countBadgeStyles}>{totalItems} total</span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 pb-0">{renderSearchInput(listType, index)}</div>

        {/* Transfer All Button */}
        {showTransferAll && totalItems > 0 && (
          <div className="px-4 pb-3">
            <button
              onClick={() =>
                handleTransferAll(
                  listType === "available" ? "toSelected" : "toAvailable"
                )
              }
              disabled={disabled || totalItems === 0}
              className={transferAllButtonStyles}
            >
              {listType === "available" ? (
                <>
                  {React.cloneElement(icons.moveAllRight, {
                    className: "w-4 h-4",
                  })}
                  Transfer All
                </>
              ) : (
                <>
                  {React.cloneElement(icons.moveAllLeft, {
                    className: "w-4 h-4",
                  })}
                  Remove All
                </>
              )}
            </button>
          </div>
        )}

        {/* List */}
        <div
          className={cn(styles.list, "flex-1 overflow-y-auto", {
            [dropZoneStyles]: dragOverList === listType,
          })}
          style={{ maxHeight: listHeight }}
          onDragEnter={() => handleDragEnter(listType)}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(listType)}
        >
          {totalItems === 0 ? (
            <div className={emptyStateStyles}>
              <Package className="w-12 h-12 text-gray-300 mb-4" />
              <p className={cn("text-center", sizeStyles.text)}>
                {emptyState?.[listType] || `No ${listType} items`}
              </p>
            </div>
          ) : (
            <>
              {groups.map((group, groupIndex) => {
                let globalIndex = 0;
                // Calculate global index by summing items from previous groups
                for (let i = 0; i < groupIndex; i++) {
                  globalIndex += groups[i].items.length;
                }
                
                return (
                  <div key={group.id}>
                    {showGroups && group.label && (
                      <div className={cn(groupHeaderStyles, sizeStyles.text)}>
                        {group.label}
                      </div>
                    )}
                    {group.items.map((item, localIndex) => 
                      renderItem(item, listType, globalIndex + localIndex)
                    )}
                  </div>
                );
              })}
              
              {/* Drop zone for end of list */}
              {sortable && !disabled && (
                <div
                  className={cn(
                    "h-2 transition-all duration-200",
                    dragOverList === listType && dragOverIndex === totalItems
                      ? "bg-blue-200 border-t-2 border-blue-400"
                      : "bg-transparent"
                  )}
                  onDragOver={(e) => {
                    if (sortable && !disabled && draggedItem) {
                      e.preventDefault();
                      setDragOverItem(null);
                      setDragOverIndex(totalItems);
                    }
                  }}
                  onDragLeave={() => {
                    if (sortable && !disabled) {
                      setDragOverItem(null);
                      setDragOverIndex(null);
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTransferButtons = () => {
    const hasAvailableSelected = selectedItems.available.size > 0;
    const hasSelectedSelected = selectedItems.selected.size > 0;

    return (
      <div className={transferButtonsStyles}>
        <button
          onClick={() => handleTransferSelected("toSelected")}
          disabled={disabled || !hasAvailableSelected}
          className={cn(transferButtonStyles, sizeStyles.button)}
          title="Transfer selected to right"
        >
          {React.cloneElement(icons.moveRight, { className: sizeStyles.icon })}
        </button>

        <button
          onClick={() => handleTransferSelected("toAvailable")}
          disabled={disabled || !hasSelectedSelected}
          className={cn(transferButtonStyles, sizeStyles.button)}
          title="Transfer selected to left"
        >
          {React.cloneElement(icons.moveLeft, { className: sizeStyles.icon })}
        </button>
      </div>
    );
  };

  return (
    <div className={cn(baseContainerStyles, className)} {...props}>
      {/* Available Items */}
      <div className={listContainerStyles}>
        {renderList("available", groupedItems.available, 0)}
      </div>

      {/* Transfer Buttons */}
      <div className="flex items-center justify-center">
        {renderTransferButtons()}
      </div>

      {/* Selected Items */}
      <div className={listContainerStyles}>
        {renderList("selected", groupedItems.selected, 1)}
      </div>

      <style>{`
        ${transferListAnimations}
      `}</style>
    </div>
  );
};

TransferList.displayName = "TransferList";
