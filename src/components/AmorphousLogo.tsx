import React from 'react';

interface AmorphousLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  whiteVariant?: boolean;
}

export const AmorphousLogo: React.FC<AmorphousLogoProps> = ({
  className = '',
  showSubtitle = true,
  size = 'md',
  whiteVariant = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon of geometric A with circular dot */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Main geometric 'A' triangle frame */}
          <path
            d="M50 10 L88 84 H66 L50 50 L34 84 H12 L50 10 Z"
            fill={whiteVariant ? '#FFFFFF' : '#1677FF'}
          />
          {/* Circular dot inside/below the A structure */}
          <circle
            cx="25"
            cy="72"
            r="8"
            fill={whiteVariant ? '#1677FF' : '#1677FF'}
          />
        </svg>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-extrabold tracking-tight ${titleSizes[size]} ${
            whiteVariant ? 'text-white' : 'text-[#102A5C]'
          }`}
          style={{ letterSpacing: '0.04em' }}
        >
          AMORPHUS
        </span>
        {showSubtitle && (
          <span
            className={`font-semibold mt-1 tracking-normal ${subtitleSizes[size]} ${
              whiteVariant ? 'text-blue-100' : 'text-[#64748B]'
            }`}
          >
            NIT Bhopal <span className="mx-0.5">•</span> Materials Science Society
          </span>
        )}
      </div>
    </div>
  );
};
