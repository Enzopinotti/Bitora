import React from 'react';

export function Card({
  children,
  variant, // 'accent-cyan', 'accent-green', 'accent-orange', 'accent-purple', 'error', 'success', 'warning'
  elevated = false,
  hover = false,
  className = '',
  ...props
}) {
  const baseClass = 'card';
  const variantClass = variant ? `card--${variant}` : '';
  const elevatedClass = elevated ? 'card--elevated' : '';
  const hoverClass = hover ? 'card--hover' : '';

  const combinedClassName = [
    baseClass,
    variantClass,
    elevatedClass,
    hoverClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`card__title ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardSubtitle({ children, className = '', ...props }) {
  return (
    <p className={`card__subtitle ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`card__content ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  );
}
