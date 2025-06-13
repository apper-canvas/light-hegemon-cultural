import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'accent', 
  size = 'medium',
  showLabel = false,
  label = '',
  className = '' 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colors = {
    accent: 'bg-accent',
    primary: 'bg-primary',
    success: 'bg-semantic-success',
    warning: 'bg-semantic-warning',
    error: 'bg-semantic-error'
  };

  const sizes = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-primary">{label}</span>
          <span className="text-sm text-primary/70">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className={`${colors[color]} ${sizes[size]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;