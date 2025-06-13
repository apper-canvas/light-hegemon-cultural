import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-accent text-white hover:bg-primary shadow-brass border-2 border-primary',
    secondary: 'bg-secondary text-primary hover:bg-surface-200 border-2 border-accent',
    outline: 'bg-transparent text-primary border-2 border-accent hover:bg-accent hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-surface-200'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium rounded-lg
    transition-all duration-200 font-body text-shadow
    ${variants[variant]} ${sizes[size]}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="animate-spin" size={16} />}
      {!loading && icon && iconPosition === 'left' && <ApperIcon name={icon} size={16} />}
      {children}
      {!loading && icon && iconPosition === 'right' && <ApperIcon name={icon} size={16} />}
    </motion.button>
  );
};

export default Button;