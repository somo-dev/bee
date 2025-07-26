import React from "react";
import { Skeleton } from "./Skeleton";
import { SkeletonGroupProps } from "./Skeleton.types";
import { cn } from "../../utils/cn";

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  loading = true,
  children,
  count = 3,
  spacing = 16,
  skeletonProps = {},
  stagger = true,
  staggerDelay = 0.1,
  className,
  style,
  ...props
}) => {
  // Show content if not loading
  if (!loading) {
    return <>{children}</>;
  }

  // Generate skeleton items
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <Skeleton
      key={index}
      loading={true}
      delay={stagger ? index * staggerDelay : 0}
      {...skeletonProps}
    />
  ));

  return (
    <div
      className={cn("space-y-4", className)}
      style={{
        gap: `${spacing}px`,
        ...style,
      }}
      {...props}
    >
      {skeletonItems}
    </div>
  );
};

SkeletonGroup.displayName = "SkeletonGroup";
