import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const icons = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info
};

export function Alert({
  children,
  variant = 'info', // 'error', 'success', 'warning', 'info'
  title,
  className = '',
  ...props
}) {
  const baseClass = 'alert';
  const variantClass = `alert--${variant}`;
  
  const combinedClassName = [
    baseClass,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  const IconComponent = icons[variant] || Info;

  return (
    <div className={combinedClassName} role="alert" {...props}>
      <IconComponent className="alert__icon h-5 w-5" />
      <div>
        {title && <h5 className="alert__title">{title}</h5>}
        <div className="alert__text">{children}</div>
      </div>
    </div>
  );
}
