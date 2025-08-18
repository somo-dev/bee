import { ReactNode, ReactElement, InputHTMLAttributes } from "react";
import { Size, Variant, BaseComponentProps } from "../index";

export interface SliderMark {
  /**
   * Value where the mark should be placed
   */
  value: number;

  /**
   * Label to display at this mark
   */
  label?: ReactNode;
}

export interface SliderProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
  /**
   * Current value of the slider
   */
  value?: number | [number, number];

  /**
   * Callback when value changes
   */
  onChange?: (value: number | [number, number]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Label for the slider
   */
  label?: ReactNode;

  /**
   * Description text below the slider
   */
  description?: ReactNode;

  /**
   * Error message to display
   */
  error?: ReactNode;

  /**
   * Size of the slider
   * @default 'md'
   */
  size?: Size;

  /**
   * Custom color for the track and thumb
   */
  color?: string;

  /**
   * Custom track color
   */
  trackColor?: string;

  /**
   * Custom thumb color
   */
  thumbColor?: string;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the slider is required
   * @default false
   */
  required?: boolean;

  /**
   * Custom border radius in pixels
   */
  radius?: number;

  /**
   * Whether to show value labels
   * @default false
   */
  showLabels?: boolean;

  /**
   * Whether to show min/max labels
   * @default false
   */
  showMinMax?: boolean;

  /**
   * Custom label formatter
   */
  labelFormatter?: (value: number) => string;

  /**
   * Marks to display on the slider
   */
  marks?: SliderMark[];

  /**
   * Whether to show marks
   * @default false
   */
  showMarks?: boolean;

  /**
   * Whether the slider is a range slider
   * @default false
   */
  range?: boolean;

  /**
   * Whether to show tooltips on hover
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Custom tooltip formatter
   */
  tooltipFormatter?: (value: number) => string;

  /**
   * Whether to always show tooltips
   * @default false
   */
  tooltipAlwaysOn?: boolean;

  /**
   * Callback when slider starts being dragged
   */
  onChangeStart?: (value: number | [number, number]) => void;

  /**
   * Callback when slider stops being dragged
   */
  onChangeEnd?: (value: number | [number, number]) => void;

  /**
   * Custom styles for different parts
   */
  styles?: {
    wrapper?: string;
    track?: string;
    thumb?: string;
    label?: string;
    mark?: string;
    tooltip?: string;
  };

  /**
   * Whether to invert the slider direction
   * @default false
   */
  inverted?: boolean;

  /**
   * Custom thumb icon
   */
  thumbIcon?: ReactElement;

}
