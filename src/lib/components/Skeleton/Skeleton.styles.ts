import { Size } from "../../types/common";
import { SkeletonVariant, SkeletonAnimation } from "./Skeleton.types";

export const skeletonVariants: Record<SkeletonVariant, string> = {
  text: "rounded",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-lg",
};

export const skeletonSizes: Record<
  Size,
  {
    text: { width: string; height: string };
    circular: { width: string; height: string };
    rectangular: { width: string; height: string };
    rounded: { width: string; height: string };
  }
> = {
  sm: {
    text: { width: "100px", height: "14px" },
    circular: { width: "32px", height: "32px" },
    rectangular: { width: "120px", height: "80px" },
    rounded: { width: "120px", height: "80px" },
  },
  md: {
    text: { width: "150px", height: "16px" },
    circular: { width: "40px", height: "40px" },
    rectangular: { width: "200px", height: "120px" },
    rounded: { width: "200px", height: "120px" },
  },
  lg: {
    text: { width: "200px", height: "18px" },
    circular: { width: "48px", height: "48px" },
    rectangular: { width: "300px", height: "180px" },
    rounded: { width: "300px", height: "180px" },
  },
  xl: {
    text: { width: "250px", height: "20px" },
    circular: { width: "56px", height: "56px" },
    rectangular: { width: "400px", height: "240px" },
    rounded: { width: "400px", height: "240px" },
  },
};

export const skeletonAnimations: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  wave: "skeleton-wave",
  none: "",
};

export const baseSkeletonStyles = `
  bg-gray-200 overflow-hidden relative
  transition-all duration-300 ease-out
`;

export const shimmerStyles = `
  absolute inset-0 -translate-x-full
  bg-gradient-to-r from-transparent via-white to-transparent
  opacity-60
`;

export const contentWrapperStyles = `
  transition-opacity duration-300 ease-out
`;

export const fadeInStyles = `
  opacity-0 animate-fade-in
`;

export const groupStyles = `
  space-y-4
`;

// Animation keyframes
export const skeletonAnimations_keyframes = `
  @keyframes skeleton-wave {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes skeleton-wave-rtl {
    0% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  @keyframes skeleton-wave-ttb {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  @keyframes skeleton-wave-btt {
    0% {
      transform: translateY(100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
`;

export const waveAnimationLTR = `
  animation: skeleton-wave var(--duration, 1.5s) ease-in-out infinite;
`;

export const waveAnimationRTL = `
  animation: skeleton-wave-rtl var(--duration, 1.5s) ease-in-out infinite;
`;

export const waveAnimationTTB = `
  animation: skeleton-wave-ttb var(--duration, 1.5s) ease-in-out infinite;
`;

export const waveAnimationBTT = `
  animation: skeleton-wave-btt var(--duration, 1.5s) ease-in-out infinite;
`;

export const pulseAnimation = `
  animation: pulse var(--duration, 2s) ease-in-out infinite;
`;

export const fadeInAnimation = `
  animation: fade-in var(--fade-duration, 0.3s) ease-out forwards;
`;
