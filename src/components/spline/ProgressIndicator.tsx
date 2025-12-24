import React from 'react';

interface ProgressIndicatorProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  className?: string;
}

export function ProgressIndicator({
  progress,
  showPercentage = true,
  animated = true,
  size = 'md',
  variant = 'linear',
  className = ''
}: ProgressIndicatorProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  if (variant === 'circular') {
    const radius = size === 'sm' ? 20 : size === 'lg' ? 40 : 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          className={`transform -rotate-90 ${
            size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16'
          }`}
          viewBox={`0 0 ${(radius + 10) * 2} ${(radius + 10) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={animated ? 'transition-all duration-300 ease-out' : ''}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-semibold text-white ${
              size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'
            }`}>
              {Math.round(clampedProgress)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // Linear progress bar
  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar container */}
      <div className={`relative bg-white/10 rounded-full overflow-hidden ${
        size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3'
      }`}>
        {/* Progress bar fill */}
        <div
          className={`h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full ${
            animated ? 'transition-all duration-300 ease-out' : ''
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
        
        {/* Shimmer effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
      </div>

      {/* Percentage text */}
      {showPercentage && (
        <div className="flex justify-between items-center mt-2">
          <span className={`text-gray-300 ${
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
          }`}>
            Loading...
          </span>
          <span className={`font-semibold text-white ${
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
          }`}>
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}