import React from 'react';

export function Spinner({
  size = 'md', // 'sm', 'md', 'lg'
  variant,    // 'white' (default is cyan)
  className = '',
  ...props
}) {
  const baseClass = 'spinner';
  const sizeClass = size && size !== 'md' ? `spinner--${size}` : '';
  const variantClass = variant ? `spinner--${variant}` : '';

  const combinedClassName = [
    baseClass,
    sizeClass,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return <span className={combinedClassName} {...props} />;
}
