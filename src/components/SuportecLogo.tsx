import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const SuportecLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  theme = 'dark',
}) => {
  // Dimension scales
  const iconSizeMap = {
    sm: 36,
    md: 46,
    lg: 64,
    xl: 88,
  };

  const iconPx = iconSizeMap[size];

  // SVG Icon precisely following the uploaded image:
  // - Laptop with bright blue screen & base
  // - Square pixel data blocks scattering from the top right corner
  const LogoIcon = (
    <svg
      width={iconPx}
      height={iconPx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Ícone Suportec Empresa"
    >
      {/* Laptop Screen Bezel */}
      <rect
        x="20"
        y="30"
        width="44"
        height="28"
        rx="4"
        stroke="#38BDF8"
        strokeWidth="4.5"
        fill="#07112E"
      />
      {/* Inner Screen Display */}
      <rect
        x="25"
        y="34.5"
        width="34"
        height="19"
        rx="2"
        fill="#0D2559"
      />

      {/* Laptop Base */}
      <path
        d="M12 63.5C12 61 14 59 16.5 59H67.5C70 59 72 61 72 63.5L75 66.5C75 68 73.5 69 72 69H12C10.5 69 9 68 9 66.5L12 63.5Z"
        fill="#38BDF8"
      />

      {/* Touchpad Indent */}
      <rect
        x="37"
        y="60.5"
        width="14"
        height="2.5"
        rx="1"
        fill="#07112E"
      />

      {/* Pixel Data Blocks Floating to the Right (faithfully reproduced from image) */}
      {/* Top right large white pixel */}
      <rect x="63" y="19" width="10" height="10" rx="1.5" fill="#FFFFFF" />
      
      {/* Royal blue pixel behind */}
      <rect x="56" y="26" width="9" height="9" rx="1.5" fill="#2563EB" />
      
      {/* Bright sky blue pixel */}
      <rect x="67" y="30" width="9" height="9" rx="1.5" fill="#38BDF8" />
      
      {/* Dark royal pixel */}
      <rect x="49" y="32" width="7.5" height="7.5" rx="1" fill="#1D4ED8" />
      
      {/* White pixel middle */}
      <rect x="60" y="39" width="7" height="7" rx="1" fill="#FFFFFF" />
      
      {/* Medium blue bottom-right */}
      <rect x="45" y="40" width="6.5" height="6.5" rx="1" fill="#3B82F6" />

      {/* Cyan spark accent */}
      <rect x="52" y="24" width="5.5" height="5.5" rx="1" fill="#60A5FA" />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  const isLight = theme === 'light';

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-lg md:text-xl font-extrabold tracking-tight',
    lg: 'text-2xl md:text-3xl font-extrabold tracking-tight',
    xl: 'text-3xl md:text-4xl font-extrabold tracking-tight',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.16em]',
    md: 'text-[10px] md:text-xs tracking-[0.2em]',
    lg: 'text-xs md:text-sm tracking-[0.22em]',
    xl: 'text-sm md:text-base tracking-[0.25em]',
  };

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {LogoIcon}
        <div className="mt-2">
          <span className={`block ${titleSizes[size]} ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Suportec Empresa
          </span>
          <span className={`block font-semibold uppercase ${subSizes[size]} ${isLight ? 'text-blue-700' : 'text-slate-300'}`}>
            SERVIÇOS TÉCNICOS
          </span>
        </div>
      </div>
    );
  }

  // Horizontal (Navbar default)
  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {LogoIcon}
      <div className="flex flex-col justify-center">
        <span className={`leading-none ${titleSizes[size]} ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Suportec Empresa
        </span>
        <span className={`mt-1 font-semibold uppercase leading-none ${subSizes[size]} ${isLight ? 'text-blue-700' : 'text-slate-300'}`}>
          SERVIÇOS TÉCNICOS
        </span>
      </div>
    </div>
  );
};
