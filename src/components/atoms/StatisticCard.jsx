import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatisticCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'primary',
  size = 'medium',
  className = '' 
}) => {
  const colors = {
    primary: 'text-primary border-primary/20',
    accent: 'text-accent border-accent/20',
    success: 'text-semantic-success border-semantic-success/20',
    warning: 'text-semantic-warning border-semantic-warning/20',
    error: 'text-semantic-error border-semantic-error/20'
  };

  const sizes = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const getTrendIcon = () => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-semantic-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-semantic-error' };
    return { name: 'Minus', color: 'text-primary/50' };
  };

  const trendData = getTrendIcon();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        parchment-bg rounded-lg border-2 shadow-parchment
        ${colors[color]} ${sizes[size]} ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`p-2 rounded-lg bg-surface-200 ${colors[color]}`}>
              <ApperIcon name={icon} size={20} />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-primary/70">{title}</p>
            <p className="text-2xl font-bold font-display">{value}</p>
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 ${trendData.color}`}>
            <ApperIcon name={trendData.name} size={16} />
            <span className="text-sm font-medium">
              {Math.abs(trend)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatisticCard;