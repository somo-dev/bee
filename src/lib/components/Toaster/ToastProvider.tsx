import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  Toast,
  ToastContextValue,
  ToastProviderProps,
  ToastPosition,
} from "./Toaster.types";
import { Toaster } from "./Toaster";

const ToastContext = createContext<ToastContextValue | null>(null);

// Generate unique ID for toasts
const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = "top-right",
  maxToasts = 5,
  gap = 8,
  size = "md",
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">): string => {
    const id = generateId();
    const newToast: Toast = {
      id,
      duration: 4000,
      dismissible: true,
      showProgress: false,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast))
    );
  }, []);

  const contextValue: ToastContextValue = {
    addToast,
    removeToast,
    clearToasts,
    updateToast,
    toasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster
        toasts={toasts}
        position={defaultPosition}
        maxToasts={maxToasts}
        gap={gap}
        size={size}
        onDismiss={removeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Convenience hooks for different toast types
export const useToastHelpers = () => {
  const { addToast } = useToast();

  return {
    info: (
      message: ReactNode,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => addToast({ type: "info", message, ...options }),

    success: (
      message: ReactNode,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => addToast({ type: "success", message, ...options }),

    warning: (
      message: ReactNode,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => addToast({ type: "warning", message, ...options }),

    error: (
      message: ReactNode,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => addToast({ type: "error", message, ...options }),

    loading: (
      message: ReactNode,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => addToast({ type: "loading", message, duration: 0, ...options }),

    promise: async <T,>(
      promise: Promise<T>,
      options: {
        loading: ReactNode;
        success: ReactNode | ((data: T) => ReactNode);
        error: ReactNode | ((error: any) => ReactNode);
      }
    ): Promise<T> => {
      const loadingId = addToast({
        type: "loading",
        message: options.loading,
        duration: 0,
        dismissible: false,
      });

      try {
        const result = await promise;

        // Remove loading toast and show success
        const { removeToast } = useToast();
        removeToast(loadingId);

        const successMessage =
          typeof options.success === "function"
            ? options.success(result)
            : options.success;

        addToast({
          type: "success",
          message: successMessage,
        });

        return result;
      } catch (error) {
        // Remove loading toast and show error
        const { removeToast } = useToast();
        removeToast(loadingId);

        const errorMessage =
          typeof options.error === "function"
            ? options.error(error)
            : options.error;

        addToast({
          type: "error",
          message: errorMessage,
        });

        throw error;
      }
    },
  };
};
