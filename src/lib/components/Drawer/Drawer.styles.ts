import { Size } from "../../types/common";
import { DrawerPosition, DrawerVariant } from "./Drawer.types";

export const drawerVariants: Record<
  DrawerVariant,
  {
    content: string;
    overlay: string;
  }
> = {
  default: {
    content: `
      bg-white border-r border-gray-200
      shadow-xl
    `,
    overlay: `
      bg-purple-900 bg-opacity-20 backdrop-blur-sm
    `,
  },
  overlay: {
    content: `
      bg-white/95 backdrop-blur-md border-gray-200/50
      shadow-2xl
    `,
    overlay: `
      bg-purple-900 bg-opacity-30 backdrop-blur-md
    `,
  },
  push: {
    content: `
      bg-white border-gray-200
      shadow-xl
    `,
    overlay: `
      bg-transparent
    `,
  },
  mini: {
    content: `
      bg-white border-gray-200
      shadow-lg
    `,
    overlay: `
      bg-purple-900 bg-opacity-15 backdrop-blur-sm
    `,
  },
};

export const drawerSizes: Record<
  Size,
  {
    width: string;
    height: string;
    padding: string;
    header: string;
    title: string;
    closeButton: string;
  }
> = {
  sm: {
    width: "w-80",
    height: "h-64",
    padding: "p-0",
    header: "px-6 py-4",
    title: "text-lg font-semibold text-gray-900",
    closeButton: "w-10 h-10",
  },
  md: {
    width: "w-96",
    height: "h-80",
    padding: "p-0",
    header: "px-6 py-5",
    title: "text-xl font-semibold text-gray-900",
    closeButton: "w-10 h-10",
  },
  lg: {
    width: "w-[26rem]",
    height: "h-96",
    padding: "p-0",
    header: "px-6 py-6",
    title: "text-xl font-semibold text-gray-900",
    closeButton: "w-12 h-12",
  },
  xl: {
    width: "w-[30rem]",
    height: "h-[28rem]",
    padding: "p-0",
    header: "px-6 py-6",
    title: "text-xl font-semibold text-gray-900",
    closeButton: "w-14 h-14",
  },
};

export const drawerPositions: Record<
  DrawerPosition,
  {
    container: string;
    content: string;
    transform: {
      closed: string;
      open: string;
    };
  }
> = {
  left: {
    container: "left-0 top-0 h-full",
    content: "h-full border-r",
    transform: {
      closed: "translate-x-[-100%]",
      open: "translate-x-0",
    },
  },
  right: {
    container: "right-0 top-0 h-full",
    content: "h-full border-l",
    transform: {
      closed: "translate-x-[100%]",
      open: "translate-x-0",
    },
  },
  top: {
    container: "top-0 left-0 w-full",
    content: "w-full border-b",
    transform: {
      closed: "translate-y-[-100%]",
      open: "translate-y-0",
    },
  },
  bottom: {
    container: "bottom-0 left-0 w-full",
    content: "w-full border-t",
    transform: {
      closed: "translate-y-[100%]",
      open: "translate-y-0",
    },
  },
};

export const baseDrawerStyles = `
  fixed inset-0 z-50
  transition-all duration-300 ease-out
`;

export const overlayStyles = `
  absolute inset-0
  transition-all duration-300 ease-out
`;

export const contentStyles = `
  absolute flex flex-col
  transition-all duration-300 ease-out
  transform-gpu
`;

export const headerStyles = `
  flex items-center justify-between flex-shrink-0
  border-b border-gray-100
  bg-white
`;

export const bodyStyles = `
  flex-1 overflow-hidden flex flex-col
  bg-white
`;

export const footerStyles = `
  border-t border-gray-100
  bg-white
  flex-shrink-0
  mt-auto
`;

export const closeButtonStyles = `
  inline-flex items-center justify-center
  text-gray-400 hover:text-gray-600 hover:bg-gray-50
  rounded-xl transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
`;

export const resizeHandleStyles = `
  absolute bg-gray-300 hover:bg-blue-500
  transition-colors duration-200 cursor-col-resize
  opacity-0 hover:opacity-100
`;

export const scrollableBodyStyles = `
  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
  hover:scrollbar-thumb-gray-400
`;

export const userProfileStyles = `
  flex items-center gap-4 px-6 py-5 border-b border-gray-100
  bg-white flex-shrink-0
`;

export const avatarStyles = `
  w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600
  flex items-center justify-center text-white font-semibold text-lg
  flex-shrink-0 shadow-sm
`;

export const userInfoStyles = `
  flex-1 min-w-0
`;

export const userNameStyles = `
  font-semibold text-gray-900 text-base truncate
`;

export const userEmailStyles = `
  text-sm text-gray-500 truncate mt-0.5
`;

export const navigationStyles = `
  flex-1 overflow-y-auto px-3 py-4
`;

export const navItemStyles = `
  flex items-center gap-4 px-3 py-3 rounded-xl
  text-gray-700 hover:bg-gray-50 hover:text-gray-900
  transition-all duration-200 cursor-pointer
  group relative
`;

export const activeNavItemStyles = `
  bg-purple-50 text-purple-700 hover:bg-purple-100
  border border-purple-200
`;

export const navIconStyles = `
  w-5 h-5 text-gray-500 group-hover:text-gray-700
  transition-colors duration-200 flex-shrink-0
`;

export const activeNavIconStyles = `
  text-purple-600 group-hover:text-purple-700
`;

export const navLabelStyles = `
  font-medium text-sm
`;

export const settingsStyles = `
  px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0
`;

export const settingsItemStyles = `
  flex items-center gap-4 px-3 py-3 rounded-xl
  text-gray-700 hover:bg-gray-50 hover:text-gray-900
  transition-all duration-200 cursor-pointer
`;

// Animation keyframes
export const drawerAnimations = `
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInTop {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
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
`;

export const slideInLeftAnimation = `
  animation: slideInLeft 0.3s ease-out;
`;

export const slideInRightAnimation = `
  animation: slideInRight 0.3s ease-out;
`;

export const slideInTopAnimation = `
  animation: slideInTop 0.3s ease-out;
`;

export const slideInBottomAnimation = `
  animation: slideInBottom 0.3s ease-out;
`;

export const fadeInAnimation = `
  animation: fadeIn 0.3s ease-out;
`;

export const fadeOutAnimation = `
  animation: fadeOut 0.3s ease-out;
`;

export const scaleInAnimation = `
  animation: scaleIn 0.3s ease-out;
`;
