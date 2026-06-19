import React from 'react';

export function Button({
  children,
  variant = 'outline', // 'primary', 'outline', 'ghost', 'danger'
  size = 'md',        // 'sm', 'md', 'lg', 'icon'
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = variant ? `btn--${variant}` : '';
  const sizeClass = size && size !== 'md' ? `btn--${size}` : '';
  const fullWidthClass = fullWidth ? 'btn--full' : '';
  
  const combinedClassName = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
