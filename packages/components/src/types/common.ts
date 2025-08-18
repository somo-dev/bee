export type Size = "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}
