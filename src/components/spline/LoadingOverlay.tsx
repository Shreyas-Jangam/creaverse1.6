import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import creaverseLogo from '@/assets/creaverse-logo.png';

interface LoadingOverlayProps {
  progress: number;
  isVisible: boolean;
  onRetry?: () => void;
  showRetryButton?: boolean;
  connectionStatus?: 'online' | 'offline' | 'slow';
}

export function LoadingOverlay({
  progress,
  isVisible,
  onRetry,
  showRetryButton = false,
  connectionStatus = 'online'
}: LoadingOverlayProps) {
  // Get contextual loading message based on progress
  const getLoadingMessage = (progress: number, connectionStatus: string) => {
    if (connectionStatus === 'slow') {
      return "Loading 3D scene... Slow connection detected";
    }
    if (connectionStatus === 'offline') {
      return "Connection lost. Please check your internet";
    }
    
    if (progress < 25) {
      return "Initializing 3D scene...";
    } else if (progress < 50) {
      return "Loading assets...";
    } else if (progress < 75) {
      return "Rendering scene...";
    } else if (progress < 95) {
      return "Finalizing...";
    } else {
      return "Almost ready!";
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-400" />;
      case 'slow':
        return <Wifi className="w-4 h-4 text-yellow-400" />;
      default:
        return <Wifi className="w-4 h-4 text-green-400" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Creaverse Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={creaverseLogo} 
              alt="CreaverseDAO" 
              className="w-16 h-16 object-contain animate-pulse drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-xl blur-xl animate-pulse" />
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            {getLoadingMessage(progress, connectionStatus)}
          </h3>
          
          {/* Connection Status */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            {getConnectionIcon()}
            <span>
              {connectionStatus === 'slow' && 'Slow Connection'}
              {connectionStatus === 'offline' && 'No Connection'}
              {connectionStatus === 'online' && 'Connected'}
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator 
            progress={progress} 
            showPercentage={true}
            animated={true}
          />
        </div>

        {/* Retry Button (shown after delay or on error) */}
        {showRetryButton && onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Loading
          </Button>
        )}

        {/* Loading Tips */}
        <div className="mt-6 text-xs text-gray-400 space-y-1">
          {connectionStatus === 'slow' && (
            <p>💡 Tip: The 3D scene may take longer on slower connections</p>
          )}
          {progress > 80 && (
            <p>🎨 Almost there! Preparing your immersive experience...</p>
          )}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>
    </div>
  );
}