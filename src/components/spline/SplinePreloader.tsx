import { useState, useEffect, useRef, useCallback } from 'react';
import { LoadingOverlay } from './LoadingOverlay';
import { SplineFallback } from './SplineFallback';

interface SplinePreloaderProps {
  src: string;
  title?: string;
  className?: string;
  fallbackDelay?: number;
  timeout?: number;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
  onFallbackActivated?: () => void;
}

interface LoadingState {
  isLoading: boolean;
  progress: number;
  error: Error | null;
  showFallback: boolean;
  loadStartTime: number | null;
}

export function SplinePreloader({
  src,
  title = "3D Animation",
  className = "",
  fallbackDelay = 15000, // 15 seconds
  timeout = 30000, // 30 seconds
  onLoadStart,
  onLoadComplete,
  onLoadError,
  onFallbackActivated
}: SplinePreloaderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const fallbackTimeoutRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    error: null,
    showFallback: false,
    loadStartTime: null
  });

  // Device detection for mobile optimization
  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Connection-aware timeout adjustment
  const getAdjustedTimeout = useCallback(() => {
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return timeout * 2;
      }
      if (connection.effectiveType === '3g') {
        return timeout * 1.5;
      }
    }
    return isMobile() ? timeout * 1.3 : timeout;
  }, [timeout, isMobile]);

  // Progress simulation for better UX
  const simulateProgress = useCallback(() => {
    setLoadingState(prev => {
      if (prev.progress >= 90) return prev;
      
      const increment = Math.random() * 15 + 5; // 5-20% increments
      const newProgress = Math.min(prev.progress + increment, 90);
      
      return {
        ...prev,
        progress: newProgress
      };
    });
  }, []);

  // Handle iframe load success
  const handleIframeLoad = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    // Complete progress animation
    setLoadingState(prev => ({ ...prev, progress: 100 }));
    
    // Small delay to show 100% before hiding overlay
    setTimeout(() => {
      setLoadingState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }));
      onLoadComplete?.();
    }, 500);
  }, [onLoadComplete]);

  // Handle iframe load error
  const handleIframeError = useCallback((error: Error) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      error,
      showFallback: true
    }));
    
    onLoadError?.(error);
    onFallbackActivated?.();
  }, [onLoadError, onFallbackActivated]);

  // Activate fallback after delay
  const activateFallback = useCallback(() => {
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      showFallback: true
    }));
    
    onFallbackActivated?.();
  }, [onFallbackActivated]);

  // Initialize loading process
  useEffect(() => {
    const startTime = Date.now();
    setLoadingState(prev => ({
      ...prev,
      isLoading: true,
      progress: 0,
      error: null,
      showFallback: false,
      loadStartTime: startTime
    }));

    onLoadStart?.();

    // Start progress simulation
    progressIntervalRef.current = setInterval(simulateProgress, 800);

    // Set timeout for loading
    const adjustedTimeout = getAdjustedTimeout();
    timeoutRef.current = setTimeout(() => {
      const timeoutError = new Error(`Spline scene failed to load within ${adjustedTimeout}ms`);
      handleIframeError(timeoutError);
    }, adjustedTimeout);

    // Set fallback activation timer
    fallbackTimeoutRef.current = setTimeout(activateFallback, fallbackDelay);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [src, onLoadStart, simulateProgress, getAdjustedTimeout, fallbackDelay, handleIframeError, activateFallback]);

  // Retry loading
  const retryLoading = useCallback(() => {
    if (iframeRef.current) {
      // Force iframe reload
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
        }
      }, 100);
    }
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ zIndex: 1 }}>
      {/* Spline iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className={`w-full h-full border-0 absolute inset-0 ${loadingState.showFallback ? 'hidden' : 'block'}`}
        allow="camera; microphone; xr-spatial-tracking"
        onLoad={handleIframeLoad}
        onError={() => handleIframeError(new Error('Iframe failed to load'))}
        style={{
          opacity: loadingState.isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 1
        }}
      />

      {/* Loading overlay */}
      {loadingState.isLoading && (
        <div className="absolute inset-0 z-50">
          <LoadingOverlay
            progress={loadingState.progress}
            isVisible={loadingState.isLoading}
            onRetry={retryLoading}
          />
        </div>
      )}

      {/* Fallback component */}
      {loadingState.showFallback && (
        <div className="absolute inset-0 z-40">
          <SplineFallback
            error={loadingState.error}
            onRetry={retryLoading}
            loadTime={loadingState.loadStartTime ? Date.now() - loadingState.loadStartTime : 0}
          />
        </div>
      )}
    </div>
  );
}