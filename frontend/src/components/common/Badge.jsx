import React from 'react';

export function Badge({
  children,
  variant, // 'cyan', 'green', 'orange', 'purple', 'error', 'success'
  className = '',
  ...props
}) {
  const baseClass = 'badge';
  const variantClass = variant ? `badge--${variant}` : '';
  
  const combinedClassName = [
    baseClass,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
}
