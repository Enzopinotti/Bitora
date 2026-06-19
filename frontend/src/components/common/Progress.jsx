import React from 'react';

export function Progress({
  value = 0, // 0 to 100
  variant,   // 'green', 'orange', 'purple' (default is cyan)
  className = '',
  ...props
}) {
  const baseClass = 'progress';
  const variantClass = variant ? `progress--${variant}` : '';
  
  const combinedClassName = [
    baseClass,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  // Ensure value is bounded between 0 and 100
  const boundedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={combinedClassName} role="progressbar" aria-valuenow={boundedValue} aria-valuemin="0" aria-valuemax="100" {...props}>
      <div className="progress__bar" style={{ width: `${boundedValue}%` }} />
    </div>
  );
}
