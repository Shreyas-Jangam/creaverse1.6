import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, Wifi, Clock } from 'lucide-react';
import creaverseLogo from '@/assets/creaverse-logo.png';

interface SplineFallbackProps {
  error?: Error | null;
  onRetry?: () => void;
  loadTime?: number; // in milliseconds
  variant?: 'gradient' | 'static' | 'minimal';
  showDiagnostics?: boolean;
}

export function SplineFallback({
  error,
  onRetry,
  loadTime = 0,
  variant = 'gradient',
  showDiagnostics = false
}: SplineFallbackProps) {
  const formatLoadTime = (ms: number) => {
    return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
  };

  const getErrorType = (error: Error | null) => {
    if (!error) return 'timeout';
    
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch')) return 'network';
    if (message.includes('timeout')) return 'timeout';
    if (message.includes('iframe')) return 'iframe';
    return 'unknown';
  };

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case 'network':
        return 'Network connection issue detected';
      case 'timeout':
        return '3D scene took too long to load';
      case 'iframe':
        return 'Unable to load 3D content';
      default:
        return 'Something went wrong loading the 3D scene';
    }
  };

  const getErrorIcon = (errorType: string) => {
    switch (errorType) {
      case 'network':
        return <Wifi className="w-6 h-6 text-orange-400" />;
      case 'timeout':
        return <Clock className="w-6 h-6 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
    }
  };

  const errorType = getErrorType(error);

  if (variant === 'minimal') {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-12 h-12 mx-auto mb-4 opacity-50">
            <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg" />
          </div>
          <p className="text-sm">3D content unavailable</p>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="mt-2 text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-x" />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Static background */}
      {variant === 'static' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img 
                src={creaverseLogo} 
                alt="CreaverseDAO" 
                className="w-12 h-12 object-contain opacity-80"
              />
            </div>
          </div>

          {/* Error icon and message */}
          <div className="mb-6">
            <div className="flex justify-center mb-3">
              {getErrorIcon(errorType)}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {getErrorMessage(errorType)}
            </h3>
            <p className="text-sm text-gray-300">
              Don't worry, you can still explore Creaverse without the 3D scene
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              Refresh Page
            </Button>
          </div>

          {/* Diagnostics (development mode) */}
          {showDiagnostics && (
            <div className="mt-6 p-3 bg-black/30 rounded-lg text-left">
              <h4 className="text-xs font-semibold text-gray-300 mb-2">Diagnostics</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Load time: {formatLoadTime(loadTime)}</div>
                <div>Error type: {errorType}</div>
                {error && <div>Message: {error.message}</div>}
                <div>User agent: {navigator.userAgent.slice(0, 50)}...</div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="mt-4 text-xs text-gray-400">
            {errorType === 'network' && (
              <p>💡 Check your internet connection and try again</p>
            )}
            {errorType === 'timeout' && (
              <p>💡 This might be due to a slow connection or high server load</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}