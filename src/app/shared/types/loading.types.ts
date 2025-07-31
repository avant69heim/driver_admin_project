export type LoadingType = 'spinner' | 'skeleton' | 'pulse' | 'dots';
export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingPosition = 'center' | 'top' | 'bottom';

export interface LoadingOptions {
  type?: LoadingType;
  text?: string;
  overlay?: boolean;
  size?: LoadingSize;
  position?: LoadingPosition;
  showProgress?: boolean;
  duration?: number; // Auto-hide after duration (ms)
}

export interface LoadingState {
  isLoading: boolean;
  options: LoadingOptions;
}

export const DEFAULT_LOADING_OPTIONS: LoadingOptions = {
  type: 'spinner',
  text: 'Loading...',
  overlay: true,
  size: 'md',
  position: 'center',
  showProgress: false,
  duration: 0 // 0 = no auto-hide
};